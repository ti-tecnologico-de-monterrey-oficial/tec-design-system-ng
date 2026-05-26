# BmbUserProfileComponent

## Descripción general

`BmbUserProfileComponent` es un componente standalone de Angular que muestra la información de perfil de usuario en un layout tipo tarjeta, integrando encabezado personalizado, datos de usuario, acceso a otras cuentas y un botón de acción principal. Permite personalizar etiquetas, enlaces, destino de enlaces y proyectar acciones adicionales en el encabezado. Es ideal para portales, pantallas de inicio de sesión y vistas de perfil en aplicaciones web.

---

## Props / Parámetros

| Propiedad              | Tipo                    | Descripción                                               | Valor por defecto            | Obligatorio |
| ---------------------- | ----------------------- | --------------------------------------------------------- | ---------------------------- | ----------- |
| `headerLabel`          | `string`                | Etiqueta principal del encabezado                         | `'ESTUDIANTES'`              | No          |
| `anotherAccountLabel`  | `string`                | Texto para el enlace de otra cuenta                       | `'Ingresar con otra cuenta'` | No          |
| `anotherAccountLink`   | `string`                | URL para el enlace de otra cuenta                         | `''`                         | No          |
| `anotherAccountTarget` | `IBmbTargetLink`        | Destino del enlace (`_blank`, `_self`, etc.)              | `'_blank'`                   | No          |
| `buttonLabel`          | `string`                | Texto del botón principal                                 | `'Ingresar'`                 | No          |
| `userInfo`             | `IBmbUserInfo`          | Información del usuario (nombre, matrícula, imagen, etc.) | -                            | Sí          |
| `actionHeaderLinks`    | `IBmbActionHeaderLinks` | Acciones adicionales en el encabezado                     | -                            | No          |
| `actionHeaders`        | `IBmbActionHeader[]`    | Acciones (obsoleto, usar `actionHeaderLinks`)             | `[]`                         | No          |

### Outputs

| Output       | Tipo   | Descripción                                                                           |
| ------------ | ------ | ------------------------------------------------------------------------------------- |
| `onRequest`  | `any`  | Se emite al hacer clic en el botón principal, incluye callback para finalizar loading |
| `onContinue` | `void` | Se emite al finalizar la acción principal                                             |

---

## Ejemplo de uso

```html
<bmb-user-profile
  [headerLabel]="'Bienvenida'"
  [anotherAccountLabel]="'Acceder con otra cuenta'"
  [anotherAccountLink]="'https://login.tec.mx'"
  [anotherAccountTarget]="'_blank'"
  [buttonLabel]="'Continuar'"
  [userInfo]="{
    name: 'Ana Pérez',
    id: 'A01234567',
    image: '/assets/ana.jpg',
    infoCareer: 'Ingeniería en Sistemas'
  }"
  [actionHeaderLinks]="[
    { icon: 'help', label: 'Ayuda', link: '/ayuda' }
  ]"
  (onRequest)="handleProfileRequest($event)"
  (onContinue)="handleContinue()"
></bmb-user-profile>
```

```typescript
handleProfileRequest(event: { action: string, callback: () => void }) {
  // Realizar acción, luego llamar event.callback() para finalizar loading
  event.callback();
}
handleContinue() {
  // Acción posterior al ingreso
}
```

---

## Dependencias

- `@angular/core` (Component, ChangeDetectionStrategy, ViewEncapsulation, input, output)
- `BmbHeaderMitecComponent`
- `BmbUserProfileContentComponent`
- `BmbButtonDirective`
- Tipos: `IBmbUserInfo`, `IBmbActionHeaderLinks`, `IBmbActionHeader`, `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado, proyección de enlaces accesibles y puede integrarse con atributos ARIA para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar etiquetas, enlaces y acciones del encabezado.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Gestión de estado:** El botón principal muestra estado de carga (`isLoading`) mientras se realiza la acción y lo finaliza mediante callback.
- **Personalización:** Permite definir enlaces y acciones adicionales en el encabezado, así como proyectar información de usuario detallada.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción y utiliza métodos para gestionar el estado visual y funcional de forma eficiente.

---
