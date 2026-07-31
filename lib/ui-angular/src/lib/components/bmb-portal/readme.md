# BmbPortalComponent

## Descripción general

`BmbPortalComponent` es un componente standalone de Angular que centraliza la gestión y visualización de notificaciones, modales nativos, toasts y contenido proyectado en la interfaz. Su propósito principal es servir como portal único para mostrar mensajes, alertas, diálogos y componentes flotantes, facilitando la interacción y la comunicación efectiva con las personas usuarias en cualquier parte de la aplicación.

---

## Props / Parámetros

Este componente no recibe props directos, sino que gestiona su estado y contenido a través de servicios reactivos y señales internas.

### Propiedades internas y métodos relevantes

- `modalSignal`: Computed. Lista reactiva de modales nativos activos.
- `projectedContent`: Computed. Lista de contenido proyectado dinámicamente.
- `notificationsList`: Computed. Lista de notificaciones y toasts activos.
- `closeNotification(notification: INotification)`: Elimina una notificación por ID.
- `getNotificationPosition()`: Obtiene la posición X configurada para las notificaciones.
- `handleCloseModal(id: string)`: Cierra un modal nativo por ID.
- `handleModalClick(item: IBmbNativeModal, event: unknown)`: Maneja el clic de cierre en un modal nativo.
- `handleRemoveProjectedContent()`: Cierra el contenido proyectado.
- `hasToast()`: Retorna `true` si hay toasts activos.

---

## Ejemplo de uso

```html
<bmb-portal></bmb-portal>
```

El componente se coloca generalmente en la raíz de la aplicación o en layouts principales para asegurar que todas las notificaciones, modales y toasts sean gestionados de forma centralizada.

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbPushNotificationItemComponent`
- `BmbToastComponent`
- `BmbNoticeCardComponent`
- `BmbNativeModalComponent`
- `BmbProjectedContentComponent`
- Servicios:
  - `BmbNotificationService`
  - `BmbNativeModalService`
  - `BmbProjectionContentService`
- Tipos:
  - `INotification`
  - `IBmbNativeModal`

---

## Notas adicionales

- **Accesibilidad:** El componente facilita la gestión centralizada de mensajes y diálogos, permitiendo una experiencia más accesible y consistente para todas las personas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y es compatible con otros componentes de notificación y modal del sistema.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite proyectar contenido personalizado y gestionar diferentes tipos de notificaciones y modales según las necesidades de la aplicación.
- **Buenas prácticas:** Centraliza la lógica de interacción y cierre de notificaciones, modales y contenido proyectado, promoviendo una arquitectura desacoplada y escalable.

---
