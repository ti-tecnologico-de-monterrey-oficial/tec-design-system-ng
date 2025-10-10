# BmbRadialComponent

## Descripción general

`BmbRadialComponent` es un componente standalone de Angular que representa un radio button avanzado, con soporte para formularios reactivos, validaciones, mensajes de ayuda y error, y atributos de accesibilidad. Permite personalizar la posición de la etiqueta, el estado de selección, el nombre, el valor y la integración con formularios, facilitando la creación de interfaces accesibles y robustas para selección única.

---

## Props / Parámetros

| Propiedad         | Tipo                               | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|------------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `id`              | `string`                           | Identificador único del radio (obsoleto, usar `inputId`)           | `''`              | No          |
| `checked`         | `boolean`                          | Estado inicial de selección                                        | `false`           | No          |
| `disabled`        | `boolean`                          | Deshabilita el radio                                               | `false`           | No          |
| `value`           | `string`                           | Valor asociado al radio                                            | `''`              | No          |
| `name`            | `string`                           | Nombre del grupo de radios                                         | `getUUID()`       | No          |
| `label`           | `string`                           | Etiqueta descriptiva                                               | `''`              | No          |
| `labelPosition`   | `IBbmSidePosition`                 | Posición de la etiqueta (`before`, `after`)                        | `'after'`         | No          |
| `ariaDescribedby` | `string`                           | ID de elemento que describe el radio (accesibilidad)               | `''`              | No          |
| `ariaLabel`       | `string`                           | Etiqueta accesible para el radio                                   | `''`              | No          |
| `ariaLabelledby`  | `string`                           | ID de elemento que etiqueta el radio (accesibilidad)               | `''`              | No          |
| `required`        | `boolean`                          | Indica si el radio es obligatorio                                  | `false`           | No          |
| `errorMessage`    | `string \| IBmbInputError`         | Mensaje(s) de error personalizado                                  | `''`              | No          |
| `helperMessage`   | `string`                           | Mensaje de ayuda adicional                                         | `''`              | No          |

### Modelos y outputs

| Propiedad/Output   | Tipo                       | Descripción                                  |
|--------------------|----------------------------|----------------------------------------------|
| `showError`        | `boolean` (model)          | Estado visual de error                       |
| `control`          | `FormControl` (model)      | Control reactivo asociado                    |
| `inputId`          | `string` (model)           | Identificador único del input                |
| `change`           | `HTMLInputElement` (output)| Se emite al cambiar el valor                 |
| `onKeyDown`        | `KeyboardEvent` (output)   | Se emite al presionar una tecla              |

---

## Ejemplo de uso

```html
<bmb-radial
  [label]="'Opción A'"
  [value]="'A'"
  [checked]="true"
  [name]="'grupoOpciones'"
  [labelPosition]="'before'"
  [required]="true"
  [helperMessage]="'Selecciona una opción'"
  [errorMessage]="'Este campo es obligatorio'"
  (change)="onRadioChange($event)"
  (onKeyDown)="onRadioKeyDown($event)"
></bmb-radial>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormControl, ReactiveFormsModule)
- `BmbInputValidatorComponent`
- Utilidades internas: `getUUID`, `assignNewFormControl`, `newFormControlByType`, `showError`
- Tipos: `IBbmSidePosition`, `IBmbInputError`

---

## Notas adicionales

- **Accesibilidad:** Soporta atributos ARIA y mensajes de ayuda/error, facilitando la navegación y comprensión para todas las personas.
- **Compatibilidad:** Funciona con formularios reactivos y template-driven, y puede integrarse en cualquier template Angular.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Validación:** Permite mostrar mensajes de error personalizados y validar el estado del radio en formularios.
- **Personalización:** Permite ajustar la posición de la etiqueta, el nombre, el valor y el estado de selección/deshabilitado.
- **Buenas prácticas:** Emite eventos desacoplados para manejar cambios y teclas, y utiliza modelos para facilitar la integración con formularios.

---
