# BmbInputComponent

## Descripción general

`BmbInputComponent` es un componente standalone de Angular que encapsula la lógica y presentación de un campo de entrada avanzado. Permite gestionar diferentes tipos de input, validaciones, mensajes de ayuda y error, acciones adicionales (como copiar o mostrar/ocultar contraseña), y proyección de contenido personalizado. Está diseñado para integrarse fácilmente en formularios reactivos y mejorar la experiencia de las personas al interactuar con formularios complejos y accesibles.

---

## Props / Parámetros

| Propiedad           | Tipo                            | Descripción                                               | Valor por defecto                       | Obligatorio |
| ------------------- | ------------------------------- | --------------------------------------------------------- | --------------------------------------- | ----------- |
| `label`             | `string`                        | Etiqueta descriptiva del campo                            | `''`                                    | No          |
| `type`              | `IBmbInputType`                 | Tipo de input (`text`, `password`, `number`, `text-area`) | `'text'`                                | No          |
| `placeholder`       | `string`                        | Texto de ayuda dentro del campo                           | `''`                                    | No          |
| `icon`              | `string`                        | Icono a mostrar en el input                               | `''`                                    | No          |
| `appearance`        | `IBmbInputAppearance \| string` | Apariencia visual del input (`main`, `normal`, `simple`)  | `'normal'`                              | No          |
| `errorMessage`      | `string \| IBmbInputError`      | Mensaje(s) de error personalizado                         | `''`                                    | No          |
| `helperMessage`     | `string`                        | Mensaje de ayuda adicional                                | `''`                                    | No          |
| `disabled`          | `boolean`                       | Deshabilita el campo                                      | `false`                                 | No          |
| `isRequired`        | `boolean`                       | Indica si el campo es obligatorio                         | `false`                                 | No          |
| `name`              | `string`                        | Nombre del campo                                          | `getUUID()`                             | No          |
| `spellcheck`        | `boolean`                       | Habilita el corrector ortográfico                         | `false`                                 | No          |
| `jsonFormat`        | `boolean`                       | Valida el formato JSON                                    | `false`                                 | No          |
| `heightTextArea`    | `number`                        | Altura del área de texto                                  | -                                       | No          |
| `maxlength`         | `number`                        | Máximo de caracteres permitidos                           | -                                       | No          |
| `minlength`         | `number`                        | Mínimo de caracteres permitidos                           | -                                       | No          |
| `pattern`           | `string`                        | Patrón de validación                                      | -                                       | No          |
| `size`              | `number`                        | Tamaño del input (obsoleto)                               | -                                       | No          |
| `max`               | `number`                        | Valor máximo permitido                                    | -                                       | No          |
| `min`               | `number`                        | Valor mínimo permitido                                    | -                                       | No          |
| `id`                | `string`                        | Identificador único para el input                         | `name()`                                | No          |
| `value`             | `string`                        | Valor inicial del campo                                   | -                                       | No          |
| `autocomplete`      | `string`                        | Autocompletado del navegador                              | `'off'`                                 | No          |
| `tooltip`           | `string`                        | Texto de tooltip                                          | `''`                                    | No          |
| `rows`              | `number`                        | Número de filas para área de texto                        | `3`                                     | No          |
| `showMaxTextLength` | `boolean`                       | Muestra el máximo de caracteres permitidos                | `true`                                  | No          |
| `additionalAction`  | `IBmbAdditionalAction`          | Acción adicional (`copy`, `showHide`, `none`)             | `'none'`                                | No          |
| `tooltipPosition`   | `IBmbInputTooltipPosition`      | Posición del tooltip                                      | `{ align: 'above', justify: 'before' }` | No          |
| `isClearable`       | `boolean`                       | Permite limpiar el valor del campo                        | `false`                                 | No          |
| `customValidation`  | `ValidatorFn`                   | Función de validación personalizada                       | -                                       | No          |
| `control`           | `FormControl`                   | Control reactivo asociado                                 | Nuevo FormControl                       | No          |

### Outputs

| Output      | Tipo               | Descripción                     |
| ----------- | ------------------ | ------------------------------- |
| `isFocus`   | `boolean`          | Se emite al enfocar el input    |
| `isBlur`    | `boolean`          | Se emite al perder el foco      |
| `onChange`  | `HTMLInputElement` | Se emite al cambiar el valor    |
| `onKeyDown` | `KeyboardEvent`    | Se emite al presionar una tecla |

### Content Projection

- `customInputContent`: Permite proyectar contenido personalizado dentro del input.

---

## Ejemplo de uso

```html
<bmb-input
  [label]="'Correo electrónico'"
  [type]="'text'"
  [placeholder]="'ejemplo@correo.com'"
  [icon]="'mail'"
  [appearance]="'main'"
  [isRequired]="true"
  [errorMessage]="'Campo obligatorio'"
  [helperMessage]="'Ingresa tu correo institucional'"
  [autocomplete]="'email'"
  [additionalAction]="'copy'"
  [isClearable]="true"
  [control]="formControl"
  (isFocus)="handleFocus($event)"
  (isBlur)="handleBlur($event)"
  (onChange)="handleChange($event)"
  (onKeyDown)="handleKeyDown($event)"
>
  <ng-template #customInputContent>
    <span>Contenido adicional aquí</span>
  </ng-template>
</bmb-input>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormControl, ValidatorFn)
- `BmbInputValidatorComponent`
- `BmbInputContentComponent`
- Utilidades internas: `getUUID`, `assignNewFormControl`, `newFormControlByType`, `showError`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta estados visuales, mensajes de ayuda y error, y acciones que mejoran la experiencia para todas las personas, incluyendo navegación por teclado y control de foco.
- **Compatibilidad:** Funciona con formularios reactivos de Angular y permite integración sencilla en cualquier template.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite proyectar contenido personalizado y configurar acciones adicionales como copiar o mostrar/ocultar valores sensibles.
- **Validación:** Soporta validaciones nativas y personalizadas mediante los props `pattern`, `minlength`, `maxlength`, `min`, `max`, y funciones de validación propias.

---
