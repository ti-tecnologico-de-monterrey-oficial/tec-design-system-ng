# Skill design-audit: uso y mantenimiento

## Para qué sirve

Compara un nodo de Figma con las historias relacionadas de Storybook/Chromatic y genera un PDF con ajustes medidos. La skill aporta instrucciones al agente; los scripts incluidos ejecutan la API, el navegador, las mediciones y el reporte. No usa MCP ni un modelo dentro del CLI. Usarla mediante un agente sí utiliza el modelo de esa conversación.

## Ejecutar

Desde la raíz del repositorio:

```bash
npm run audit:design
```

Introduce el enlace de Figma (con `node-id`) y la URL de documentación o historia de Storybook. El script carga `FIGMA_ACCESS_TOKEN` del entorno o `.env`; si falta o es rechazado, pide un token en entrada oculta. No pegues secretos en el chat. No hay JSON ni IDs que escribir por separado.

En un cliente que cargue las skills del repositorio puedes solicitar:

> Usa $design-audit para comparar este enlace de Figma con este enlace de Storybook y generar el PDF de ajustes.

Si la nueva skill no aparece en la sesión actual, vuelve a abrir una sesión del cliente con este repositorio. También puedes indicar la ruta de `SKILL.md`. La skill coordina el comando interactivo; si el usuario debe introducir un token o acceder a Storybook privado, debe hacerlo en su terminal/navegador.

## Requisitos

- Checkout del repositorio y versión de Node.js/npm compatible con sus dependencias.
- Dependencias instaladas conforme al workspace; en un checkout nuevo con lockfile coherente: `npm ci`.
- Chromium de Playwright (`npm exec playwright install chromium`) o Google Chrome instalado en su ubicación habitual en macOS. `DESIGN_AUDIT_CHROME_PATH` admite una ruta explícita.
- Token de Figma con `file_content:read` y acceso al archivo, más conexión a la API y sus renders.
- Storybook accesible. Para localhost, inicia antes el servidor. Para Chromatic usa View Storybook, no el panel administrativo. El token de publicación de Chromatic no sustituye una sesión de lectura.
- Si Storybook es privado, el flujo permite iniciar sesión personalmente en el navegador temporal y volver a proporcionar el enlace. No persiste esa sesión.

## Alcance y reporte

Solo se revisan el nodo seleccionado y sus descendientes. El descubrimiento usa nombres, equivalencias conocidas, propiedades y etiquetas externas cercanas de Desktop/Responsive dentro del alcance. Una referencia Responsive / Desktop puede servir para ambas historias. Se prefieren especificaciones etiquetadas frente a copias de la galería; las parejas ambiguas pueden requerir revisión. No garantiza asociaciones universales fuera de las familias verificadas.

El reporte mide font size, font weight, colores, padding del contenedor principal y separaciones entre elementos asociados. Excluye botones reconocidos y sus descendientes, contenido del texto, familia tipográfica, line height, radios, sombras, tamaños generales y de imágenes y padding interno. Las reglas de exclusión se basan en nombres y selectores; nuevos componentes pueden requerir ampliarlas.

El PDF contiene capturas de Figma y Storybook, ubicaciones numeradas, propiedad, esperado, encontrado, ajuste y enlaces. No contiene severidad, confianza ni recomendaciones genéricas por diferencias de píxeles. El único resultado persistente de cada auditoría es:

```text
dist/design-audit/<fecha>/reporte.pdf
```

Las imágenes y el HTML viven en memoria; los PDF anteriores no se modifican. Si no hay hallazgos medibles, no hay PDF. Revisa siempre casos sin evaluar y capas pendientes: una asociación no prueba que todas las propiedades se hayan medido. No se esperan automáticamente todas las interacciones ni funciones `play` asíncronas.

## Configuración

- `FIGMA_ACCESS_TOKEN`: token de lectura; opcional si se introduce en el prompt oculto.
- `FIGMA_AUTH_TYPE=oauth`: admite un token OAuth ya emitido. No implementa emisión ni renovación OAuth.
- `DESIGN_AUDIT_CHROME_PATH`: ejecutable del navegador.
- `AUDIT_TOLERANCE_PX`: tolerancia numérica, predeterminada 1, aplicada también al peso tipográfico. Los colores se comparan exactamente.
- `AUDIT_COLOR_THRESHOLD` y `AUDIT_MAX_DIFF_RATIO`: parámetros heredados, sin efecto sobre el reporte actual de ajustes estructurales.

## Archivos

Todos se encuentran en `.agents/skills/design-audit/`:

| Archivo | Responsabilidad |
| --- | --- |
| `SKILL.md` | Cuándo usar la skill, procedimiento y reglas para el agente. |
| `references/uso.md` | Esta referencia de operación y mantenimiento. Reemplaza el README anterior. |
| `project.json` | Tareas Nx de pruebas y smoke. |
| `scripts/agent.mjs` | Prompts, token, navegador, lectura DOM, coordinación y salida. |
| `scripts/figma-client.mjs` | API REST, errores y reintentos transitorios de Figma. |
| `scripts/discovery.mjs` | Alcance, historias, etiquetas, copias y asociación de nombres/dispositivos. |
| `scripts/matching.mjs` | Búsqueda heurística de parejas pendientes por imagen, texto, geometría y tema. |
| `scripts/capture.mjs` | Identifica el componente real dentro de Storybook. |
| `scripts/compare.mjs` | Propiedades esperadas, asociaciones internas, exclusiones y diferencias permitidas. |
| `scripts/report.mjs` | Capturas anotadas, tabla y generación del PDF. |
| `scripts/compare.test.mjs` | Pruebas de regresión. |
| `scripts/smoke.mjs` | Prueba local de capturas y PDF en carpeta temporal. |

`package.json` conserva `audit:design` y `audit:design:test`, con rutas actualizadas. `RUNNER.md` enlaza esta referencia. Las dependencias siguen siendo las del workspace; copiar solo la carpeta de la skill no instala el entorno.

## Pruebas

Desde la raíz:

```bash
npm run audit:design:test
npm exec nx run design-audit:smoke
```

La prueba smoke necesita Chromium o `DESIGN_AUDIT_CHROME_PATH`. El CLI conserva el modo interactivo y los módulos conservan imports relativos. Una migración de archivos no debe cambiar reglas de comparación. Las pruebas locales no equivalen a auditar nuevamente las 26 historias en vivo.

## Solución de problemas

- Enlace inválido: usa URL completa, Figma con `node-id` y Storybook accesible.
- 401/403: revisa vigencia, alcance `file_content:read` y permiso sobre el archivo.
- 429: respeta el tiempo indicado por Figma antes de repetir.
- Alcance desproporcionado: selecciona el conjunto específico; no amplíes silenciosamente el nodo.
- Historias o capas pendientes: inspecciona nombres, etiquetas, tema y acceso; no concluyas que no existen ni reduzcas umbrales sin evidencia.
- Sin PDF: comprueba si no hubo hallazgos o si faltaron mediciones.

## Por qué skill con scripts, y por qué sin MCP

La skill ofrece al agente un procedimiento reutilizable y reglas de cobertura. Los scripts conservan las tareas deterministas y verificables: HTTP, DOM, medidas y PDF. Convertir código ejecutable en instrucciones de texto no lo reemplaza; por eso se trasladaron los módulos dentro de la skill.

El modo terminal no requiere modelo de IA. La invocación de la skill sí utiliza el agente, que puede revisar fallos e interpretar resultados. Ningún modo garantiza por sí solo que una pareja ambigua sea correcta.

Se retiró MCP del auditor a petición del usuario. Durante la prueba, el registro OAuth del cliente propio devolvió 403 y la alternativa Desktop requería habilitar un servidor local. La API REST ya aporta los datos utilizados por esta implementación, y Playwright lee los estilos reales. MCP no genera ni valida automáticamente estas comparaciones. Una conexión independiente en Codex no pasa sus credenciales al proceso Node.
