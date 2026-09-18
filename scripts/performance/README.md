# Estrategia de pruebas de LCP (Largest Contentful Paint)

Herramientas en `scripts/performance/` para auditar el LCP (y el resto de Core
Web Vitals) de:

- **`angular-app`**: build optimizado (sin dev server) — mide lo que vería un
  usuario real.
- **`angular-app-dev`**: contra `nx serve angular-app` — solo para iterar
  rápido, **no confiable para reportes** (el HMR de Vite infla el LCP, ver
  "Limitaciones" abajo).
- **`storybook-angular` / `storybook-react`**: cada story de Storybook
  individual, útil para detectar qué *componente* específico regresiona.

## Cómo funciona (estrategia)

1. **Motor de medición: Lighthouse programático** (`lighthouse` +
   `chrome-launcher`), no Chrome DevTools manual. Es reproducible, scripteable
   y ya lo usan herramientas como Lighthouse CI.
2. **Múltiples corridas por URL, se reporta la mediana** (`--runs`, default 3).
   Un solo run de Lighthouse tiene alta varianza; la mediana de 3-5 corridas es
   la práctica recomendada por el propio equipo de Lighthouse.
3. **Build representativo, no dev server.** `angular-app` se construye con la
   configuración `performance` (ver `angular-app/project.json`, es igual a
   `production` pero sin los `budgets` que hoy fallan) y se sirve estático con
   fallback SPA (`scripts/performance/lib/spa-static-server.mjs`).
4. **Targets curados, no todas las rutas.** `targets.config.mjs` define una
   lista representativa de páginas de `angular-app` (agrega más si quieres
   ampliar cobertura). Para Storybook se listan automáticamente todas las
   historias leyendo el `index.json` del build estático (usa `--limit` para no
   correr cientos de historias).
5. **Presupuesto (budget) de Core Web Vitals oficial:** 🟢 bueno ≤2500ms,
   🟡 mejorable ≤4000ms, 🔴 pobre >4000ms (`lib/budgets.mjs`).
6. **Reporte reproducible en disco**, no solo en consola (ver siguiente
   sección), para poder compararlo entre corridas / commits / PRs.

## Cómo generar un reporte

```bash
# Angular app (build optimizado real) — recomendado para reportes
npm run perf:lcp:angular

# Storybook (requiere buildear primero el estático, el script solo lo sirve)
npm run perf:lcp:storybook:angular
npm run perf:lcp:storybook:react

# Todo junto
npm run perf:lcp:all

# Iterar rápido contra el dev server (nx serve angular-app corriendo aparte)
node scripts/performance/run-lcp-audit.mjs --target=angular-app-dev
```

Flags útiles: `--runs=5`, `--form-factor=desktop`, `--limit=15` (Storybook),
`--skip-build` (reusar el `dist/` existente), `--fail-on-budget` (exit code 1
si alguna página cae en 🔴, útil para gating en CI).

Cada corrida escribe en `tmp/performance-reports/<timestamp>/`:

- `summary.json` — datos crudos (para graficar tendencias históricas o subir a
  un dashboard).
- `report.md` — tabla por suite, lista para pegar en una PR/Slack.
- `report.html` — misma tabla con color por estado, para abrir en el browser.
- `tmp/performance-reports/latest/` — symlink a la corrida más reciente.

## Integración en CI (siguiente paso sugerido)

- Correr `npm run perf:lcp:angular -- --fail-on-budget` en un job de CI (o vía
  Nx target) en cada PR contra las páginas críticas, y publicar
  `report.md`/`report.html` como artifact o comentario del PR.
- Guardar `summary.json` de cada corrida (p. ej. en un bucket o en Nx Cloud)
  para graficar la tendencia de LCP a través del tiempo y detectar
  regresiones, no solo el valor puntual.

## Limitaciones conocidas

- **No auditar el dev server para tomar decisiones.** Confirmado en esta
  sesión: contra `nx serve` (Vite + HMR), Lighthouse reporta LCP/FCP de
  70-150s porque el socket de HMR nunca deja la red "idle" y Lighthouse agota
  sus timeouts de espera. Por eso `angular-app` (el target por default) usa un
  build real servido estáticamente.
- **`angular-app` hoy excede varios `budgets` de bundle** definidos en
  `angular-app/project.json` bajo la configuración `production` (CSS de
  varios componentes de `ui-angular` supera su presupuesto, y el bundle
  inicial supera 1MB). Por eso el script usa una configuración `performance`
  nueva (idéntica a `production` pero sin `budgets`) solo para poder medir;
  esto **no reemplaza** arreglar esos presupuestos, es una señal real que vale
  la pena atender aparte.
- Con esa build, el LCP medido en local ronda 15-23s (🔴), muy por encima del
  presupuesto de Core Web Vitals — es una app de demostración con datasets
  locales grandes (`grades.json`, `names.json`, `timelineEvents.json`) y
  muchas rutas lazy, así que antes de optimizar vale la pena confirmar cuánto
  de eso es realista fuera de `localhost` (sin compresión/CDN) vs. correr el
  mismo audit contra un despliegue real con `--target=angular-app-dev`/
  variable `ANGULAR_APP_URL`.

## Diagnóstico: por qué el LCP sale mal y cómo mejorarlo

Se investigó la causa real (no solo el número) corriendo Lighthouse completo
contra `/home` y revisando sus audits de diagnóstico:

1. **El servidor de prueba no comprimía (gzip/brotli).** Ya corregido en
   `lib/spa-static-server.mjs` (gzip para `.html/.js/.css/.json/.svg` +
   `Cache-Control: immutable`). Esto por sí solo bajó el LCP simulado de
   ~15-23s a ~6-10s — sin este fix, el número reportado era peor de lo que
   sería en un servidor/CDN real.
2. **El resto del LCP lento SÍ es real, no un artefacto del tooling.** La
   métrica `metrics.observedLargestContentfulPaint` (sin red simulada) es de
   solo ~1.4s, pero el LCP "de laboratorio" (con throttling mobile) da ~10s
   porque `lcpLoadDelay` + `lcpLoadDuration` sí suman ~10.4s: el elemento LCP
   es una **imagen externa hotlinkeada** (p. ej.
   `images.unsplash.com/photo-1507149833265-...` sin redimensionar, ~1.7MB, o
   fotos de `2.bp.blogspot.com` de ~390KB), no un asset propio optimizado.
   Bajo throttling mobile simulado, descargar esos MB desde dominios externos
   (con su propio RTT/DNS/TLS) domina el LCP.
3. **CLS también sale muy mal (~0.97)** — consistente con imágenes sin
   `width`/`height` reservando espacio, que se insertan tarde y desplazan el
   layout.
4. **`main-JSINSIQO.js` (bundle inicial) tiene ~33% de JS sin usar** (~119KB
   de ~357KB, `unused-javascript` estima ~600ms de ahorro) y ~1.28s de
   scripting en el hilo principal antes del primer paint.

### Recomendaciones concretas para bajar el LCP real

- Reemplazar las imágenes de demo hotlinkeadas (Unsplash/Blogspot/Picsum) por
  assets propios, ya redimensionados/comprimidos (WebP/AVIF, ancho real de
  render, <100KB) servidos desde `shared/assets` — no re-descargar full-res
  desde un CDN de terceros.
- Definir `width`/`height` (o `aspect-ratio` en CSS) en toda imagen de
  tarjetas/carousels de las páginas de demo para eliminar el CLS.
- Si el elemento LCP no puede ser local, usar `fetchpriority="high"` /
  `<link rel="preconnect">` al dominio externo.
- Reducir JS no usado en el bundle inicial (revisar imports de `ui-angular`
  que se cargan aunque la página no los use — candidato a lazy-loading
  adicional) y resolver los `budgets` de bundle/CSS que ya están fallando
  (ver punto anterior), ya que ambos alargan el tiempo de scripting antes del
  primer paint.
- Re-correr `npm run perf:lcp:angular` después de cada cambio y comparar
  `tmp/performance-reports/<timestamp>/summary.json` contra el anterior para
  confirmar la mejora real (no solo eyeballear la consola).
