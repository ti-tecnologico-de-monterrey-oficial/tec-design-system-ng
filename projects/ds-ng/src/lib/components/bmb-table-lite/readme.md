# BmbTableLiteComponent

## Descripción general

`BmbTableLiteComponent` es un componente standalone de Angular diseñado para mostrar tablas de datos ligeras y altamente configurables. Permite paginación (cliente/servidor), selección de filas, expansión de detalles, búsqueda, filtrado dinámico por columna y personalización visual mediante templates. Es ideal para dashboards, reportes y cualquier interfaz que requiera gestión eficiente y flexible de datos tabulares.

---

## Props / Parámetros

| Propiedad                | Tipo                                      | Descripción                                                        | Valor por defecto | Obligatorio |
|--------------------------|-------------------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `showSearch`             | `boolean`                                 | Muestra u oculta el buscador global                                | `false`           | No          |
| `pageSize`               | `number`                                  | Tamaño de página para paginación                                   | `10`              | No          |
| `totalItems`             | `number`                                  | Total de elementos (modo servidor)                                 | `0`               | No          |
| `data`                   | `any[]`                                   | Datos a mostrar en la tabla                                        | `[]`              | Sí          |
| `columns`                | `TableColum[]`                            | Definición de columnas                                             | `[]`              | Sí          |
| `config`                 | `TableConfig`                             | Configuración general (selección, expansión, paginación, acciones) | `{}`              | No          |
| `truncate`               | `boolean`                                 | Activa truncado de texto en celdas                                 | `false`           | No          |
| `lang`                   | `IBmbTableLang`                           | Idioma de la tabla (`es`, `en`)                                    | `'es'`            | No          |
| `serverSide`             | `boolean`                                 | Activa modo servidor para paginación y filtros                     | `false`           | No          |
| `filtersPosition`        | `IBmbFiltersPosition`                     | Posición de los filtros (`top`, `right`, `bottom`, `left`)         | `'top'`           | No          |
| `initialTableSelection`  | `number[]`                                | Índices de filas seleccionadas al iniciar                          | `[]`              | No          |
| `actionTemplate`         | `TemplateRef<any> \| null`                | Template personalizado para acciones                               | `null`            | No          |
| `detailTemplate`         | `TemplateRef<any> \| null`                | Template personalizado para detalles expandibles                   | `null`            | No          |

### Modelos reactivos

| Propiedad        | Tipo      | Descripción                                  |
|------------------|-----------|----------------------------------------------|
| `clearSelection` | `boolean` | Limpia la selección de filas desde fuera     |
| `currentPage`    | `number`  | Página actual seleccionada                   |
| `filtersVisible` | `boolean` | Estado visible/oculto del panel de filtros   |

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
<bmb-table-lite
  [data]="usuarios"
  [columns]="[
    { def: 'nombre', label: 'Nombre', dataKey: 'nombre', type: 'string', isFilterable: true },
    { def: 'correo', label: 'Correo', dataKey: 'correo', type: 'string', isFilterable: true },
    { def: 'fecha', label: 'Fecha', dataKey: 'fecha', type: 'date', dateFormat: 'yyyy-MM-dd', isFilterable: true }
  ]"
  [config]="{ isSelectable: true, isExpandible: true, isPaginable: true, showActions: true }"
  [showSearch]="true"
  [pageSize]="5"
  [lang]="'es'"
  [serverSide]="false"
  [filtersPosition]="'top'"
  (select)="onSelectionChange($event)"
  (clickedRow)="onRowClick($event)"
  (searchChange)="onSearch($event)"
  (filtersChange)="onFilters($event)"
  (pageChange)="onPageChange($event)"
>
</bmb-table-lite>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (ReactiveFormsModule, FormControl, FormGroup)
- `luxon` (DateTime)
- `@angular/cdk/collections` (SelectionModel)
- `BmbIconComponent`
- `BmbCheckboxComponent`
- `BmbInputComponent`
- `BmbDateRangeComponent`
- `BmbActionIconComponent`
- Tipos: `TableColum`, `TableConfig`, `IBmbTableLang`, `IBmbFiltersPosition`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco, la selección y las etiquetas ARIA para mejorar la experiencia con tecnologías asistivas. Los checkboxes y filas son accesibles por teclado.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta paginación, selección, expansión y filtrado tanto en modo cliente como servidor.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite definir templates personalizados para acciones y detalles, ajustar la posición de filtros y el idioma, y controlar la selección y paginación desde fuera.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción, utiliza métodos para gestionar filtros y paginación, y valida la configuración de columnas y datos de forma robusta.

---
