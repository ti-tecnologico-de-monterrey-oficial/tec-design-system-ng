# BmbToastComponent

## Descripción general

`BmbToastComponent` es un componente standalone de Angular diseñado para mostrar notificaciones emergentes (toasts) en la interfaz. Permite personalizar la apariencia visual, el título, la descripción, el ícono y la opción de cierre, facilitando la comunicación de mensajes informativos, advertencias, errores, eventos y confirmaciones. Es ideal para alertas rápidas, confirmaciones de acción y recordatorios en cualquier aplicación web.

---

## Props / Parámetros

| Propiedad     | Tipo                 | Descripción                                                        | Valor por defecto | Obligatorio |
| ------------- | -------------------- | ------------------------------------------------------------------ | ----------------- | ----------- |
| `appearance`  | `BmbToastAppearance` | Apariencia/color del toast (`neutral`, `primary`, `warning`, etc.) | `'neutral'`       | No          |
| `isClosable`  | `boolean`            | Permite cerrar el toast manualmente                                | `false`           | No          |
| `title`       | `string`             | Título principal del toast                                         | `''`              | No          |
| `description` | `string`             | Descripción o mensaje adicional                                    | `''`              | No          |
| `position`    | `string`             | Posición en pantalla (obsoleto, usar gestor externo)               | `'top'`           | No          |
| `id`          | `string \| number`   | Identificador único del toast                                      | `''`              | No          |

### Outputs

| Output    | Tipo         | Descripción                 |
| --------- | ------------ | --------------------------- |
| `onClose` | `MouseEvent` | Se emite al cerrar el toast |

---

## Ejemplo de uso

```html
<bmb-toast
  [appearance]="'warning'"
  [isClosable]="true"
  [componentTitle]="'Advertencia'"
  [description]="'No se pudo guardar los cambios.'"
  [id]="123"
  (onClose)="handleToastClose($event)"
></bmb-toast>
```

---

## Dependencias

- `@angular/core` (ChangeDetectionStrategy, ViewEncapsulation, input, output, Component)
- `@angular/common` (CommonModule)
- `BmbIconComponent`

---

## Notas adicionales

- **Accesibilidad:** El componente puede recibir foco y disparar eventos, facilitando la navegación por teclado y tecnologías asistivas. Se recomienda complementar con roles ARIA (`alert`, `status`) para mejorar la experiencia.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta múltiples apariencias y estilos visuales.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite elegir entre varios colores y tipos de toast, mostrar íconos contextuales y definir si el toast es cerrable.
- **Buenas prácticas:** Emite eventos desacoplados para manejar el cierre y utiliza métodos para gestionar clases CSS y selección de íconos de forma eficiente.

---
