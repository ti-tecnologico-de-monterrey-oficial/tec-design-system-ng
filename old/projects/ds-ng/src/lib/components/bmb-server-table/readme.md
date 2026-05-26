# BmbServerTableComponent

## Descripción general

`BmbServerTableComponent` es un componente standalone de Angular que permite mostrar tablas de datos con paginación y carga desde el servidor. Utiliza componentes de Angular Material para la tabla, paginador y spinner de carga, facilitando la visualización, navegación y selección de filas en grandes volúmenes de información. Es ideal para dashboards, reportes y cualquier interfaz que requiera gestión eficiente de datos tabulares.

---

## Props / Parámetros

| Propiedad         | Tipo                      | Descripción                                             | Valor por defecto | Obligatorio |
| ----------------- | ------------------------- | ------------------------------------------------------- | ----------------- | ----------- |
| `columns`         | `IBmbServerTableColumn[]` | Configuración de columnas: clave y etiqueta             | `[]`              | Sí          |
| `data`            | `any[]`                   | Datos a mostrar en la tabla                             | `[]`              | Sí          |
| `totalRecords`    | `number`                  | Número total de registros (para paginación)             | `0`               | Sí          |
| `pageSize`        | `number`                  | Cantidad de registros por página                        | `10`              | No          |
| `pageSizeOptions` | `number[]`                | Opciones de tamaño de página para el paginador          | `[]`              | No          |
| `loading`         | `boolean`                 | Muestra spinner de carga mientras se obtienen los datos | `false`           | No          |

### Outputs

| Output       | Tipo     | Descripción                        |
| ------------ | -------- | ---------------------------------- |
| `pageChange` | `number` | Se emite al cambiar de página      |
| `dataChange` | `any[]`  | Se emite cuando cambian los datos  |
| `onClickRow` | `any`    | Se emite al hacer clic en una fila |

---

## Ejemplo de uso

```html
<bmb-server-table
  [columns]="[
    { key: 'nombre', label: 'Nombre' },
    { key: 'correo', label: 'Correo' },
    { key: 'estatus', label: 'Estatus' }
  ]"
  [data]="usuarios"
  [totalRecords]="100"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 50]"
  [loading]="isLoading"
  (pageChange)="onPageChange($event)"
  (dataChange)="onDataChange($event)"
  (onClickRow)="onRowSelected($event)"
></bmb-server-table>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/material/paginator` (MatPaginatorModule)
- `@angular/material/table` (MatTableModule)
- `@angular/material/progress-spinner` (MatProgressSpinnerModule)

---

## Notas adicionales

- **Accesibilidad:** Utiliza Angular Material, que incluye soporte para navegación por teclado y atributos ARIA.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse con datos dinámicos provenientes de servicios.
- **Rendimiento:** La paginación y el spinner de carga permiten gestionar grandes volúmenes de datos sin afectar la experiencia de la persona usuaria.
- **Gestión de estado:** Emite eventos para cambios de página, datos y selección de filas, facilitando la integración con lógica de negocio y servicios externos.
- **Validación:** El componente valida la configuración de columnas y muestra advertencias si están vacías o mal configuradas.

---
