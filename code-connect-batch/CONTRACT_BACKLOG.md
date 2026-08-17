# Bamboo Code Connect — backlog consolidado

Última conciliación: **2026-08-17**

Este es el **único backlog activo**. El estado general y las reglas de ejecución están en [README.md](README.md); los mappings verificados están en [INVENTORY.md](INVENTORY.md). Los documentos `REMAINING_COMPONENTS.md`, `CONTRACT_IMPLEMENTATION_BACKLOG.md`, `CONTRACT_STATE.md` y `DOCUMENTATION_WORKLIST.md` son snapshots históricos y no deben dirigir nuevos ciclos.

## Resumen

| Disposición | Cantidad | Acción |
| --- | ---: | --- |
| Candidate | 0 | No crear fachadas para aumentar cobertura. |
| Contract required | 3 | Resolver el contrato mínimo de una familia por ciclo. |
| Parent/child composition | 14 | Mantener cubierto por el padre salvo que Design publique un API independiente. |
| Blocked / out of scope | 14 | No reintentar sin un cambio real de nodo, API o alcance. |

## Contratos activos (3 exports)

Orden recomendado: `COL-01`, `PROFILE-01`, `CHAT-01`. `COL-01` ya tiene Phase 0 y contrato exacto; los demás dependen de una decisión más específica.

| ID | Exports | Evidencia confirmada | Contrato mínimo / decisión requerida | Estado |
| --- | --- | --- | --- | --- |
| `COL-01` | `list-group` | `action-menu`, `list-items`, `list-group-item` y `card-button` están conectados. `List group` (`82:26226`) representa una fila y el source Angular confirma que el padre es un `<ul>` con `<ng-content>`. Phase 0 verificó que no existe otro outer publicado. | Crear `List group container` en la misma sección, sin tokens nuevos: tres `INSTANCE_SWAP` (`Item 1..3`) con preferred value de la fila publicada, booleanos `Show item 2/3`, `Border type=Rounded|Flush`, `Multiple selection`, `Row view` y `Show controls`. El Code Connect padre ejecutará los templates hijos dentro de `<bmb-list-group>`. | Phase 0 completo y contrato exacto; falta la mutación/publicación Figma y después Code Connect. |
| `PROFILE-01` | `user-profile` | El export exige `userInfo`. La evidencia MiTec usa `Profile card`/`User Summary`, ya representados por APIs distintas; la búsqueda exacta en Bamboo no devuelve un main component `User profile`. | Design publica el target de onboarding/perfil con `id`, `fullName` y `profilePicture`, o Engineering marca formalmente el export `Dev tools/User profile` como legado/fuera de alcance. No reutilizar `Profile card`. | Requiere target estable o decisión explícita de retiro; el objeto neutral sí está documentado en Storybook. |
| `CHAT-01` | `home-card-chat` | `AI Chat Card` (`9268:46409`) es un target estable, pero `messagesHistory` es requerido y consume `IBmbChatMessage[]`; `time` es `Date`. Angular template syntax no puede expresar `new Date(...)` inline. | Engineering publica una factory/pipe/const o receta canónica importable para construir el mensaje mínimo. Figma no puede resolver este bloqueo por sí solo. | Code API required. |

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

## Parent/child composition (14)

Estos exports ya están representados dentro de un padre conectado. No son trabajo activo salvo que aparezca un nodo y uso independiente.

| Export | Padre / razón |
| --- | --- |
| `title-content` | Storybook lo clasifica como `Internals/Title content template`; el source lo usa como hijo de Grades, Evaluation rubric, Modal/Native modal, Home card header, Inner header, Chevron title selector y External link. Sus padres públicos ya representan las superficies de producto, por lo que no requiere target principal independiente. |
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

## Blocked / out of scope (14)

| Export | Motivo para no reintentar |
| --- | --- |
| `chat-bubble` | API legada: Storybook la publica como `AI Chat bubble (deprecated)`, mientras el target estable `AI Chat bubble` (`528:59470`) ya está conectado al reemplazo público `BmbAiChatBubbleComponent`. Duplicar el mismo target produciría guía ambigua. |
| `item` | API legada y no soportada: su runtime dirige a `bmb-item-[variant]` / `bmb-interactive-item-[variant]`, y Storybook la clasifica como `Internals/Item`. Las variantes públicas modernas ya participan en la composición conectada de Action menu; no se duplica ese target para el wrapper legado. |
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

## Deuda de cobertura en mappings ya conectados

La cola de [COMPOSITION_REMEDIATION.md](COMPOSITION_REMEDIATION.md) no significa “sin conexión”. Sus filas están publicadas, pero el snippet puede ser una fachada limitada. Mantener dos ejes separados:

- `publication state`: Connected / Pending / Blocked.
- `coverage debt`: None / Contract required / Code API required.

Button group y Action menu son las dos familias remediadas con adaptadores internos confirmados. El resto permanece conectado con deuda documentada; no se descuenta de los 103 mappings verificados.
