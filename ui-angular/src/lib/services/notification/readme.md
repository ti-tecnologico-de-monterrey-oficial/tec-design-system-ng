# BmbNotificationService

## Descripción general

`BmbNotificationService` es un servicio singleton de Angular que gestiona la creación, visualización y eliminación de notificaciones emergentes (push y toast) en la aplicación. Utiliza señales reactivas (`signal`) para almacenar la lista de notificaciones y crea dinámicamente un portal (`BmbPortalComponent`) en el DOM para alojar las notificaciones. Permite definir la posición de las notificaciones en pantalla, agregar notificaciones con duración personalizada, eliminar notificaciones manualmente o automáticamente, y manejar animaciones de cierre para toasts.

---

## Props / Parámetros

| Propiedad          | Tipo                      | Descripción                                            | Valor por defecto | Obligatorio |
| ------------------ | ------------------------- | ------------------------------------------------------ | ----------------- | ----------- |
| `notificationList` | `signal<INotification[]>` | Señal reactiva que almacena la lista de notificaciones | `[]`              | No          |
| `positionX`        | `'left' \| 'right'`       | Posición horizontal de las notificaciones              | `'right'`         | No          |
| `positionY`        | `'top' \| 'bottom'`       | Posición vertical de las notificaciones                | `'top'`           | No          |

### Métodos

| Método                           | Tipo de retorno   | Descripción                                                            |
| -------------------------------- | ----------------- | ---------------------------------------------------------------------- |
| `addNotification(notification)`  | `void`            | Agrega una notificación y la elimina automáticamente después del delay |
| `deleteNotification(id, delay?)` | `void`            | Elimina una notificación por ID, con animación si es tipo toast        |
| `getNotificationList()`          | `INotification[]` | Devuelve la lista actual de notificaciones                             |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { BmbNotificationService } from './services/notification/notification.service';
import { INotification } from './components/bmb-push-notification/types';

@Component({
  selector: 'app-demo-notification',
  template: ` <button (click)="notificar()">Notificar</button> `,
})
export class DemoNotificationComponent {
  constructor(private notificationService: BmbNotificationService) {}

  notificar() {
    const notification: INotification = {
      message: '¡Acción realizada con éxito!',
      component: 'toast',
      delay: 3000,
    };
    this.notificationService.addNotification(notification);
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable, signal, ApplicationRef, EnvironmentInjector, ComponentRef, createComponent, EmbeddedViewRef, Inject, Optional)
- Tipos: `INotification` (definido en `../../components/bmb-push-notification/types`)
- Utilidad: `getUUID` (definido en `../../utils/utils`)
- Componente: `BmbPortalComponent`

---

## Notas adicionales

- **Accesibilidad:** El servicio facilita la gestión centralizada de notificaciones, permitiendo que los componentes de notificación implementen roles y atributos ARIA para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular y funciona con cualquier tipo de notificación compatible con `BmbPortalComponent`.
- **Rendimiento:** Utiliza señales reactivas para optimizar la actualización y sincronización de la lista de notificaciones. Crea el portal solo una vez y reutiliza la instancia.
- **Animaciones:** Las notificaciones tipo toast se eliminan con animación de cierre (`closing: true`) antes de ser removidas del DOM.
- **Personalización:** Permite definir la posición de las notificaciones en pantalla y la duración de cada una mediante el parámetro `delay`.
- **Buenas prácticas:** Centraliza la gestión de notificaciones, evita duplicidad y facilita el cierre individual o automático de notificaciones.

---
