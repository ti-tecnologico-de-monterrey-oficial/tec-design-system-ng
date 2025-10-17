# BmbTotpComponent

## Descripción general

`BmbTotpComponent` es un componente standalone de Angular para la captura y validación de códigos TOTP (Time-based One-time Password). Permite ingresar códigos de autenticación en múltiples campos, soporta navegación automática entre inputs, pegado de códigos completos, validación en tiempo real y emisión de eventos al enviar el código. Es ideal para flujos de autenticación en dos pasos y sistemas que requieren verificación segura de identidad.

---

## Props / Parámetros

| Propiedad      | Tipo      | Descripción                                                        | Valor por defecto                | Obligatorio |
|----------------|-----------|--------------------------------------------------------------------|----------------------------------|-------------|
| `title`        | `string`  | Título principal del componente                                    | `'TOTP'`                         | No          |
| `subtitle`     | `string`  | Subtítulo descriptivo                                              | `'(Time-based One-time Password)'`| No          |
| `instanceId`   | `string`  | Identificador único de la instancia                                | `getUUID()`                      | No          |
| `codeError`    | `boolean` | Indica si hay error en el código ingresado                         | `false`                          | No          |
| `errorMessage` | `string`  | Mensaje de error personalizado                                     | `''`                             | No          |
| `helperText`   | `string`  | Mensaje de ayuda adicional                                         | `''`                             | No          |
| `showButton`   | `boolean` | Muestra el botón de envío                                          | `false`                          | No          |
| `buttonText`   | `string`  | Texto del botón de envío                                           | `''`                             | No          |
| `maxCode`      | `number`  | Cantidad de dígitos del código (obsoleto, usar `_maxCode`)         | `6`                              | No          |
| `disableButton`| `boolean` | Deshabilita el botón de envío                                      | `false`                          | No          |

### Outputs

| Output         | Tipo      | Descripción                                  |
|----------------|-----------|----------------------------------------------|
| `handleSubmit` | `string`  | Se emite al enviar el código TOTP            |

---

## Ejemplo de uso

```html
<bmb-totp
  [title]="'Verificación en dos pasos'"
  [subtitle]="'Ingresa el código de tu app de autenticación'"
  [codeError]="hasError"
  [errorMessage]="'Código incorrecto, intenta de nuevo.'"
  [helperText]="'El código tiene 6 dígitos.'"
  [showButton]="true"
  [buttonText]="'Verificar'"
  [disableButton]="isLoading"
  (handleSubmit)="onTotpSubmit($event)"
></bmb-totp>
```

```typescript
hasError = false;
isLoading = false;
onTotpSubmit(code: string) {
  // Validar el código recibido
}
```

---

## Dependencias

- `@angular/core` (Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener, input, output, ElementRef, computed)
- `@angular/common` (CommonModule)
- `rxjs` (Subject)
- `@angular/forms` (FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule)
- `BmbIconComponent`
- `BmbButtonDirective`
- `BmbInputContentComponent`
- `BmbContainerComponent`
- Utilidad: `getUUID`

---

## Notas adicionales

- **Accesibilidad:** El componente permite navegación por teclado entre campos, soporta pegado de códigos completos y puede integrarse con atributos ARIA para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en flujos de autenticación, registro o recuperación de cuenta.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado y señales reactivas para gestionar el estado.
- **Validación:** Cada campo valida la entrada como carácter alfanumérico y requiere que todos los campos estén completos antes de enviar.
- **Personalización:** Permite ajustar el título, subtítulo, mensajes de error y ayuda, cantidad de dígitos y mostrar/ocultar el botón de envío.
- **Buenas prácticas:** Emite eventos desacoplados al enviar el código, gestiona el foco automáticamente y limpia recursos al destruir el componente.

---
