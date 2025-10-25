# BmbSimpleHeaderComponent

## Descripción general

`BmbSimpleHeaderComponent` es un componente standalone de Angular diseñado para mostrar un encabezado simple con un título y un ícono de acción. Permite personalizar el texto, el ícono y el color alternativo del ícono, y emitir eventos al hacer clic en el ícono. Es ideal para barras superiores, secciones de tarjetas o cualquier contexto donde se requiera un encabezado compacto y funcional.

---

## Props / Parámetros

| Propiedad              | Tipo      | Descripción                         | Valor por defecto | Obligatorio |
| ---------------------- | --------- | ----------------------------------- | ----------------- | ----------- |
| `title`                | `string`  | Texto del encabezado                | `''`              | No          |
| `icon`                 | `string`  | Nombre del ícono a mostrar          | `''`              | No          |
| `iconAlternativeColor` | `boolean` | Usa color alternativo para el ícono | `false`           | No          |

### Outputs

| Output        | Tipo  | Descripción                        |
| ------------- | ----- | ---------------------------------- |
| `onIconClick` | `any` | Se emite al hacer clic en el ícono |

---

## Ejemplo de uso

```html
<bmb-simple-header
  [title]="'Perfil de usuario'"
  [icon]="'settings'"
  [iconAlternativeColor]="true"
  (onIconClick)="handleSettingsClick($event)"
></bmb-simple-header>
```

---

## Dependencias

- `BmbActionIconComponent`
- `BmbLayoutDirective`
- `BmbLayoutItemDirective`
- Angular core: `ChangeDetectionStrategy`, `ViewEncapsulation`

---

## Notas adicionales

- **Accesibilidad:** El ícono puede recibir foco y disparar eventos, facilitando la interacción por teclado y tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en barras superiores, tarjetas o paneles.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el color del ícono según el contexto visual de la interfaz.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la acción del ícono de forma flexible y segura.

---
