# BmbNotificationCounterComponent

## Descripción general

`BmbNotificationCounterComponent` es un componente standalone de Angular diseñado para mostrar un contador de notificaciones o elementos destacados en la interfaz. Permite personalizar el formato visual y limita la visualización máxima a "99+", facilitando la comunicación clara de cantidades relevantes para la persona usuaria en menús, encabezados o tarjetas.

---

## Props / Parámetros

| Propiedad    | Tipo                              | Descripción                                                        | Valor por defecto | Obligatorio |
|--------------|-----------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `counter`    | `number`                          | Número de notificaciones o elementos a mostrar                     | -                 | Sí          |
| `appearance` | `IBmbNotificationCounterType`     | Tipo de visualización (`notification`, `plain`)                    | `'notification'`  | No          |

---

## Ejemplo de uso

```html
<bmb-notification-counter
  [counter]="120"
  [appearance]="'notification'"
></bmb-notification-counter>

<bmb-notification-counter
  [counter]="5"
  [appearance]="'plain'"
></bmb-notification-counter>
```

---

## Dependencias

- `@angular/common` (CommonModule)

---

## Notas adicionales

- **Accesibilidad:** El componente muestra el contador de forma clara y puede integrarse con etiquetas descriptivas para tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en encabezados, menús, tarjetas o botones.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** El formato visual se adapta según el tipo de apariencia seleccionado (`notification` muestra solo el número, `plain` lo muestra entre paréntesis).
- **Buenas prácticas:** Limita la visualización máxima a "99+" para evitar saturar la interfaz y mantener la claridad visual.

---
