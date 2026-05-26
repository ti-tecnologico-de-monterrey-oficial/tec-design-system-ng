# BmbSearchInputComponent

## Descripción general

`BmbSearchInputComponent` es un componente standalone de Angular que proporciona un campo de búsqueda con autocompletado y filtrado dinámico. Permite filtrar datos localmente o mediante peticiones al servidor, mostrando sugerencias en un dropdown interactivo. Es ideal para formularios, filtros avanzados y cualquier interfaz que requiera búsqueda rápida y selección de opciones.

---

## Props / Parámetros

| Propiedad                | Tipo       | Descripción                                          | Valor por defecto | Obligatorio |
| ------------------------ | ---------- | ---------------------------------------------------- | ----------------- | ----------- |
| `inputId`                | `string`   | Identificador único del input                        | `getUUID()`       | No          |
| `name`                   | `string`   | Nombre del campo de búsqueda                         | `getUUID()`       | No          |
| `data`                   | `string[]` | Lista de opciones para filtrar localmente            | `[]`              | No          |
| `isLoading`              | `boolean`  | Indica si está cargando datos (deshabilita el input) | `false`           | No          |
| `isServerSideFilter`     | `boolean`  | Habilita el filtrado por servidor                    | `false`           | No          |
| `placeholder`            | `string`   | Texto de ayuda dentro del campo                      | `''`              | No          |
| `serverSideFilteredData` | `string[]` | Opciones filtradas desde el servidor                 | `[]`              | No          |

### Outputs

| Output                    | Tipo      | Descripción                               |
| ------------------------- | --------- | ----------------------------------------- |
| `onValueChange`           | `string`  | Se emite al seleccionar una opción local  |
| `onServerSideFilterEvent` | `string`  | Se emite al seleccionar una opción remota |
| `onClearField`            | `boolean` | Se emite al limpiar el campo              |

---

## Ejemplo de uso

```html
<bmb-search-input
  [data]="['Angular', 'React', 'Vue']"
  [isServerSideFilter]="false"
  [placeholder]="'Buscar tecnología...'"
  (onValueChange)="handleValueChange($event)"
  (onClearField)="handleClear($event)"
></bmb-search-input>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormControl, ReactiveFormsModule)
- `rxjs` (`debounceTime`)
- `BmbDropdownContentComponent`
- `BmbInputContentComponent`
- `ClickOutsideDirective`
- Utilidades internas: `getUUID`, `convertListToSelectList`, `filteredValue`
- Tipos: `IDropdownItem`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado, proyección de contenido y mensajes de ayuda, facilitando la interacción para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta filtrado local y remoto.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y `debounceTime` para optimizar el renderizado y la experiencia de filtrado.
- **Personalización:** Permite configurar el placeholder, el modo de filtrado y las opciones de búsqueda según las necesidades del proyecto.
- **Buenas prácticas:** Emite eventos desacoplados para manejar cambios y selección, y gestiona el estado de carga y apertura del dropdown de manera eficiente.

---
