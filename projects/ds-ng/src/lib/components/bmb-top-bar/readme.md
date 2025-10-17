# BmbTopBarComponent

## Descripción general

`BmbTopBarComponent` es un componente standalone de Angular que proporciona una barra superior de navegación para aplicaciones web. Permite mostrar información de usuario, nombre y subtítulo de la app, alertas, botones de ayuda, cambio de rol, idioma y logout, con soporte para personalización visual y adaptación automática a dispositivos móviles. Es ideal para layouts principales, portales y sistemas que requieren navegación, identidad visual y acceso rápido a funciones clave.

---

## Props / Parámetros

| Propiedad               | Tipo                       | Descripción                                         | Valor por defecto | Obligatorio |
| ----------------------- | -------------------------- | --------------------------------------------------- | ----------------- | ----------- |
| `userInformation`       | `IUserInformation \| null` | Información del usuario (nombre, rol, imagen, etc.) | `null`            | No          |
| `appName`               | `string`                   | Nombre de la aplicación                             | `''`              | No          |
| `appPowered`            | `string`                   | Texto de "powered by"                               | `''`              | No          |
| `appSubTitle`           | `string`                   | Subtítulo de la aplicación                          | `''`              | No          |
| `lang`                  | `string`                   | Idioma de la barra superior (`es`, `en`, etc.)      | `'es'`            | No          |
| `mitec`                 | `boolean`                  | Modo MiTec (cambia logos y estilos)                 | `false`           | No          |
| `alertNotification`     | `IBmbDataAlert[]`          | Lista de alertas a mostrar                          | `[]`              | No          |
| `showRoleButton`        | `boolean`                  | Muestra el botón de cambio de rol                   | `false`           | No          |
| `showHelpButton`        | `boolean`                  | Muestra el botón de ayuda                           | `false`           | No          |
| `allowSidebarForMobile` | `boolean`                  | Permite mostrar sidebar en móvil                    | `true`            | No          |

### Props obsoletos

| Propiedad                | Tipo                  | Descripción                  | Valor por defecto | Obligatorio |
| ------------------------ | --------------------- | ---------------------------- | ----------------- | ----------- |
| `positionButtonMenu`     | `IPositionButtonMenu` | Posición del menú lateral    | `'left'`          | No          |
| `hasLogoutButton`        | `boolean`             | Muestra el botón de logout   | `true`            | No          |
| `showLang`               | `boolean`             | Muestra selector de idioma   | `false`           | No          |
| `showUserName`           | `boolean`             | Muestra el nombre de usuario | `true`            | No          |
| `assignmentNotification` | `string[]`            | Notificaciones de asignación | `[]`              | No          |

### Modelos internos

| Propiedad     | Tipo     | Descripción             | Valor por defecto  |
| ------------- | -------- | ----------------------- | ------------------ |
| `image`       | `string` | URL del logo principal  | Depende de `mitec` |
| `mobileImage` | `string` | URL del logo para móvil | Depende de `mitec` |

### Outputs

| Output             | Tipo         | Descripción                                    |
| ------------------ | ------------ | ---------------------------------------------- |
| `helpButtonClick`  | `MouseEvent` | Se emite al hacer clic en el botón de ayuda    |
| `userProfileClick` | `MouseEvent` | Se emite al hacer clic en el perfil de usuario |
| `alertButtonClick` | `MouseEvent` | Se emite al hacer clic en el botón de alertas  |
| `roleButtonClick`  | `MouseEvent` | Se emite al hacer clic en el botón de rol      |
| `backToHomeClick`  | `void`       | Se emite al hacer clic en "volver a inicio"    |
| `logOut`           | `any`        | Se emite al hacer clic en logout (obsoleto)    |
| `onLangChange`     | `string`     | Se emite al cambiar el idioma (obsoleto)       |

---

## Ejemplo de uso

```html
<bmb-top-bar
  [userInformation]="usuario"
  [appName]="'Mi Portal'"
  [appSubTitle]="'Gestión académica'"
  [lang]="'es'"
  [mitec]="true"
  [alertNotification]="alertas"
  [showRoleButton]="true"
  [showHelpButton]="true"
  [allowSidebarForMobile]="true"
  (helpButtonClick)="onHelp($event)"
  (userProfileClick)="onUserProfile($event)"
  (alertButtonClick)="onAlert($event)"
  (roleButtonClick)="onRoleChange($event)"
  (backToHomeClick)="onBackHome()"
></bmb-top-bar>
```

---

## Dependencias

- `@angular/core` (Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, input, output, model)
- `@angular/common` (CommonModule)
- `BmbTopBarUserSectionComponent`
- Tipos: `IPositionButtonMenu`, `IUserInformation`, `IBmbDataAlert`
- Utilidad: `getMobileResolutionSize`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo de botones y alertas, facilitando la navegación por teclado y tecnologías asistivas. Los botones y enlaces pueden recibir foco y disparar eventos.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta personalización visual, adaptación a móvil y modo MiTec.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado y actualiza imágenes y animaciones solo cuando es necesario.
- **Personalización:** Permite definir logos, subtítulos, alertas, botones y navegación contextual, y adapta el diseño automáticamente según el modo y dispositivo.
- **Persistencia:** Controla la animación de bienvenida mediante `localStorage` para mostrarla solo la primera vez.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción y utiliza métodos para gestionar el estado visual y funcional de forma eficiente.

---
