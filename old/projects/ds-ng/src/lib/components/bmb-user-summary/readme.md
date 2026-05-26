# BmbUserSummaryComponent

## Descripción general

`BmbUserSummaryComponent` es un componente standalone de Angular diseñado para mostrar un resumen compacto de información de usuario, como nombre, matrícula, imagen, carrera y saludo personalizado. Permite proyectar el resumen en modo perfil o vista general, ocultar el contenedor visual, y emitir eventos al hacer clic en el componente. Es ideal para encabezados de perfil, tarjetas de usuario y paneles de bienvenida en portales y dashboards.

---

## Props / Parámetros

| Propiedad    | Tipo      | Descripción                             | Valor por defecto | Obligatorio |
| ------------ | --------- | --------------------------------------- | ----------------- | ----------- |
| `isProfile`  | `boolean` | Muestra el resumen en modo perfil       | `false`           | No          |
| `name`       | `string`  | Nombre completo del usuario             | `''`              | No          |
| `id`         | `string`  | Matrícula o identificador del usuario   | `''`              | No          |
| `image`      | `string`  | URL de la imagen de usuario             | `''`              | No          |
| `infoCareer` | `string`  | Carrera o información académica         | `''`              | No          |
| `noBox`      | `boolean` | Oculta el contenedor visual del resumen | `false`           | No          |
| `salutation` | `string`  | Saludo personalizado                    | `'Buenas tardes'` | No          |

### Outputs

| Output    | Tipo         | Descripción                             |
| --------- | ------------ | --------------------------------------- |
| `onClick` | `MouseEvent` | Se emite al hacer clic en el componente |

---

## Ejemplo de uso

```html
<bmb-user-summary
  [isProfile]="true"
  [name]="'Ana Pérez'"
  [id]="'A01234567'"
  [image]="'/assets/ana.jpg'"
  [infoCareer]="'Ingeniería en Sistemas'"
  [salutation]="'¡Bienvenida!'"
  (onClick)="handleUserClick($event)"
></bmb-user-summary>
```

---

## Dependencias

- `@angular/core` (Component, ViewEncapsulation, ChangeDetectionStrategy, input, output)
- `@angular/common` (CommonModule)
- `BmbButtonDirective`
- `BmbUserSummaryContentComponent`

---

## Notas adicionales

- **Accesibilidad:** El componente puede recibir foco y disparar eventos, facilitando la navegación por teclado y tecnologías asistivas. Se recomienda complementar con atributos ARIA si el resumen es interactivo.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar el modo de visualización y el saludo.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ocultar el contenedor visual (`noBox`), mostrar información académica y proyectar la imagen y saludo según el contexto.
- **Buenas prácticas:** Emite eventos desacoplados al hacer clic y utiliza métodos para gestionar la interacción de forma eficiente.

---
