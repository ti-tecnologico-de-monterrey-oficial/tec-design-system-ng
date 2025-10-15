# BmbTablesComponent

## Descripción general

`BmbTablesComponent` es un componente standalone de Angular que permite mostrar tablas de datos avanzadas con paginación, selección de filas, expansión de detalles, búsqueda, filtrado dinámico por columna, redimensionamiento de columnas y personalización visual mediante templates. Soporta tanto paginación y filtrado en cliente como en servidor, y está optimizado para grandes volúmenes de datos. Es ideal para dashboards, reportes y cualquier interfaz que requiera gestión eficiente y flexible de datos tabulares.

---

## Props / Parámetros

| Propiedad                | Tipo                                      | Descripción                                                        | Valor por defecto | Obligatorio |
|--------------------------|-------------------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `showSearch`             | `boolean`                                 | Muestra u oculta el buscador global                                | `false`           | No          |
| `showFilters`            | `boolean`                                 | Muestra u oculta el panel de filtros                               | `false`           | No          |
| `pageSize`               | `number`                                  | Tamaño de página para paginación                                   | -                 | No          |
| `totalItems`             | `number`                                  | Total de elementos (modo servidor)                                 | `0`               | No          |
| `data`                   | `any[]`                                   | Datos a mostrar en la tabla                                        | `[]`              | Sí          |
| `columns`                | `TableColum[]`                            | Definición de columnas                                             | `[]`              | Sí          |
| `actionTemplate`         | `TemplateRef<any> \| null`                | Template personalizado para acciones                               | `null`            | No          |
| `config`                 | `TableConfig`                             | Configuración general (selección, expansión, paginación, acciones) | `{}`              | No          |
| `detailTemplate`         | `TemplateRef<any> \| null`                | Template personalizado para detalles expandibles                   | `null`            | No          |
| `truncate`               | `boolean`                                 | Activa truncado de texto en celdas                                 | `false`           | No          |
| `wrap`                   | `boolean`                                 | Activa el ajuste de texto en celdas                                | `true`            | No          |
| `initialTableSelection`  | `number[]`                                | Índices de filas seleccionadas al iniciar                          | `[]`              | No          |
| `lang`                   | `'es' \| 'en'`                            | Idioma de la tabla                                                 | `'es'`            | No          |
| `clearSelection`         | `boolean` (model)                         | Limpia la selección de filas desde fuera                           | `false`           | No          |
| `serverSide`             | `boolean`                                 | Activa modo servidor para paginación y filtros                     | `false`           | No          |
| `currentPage`            | `number` (model)                          | Página actual seleccionada                                         | `0`               | No          |
| `filtersVisible`         | `boolean` (model)                         | Estado visible/oculto del panel de filtros                         | `false`           | No          |
| `filtersPosition`        | `IBmbFiltersPosition`                     | Posición de los filtros (`top`, `right`, `bottom`, `left`)         | `'top'`           | No          |

### Outputs

| Output             | Tipo                                      | Descripción                                  |
|--------------------|-------------------------------------------|----------------------------------------------|
| `select`           | `any[]`                                   | Se emite al cambiar la selección de filas    |
| `clickedRow`       | `any`                                     | Se emite al hacer clic en una fila           |
| `searchChange`     | `string`                                  | Se emite al cambiar el texto del buscador    |
| `filtersChange`    | `Record<string, any>`                     | Se emite al aplicar filtros                  |
| `searchModeChange` | `'client' \| 'server'`                    | Se emite al cambiar el modo de búsqueda      |
| `pageChange`       | `{ pageIndex: number; pageSize: number }` | Se emite al cambiar de página                |

---

## Ejemplo de uso

```html
<bmb-table
  [data]="usuarios"
  [columns]="[
    { def: 'nombre', label: 'Nombre', dataKey: 'nombre', type: 'string', isFilterable: true },
    { def: 'correo', label: 'Correo', dataKey: 'correo', type: 'string', isFilterable: true },
    { def: 'fecha', label: 'Fecha', dataKey: 'fecha', type: 'date', dateFormat: 'yyyy-MM-dd', isFilterable: true }
  ]"
  [config]="{ isSelectable: true, isExpandible: true, isPaginable: true, showActions: true }"
  [showSearch]="true"
  [showFilters]="true"
  [pageSize]="10"
  [lang]="'es'"
  [serverSide]="false"
  [filtersPosition]="'top'"
  (select)="onSelectionChange($event)"
  (clickedRow)="onRowClick($event)"
  (searchChange)="onSearch($event)"
  (filtersChange)="onFilters($event)"
  (pageChange)="onPageChange($event)"
>
</bmb-table>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (ReactiveFormsModule, FormControl, FormGroup)
- `@angular/material/paginator` (MatPaginatorModule, MatPaginator, PageEvent)
- `@angular/material/table` (MatTableModule, MatTable, MatTableDataSource)
- `@angular/material/input` (MatInputModule)
- `@angular/material/form-field` (MatFormFieldModule)
- `@angular/material/icon` (MatIconModule)
- `@angular/material/button` (MatButtonModule)
- `@angular/material/checkbox` (MatCheckboxModule)
- `@angular/material/tooltip` (MatTooltipModule)
- `@angular/animations` (trigger, state, style, transition, animate)
- `@angular/cdk/collections` (SelectionModel)
- `luxon` (DateTime)
- `BmbIconComponent`
- `BmbCheckboxComponent`
- `BmbInputComponent`
- `BmbDateRangeComponent`
- `BmbActionIconComponent`
- `BmbLayoutDirective`
- `BmbLayoutItemDirective`
- Angular core: `Renderer2`, `DomSanitizer`, `ChangeDetectorRef`, `TemplateRef`, `ElementRef`, `ViewChild`, `HostListener`, `ViewEncapsulation`, `ChangeDetectionStrategy`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco, la selección y las etiquetas ARIA para mejorar la experiencia con tecnologías asistivas. Los checkboxes y filas son accesibles por teclado.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta paginación, selección, expansión y filtrado tanto en modo cliente como servidor.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite definir templates personalizados para acciones y detalles, ajustar la posición de filtros y el idioma, y controlar la selección y paginación desde fuera.
- **Redimensionamiento:** Permite ajustar el ancho de las columnas mediante interacción con el mouse.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción, utiliza métodos para gestionar filtros y paginación, y valida la configuración de columnas y datos de forma robusta.

---
