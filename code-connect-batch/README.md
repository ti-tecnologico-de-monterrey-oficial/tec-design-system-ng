# Bamboo Code Connect — estado consolidado

Última conciliación: **2026-08-17**

Este archivo es la **fuente de verdad operativa** del lote. Si otro documento contradice este resumen, prevalecen este archivo y el registro detallado de [INVENTORY.md](INVENTORY.md). La evidencia histórica permanece en Git y en los anexos señalados abajo, pero no debe dirigir la automatización.

## Estado ejecutivo

| Métrica | Estado confirmado |
| --- | ---: |
| Componentes exportados por `ui-angular/src/index.ts` | 130 |
| Clases Angular con template independiente confirmado | 99 |
| Mappings públicos publicados y verificados por MCP | 107 |
| Adaptadores internos `BB_*` | 4 |
| Assets publicados en Bamboo Components | 475 |
| Targets Figma con mapping local publicado | 111 |
| Targets Figma publicados todavía sin mapping | 364 |
| Contract required | 3 |
| Parent/child composition | 14 |
| Blocked / out of scope | 14 |
| Candidatos directos abiertos en el inventario Angular-first anterior | 0 |
| Targets Figma-first pendientes de disposición explícita | 355 |

La conciliación Angular sigue siendo: **99 clases conectadas + 31 sin template independiente confirmado = 130**. Sin embargo, ésa no es la cobertura que muestra la interfaz de Figma. La librería publica 475 targets y 111 tienen mapping del lote: **23.4%**. Los dos denominadores deben mantenerse separados.

## Qué queda por hacer

La cola principal pasa a ser **Figma-first por sección**. Un export Angular conectado no cierra una sección: cada target publicado visible en ella debe quedar `Connected`, `Public candidate`, `Adapter candidate`, `Internal/helper`, `External foundation`, `Duplicate/deprecated` o `Contract required`.

Línea base MCP del 2026-08-17. `Local publicado sin mapping` cuenta targets de esta librería encontrados en la selección; `Dependencia externa/no publicada` evita confundir iconos u otros hijos con el inventario local. Las filas se traslapan y no deben sumarse como total global.

| Orden | Sección | Nodo | Únicos sin conexión observados | Local publicado sin mapping | Dependencia externa/no publicada |
| ---: | --- | --- | ---: | ---: | ---: |
| 1 | Botones | `14050:2707` | 20 | 7 | 13 |
| 2 | Containers | `14050:20207` | 116 | 79 | 37 |
| 3 | Imágenes | `14050:20466` | 12 | 8 | 4 |
| 4 | Inputs | `14058:4731` | 40 | 24 | 16 |
| 5 | Menús | `14058:12162` | 86 | 36 | 50 |
| 6 | Status indicators | `14058:17391` | 65 | 47 | 18 |
| 7 | Visual labels | `14058:20327` | 34 | 29 | 5 |

El prefijo `BB_*` no decide el resultado: puede ser un adaptador necesario para que un padre genere código útil o un detalle estrictamente visual. Debe resolverse por composición, API pública y uso real. `IndexLabel`, `IndexHeader`, prototipos, anotaciones y dependencias externas tampoco se publican por reflejo; se clasifican con evidencia.

**Botones — sección triaged el 2026-08-17:** tres targets adicionales de la familia pública Card button quedaron publicados y verificados (`BB_1_6`, `BB_1_6_4`, `Card Button Small`). Los siete locales restantes tienen disposición `Internal/helper`: `IndexLabel`, `IndexHeader`, `BB_6_2`, `BB_1_9`, `BB_7_2`, `BB_1_6_2` y `BB_5_5`. No tienen API Angular pública independiente y sus padres públicos correspondientes ya están conectados. La siguiente sección activa es Containers.

**Containers — lote 1 del 2026-08-17:** `AI Chat bar` (`413:72922`) quedó publicado como target adicional de `BmbChatBarComponent`; `Loading` es la única propiedad con correspondencia pública inequívoca (`isLoading`). `BotIcon_Select` (`423:7684`) queda `Internal/helper`: su estado Selected/Enabled/Hover pertenece a la composición de AI Chat bar y `BmbBotIconComponent` ni siquiera es export público. `Template_BoxTable` (`62:10544`) queda `Internal/helper`: es una celda configurable utilizada por `Template_RowTable`, no una tabla Angular independiente. Containers continúa activa con 76 targets locales pendientes de disposición tras este lote (78 todavía sin mapping).

Los contratos conocidos siguen vigentes como cola secundaria en [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md):

| ID | Alcance | Exports | Bloqueo mínimo |
| --- | --- | ---: | --- |
| `COL-01` | `list-group` | 1 | `action-menu`, `list-items`, `list-group-item` y `card-button` ya están conectados; falta un outer Figma que represente el contenedor Angular. |
| `PROFILE-01` | `user-profile` | 1 | Nodo estable con contrato para `userInfo`. |
| `CHAT-01` | `home-card-chat` | 1 | Factory/pipe/fixture pública que exprese `IBmbChatMessage.time: Date`; el `chat-bubble` legado ya quedó fuera de alcance. |

## Fuentes y límites

| Rol | Fuente | Regla |
| --- | --- | --- |
| Angular vigente | GitHub `develop`, entrada pública `ui-angular/src/index.ts` | Es la fuente de verdad para exports, selectores e inputs. La migración se auditó contra SHA `94e14c2ca61c9cf011a017335f6c710d1cb5e777`. |
| Figma de publicación | Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` | Único destino permitido para contratos y Code Connect. |
| Documentación Bamboo | `LYk8AJb5RjQhRfPmRIdEQ9` | Evidencia de anatomía, uso y composición; no sustituye al target maestro de Components. |
| Evidencia de producto | MiTec `Jf8Nd71tihhPZdv9xm6PnN`, desde `15686:164499` | Sirve para probar composiciones reales; sus instancias no son destinos persistentes. |
| Rama de trabajo | `code-connect-v1.6.4-b` | Editar, commitear y subir únicamente `code-connect-batch/`. |

## Flujo operativo

1. Seleccionar la primera sección incompleta de la tabla anterior y enumerar sus targets publicados sin mapping desde Figma MCP.
2. Resolver primero el target principal; después sus hijos publicados configurables. No marcar la sección completa mientras quede un target sin disposición explícita.
3. Contrastar cada target con export Angular público, source, inputs y Storybook. La búsqueda en código confirma el match; no define el universo inicial.
4. Clasificar auxiliares y dependencias sin ocultarlos. Un `BB_*` sólo se publica como adaptador parserless `nestable` cuando hace posible una composición pública real.
5. Si el snippet requiere arrays, objetos, `Date`, servicio o proyección sin SLOT, registrar `Contract required` y continuar con el siguiente target de la sección.
6. Crear o actualizar exclusivamente parserless `.figma.ts` dentro de esta carpeta, siguiendo [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md).
7. Ejecutar `parse --verbose`; publicar sin `--dry-run`, sin `--force`; verificar `hasTemplate: true` con Figma MCP.
8. Sólo después de verificar: actualizar [INVENTORY.md](INVENTORY.md), esta tabla, [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) cuando aplique y [DECISIONS.md](DECISIONS.md).

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
