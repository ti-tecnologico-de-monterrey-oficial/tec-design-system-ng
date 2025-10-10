# BmbPushNotificationComponent

## Descripción general

`BmbPushNotificationComponent` es un componente standalone de Angular diseñado para mostrar y gestionar notificaciones push en la interfaz. Permite visualizar una lista de notificaciones activas y cerrarlas de manera individual, facilitando la comunicación de eventos importantes, alertas o mensajes a las personas usuarias en tiempo real.

---

## Props / Parámetros

Este componente no recibe props directos. La gestión de notificaciones se realiza a través del servicio interno y métodos públicos.

### Métodos públicos

- `getNotifications()`: Retorna la lista actual de notificaciones activas.
- `closeNotification(notification: INotification)`: Elimina una notificación específica por su ID.

---

## Ejemplo de uso

```html
<bmb-push-notification></bmb-push-notification>
```

El componente se coloca generalmente en la raíz de la aplicación o en layouts principales para asegurar que todas las notificaciones push sean gestionadas y mostradas de forma centralizada.

---

## Dependencias

- `BmbPushNotificationItemComponent`
- Servicio: `BmbNotificationService`
- Tipos: `INotification`
- Angular core: `@angular/core` (ChangeDetectionStrategy, ViewEncapsulation)

---

## Notas adicionales

- **Accesibilidad:** El componente puede integrarse con etiquetas y roles ARIA para mejorar la experiencia de personas usuarias con tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse junto con otros sistemas de notificación.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado y actualizar la lista de notificaciones de manera eficiente.
- **Gestión centralizada:** Las notificaciones se gestionan mediante un servicio, permitiendo lógica desacoplada y escalable.
- **Buenas prácticas:** Permite cerrar notificaciones individualmente y asegura que la lista se mantenga actualizada en tiempo real.

---
