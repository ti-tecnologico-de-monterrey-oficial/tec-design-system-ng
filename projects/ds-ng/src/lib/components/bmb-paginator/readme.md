# BmbPaginatorComponent

## Descripción general

`BmbPaginatorComponent` es un componente standalone de Angular diseñado para gestionar la paginación de listas o tablas de datos. Permite navegar entre páginas, visualizar el rango de elementos mostrados y emitir eventos al cambiar de página, facilitando la organización y exploración eficiente de grandes volúmenes de información.

---

## Props / Parámetros

| Propiedad      | Tipo     | Descripción                                                        | Valor por defecto | Obligatorio |
|----------------|----------|--------------------------------------------------------------------|-------------------|-------------|
| `totalItems`   | `number` | Número total de elementos a paginar                                | `0`               | No          |
| `itemsPerPage` | `number` | Cantidad de elementos por página                                   | `5`               | No          |
| `currentPage`  | `number` | Página actual seleccionada                                         | `1`               | No          |

### Outputs

| Output      | Tipo     | Descripción                                  |
|-------------|----------|----------------------------------------------|
| `pageChange`| `number` | Se emite al cambiar la página                |

---

## Ejemplo de uso

```html
<bmb-paginator
  [totalItems]="100"
  [itemsPerPage]="10"
  [currentPage]="1"
  (pageChange)="onPageChanged($event)"
></bmb-paginator>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`

---

## Notas adicionales

- **Accesibilidad:** El componente puede integrarse con controles de navegación por teclado y mostrar información clara sobre el rango de elementos visibles.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse con listas, tablas o grids.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar la cantidad de elementos por página y el formato de la paginación según las necesidades del proyecto.
- **Buenas prácticas:** Emite eventos desacoplados para manejar el cambio de página y calcula automáticamente el rango de elementos mostrados.

---
