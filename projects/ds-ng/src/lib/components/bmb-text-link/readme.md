# BmbTextLinkComponent

## Descripción general

`BmbTextLinkComponent` es un componente standalone de Angular diseñado para mostrar enlaces de texto personalizables, con soporte para íconos, estilos subrayados y detección de enlaces externos. Permite definir la posición del ícono, el estilo visual, el destino del enlace y el estado de habilitado/deshabilitado, facilitando la integración de enlaces accesibles y visualmente consistentes en cualquier parte de la interfaz.

---

## Props / Parámetros

| Propiedad        | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|------------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `textLink`       | `string`                    | Texto a mostrar en el enlace                                       | -                 | Sí          |
| `textLinkStyle`  | `'icon' \| 'underlined'`    | Estilo visual del enlace                                           | `'icon'`          | No          |
| `target`         | `IBmbTargetLink`            | Destino del enlace (`_blank`, `_self`, etc.)                       | `'_blank'`        | No          |
| `icon`           | `string`                    | Nombre del ícono a mostrar                                         | `'arrow_forward'` | No          |
| `iconPosition`   | `'left' \| 'right'`         | Posición del ícono respecto al texto                               | `'right'`         | No          |
| `link`           | `string`                    | URL o ruta del enlace                                              | -                 | Sí          |
| `disabled`       | `boolean`                   | Deshabilita la interacción con el enlace                           | `false`           | No          |

---

## Ejemplo de uso

```html
<bmb-text-link
  [textLink]="'Ir a MiTec'"
  [link]="'https://mitec.tec.mx'"
  [icon]="'open_in_new'"
  [iconPosition]="'right'"
  [textLinkStyle]="'icon'"
  [target]="'_blank'"
  [disabled]="false"
></bmb-text-link>

<bmb-text-link
  [textLink]="'Ver detalles'"
  [link]="'/detalles'"
  [textLinkStyle]="'underlined'"
  [icon]="'arrow_forward'"
  [iconPosition]="'left'"
  [target]="'_self'"
  [disabled]="false"
></bmb-text-link>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbCheckExternalLinkButtonComponent`
- `BmbIconComponent`
- Tipos: `IBmbTargetLink`, `IBmbTextLinkStyle`, `IBmbIconPosition`, `IBmbContrast`
- Angular core: `ChangeDetectionStrategy`, `ViewEncapsulation`, `input`, `Component`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta navegación por teclado y puede integrarse con atributos ARIA para mejorar la experiencia con tecnologías asistivas. El estado deshabilitado impide la interacción y aplica estilos visuales claros.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta enlaces internos y externos, con detección automática de enlaces externos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el estilo visual, la posición del ícono y el destino del enlace según las necesidades del proyecto.
- **Buenas prácticas:** Gestiona clases CSS dinámicamente para reflejar el estado y el estilo del enlace, y utiliza componentes internos para asegurar la consistencia visual y funcional.

---
