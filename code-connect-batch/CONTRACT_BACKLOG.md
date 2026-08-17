# Bamboo Code Connect — backlog consolidado

Última conciliación: **2026-08-17**

Este es el **único backlog activo**. El estado general y las reglas de ejecución están en [README.md](README.md); los mappings verificados están en [INVENTORY.md](INVENTORY.md). Los documentos `REMAINING_COMPONENTS.md`, `CONTRACT_IMPLEMENTATION_BACKLOG.md`, `CONTRACT_STATE.md` y `DOCUMENTATION_WORKLIST.md` son snapshots históricos y no deben dirigir nuevos ciclos.

## Resumen

| Disposición | Cantidad | Acción |
| --- | ---: | --- |
| Candidate | 0 | No crear fachadas para aumentar cobertura. |
| Contract required | 9 | Resolver el contrato mínimo de una familia por ciclo. |
| Parent/child composition | 13 | Mantener cubierto por el padre salvo que Design publique un API independiente. |
| Blocked / out of scope | 12 | No reintentar sin un cambio real de nodo, API o alcance. |
| Pending verification | 1 | Reconsultar Calendar por MCP; no republicar sin evidencia nueva. |

## Contratos activos (9 exports)

Orden recomendado: `COL-01`, `NAV-01`, `PROFILE-01`, `CHAT-01`, `TIME-01`, `ITEM-01`. `COL-01` tiene el mayor potencial de reutilización y evidencia real de producto; los demás dependen de una decisión más específica.

| ID | Exports | Evidencia confirmada | Contrato mínimo / decisión requerida | Estado |
| --- | --- | --- | --- | --- |
| `COL-01` | `action-menu`, `list-group`, `list-items` | `list-group-item` quedó conectado al set `List group` (`82:26226`) y `card-button` al set `Card button` (`4281:218969`). Las filas de “Mis Eventos” en MiTec (`9050:55418`, `9050:55440`) confirman que los tres exports restantes son contenedores de contenido repetible. | Exponer un `Items`/`Content` SLOT verdadero en cada padre compatible y resolver hijos con `getSlot()`/`executeTemplate()`; nunca fabricar arrays. Para `action-menu`, el slot debe producir `#actionMenuItem` o una receta Angular equivalente. | Dos componentes de la familia verificados; quedan tres contratos de colección/proyección. |
| `NAV-01` | `title-content` | `navigation-bar`, `bottom-navigation-bar`, `drawer-overlay` y `web-templates` ya están conectados. `title-content` exige título y compone breadcrumb + identidad/avatar + icono. `Simple header` no representa esa estructura. | Design publica un nodo dedicado o confirma explícitamente un target que exponga título, breadcrumb e identidad. Engineering documenta el mínimo `title`/`componentTitle`. | Requiere decisión Design/API; no hay target estable equivalente. |
| `PROFILE-01` | `user-profile` | El export exige `userInfo`; búsquedas dirigidas no encontraron un nodo Bamboo estable que modele la misma identidad. | Nodo publicado con `id`, `fullName`, imagen/alt y las propiedades públicas realmente requeridas, o una fixture Storybook neutral y oficialmente documentada. | Requiere target estable y contrato de contenido. |
| `CHAT-01` | `chat-bubble`, `home-card-chat` | Ambos consumen `IBmbChatMessage`/`IBmbChatMessage[]`; `time` es `Date`. Angular template syntax no puede expresar `new Date(...)` inline. | Engineering publica una factory/pipe/const o receta canónica importable para construir el mensaje mínimo. Figma no puede resolver este bloqueo por sí solo. | Code API required. |
| `TIME-01` | `timestream` | MiTec compone la experiencia con `Timestream card`, `Timestream Index` y `Hito list`, que ya tienen cobertura; no existe un nodo exterior estable equivalente. | Design publica un outer component semántico o confirma que `timestream` no requiere conexión independiente. Si se publica, debe exponer composición/eventos sin serializar objetos como texto. | Decisión de alcance/target. |
| `ITEM-01` | `item` | API deprecada, reemplazada por `bmb-item-[variant]` / `bmb-interactive-item-[variant]`. | Engineering confirma retiro/no conexión, o Design publica un target estable para el API legado. | Baja prioridad; decisión de deprecación. |

## Regla de implementación por contrato

Un contrato sólo pasa a implementación cuando existen las cuatro evidencias:

1. Nodo Bamboo principal, estable y publicado en `Q4t8qIM5fklC9I3Atc1BrZ`.
2. Export, selector y superficie pública confirmados en `ui-angular/src/index.ts` y su source.
3. Storybook/MDX con el ejemplo mínimo canónico.
4. Tabla exacta propiedad/SLOT Figma → API/proyección Angular, sin inferencias estructurales.

Después se puede modificar **una familia Figma por ciclo**, validar metadata + screenshot, publicar la librería y crear el `.figma.ts`. El mapping sale del backlog sólo después de `parse`, publicación sin `--force` y `hasTemplate: true` por MCP.

## Patrones permitidos

| Patrón | Contrato válido | Resultado Code Connect |
| --- | --- | --- |
| Registros repetidos | Hijo publicado + SLOT verdadero | Hijos dinámicos con `getSlot()`/`executeTemplate()`. |
| Identidad/contenido simple | TEXT/BOOLEAN/VARIANT/INSTANCE_SWAP con equivalencia pública | Atributos directos; valores neutros sólo si Storybook los documenta. |
| Proyección Angular | SLOT exterior + markup hijo documentado | Composición dinámica; nunca reconstruida desde capas visuales. |
| Estado persistente | BOOLEAN/VARIANT sólo si existe input público equivalente | Hover/focus/pressed/transiciones se omiten. |
| Servicio/objeto runtime | Factory, item público o receta importable | Snippet muestra la API soportada, no un host vacío. |

## Parent/child composition (13)

Estos exports ya están representados dentro de un padre conectado. No son trabajo activo salvo que aparezca un nodo y uso independiente.

| Export | Padre / razón |
| --- | --- |
| `accordion-simple-text` | Wrapper documentado de la familia Accordion ya conectada; renderiza `BmbAccordionComponent` y no tiene target Figma independiente confirmado. |
| `notification-counter` | Primitive interno usado por Icon/Tabs; Storybook lo clasifica como `Internals/Notification counter` y no hay target standalone confirmado. |
| `user-summary-content` | Hijo único de `user-summary`. |
| `container-button-badge` | Hijo de Container button. |
| `container-button-complex` | Hijo de Container button. |
| `container-button-complex-alternative` | Hijo de Container button. |
| `container-button-default` | Hijo de Container button. |
| `container-button-grade` | Hijo de Container button. |
| `container-button-square` | Hijo de Container button. |
| `container-button-user-image` | Hijo de Container button. |
| `multi-dot-paginator-item` | Hijo repetido del paginator conectado. |
| `native-modal` | Implementación interna del Modal conectado. |
| `top-bar-item` | Hijo repetido de Top bar, sin contrato independiente. |

## Blocked / out of scope (12)

| Export | Motivo para no reintentar |
| --- | --- |
| `bmb-card` | No hay main component canónico confirmado. |
| `bmb-external-link` | Sólo existe uso dentro de templates, no target standalone estable. |
| `bmb-form-validator` | Infraestructura basada en `FormGroup`, no componente visual. |
| `bmb-icon` | Los nodos sugeridos no fueron persistentes; falta asset contract estable. |
| `bmb-logo` | Las variantes visuales no identifican el API público de imagen/link/button. |
| `bmb-loader` | `Loader_Icon` es primitive visual, no equivalente del Loading screen público. |
| `bmb-mitec-logo-animation` | El match pertenece a otra librería/documentación. |
| `bmb-portal` | Primitive de infraestructura sin representación visual propia. |
| `bmb-skeleton` | Hay partes visuales, pero no un component set canónico. |
| `bmb-stat-counter` | Sólo existe un hijo Playground/interno. |
| `bmb-theme` | No hay target Figma publicado estable. |
| `bmb-three-cols` | Primitive de layout sin contrato visual standalone. |

## Pending verification

| Export | Figma node | Estado | Próxima acción |
| --- | --- | --- | --- |
| `calendar` | `2640:89850` | `Calendar.figma.ts` pasó parse y el CLI confirmó upload, pero MCP devuelve cero mappings. | Reconsultar `get_code_connect_map` con label `Angular`. Si sigue ausente, registrar incidente Figma; no crear otro template ni republicar en bucle. |

## Deuda de cobertura en mappings ya conectados

La cola de [COMPOSITION_REMEDIATION.md](COMPOSITION_REMEDIATION.md) no significa “sin conexión”. Sus filas están publicadas, pero el snippet puede ser una fachada limitada. Mantener dos ejes separados:

- `publication state`: Connected / Pending / Blocked.
- `coverage debt`: None / Contract required / Code API required.

Button group es la única familia remediada con adaptadores internos confirmados. El resto permanece conectado con deuda documentada; no se descuenta de los 98 mappings verificados.
