# Unificación de Code Connect — 2026-09-03

## Qué estaba pasando

Lo publicado en Figma era una mezcla de tres generaciones de publish, salida de dos ramas divergentes:

| Rama | Commits desde la base | Templates | Rutas `source` |
|------|----------------------|-----------|----------------|
| `code-connect-test` | 30 (local, desactualizada) | 106 | planas |
| `origin/code-connect-test` | al día, mergeó develop | 106 | planas |
| `origin/code-connect-v1.6.4-b` | 385, congelada el 17-ago | 125 | bajo `old/` |

`v1.6.4-b` tenía 21 templates que la línea principal nunca recibió, incluidos varios de los que el índice marcaba como bloqueados.

## La historia de `old/`

Punto que confundió dos revisiones previas:

- **17-ago** (`94e14c2`): los componentes vivían bajo `ui-angular/src/lib/components/old/` — 178 ahí, 20 planos. `v1.6.4-b` se congeló con esa convención.
- **26-ago** (`c5dc9146a`, "chore: Se eliminó la carpeta core"): la estructura se aplanó.
- **Hoy** (`origin/develop`, `origin/code-connect-test`): 194 componentes planos, 0 bajo `old/`.

**Excepción:** los *directives* sí siguen bajo `old/` (`ui-angular/src/lib/directives/old/bmb-button/…`). Solo se aplanaron los components.

Los templates traídos de `v1.6.4-b` venían con rutas `old/` y fueron reescritos a la convención actual, validando cada una contra el árbol real de esta rama.

## Colisiones resueltas

### `9268-46409` "AI Chat Card" → `HomeCardChat.figma.ts`

`AiChatCard.figma.ts` apuntaba a `BmbAIChatCardComponent`, que **no existe**: sin directorio en el repo, sin export en `ui-angular/src/index.ts`. Era la conexión publicada en Figma — un enlace muerto en Dev Mode.

Gana `HomeCardChat.figma.ts` → `BmbHomeCardChatComponent` (existe, exportado, mapeo documentado en `DECISIONS.md` como CHAT-01 con verificación MCP en ambas variantes).

**Eliminado:** `AiChatCard.figma.ts`

### `152-38092` "Loading screen" → `LoadingScreen.figma.ts`

No era colisión semántica: ambos archivos mapeaban el mismo `BmbLoaderComponent` con snippet idéntico al mismo nodo. Solo diferían en nombre de archivo y ruta. El nodo se llama literalmente "Loading screen".

**Eliminado:** `Loader.figma.ts`

## Por qué no se hizo `git merge` de ramas

`v1.6.4-b` (17-ago) todavía tenía el layout de entonces; la línea principal ya mergeó develop. Un merge de ramas habría arrastrado 2000+ archivos fuera de alcance. Se hizo un merge quirúrgico solo de `code-connect-batch/`, sobre `origin/code-connect-test` como base.

## Resultado

- **125 templates** (antes 106)
- 0 node-ids duplicados
- **0 rutas `source` rotas** — las 106 únicas validadas archivo por archivo contra el árbol de esta rama
- 4 `id` repetidos, todos legítimos (un componente Angular a varios nodos Figma): `bmb-mobile-templates` ×2, `bmb-sidebar` ×2, `bmb-skeleton` ×6, `bmb-student-activity-card` ×2
- `figma connect publish` con CLI 2.0.0: 125 documentos, exit 0, "All Code Connect files are valid"

## Contract-required: de 9 quedan 3

| Item | Estado |
|------|--------|
| `action-menu` | resuelto — `2109:71690` 16/16 → `BmbActionMenuComponent`; `6751:92478` (BB_5_1_1) 13/13 → `ActionMenuItemAdapter` |
| `timestream` | resuelto — `474:32260` 4/4 → `BmbTimestreamComponent` |
| `bmb-sidebar` | resuelto — snippet completo con `elements` (2 grupos, 8 items) |
| `home-card-chat` | resuelto — colisión desbloqueada |
| `list-group` | cerrado por proxy — el contenedor sale como wrapper en el snippet del item |
| `title-content` | **abierto** |
| `user-profile` | **abierto** — `11203:49510` sin mapear |
| `chat-bubble` | **abierto** — `IBmbChatMessage.time` tipado como `Date`, no expresable en template |
| `item` | N/A — deprecado |

Nota de nomenclatura: los nodos ricos viven bajo nombres `BB_*` dentro de frames `Components_*_Dark_Scheme`, no bajo el nombre del componente Angular. Buscar por nombre de componente da falsos negativos — así se perdió `BB_5_1_1` en revisiones anteriores.

## Pendientes

1. **Regenerar `component-index.json`** con `inventory-codebase.mjs` — sigue en 106 templates y lista como `contractRequired` cuatro items ya resueltos.
2. **2 mappings huérfanos**: `0:13` y `0:212` → `BmbTimestreamComponent` con ruta `projects/ds-ng/…` y `hasTemplate: false`. Son nodos de nivel documento, restos de un publish viejo. Requieren `figma connect unpublish` explícito por nodo.
3. **Alinear el pin del CLI**: `package.json` dice `1.3.3`; el publish se hizo con `2.0.0`.
