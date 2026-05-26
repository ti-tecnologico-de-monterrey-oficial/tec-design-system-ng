# BmbLoginComponent

## Descripción general

`BmbLoginComponent` es un componente standalone de Angular diseñado para gestionar el proceso de autenticación de personas en la plataforma. Ofrece una interfaz configurable para el inicio de sesión, recuperación de contraseña y acceso como invitado, integrando opciones de personalización visual y funcional. Permite emitir eventos para manejar el flujo de autenticación y recordar credenciales, facilitando la integración con servicios de perfil y lógica de negocio.

---

## Props / Parámetros

| Propiedad                 | Tipo                    | Descripción                                                  | Valor por defecto             | Obligatorio |
| ------------------------- | ----------------------- | ------------------------------------------------------------ | ----------------------------- | ----------- |
| `headerLabel`             | `string`                | Etiqueta principal del encabezado                            | `'ESTUDIANTES'`               | No          |
| `forgottenPasswordLabel`  | `string`                | Texto para el enlace de recuperación de contraseña           | `'¿Olvidaste tu contraseña?'` | No          |
| `forgottenPasswordLink`   | `string`                | URL para recuperación de contraseña                          | `''`                          | No          |
| `forgottenPasswordTarget` | `IBmbTargetLink`        | Destino del enlace de recuperación (`_blank`, `_self`, etc.) | `'_blank'`                    | No          |
| `showRememberMeCheckbox`  | `boolean`               | Muestra el checkbox "Recordarme"                             | `false`                       | No          |
| `rememberMeCheckboxLabel` | `string`                | Etiqueta para el checkbox "Recordarme"                       | `'Recordarme'`                | No          |
| `showLoginAsGuest`        | `boolean`               | Muestra la opción de acceso como invitado                    | `false`                       | No          |
| `loginAsGuestLabel`       | `string`                | Etiqueta para el acceso como invitado                        | `'Entrar como invitado'`      | No          |
| `loginAsGuestLink`        | `string`                | URL para acceso como invitado                                | `''`                          | No          |
| `loginAsGuestTarget`      | `IBmbTargetLink`        | Destino del enlace de invitado (`_blank`, `_self`, etc.)     | `'_blank'`                    | No          |
| `buttonLabel`             | `string`                | Texto del botón principal de login                           | `'Ingresar'`                  | No          |
| `actionHeaderLinks`       | `IBmbActionHeaderLinks` | Acciones adicionales en el encabezado                        | -                             | No          |
| `actionHeaders`           | `IBmbActionHeader[]`    | Acciones adicionales (obsoleto)                              | `[]`                          | No          |

### Outputs

| Output                | Tipo   | Descripción                                    |
| --------------------- | ------ | ---------------------------------------------- |
| `onRequest`           | `any`  | Se emite al solicitar autenticación            |
| `onContinue`          | `void` | Se emite al continuar después de autenticación |
| `onRememberMeChecked` | `any`  | Se emite al marcar/desmarcar "Recordarme"      |

---

## Ejemplo de uso

```html
<bmb-login
  [headerLabel]="'Acceso a la plataforma'"
  [forgottenPasswordLabel]="'¿Olvidaste tu contraseña?'"
  [forgottenPasswordLink]="'/recuperar'"
  [forgottenPasswordTarget]="'_self'"
  [showRememberMeCheckbox]="true"
  [rememberMeCheckboxLabel]="'Recordar sesión'"
  [showLoginAsGuest]="true"
  [loginAsGuestLabel]="'Entrar como invitado'"
  [loginAsGuestLink]="'/invitado'"
  [loginAsGuestTarget]="'_self'"
  [buttonLabel]="'Ingresar'"
  (onRequest)="handleLogin($event)"
  (onContinue)="handleContinue()"
  (onRememberMeChecked)="handleRememberMe($event)"
>
</bmb-login>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/forms` (FormGroup)
- `BmbButtonDirective`
- `BmbHeaderMitecComponent`
- `BmbLoginContentComponent`
- Servicio: `BmbUserProfileService`
- Tipos: `IBmbActionHeaderLinks`, `IBmbActionHeader`, `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta etiquetas descriptivas, navegación por teclado y opciones para recordar credenciales, facilitando el acceso para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar enlaces y acciones según el contexto de autenticación.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Gestión de estado:** Emite eventos para manejar el flujo de autenticación y actualizar el perfil de la persona tras el login.
- **Personalización:** Permite configurar textos, enlaces y acciones para adaptarse a diferentes escenarios de acceso y seguridad.

---
