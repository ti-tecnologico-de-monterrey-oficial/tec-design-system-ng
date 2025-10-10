# BmbInputTagsComponent

## Descripción general

`BmbInputTagsComponent` es un componente standalone de Angular que permite a las personas seleccionar, agregar y eliminar etiquetas (tags) de una lista, con soporte para autocompletado, filtrado y validación. Está diseñado para formularios donde se requiere la selección múltiple y dinámica de valores, facilitando la interacción y la gestión eficiente de datos.

---

## Props / Parámetros

| Propiedad          | Tipo                             | Descripción                                              | Valor por defecto                       | Obligatorio |
| ------------------ | -------------------------------- | -------------------------------------------------------- | --------------------------------------- | ----------- |
| `errorMessage`     | `string \| IBmbInputError`       | Mensaje(s) de error personalizado                        | `''`                                    | No          |
| `tooltip`          | `string`                         | Texto de ayuda adicional (tooltip)                       | `''`                                    | No          |
| `tooltipPosition`  | `IBmbInputTooltipPosition`       | Posición del tooltip                                     | `{ align: 'above', justify: 'before' }` | No          |
| `label`            | `string`                         | Etiqueta descriptiva del campo                           | `''`                                    | No          |
| `placeholder`      | `string`                         | Texto de ayuda dentro del campo                          | `''`                                    | No          |
| `isRequired`       | `boolean`                        | Indica si el campo es obligatorio                        | `false`                                 | No          |
| `helperMessage`    | `string`                         | Mensaje de ayuda adicional                               | `''`                                    | No          |
| `disabled`         | `boolean`                        | Deshabilita el campo                                     | `false`                                 | No          |
| `maxSelectedItems` | `number`                         | Máximo de elementos seleccionados (obsoleto)             | -                                       | No          |
| `name`             | `string`                         | Nombre del campo                                         | `getUUID()`                             | No          |
| `value`            | `string \| string[]`             | Valor inicial del campo                                  | `''`                                    | No          |
| `showError`        | `boolean`                        | Estado de error visual                                   | `false`                                 | No          |
| `inputId`          | `string`                         | Identificador único para el input                        | `name()`                                | No          |
| `customValidation` | `ValidatorFn`                    | Función de validación personalizada                      | -                                       | No          |
| `tagOptions`       | `string[] \| IBmbDropdownItem[]` | Lista de opciones disponibles para seleccionar como tags | `[]`                                    | No          |

### Outputs

| Output      | Tipo            | Descripción                              |
| ----------- | --------------- | ---------------------------------------- |
| `onKeyDown` | `KeyboardEvent` | Se emite al presionar una tecla          |
| `onChange`  | `string[]`      | Se emite al cambiar la selección de tags |

---

## Ejemplo de uso

```html
<bmb-input-tags
  [label]="'Etiquetas de interés'"
  [placeholder]="'Escribe y selecciona...'"
  [isRequired]="true"
  [helperMessage]="'Puedes agregar nuevas etiquetas'"
  [tagOptions]="['Angular', 'React', 'Vue']"
  [value]="['Angular']"
  (onChange)="handleTagsChange($event)"
  (onKeyDown)="handleKeyDown($event)"
>
</bmb-input-tags>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (ReactiveFormsModule, FormControl, ValidatorFn)
- `BmbTagComponent`
- `BmbInputValidatorComponent`
- `BmbInputContentComponent`
- `BmbDropdownContentComponent`
- `ClickOutsideDirective`
- Utilidades internas: `convertListToSelectList`, `filteredValue`, `getSelectedValues`, `getValidInitialValues`, `getUUID`, `assignNewFormControl`, `handleValidity`, `newFormControlByType`, `showError`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado, mensajes de ayuda y error, y permite agregar nuevas etiquetas fácilmente.
- **Compatibilidad:** Funciona con formularios reactivos de Angular y permite integración sencilla en cualquier template.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado y `debounceTime` para mejorar la experiencia de filtrado.
- **Personalización:** Permite agregar nuevas opciones dinámicamente y configurar validaciones personalizadas.
- **Consideraciones:** El componente gestiona correctamente la selección múltiple, el filtrado y la eliminación de etiquetas, asegurando una experiencia fluida y eficiente.

---
