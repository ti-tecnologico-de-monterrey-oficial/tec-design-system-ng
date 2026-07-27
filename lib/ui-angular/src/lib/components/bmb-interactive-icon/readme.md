# BmbInteractiveIconComponent

## Descripción general

`BmbInteractiveIconComponent` es un componente standalone de Angular que permite mostrar un ícono interactivo con opciones de personalización visual, notificaciones, enlaces y diferentes layouts. Su propósito principal es ofrecer una interfaz visual atractiva y funcional para acciones rápidas, accesos directos o indicadores en la aplicación, adaptándose a distintos estilos y necesidades de interacción.

---

## Props / Parámetros

| Propiedad            | Tipo                            | Descripción                                                      | Valor por defecto | Obligatorio |
| -------------------- | ------------------------------- | ---------------------------------------------------------------- | ----------------- | ----------- |
| `appearanceContrast` | `IBmbContrast`                  | Contraste visual del ícono (`default`, `primary`, `alternative`) | `'default'`       | No          |
| `appearance`         | `IBmbInteractiveIconAppearance` | Estilo visual del ícono (varios colores y temas)                 | `'red'`           | No          |
| `title`              | `string`                        | Título descriptivo del ícono                                     | -                 | No          |
| `description`        | `string`                        | Descripción adicional                                            | `''`              | No          |
| `icon`               | `string`                        | Nombre del ícono a mostrar                                       | `'face'`          | No          |
| `dotNotification`    | `number`                        | Número de notificaciones a mostrar como punto                    | -                 | No          |
| `horizontal`         | `boolean`                       | Disposición horizontal del ícono                                 | `false`           | No          |
| `target`             | `IBmbTargetLink`                | Objeto de destino para el enlace                                 | -                 | No          |
| `link`               | `string`                        | URL o ruta de navegación                                         | -                 | No          |
| `layout`             | `IBmbInteractiveIconType`       | Tipo de layout (`regular`, `button`, `app_drawer`)               | `'regular'`       | No          |
| `setButtonTemplate`  | `boolean`                       | Si se usa plantilla de botón                                     | `false`           | No          |

### Outputs

| Output        | Tipo         | Descripción                              |
| ------------- | ------------ | ---------------------------------------- |
| `buttonClick` | `MouseEvent` | Se emite al hacer clic en el ícono/botón |

---

## Ejemplo de uso

```html
<bmb-interactive-icon
  [appearance]="'mitec_blue'"
  [appearanceContrast]="'primary'"
  [componentTitle]="'Perfil'"
  [description]="'Accede a tu perfil personal'"
  [icon]="'person'"
  [dotNotification]="3"
  [horizontal]="true"
  [link]="'/perfil'"
  [layout]="'button'"
  (buttonClick)="onIconClick($event)"
>
</bmb-interactive-icon>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- `BmbCheckExternalLinkButtonComponent`
- Tipos: `IBmbTargetLink`, `IBmbContrast`

---

## Notas adicionales

- **Accesibilidad:** El componente soporta interacción por teclado y puede incluir descripciones para tecnologías asistivas.
- **Compatibilidad:** Funciona en cualquier template Angular y puede integrarse con rutas internas o enlaces externos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite múltiples estilos visuales y layouts para adaptarse a diferentes contextos de uso.
- **Notificaciones:** El parámetro `dotNotification` permite mostrar indicadores visuales de actividad o alertas.

---
