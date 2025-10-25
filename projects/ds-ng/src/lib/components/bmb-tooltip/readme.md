# BmbTooltipComponent

## Descripción general

`BmbTooltipComponent` es un componente standalone de Angular que permite mostrar mensajes de ayuda, información contextual o advertencias al pasar el cursor o enfocar un elemento. Soporta personalización de texto, título, ícono, tamaño, alineación y justificación, facilitando la integración de tooltips accesibles y visualmente consistentes en cualquier parte de la interfaz.

---

## Props / Parámetros

| Propiedad | Tipo                                      | Descripción                               | Valor por defecto | Obligatorio |
| --------- | ----------------------------------------- | ----------------------------------------- | ----------------- | ----------- |
| `text`    | `string`                                  | Texto principal del tooltip               | `''`              | No          |
| `title`   | `string`                                  | Título opcional del tooltip               | `''`              | No          |
| `icon`    | `string`                                  | Ícono a mostrar junto al tooltip          | `'help'`          | No          |
| `size`    | `number`                                  | Tamaño del ícono                          | -                 | No          |
| `align`   | `'above' \| 'below' \| 'left' \| 'right'` | Posición del tooltip respecto al elemento | `'below'`         | No          |
| `justify` | `'centered' \| 'before' \| 'after'`       | Justificación del tooltip                 | `'after'`         | No          |
| `isFill`  | `boolean`                                 | Aplica fondo de color al tooltip          | `true`            | No          |

---

## Ejemplo de uso

```html
<bmb-tooltip
  [text]="'Este campo es obligatorio.'"
  [title]="'Ayuda'"
  [icon]="'info'"
  [size]="20"
  [align]="'above'"
  [justify]="'centered'"
  [isFill]="true"
></bmb-tooltip>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Angular core: `Component`, `input`, `ChangeDetectionStrategy`, `ViewEncapsulation`

---

## Notas adicionales

- **Accesibilidad:** El componente puede integrarse con atributos ARIA y disparar eventos al enfocar o pasar el cursor, facilitando la navegación por teclado y tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta diferentes posiciones y justificaciones para adaptarse al diseño.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el texto, título, ícono, tamaño, alineación y fondo del tooltip según las necesidades del proyecto.
- **Buenas prácticas:** Utiliza métodos para gestionar clases CSS dinámicamente y asegurar la correcta posición y estilo del tooltip.

---
