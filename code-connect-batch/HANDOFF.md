# Bamboo Code Connect — handoff operativo

Este documento permite continuar el trabajo con otro modelo sin reconstruir el contexto. Léelo completo antes de inspeccionar o modificar Figma.

## Migración vigente: v1.6.4-b

El lote existente ya fue migrado y republicado contra la estructura remota `ui-angular` de `develop`. La evidencia reproducible, SHAs, cifras, piloto y anomalía de Calendar están en [V1_6_4_B_MIGRATION.md](V1_6_4_B_MIGRATION.md), [SOURCE_PATH_MIGRATION.md](SOURCE_PATH_MIGRATION.md) y [REMOTE_API_AUDIT.md](REMOTE_API_AUDIT.md).

- Worktree aislado: `/Users/csolares/Documents/5 - CODEX/tec.design/Codebase/tec-design-system-ng-code-connect-v1.6.4-b`
- Rama: `code-connect-v1.6.4-b`, basada en `origin/develop` SHA `94e14c2ca61c9cf011a017335f6c710d1cb5e777`.
- GitHub remoto es la fuente de verdad para rutas y contratos Angular. No comparar contra el source del worktree histórico sucio.
- Las 101 plantillas pasan parse y fueron republicadas en seis lotes sin `--force`; 97 mappings públicos están inventariados como MCP-verificados, Calendar sigue pendiente de visibilidad MCP y 3 templates son adaptadores internos.

## Objetivo vigente

Completar el mapeo verificable de componentes públicos de Angular hacia Bamboo Code Connect. La prioridad ya no es aumentar el número de snippets: es convertir las 40 filas `Contract required` en contratos Figma mínimos, semánticos y realmente representables por el API público de Angular.

Un componente queda terminado sólo si tiene un snippet útil que pasa `parse`, se publica sin `--force` y Figma MCP confirma `hasTemplate: true`. No se debe publicar un tag vacío ni serializar arreglos/objetos de Angular como texto.

## Estado confirmado al entregar

- Rama histórica: `code-connect-test`. Rama de migración vigente: `code-connect-v1.6.4-b`.
- Baseline remoto de la migración: `origin/develop` SHA `94e14c2ca61c9cf011a017335f6c710d1cb5e777`.
- 97 mappings públicos Angular inventariados y MCP-verificados; 3 adaptadores internos `BB_1_4*` adicionales; Calendar publicado pero aún no visible por MCP.
- 128 exports públicos Angular conciliados: 66 componentes conectados; 62 sin template independiente.
- Pendientes: 40 `Contract required`, 10 `Parent/child composition`, 12 `Blocked / out of scope`; no hay candidatos directos abiertos.
- El worktree histórico del repositorio tiene muchísimos cambios ajenos y debe permanecer intacto. Trabajar sólo en el worktree aislado y editar, stagear, commitear y subir únicamente archivos dentro de `code-connect-batch/`.

Las cifras, componentes y evidencia detallada están en `INVENTORY.md`, `REMAINING_COMPONENTS.md`, `CONTRACT_BACKLOG.md` y `DECISIONS.md`.

## Fuentes Figma y su rol

| Rol | Archivo | Regla |
| --- | --- | --- |
| Referencia de uso | `Jf8Nd71tihhPZdv9xm6PnN` — MiTec 4.0 Entregable Colaboradores, nodo inicial `15686:164499` | Leer para confirmar composición y contenido que usa un consumidor. No publicar ni crear Code Connect en este archivo. Sus nodos observados son instancias y sus IDs de componente no son destinos persistentes. |
| Fuente de contratos y Code Connect | `Q4t8qIM5fklC9I3Atc1BrZ` — Bamboo Design System Components | Único archivo donde se resuelven los componentes publicados estables, se agregan contratos Figma y se publican los snippets Angular. |

Evidencia ya obtenida desde MiTec:

- `TopBar4.0Switcher` y `Sidebar4.0Switcher` se repiten en pantallas intermedias; son composición reusable, no un único asset de pantalla.
- En `Mis Eventos`, las filas de `List group` (`9050:55418`, `9050:55440`) incluyen título, badge, metadata, links/acciones delanteras y acciones traseras. Por ello una lista no puede reducirse a un texto ni a datos inventados.
- Los IDs que Code Connect sugirió dentro del archivo MiTec para Action menu/List group/Card Button no resolvieron como nodos fuente válidos. Eso confirma que son instancias, no destinos de publicación.

## Backlog que debe seguirse en orden

La autoridad de ejecución es `CONTRACT_IMPLEMENTATION_BACKLOG.md`; el estado de evidencia/nodos es `CONTRACT_STATE.md`.

1. `NAV-01` — Navigation item: resolver primero en Bamboo (`Q4…`) los padres/hijos publicados equivalentes a top bar, sidebar y navegación. Comparar sus inputs/proyección Angular y Storybook antes de definir cualquier propiedad.
2. `COL-01` — Menu/List item: resolver en Bamboo las fuentes estables de Action menu y List group, y comparar las APIs públicas de proyección/`TemplateRef`.
3. Sólo después de que la Fase 0 de uno de estos contratos pase, implementar **una familia Figma por ciclo** y crear los mappings que vuelvan elegibles.
4. Las olas posteriores están descritas en el backlog: fields; profile/content/rubric/messages; events/table/header/template.

## Fase 0 obligatoria por contrato

Antes de tocar Figma, registrar en `CONTRACT_STATE.md`:

1. Nodo fuente estable y publicado de Bamboo, con URL/ID exacto.
2. Clase/directiva exportada desde `ui-angular/src/index.ts` y su selector/input/proyección público.
3. Ejemplo canónico de Storybook/MDX que pruebe los valores mínimos.
4. Tabla exacta propiedad Figma → API Angular o SLOT → proyección Angular.
5. Reuso de variables/tokens e hijo publicado existente. Si falta una correspondencia, detener esa familia y dejarla `Contract required`; no aproximar datos estructurados.

Sólo entonces puede modificarse la librería Figma. Para una colección, el hijo debe ser un componente publicado y el padre debe tener un `SLOT` real. Usar `INSTANCE_SWAP` únicamente para un hijo intercambiable (por ejemplo, icono), nunca para simular una colección.

## Restricciones técnicas y de calidad

- Usar las instrucciones de `CODE_CONNECT_CONVENTION.md`, `BB_ADAPTERS.md` y `COMPOSITION_REMEDIATION.md` además de los archivos de inventario.
- Los `BB_*` son adaptadores internos; nunca contarlos o tratarlos como APIs Angular públicas. Sólo crearlos si nodo Figma estable + API Angular pública están confirmados; deben ser parserless y `nestable`.
- El padre debe renderizar hijos resueltos mediante `getInstanceSwap`/`findInstance` y `executeTemplate()` cuando aplique. No publicar fachadas vacías.
- Emitir únicamente atributos existentes en el API público. Hover/focus/pressed/transiciones siguen siendo visuales.
- Se permiten ejemplos neutros sólo cuando Storybook los documenta y Angular los exige. No inventar `array`, `object`, payload, slot, input o atributo.
- No tocar el código Angular, archivos heredados, ni objetos Figma ajenos al contrato que se está validando.

## CLI, secreto y verificación

No mostrar ni leer el valor del token. Mientras el secreto siga en el worktree histórico, cargarlo desde `/Users/csolares/Documents/5 - CODEX/tec.design/Codebase/tec-design-system-ng-official/.env` sin copiarlo ni imprimirlo. No usar el binario `figma` ambiguo del proyecto ni `npm exec … -- figma`.

```sh
zsh -lc 'set -a; source .env; set +a; /Users/csolares/.npm/_npx/a937c69819479768/node_modules/.bin/figma connect parse --file code-connect-batch/NOMBRE.figma.ts --config code-connect-batch/figma.config.json --verbose'
zsh -lc 'set -a; source .env; set +a; /Users/csolares/.npm/_npx/a937c69819479768/node_modules/.bin/figma connect publish --file code-connect-batch/NOMBRE.figma.ts --config code-connect-batch/figma.config.json --verbose'
```

Reglas de publicación:

1. Primero `parse --verbose`.
2. Si pasa y el mapping es canónico, `publish --verbose`, sin `--dry-run` y sin `--force`.
3. Si la red del sandbox bloquea `api.figma.com`, solicitar permiso de red para ese mismo `publish`; no clasificarlo como fallo de mapping antes de probarlo.
4. Verificar luego con Figma MCP (`get_code_connect_map`, label `Angular`) que `hasTemplate: true`.
5. Sólo después actualizar inventario/decisiones/estado.

## Figma MCP y skills requeridos

- Para mantener `.figma.ts` o publicar Code Connect, cargar y seguir `figma:figma-code-connect`.
- Antes de cualquier mutación Figma con `use_figma`, leer/aplicar `figma:figma-use` y `figma:figma-generate-library`.
- Para inspeccionar contexto de un diseño con `get_design_context`, aplicar `figma:figma-design-to-code`.
- En Figma, preservar instancias y objetos del usuario; no destruir, detach ni reorganizar una página para forzar un contrato.

## Documentación y Git al cerrar cada ciclo

Actualizar sólo cuando exista evidencia nueva:

- `CONTRACT_STATE.md`: IDs, evidencia de Fase 0, resultado y próximo paso seguro.
- `CONTRACT_IMPLEMENTATION_BACKLOG.md`: estado del contrato/familia.
- `INVENTORY.md`, `REMAINING_COMPONENTS.md`, `CONTRACT_BACKLOG.md`, `DECISIONS.md`: únicamente después de `hasTemplate: true` o una decisión de contrato real.
- `BB_ADAPTERS.md` y `COMPOSITION_REMEDIATION.md`: sólo cuando intervenga composición/adaptadores.

Después, revisar específicamente `git status --short -- code-connect-batch`, hacer commit que incluya sólo esa carpeta y subirlo:

```sh
git add code-connect-batch
git commit -m 'docs: advance Bamboo Code Connect contract state'
git push origin code-connect-v1.6.4-b
```

No usar `git add -A`, `git reset --hard` ni checkout/revert en este working tree.

## Automatización existente

Automatización activa: `bamboo-code-connect-contract-monitor`.

- Periodicidad: cada 6 horas.
- Tarea: inspecciona como máximo un contrato y muta como máximo una familia Figma sólo tras pasar Fase 0; luego parse/publish/verifica/commitea únicamente `code-connect-batch`.
- Notifica sólo por mapping verificado, gate de decisión, permisos/herramientas, fallo persistente o backlog concluido.

Si otro modelo retoma manualmente la tarea, debe respetar el mismo límite de una familia por ciclo para evitar cambios Figma difíciles de revisar.

## Prompt mínimo de continuación

> Continúa el backlog de contratos Bamboo Code Connect en `/Users/csolares/Documents/5 - CODEX/tec.design/Codebase/tec-design-system-ng-code-connect-v1.6.4-b`, rama `code-connect-v1.6.4-b`. Lee por completo `code-connect-batch/HANDOFF.md`, `V1_6_4_B_MIGRATION.md`, `CONTRACT_IMPLEMENTATION_BACKLOG.md`, `CONTRACT_STATE.md`, `CODE_CONNECT_CONVENTION.md`, `INVENTORY.md`, `REMAINING_COMPONENTS.md`, `CONTRACT_BACKLOG.md`, `DECISIONS.md`, `BB_ADAPTERS.md` y `COMPOSITION_REMEDIATION.md`. Usa GitHub remoto `develop` como fuente de verdad Angular, MiTec `Jf8Nd71tihhPZdv9xm6PnN` sólo como evidencia de uso y Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` como único destino de contratos/Code Connect. Ejecuta sólo la Fase 0 del contrato activo o, si ya está completa, una familia validada; no publiques nada sin nodo Bamboo estable + API Angular pública + Storybook + parse. Usa exclusivamente el CLI oficial señalado en HANDOFF, sin revelar token, sin `--force`, y verifica `hasTemplate:true` con Figma MCP. Edita, commitea y sube exclusivamente `code-connect-batch` a `code-connect-v1.6.4-b`.
