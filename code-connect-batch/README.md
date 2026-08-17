# Bamboo Code Connect — estado consolidado

Última conciliación: **2026-08-17**

Este archivo es la **fuente de verdad operativa** del lote. Si otro documento contradice este resumen, prevalecen este archivo y el registro detallado de [INVENTORY.md](INVENTORY.md). La evidencia histórica permanece en Git y en los anexos señalados abajo, pero no debe dirigir la automatización.

## Estado ejecutivo

| Métrica | Estado confirmado |
| --- | ---: |
| Componentes exportados por `ui-angular/src/index.ts` | 130 |
| Clases Angular con template independiente confirmado | 94 |
| Mappings públicos publicados y verificados por MCP | 98 |
| Template publicado pendiente de visibilidad MCP | 1 (`Calendar`) |
| Adaptadores internos `BB_*` | 3 |
| Contract required | 10 |
| Parent/child composition | 13 |
| Blocked / out of scope | 12 |
| Candidatos directos abiertos | 0 |

La conciliación es: **94 clases conectadas + 36 sin template independiente confirmado = 130**. Las 36 restantes son 10 contratos + 13 composiciones padre/hijo + 12 bloqueados + Calendar pendiente. Los 98 mappings superan las 94 clases porque `StudentActivityCard` y `MobileTemplates` tienen dos destinos Figma cada uno, y Button/Button group son directivas públicas. Los tres adaptadores `BB_1_4*` no cuentan como cobertura pública.

## Qué queda por hacer

No quedan candidatos directos que puedan publicarse honestamente con la evidencia actual. La única cola activa es [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md):

| ID | Alcance | Exports | Bloqueo mínimo |
| --- | --- | ---: | --- |
| `NAV-01` | `title-content` | 1 | Design debe publicar/confirmar un nodo que represente breadcrumb + identidad/avatar + título; `Simple header` no es equivalente suficiente. |
| `COL-01` | `action-menu`, `card-button`, `list-group`, `list-items` | 4 | `list-group-item` ya está conectado; los padres restantes necesitan un `Items`/`Content` SLOT o contrato de colección real. |
| `PROFILE-01` | `user-profile` | 1 | Nodo estable con contrato para `userInfo`. |
| `CHAT-01` | `chat-bubble`, `home-card-chat` | 2 | Factory/pipe/fixture pública que exprese `IBmbChatMessage.time: Date`. |
| `TIME-01` | `timestream` | 1 | Nodo exterior estable o contrato explícito de composición. |
| `ITEM-01` | `item` | 1 | Decidir retiro definitivo o publicar un contrato para el API deprecado. |

`Calendar.figma.ts` no pertenece a ese backlog: el CLI confirmó su publicación, pero Figma MCP todavía no devuelve mappings para el component set `2640:89850`. Sólo requiere reintentar la verificación; no debe republicarse repetidamente sin evidencia nueva.

## Fuentes y límites

| Rol | Fuente | Regla |
| --- | --- | --- |
| Angular vigente | GitHub `develop`, entrada pública `ui-angular/src/index.ts` | Es la fuente de verdad para exports, selectores e inputs. La migración se auditó contra SHA `94e14c2ca61c9cf011a017335f6c710d1cb5e777`. |
| Figma de publicación | Bamboo `Q4t8qIM5fklC9I3Atc1BrZ` | Único destino permitido para contratos y Code Connect. |
| Evidencia de producto | MiTec `Jf8Nd71tihhPZdv9xm6PnN`, desde `15686:164499` | Sirve para probar composiciones reales; sus instancias no son destinos persistentes. |
| Rama de trabajo | `code-connect-v1.6.4-b` | Editar, commitear y subir únicamente `code-connect-batch/`. |

## Flujo operativo

1. Seleccionar un solo ID de [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md).
2. Confirmar nodo Bamboo estable, export Angular público y ejemplo canónico de Storybook.
3. Documentar la correspondencia exacta. Si requiere arrays, objetos, `Date`, servicio o proyección sin SLOT, detenerse en `Contract required`; no inventar datos.
4. Si se modifica Figma, hacerlo en una sola familia y validar metadata + screenshot antes de publicar la librería.
5. Crear o actualizar exclusivamente un parserless `.figma.ts` dentro de esta carpeta, siguiendo [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md).
6. Ejecutar `parse --verbose`; publicar sin `--dry-run`, sin `--force`; verificar `hasTemplate: true` con Figma MCP.
7. Sólo después de verificar: actualizar [INVENTORY.md](INVENTORY.md), [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) y [DECISIONS.md](DECISIONS.md).

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
| [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md) | Única cola de contratos, composiciones y bloqueos restantes. |
| [CODE_CONNECT_CONVENTION.md](CODE_CONNECT_CONVENTION.md) | Contrato técnico Figma → Angular y reglas de snippets. |
| [DECISIONS.md](DECISIONS.md) | Bitácora append-only. Sus entradas antiguas pueden estar reemplazadas por decisiones posteriores. |

### Anexos especializados

| Archivo | Propósito |
| --- | --- |
| [V1_6_4_B_MIGRATION.md](V1_6_4_B_MIGRATION.md) | Evidencia de migración, parse y republicación. |
| [SOURCE_PATH_MIGRATION.md](SOURCE_PATH_MIGRATION.md) | Manifest completo de rutas antiguas → `ui-angular`. |
| [REMOTE_API_AUDIT.md](REMOTE_API_AUDIT.md) | Revalidación de API contra GitHub remoto. |
| [CODEBASE_INVENTORY.md](CODEBASE_INVENTORY.md) | Método y snapshot del inventario inverso. |
| [BB_ADAPTERS.md](BB_ADAPTERS.md) | Registro de los tres adaptadores internos admitidos. |
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
