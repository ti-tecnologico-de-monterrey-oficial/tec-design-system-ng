# ToastService

## Descripción general

`ToastService` es un servicio singleton de Angular que gestiona el estado de visibilidad de los toasts (notificaciones emergentes) en la aplicación. Utiliza un `BehaviorSubject` de RxJS para emitir el estado abierto/cerrado del toast, permitiendo que cualquier componente se suscriba y reaccione a los cambios. Proporciona métodos para abrir y cerrar el toast de forma centralizada.

---

## Props / Parámetros

| Propiedad | Tipo                  | Descripción                                             | Valor por defecto | Obligatorio |
| --------- | --------------------- | ------------------------------------------------------- | ----------------- | ----------- |
| `isOpen$` | `Observable<boolean>` | Observable que emite el estado de visibilidad del toast | `false`           | No          |

### Métodos

| Método         | Tipo de retorno | Descripción                          |
| -------------- | --------------- | ------------------------------------ |
| `openToast()`  | `void`          | Cambia el estado a abierto (`true`)  |
| `closeToast()` | `void`          | Cambia el estado a cerrado (`false`) |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-demo-toast',
  template: `
    <button (click)="mostrarToast()">Mostrar toast</button>
    <button (click)="ocultarToast()">Ocultar toast</button>
    <div *ngIf="isOpen">¡Notificación activa!</div>
  `,
})
export class DemoToastComponent {
  isOpen = false;

  constructor(private toastService: ToastService) {
    this.toastService.isOpen$.subscribe((open) => (this.isOpen = open));
  }

  mostrarToast() {
    this.toastService.openToast();
  }

  ocultarToast() {
    this.toastService.closeToast();
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable)
- `rxjs` (BehaviorSubject, Observable)

---

## Notas adicionales

- **Accesibilidad:** El servicio no afecta directamente la accesibilidad, pero facilita la gestión centralizada de notificaciones, permitiendo que los componentes de toast implementen roles y atributos ARIA.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular.
- **Rendimiento:** Utiliza observables para emitir cambios de estado de forma eficiente y reactiva.
- **Buenas prácticas:** Centraliza la gestión del estado de los toasts, evitando duplicidad y facilitando la actualización global de la visibilidad de notificaciones.

---
