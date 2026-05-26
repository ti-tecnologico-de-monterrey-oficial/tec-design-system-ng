# BmbInputPhoneNumberComponent

## Descripción general

`BmbInputPhoneNumberComponent` es un componente standalone de Angular diseñado para capturar números telefónicos internacionales de manera segura y validada. Permite seleccionar el país, muestra la lada correspondiente y valida el formato del número según el país seleccionado. Está pensado para formularios donde la precisión y la experiencia de la persona son clave, integrando validaciones personalizadas y mensajes de error claros.

---

## Props / Parámetros

| Propiedad            | Tipo                       | Descripción                               | Valor por defecto                       | Obligatorio |
| -------------------- | -------------------------- | ----------------------------------------- | --------------------------------------- | ----------- |
| `label`              | `string`                   | Etiqueta descriptiva del campo            | `''`                                    | No          |
| `name`               | `string`                   | Nombre del campo                          | `getUUID()`                             | No          |
| `value`              | `string`                   | Valor inicial del campo                   | `''`                                    | No          |
| `isRequired`         | `boolean`                  | Indica si el campo es obligatorio         | `false`                                 | No          |
| `tooltip`            | `string`                   | Texto de ayuda adicional (tooltip)        | `''`                                    | No          |
| `tooltipPosition`    | `IBmbInputTooltipPosition` | Posición del tooltip                      | `{ align: 'above', justify: 'before' }` | No          |
| `defaultLada`        | `string`                   | Lada por defecto (obsoleto)               | `'+52'`                                 | No          |
| `defaultCountryCode` | `string`                   | Código de país por defecto                | `'mx'`                                  | No          |
| `placeholder`        | `string`                   | Texto de ayuda dentro del campo           | `''`                                    | No          |
| `appearance`         | `IBmbInputAppearance`      | Apariencia visual (obsoleto)              | `'normal'`                              | No          |
| `errorMessage`       | `string \| IBmbInputError` | Mensaje(s) de error personalizado         | `''`                                    | No          |
| `disabled`           | `boolean`                  | Deshabilita el campo                      | `false`                                 | No          |
| `inputId`            | `string`                   | Identificador único para el input         | `name()`                                | No          |
| `helperMessage`      | `string`                   | Mensaje de ayuda adicional                | `''`                                    | No          |
| `preferredCountries` | `string[]`                 | Lista de países preferidos para selección | `['mx']`                                | No          |
| `onlyCountries`      | `string[]`                 | Lista de países permitidos para selección | `[]`                                    | No          |
| `customValidation`   | `ValidatorFn`              | Función de validación personalizada       | -                                       | No          |

### Modelos internos

| Modelo      | Tipo          | Descripción                       | Valor por defecto |
| ----------- | ------------- | --------------------------------- | ----------------- |
| `control`   | `FormControl` | Control reactivo principal        | Nuevo FormControl |
| `showError` | `boolean`     | Estado de error visual (obsoleto) | `false`           |

---

## Ejemplo de uso

```html
<bmb-input-phone-number
  [label]="'Teléfono de contacto'"
  [name]="'telefono'"
  [isRequired]="true"
  [defaultCountryCode]="'mx'"
  [placeholder]="'Ingresa tu número'"
  [preferredCountries]="['mx', 'us', 'ar']"
  [onlyCountries]="['mx', 'us', 'ar']"
  [helperMessage]="'Incluye lada nacional'"
  [errorMessage]="'Este campo es obligatorio'"
  [disabled]="false"
  [customValidation]="miValidadorPersonalizado"
>
</bmb-input-phone-number>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormsModule, ReactiveFormsModule, FormControl, ValidatorFn)
- `BmbDropdownComponent`
- `BmbInputContentComponent`
- `BmbInputValidatorComponent`
- Utilidades internas: `countryCodes`, `buildErrorMessage`, `getCustomValidation`, `getUUID`, `assignNewFormControl`, `handleValidity`, `showError`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta mensajes de ayuda, error y navegación por teclado, mejorando la experiencia para todas las personas.
- **Compatibilidad:** Funciona con formularios reactivos y template-driven de Angular.
- **Validación:** Valida el formato del número según el país seleccionado y permite validaciones personalizadas.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite restringir la selección de países y configurar mensajes de error y ayuda.
- **Consideraciones:** Si el país por defecto no existe en la lista de países, el componente arroja un error para evitar inconsistencias.

---
