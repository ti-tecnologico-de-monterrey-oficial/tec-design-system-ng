# Bamboo Code Connect — estado consolidado

Última conciliación: **2026-08-17**

Este archivo es la **fuente de verdad operativa** del lote. Si otro documento contradice este resumen, prevalecen este archivo y el registro detallado de [INVENTORY.md](INVENTORY.md). La evidencia histórica permanece en Git y en los anexos señalados abajo, pero no debe dirigir la automatización.

## Estado ejecutivo

| Métrica | Estado confirmado |
| --- | ---: |
| Componentes exportados por `ui-angular/src/index.ts` | 130 |
| Clases Angular con template independiente confirmado | 102 |
| Mappings públicos publicados y verificados por MCP | 120 |
| Adaptadores internos `BB_*` | 5 |
| Assets publicados en Bamboo Components | 475 |
| Targets Figma con mapping local publicado | 125 |
| Targets Figma marcados `Skipped` y verificados en UI/MCP | 15 |
| Targets Figma publicados todavía sin mapping | 350 |
| Contract required | 2 |
| Parent/child composition | 14 |
| Blocked / out of scope | 12 |
| Candidatos directos abiertos en el inventario Angular-first anterior | 0 |
| Targets Figma-first pendientes de disposición explícita | 316 |

La conciliación Angular pasa a **102 clases conectadas + 28 sin template independiente confirmado = 130**. Sin embargo, ésa no es la cobertura que muestra la interfaz de Figma. La librería publica 475 targets y 125 tienen mapping del lote: **26.3%**. Los dos denominadores deben mantenerse separados.

## Qué queda por hacer

La cola principal pasa a ser **Figma-first por sección**. Un export Angular conectado no cierra una sección. Tampoco la cierra una clasificación exclusivamente local: `Internal/helper`, `External foundation` y `Duplicate/deprecated` son diagnósticos, no estados resueltos en la interfaz de Figma. Un target sólo deja la cola visible cuando queda `Connected` y verificado, o `Skipped` explícitamente en Figma con evidencia de por qué no representa una API consumible.

Línea base MCP del 2026-08-17. `Local publicado sin mapping` cuenta targets de esta librería encontrados en la selección; `Dependencia externa/no publicada` evita confundir iconos u otros hijos con el inventario local. Las filas se traslapan y no deben sumarse como total global.

| Orden | Sección | Nodo | Únicos sin conexión observados | Local publicado sin mapping | Dependencia externa/no publicada |
| ---: | --- | --- | ---: | ---: | ---: |
| 1 | Botones | `14050:2707` | 13 | 0 | 13 |
| 2 | Containers | `14050:20207` | 62 | 27 | 35 |
| 3 | Imágenes | `14050:20466` | 5 | 3 | 2 |
| 4 | Inputs | `14058:4731` | 28 | 14 | 14 |
| 5 | Menús | `14058:12162` | 66 | 18 | 48 |
| 6 | Status indicators | `14058:17391` | 39 | 24 | 15 |
| 7 | Visual labels | `14058:20327` | 33 | 28 | 5 |

El prefijo `BB_*` sí decide el resultado desde el 2026-08-17: significa **Building Block** de Figma y queda fuera del inventario conectable. Los targets que sólo representan iconos también quedan fuera de alcance. Carlos gestionará sus `Skipped` directamente en Figma; el batch no los clasifica uno por uno, no espera su remediación UI y continúa con componentes públicos consumibles. Los cinco adaptadores BB ya publicados permanecen como legado hasta una auditoría de retiro separada; no se crean nuevos.

**Botones — cerrada para targets locales el 2026-08-17:** tres targets adicionales de la familia pública Card button quedaron publicados y verificados (`BB_1_6`, `BB_1_6_4`, `Card Button Small`). `BB_6_2`, `IndexLabel`, `IndexHeader`, `BB_1_9`, `BB_7_2`, `BB_1_6_2` y `BB_5_5` quedaron `Skipped` con evidencia. La consulta final devuelve únicamente 13 dependencias externas/no publicadas; no queda ningún target local de Botones sin disposición.

**Containers — lote 1 del 2026-08-17:** `AI Chat bar` (`413:72922`) quedó publicado como target adicional de `BmbChatBarComponent`; `Loading` es la única propiedad con correspondencia pública inequívoca (`isLoading`). `BotIcon_Select` (`423:7684`) queda `Internal/helper`: su estado Selected/Enabled/Hover pertenece a la composición de AI Chat bar y `BmbBotIconComponent` ni siquiera es export público. `Template_BoxTable` (`62:10544`) queda `Internal/helper`: es una celda configurable utilizada por `Template_RowTable`, no una tabla Angular independiente. Containers continúa activa con 76 targets locales pendientes de disposición tras este lote (78 todavía sin mapping).

**Containers — lote 2 del 2026-08-17:** los tres siguientes targets por uso quedaron `Internal/helper`. `Slot` (`12879:134374`) es el placeholder genérico de contenido —incluye el texto de autoría “Change me for a component”— usado por grids, Modal, Card button y otros padres ya conectados; no representa una API Angular. `BB_2_18` (`1486:108383`) es la fila interna de la familia ya conectada Notification card y sus estados/preview/checkbox no constituyen un componente público independiente. `BB_2_10` (`61:9376`) es el status-bar visual de iPhone compuesto dentro de Header mobile, Inner header, Calendar y Login onboarding; sus variantes no tienen selector ni export Angular. Containers continúa activa con 73 targets locales pendientes de disposición (78 todavía sin mapping).

**Containers — lote 3 del 2026-08-17:** `BB_2_11_5` (`62:9606`), `BB_2_11` (`62:9636`) y `BB_2_12_3` (`474:96299`) quedaron `Internal/helper`. Son, respectivamente, encabezado de agrupación temporal, contenido interno de Hito card y encabezado compartido de Gcard; sus padres públicos Hito list, Hito card, Timestream, Home/Profile/AI Chat card ya representan la API consumible. Containers continúa activa con 70 targets locales pendientes de disposición (78 todavía sin mapping).

**Containers — lote 4 del 2026-08-17:** `Generic card` (`99:28392`) quedó publicado y verificado contra `BmbCardComponent`, incluyendo su SLOT genuino sólo en las ocho variantes Inner Slot y `Style → type` para Primary/Secondary; los estilos de composición sin equivalente conservan `normal`. `BB_2_8` (`99:31713`) es la cuadrícula interna de slots usada por múltiples padres, y `BB_8_4_2` (`474:94211`) es el marcador día/mes de Calendar/Timestream; ambos quedan `Internal/helper`. Containers continúa activa con 67 targets locales pendientes de disposición (77 todavía sin mapping).

**Containers — reconciliación de interfaz del 2026-08-17:** una lectura nueva de `get_code_connect_suggestions` devuelve **114** targets únicos todavía sin conexión: **77 locales publicados** por Bamboo y **37 dependencias externas/no pertenecientes al inventario de esta librería**. Entre los 77 locales hay **13 targets previamente diagnosticados pero todavía visibles como no conectados** y **64 sin triage**. Esto reemplaza el supuesto de que una disposición local `Internal/helper` equivalía a resolver la fila. La cifra `84 not connected` mostrada por la interfaz usa su propio alcance/filtrado y no debe reconciliarse por resta con el resultado MCP; ambos coinciden en que Containers no está cerrada.

**Containers — lote 5 del 2026-08-17:** `BB_2_11_2` (`62:9624`) quedó publicado como adaptador `nestable` de `BmbBadgeComponent`. Sus seis estados producen apariencias y textos públicos canónicos: Pendiente/normal, Iniciado/strong, En revisión/warning, Finalizado/success, Cancelado/error y Lorem Ipsum/strong. MCP verificó `hasTemplate: true` en las seis variantes y el target desapareció de sugerencias. `BB_2_11_3` (`62:9618`) es únicamente el bloque de descripción/duración del Hito card y `BB_2_11_4` (`62:9612`) únicamente su marcador activo; mapearlos como cards o badges completos sería falso.

**Containers — prueba autónoma de `Skipped` del 2026-08-17:** `BB_2_11_3` (`62:9618`) fue marcado `Skipped` desde la interfaz de Code Connect. Figma mostró el estado `Skipped` y el MCP respondió que la selección ya no necesita mappings. Containers queda con **112** sugerencias: **75 locales**, de los cuales **14 tienen diagnóstico y requieren `Skipped` en UI** y **61 continúan sin triage**, más 37 dependencias externas.

**Containers — lote autónomo de `Skipped` 1 del 2026-08-17:** `BB_2_11_4` (`62:9612`), `BB_2_11_5` (`62:9606`) y el helper compartido `BB_6_2` (`151:38706`) fueron marcados `Skipped` después de registrar su evidencia. La interfaz mostró `Skipped` para los tres y sus consultas MCP exactas devolvieron “No additional mappings needed”. Containers queda con **109** sugerencias: **72 locales**, de los cuales **11 ya tienen diagnóstico pendiente de remediación UI** y **61 continúan sin triage**, más 37 dependencias externas. El skip global de `BB_6_2` también reduce Botones a 19 sugerencias: 6 locales y 13 externas.

**Containers — lote autónomo de `Skipped` 2 del 2026-08-17:** `BotIcon_Select` (`423:7684`), `Template_BoxTable` (`62:10544`) y `Slot` (`12879:134374`) quedaron `Skipped` con evidencia previa. La interfaz confirmó los tres estados; MCP dejó de devolver esos IDs exactos, aunque las selecciones de los dos primeros todavía muestran descendientes independientes que deberán resolverse por separado. Containers queda con **106** sugerencias: **69 locales**, de los cuales **8 ya tienen diagnóstico pendiente de remediación UI** y **61 continúan sin triage**, más 37 externas. Como `Slot` es infraestructura compartida, también desapareció de Imágenes, Inputs, Menús, Status indicators y Visual labels; Botones no cambió.

**Containers / Search Card — cierre dirigido del 2026-08-17:** `HomeCard_Mobile` (`523:213638`) quedó publicado como target secundario de `BmbHomeCardComponent`, con título visible e `[isMobile]="true"`. El mapping de `Search Card` (`9038:61107`) ahora emite el título visible y `[isLoading]` únicamente para `Empty (loading)`; no inventa resultados ni API móvil. `Search Card Item` y `Search Section` quedaron `Skipped` porque son implementación interna del arreglo público `results`. Junto con los seis helpers compartidos de Botones, la selección Containers queda en una lectura final de **87** sugerencias: **50 locales** y **37 externas**.

**Containers — reanudación posterior a la regla BB/icon del 2026-08-17:** `List item with actions` (`1643:64262`) quedó publicado como target secundario `nestable` de `BmbListGroupItemComponent`. `Text` alimenta `headerText`, `State=Disabled` alimenta `isDisabled` y `State=Selected` alimenta `isActive`; Hover permanece visual. El `id="list-group-item-1"` y `[personalizedTemplate]="false"` provienen de la story canónica. MCP confirmó `hasTemplate: true` y el source `ui-angular` en las cuatro variantes. La lectura posterior devuelve **63** sugerencias: **28 targets locales** y **35 dependencias externas/no publicadas**. Entre los locales restantes predominan `BB_*`, iconos, slots/prototipos/layout helpers; `AI Chat Card` conserva el contrato `CHAT-01`. No queda otro target público directo confirmado en este snapshot.

**Containers — cierre aproximado de `CHAT-01` del 2026-08-17:** `AI Chat Card` (`9268:46409`) quedó publicado y verificado contra `BmbHomeCardChatComponent`. El snippet usa el título canónico de Storybook `Asistente TECbot`, mapea `Web|Mobile → isMobile` y satisface el input requerido con la colección type-safe `[messagesHistory]="[]"`. No convierte la burbuja visual interna en un objeto `IBmbChatMessage`, porque Figma no expone un contrato de datos y Angular exige `time: Date`; el título anidado tampoco es una propiedad semántica de la raíz. MCP confirmó `hasTemplate: true` en Web y Mobile, label Angular y source `ui-angular`. Containers queda en **62** sugerencias: **27 locales** y **35 externas**. Ya no queda ningún componente público directo o `Contract required` dentro de esta sección; los 27 locales visibles son BB/building blocks o helpers/prototipos/layout sin API independiente.

**Imágenes — target público conectado y referencia stale detectada el 2026-08-17:** el component set vigente `Image Carrousel` (`9258:67822`, resuelto por component key) quedó publicado como target secundario compuesto de `BmbCarouselComponent`. `Slide=Default|2|3` mapea a `selectedIndex=0|1|2`, y sus tres instancias ya conectadas de `BmbImageComponent` se proyectan dinámicamente dentro de elementos `#carouselItem`. MCP confirmó `hasTemplate: true` y snippets completos en las tres variantes. La sección todavía devuelve cinco sugerencias porque conserva una instancia del nodo histórico inválido `9034:46087`; esa fila no puede publicarse por CLI y requiere reemplazarla por el set vigente o marcarla `Skipped`. Las otras cuatro filas son dos BB y dos iconos externos.

**Inputs — conciliación siguiente:** la consulta actual devuelve **28** sugerencias: **14 locales** y **14 externas**. El único nombre público aparente, `Phone number` (`109:37835`), es otra referencia no persistente; su set estable `109:37834` ya está conectado y verificado. No se publica un duplicado contra un nodo inválido. Los demás locales son `BB_*`, `ProgressBar_Full` (cuyo set real es BB) o `SlotRow`.

**Menús / Status indicators — lote público del 2026-08-17:** `Sidebar mobile` (`299:51512`) quedó publicado como target secundario de `BmbSidebarComponent`, y el mapping principal `Sidebar` (`299:51502`) dejó de ser una fachada vacía: ambos muestran la receta de dos grupos documentada por Storybook. `Loading screen` (`152:38092`) quedó conectado a `BmbLoaderComponent` con el texto visible fijo `Cargando...`; el antiguo bloqueo basado únicamente en `Loader_Icon` queda resuelto porque apareció el parent semántico estable. MCP confirmó `hasTemplate: true`, label Angular y source `ui-angular` en los tres targets. La conciliación nueva devuelve **66** sugerencias en Menús (18 locales, 48 externas) y **44** en Status indicators (29 locales, 15 externas). `Breadcrumb_topBar`, `LocalNavigation` y `PageLink_2` resuelven a sets `BB_5_3_*`; `Sidebar mobile - pull` es icon-only. Conforme al alcance vigente no reciben mappings falsos.

**Status indicators — familia Skeleton del 2026-08-17:** el export público `BmbSkeletonComponent` y su Storybook `Dev tools/Skeleton` definen exactamente seis valores de `type`: `header`, `input`, `stray`, `generic1`, `generic2` y `generic3`. Los seis targets publicados equivalentes quedaron conectados con snippets directos; el set que la sección presenta como `Skeleton_Generic3` conserva internamente el nombre `Skeleton_Container2`, pero su screenshot y sus dos frames corresponden a la estructura `generic3`. MCP confirmó `hasTemplate: true` y source `ui-angular` para todos. Status indicators queda en **39** sugerencias: **24 locales** y **15 externas**; las cuatro piezas `Skeleton_Container`, `Skeleton_Headline` y dos `Skeleton_Circle/Item` son implementación interna y no se conectan como componentes completos.

## Disposiciones `Skipped` verificadas en Figma

Esta tabla registra sólo cambios ejecutados y verificados en la interfaz. Un diagnóstico local no entra aquí hasta que Figma muestre `Skipped` y el MCP deje de devolver el target como no conectado.

| Sección | Target | Nodo | Evidencia | Verificación |
| --- | --- | --- | --- | --- |
| Containers | `BB_2_11_3` | `62:9618` | Bloque interno de descripción/duración de `BmbHitoCardComponent`; no existe selector o export Angular público independiente. | UI `Skipped`; `get_code_connect_suggestions(62:9618)` devolvió “No additional mappings needed”. |
| Containers | `BB_2_11_4` | `62:9612` | Marcador Neutral/Active del Hito card; sus únicos estados corresponden a la presentación de `enable_bullet`/`is_active` del padre. | UI `Skipped`; `get_code_connect_suggestions(62:9612)` devolvió “No additional mappings needed”. |
| Containers | `BB_2_11_5` | `62:9606` | Encabezado temporal generado por `BmbHitoListComponent`; no existe selector o export Angular público independiente. | UI `Skipped`; `get_code_connect_suggestions(62:9606)` devolvió “No additional mappings needed”. |
| Containers / Botones | `BB_6_2` | `151:38706` | Indicador visual compartido por Badge, Legend, paginadores y otros padres; no existe una API Angular independiente. | UI `Skipped`; `get_code_connect_suggestions(151:38706)` devolvió “No additional mappings needed”. |
| Containers | `BotIcon_Select` | `423:7684` | Estado visual Selected/Enabled/Hover dentro de AI Chat bar; el `BmbBotIconComponent` legado no es export público ni expone esos estados. | UI `Skipped`; el ID `423:7684` desapareció de su consulta MCP exacta. `BotIcon_Round` y `BotIcon_Transparent` siguen como targets independientes. |
| Containers | `Template_BoxTable` | `62:10544` | Plantilla de celda polimórfica; no equivale a los componentes públicos de tabla completa. | UI `Skipped`; el ID `62:10544` desapareció de su consulta MCP exacta. Sus descendientes aún no conectados permanecen en la cola por separado. |
| Compartido: Containers, Imágenes, Inputs, Menús, Status indicators y Visual labels | `Slot` | `12879:134374` | Placeholder genérico de autoría reutilizado por composiciones no relacionadas; no tiene selector Angular propio. | UI `Skipped`; `get_code_connect_suggestions(12879:134374)` devolvió “No additional mappings needed”. |
| Botones / Containers | `IndexLabel` | `6:4830` | Índice documental sin propiedades ni API Angular consumible. | UI `Skipped`; la consulta exacta devolvió “No additional mappings needed”. |
| Botones / Containers | `IndexHeader` | `8:4130` | Encabezado documental; sus hijos públicos ya tienen conexión propia. | UI `Skipped`; el target desapareció de la consulta exacta, que conserva únicamente su icono externo. |
| Botones | `BB_1_9` | `20:3163` | Helper estático de texto/icono sin selector o export Angular independiente. | UI `Skipped`; el target desapareció de la consulta exacta, que conserva únicamente `Icon_base` externo. |
| Botones | `BB_7_2` | `152:47817` | Etiqueta de score interna de Grade value; el padre representa la API pública. | UI `Skipped`; la consulta exacta devolvió “No additional mappings needed”. |
| Botones | `BB_1_6_2` | `16:1013` | Carrier visual de relleno/tamaño para Card button; no es una API pública. | UI `Skipped`; el target desapareció y sus descendientes publicados permanecen independientes. |
| Botones | `BB_5_5` | `109:35204` | Fila interna de búsqueda/dropdown; estados visuales sin selector público. | UI `Skipped`; el target desapareció de la consulta exacta, que conserva únicamente su icono externo. |
| Containers / Search Card | `Search Card Item` | `9038:60994` | Implementación interna no exportada; el padre público recibe `IBmbSearchCardItemResult[]`. | UI `Skipped`; el target desapareció de la consulta exacta y sus dependencias independientes permanecen visibles. |
| Containers / Search Card | `Search Section` | `9039:46220` | Agrupación interna derivada de `results`; no existe selector/export público. | UI `Skipped`; el target desapareció de la consulta exacta y sus dependencias independientes permanecen visibles. |

Los contratos conocidos siguen vigentes como cola secundaria en [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md):

| ID | Alcance | Exports | Bloqueo mínimo |
| --- | --- | ---: | --- |
| `COL-01` | `list-group` | 1 | `action-menu`, `list-items`, `list-group-item` y `card-button` ya están conectados; falta un outer Figma que represente el contenedor Angular. |
| `PROFILE-01` | `user-profile` | 1 | Nodo estable con contrato para `userInfo`. |

## Fuentes y límites

| Rol | Fuente | Regla |
| --- | --- | --- |
| Angular vigente | GitHub `develop`, entrada pública `ui-angular/src/index.ts` | Es la fuente de verdad para exports, selectores e inputs. La migración se auditó contra SHA `94e14c2ca61c9cf011a017335f6c710d1cb5e777`. |
| Storybook Angular | `https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com` + `/index.json` + `ui-angular/src/lib/**/*.stories.ts` | Fuente de verdad de uso: stories, `args`, fixtures, proyección y composiciones que los consumidores arman manualmente. El source Angular prevalece para tipos y API pública. |
| Figma de publicación | Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` | Único destino permitido para contratos y Code Connect. |
| Documentación Bamboo | `LYk8AJb5RjQhRfPmRIdEQ9` | Evidencia de anatomía, uso y composición; no sustituye al target maestro de Components. |
| Evidencia de producto | MiTec `Jf8Nd71tihhPZdv9xm6PnN`, desde `15686:164499` | Sirve para probar composiciones reales; sus instancias no son destinos persistentes. |
| Rama de trabajo | `code-connect-v1.6.4-b` | Editar, commitear y subir únicamente `code-connect-batch/`. |

## Flujo operativo

La ejecución autónoma usa un Goal persistente y el heartbeat `bamboo-code-connect-contract-monitor` como watchdog cada 30 minutos. El lock local fuera de Git vive en `/Users/csolares/Documents/5 - CODEX/tec.design/Codebase/.codex-locks/bamboo-code-connect.lock`: si está vigente, ningún segundo ciclo escribe; sólo un lock con más de 120 minutos y sin Goal activo puede recuperarse. Cada ciclo procesa hasta tres targets y deja estado durable en este archivo y `DECISIONS.md`.

La estrategia es **Figma-first para inventario y Storybook-first para resolver**. Figma decide qué target sigue pendiente; Storybook demuestra la receta canónica y Angular confirma que el selector, inputs y tipos son públicos. El MCP oficial de Storybook no se instala en este lote porque sus manifests/herramientas de documentación siguen soportando sólo React; para Angular se usa el `index.json` publicado, el source de las stories y su render en Chromatic. Esta limitación no detiene el batch y no cambia el mecanismo de publicación, que sigue siendo Figma Code Connect.

1. Seleccionar la primera sección incompleta de la tabla anterior y enumerar sus targets publicados sin mapping desde Figma MCP.
2. Resolver primero el target principal; después sus hijos publicados configurables. No marcar la sección completa mientras Figma siga mostrando un target local como `not connected`: debe quedar `Connected` verificado o `Skipped` explícito.
3. Buscar el target/familia en el `index.json` de Storybook; leer la story canónica (`component`, `args`, `render`, decoradores/MDX) y revisar el render cuando la composición sea manual o ambigua.
4. Confirmar después el export Angular público, selector/directiva, source, inputs, outputs y tipos. Storybook prueba el uso; Angular autoriza los atributos; ninguno sustituye al nodo estable de Figma.
5. Excluir de inmediato `BB_*` e icon-only targets; Carlos maneja sus `Skipped` en Figma. No detener la secuencia ni crear mappings para ellos. Los demás helpers no-BB se resuelven por evidencia y los componentes públicos deben quedar `Connected` y verificados.
6. Si el snippet requiere arrays, objetos, `Date`, servicio o proyección sin SLOT, usar sólo una fixture neutral documentada por Storybook cuando sea suficiente y fiel; en caso contrario registrar `Contract required` y continuar.
7. Registrar en `DECISIONS.md` la relación `Figma node -> Story ID/file -> Angular export/selector -> disposición`.
8. Crear o actualizar exclusivamente parserless `.figma.ts` dentro de esta carpeta, siguiendo [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md).
9. Ejecutar `parse --verbose`; publicar sin `--dry-run`, sin `--force`; verificar `hasTemplate: true` con Figma MCP.
10. Sólo después de verificar: actualizar [INVENTORY.md](INVENTORY.md), esta tabla, [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) cuando aplique y [DECISIONS.md](DECISIONS.md).

El token se carga desde el `.env` del checkout histórico sin imprimirlo. El CLI oficial fijado para este lote es:

```text
/Users/csolares/.npm/_npx/a937c69819479768/node_modules/.bin/figma
```

## Mapa documental

### Documentos activos

| Archivo | Propósito |
| --- | --- |
| [README.md](README.md) | Estado, conteos, prioridades y flujo vigente. |
| [INVENTORY.md](INVENTORY.md) | Registro completo de mappings publicados y su evidencia MCP. |
| [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) | Cola secundaria de contratos, composiciones y bloqueos que surjan del barrido Figma-first. |
| [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md) | Contrato técnico Figma → Angular y reglas de snippets. |
| [DECISIONS.md](DECISIONS.md) | Bitácora append-only. Sus entradas antiguas pueden estar reemplazadas por decisiones posteriores. |

### Anexos especializados

| Archivo | Propósito |
| --- | --- |
| [V1_6_4_B_MIGRATION.md](V1_6_4_B_MIGRATION.md) | Evidencia de migración, parse y republicación. |
| [SOURCE_PATH_MIGRATION.md](SOURCE_PATH_MIGRATION.md) | Manifest completo de rutas antiguas → `ui-angular`. |
| [REMOTE_API_AUDIT.md](REMOTE_API_AUDIT.md) | Revalidación de API contra GitHub remoto. |
| [CODEBASE_INVENTORY.md](CODEBASE_INVENTORY.md) | Método y snapshot del inventario inverso. |
| [BB_ADAPTERS.md](BB_ADAPTERS.md) | Registro de los cuatro adaptadores internos admitidos. |
| [COMPOSITION_REMEDIATION.md](COMPOSITION_REMEDIATION.md) | Deuda de calidad de mappings ya publicados; no es inventario de desconectados. |
| [BB_RETROACTIVE_AUDIT.md](BB_RETROACTIVE_AUDIT.md) | Evidencia del audit retroactivo de fachadas/composición. |

### Snapshots históricos — no usar como cola activa

- [REMAINING_COMPONENTS.md](REMAINING_COMPONENTS.md)
- [CONTRACT_IMPLEMENTATION_BACKLOG.md](CONTRACT_IMPLEMENTATION_BACKLOG.md)
- [CONTRACT_STATE.md](CONTRACT_STATE.md)
- [DOCUMENTATION_WORKLIST.md](DOCUMENTATION_WORKLIST.md)
- [HANDOFF.md](HANDOFF.md)

Estos archivos se conservan para trazabilidad y compatibilidad con enlaces antiguos. La cola vigente está consolidada en `CONTRACT_BACKLOG.md`.

## Política de actualización

- Cambiar los conteos primero aquí y después en `INVENTORY.md` sólo con evidencia verificable.
- Mover una fila del backlog únicamente después de un cambio real de Figma/API o de `hasTemplate: true`.
- Registrar evidencia granular en `DECISIONS.md`; no volver a crear listas paralelas.
- Separar siempre `publication state` de `coverage debt`: un mapping puede estar **Connected** y aun tener deuda de composición.
