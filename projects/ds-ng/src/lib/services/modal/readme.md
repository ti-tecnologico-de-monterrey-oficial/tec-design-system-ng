```markdown
# BmbNativeModalService

## Descripción general

`BmbNativeModalService` es un servicio singleton de Angular que gestiona la apertura, cierre y estado de modales nativos en la aplicación. Utiliza señales reactivas (`signal`) para almacenar la lista de modales abiertos y crea dinámicamente un portal (`BmbPortalComponent`) en el DOM para alojar los modales. Permite abrir modales con identificador único, cerrar modales individuales o todos a la vez, consultar la lista de modales y verificar la existencia de un modal por su ID. Es ideal para sistemas que requieren gestión centralizada y dinámica de modales, como portales, dashboards y flujos de interacción complejos.

---

## Props / Parámetros

| Propiedad      | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|----------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `modalList`    | `signal<IBmbNativeModal[]>` | Señal reactiva que almacena la lista de modales abiertos           | `[]`              | No          |

### Métodos

| Método                   | Tipo de retorno | Descripción                                                                 |
|--------------------------|-----------------|-----------------------------------------------------------------------------|
| `openModal(newModal)`    | `string`        | Abre un nuevo modal y devuelve su ID único                                  |
| `closeModal(id)`         | `void`          | Cierra el modal con el ID especificado                                      |
| `closeAllModals()`       | `void`          | Cierra todos los modales abiertos                                           |
| `getModalList()`         | `IBmbNativeModal[]` | Devuelve la lista actual de modales abiertos                           |
| `checkIfModalExists(id)` | `boolean`       | Verifica si existe un modal con el ID especificado                          |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { BmbNativeModalService } from './services/modal/native-modal.service';
import { IBmbNativeModal } from './components/bmb-modal/bmb-modal.interface';

@Component({
  selector: 'app-demo-modal',
  template: `
    <button (click)="abrirModal()">Abrir modal</button>
    <button (click)="cerrarTodos()">Cerrar todos</button>
  `,
})
export class DemoModalComponent {
  constructor(private modalService: BmbNativeModalService) {}

  abrirModal() {
    const modal: IBmbNativeModal = {
      modalId: '',
      title: 'Ejemplo de Modal',
      content: 'Contenido del modal',
    };
    const id = this.modalService.openModal(modal);
    // Guardar el id si se requiere cerrar individualmente
  }

  cerrarTodos() {
    this.modalService.closeAllModals();
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable, signal, ApplicationRef, EnvironmentInjector, ComponentRef, createComponent, EmbeddedViewRef)
- Tipos: `IBmbNativeModal` (definido en `../../components/bmb-modal/bmb-modal.interface`)
- Componente: `BmbPortalComponent`
- Utilidad: `getUUID` (definido en `../../utils/utils`)

---

## Notas adicionales

- **Accesibilidad:** El servicio facilita la gestión centralizada de modales, permitiendo que los componentes modales implementen roles y atributos ARIA para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular y funciona con cualquier tipo de modal compatible con `BmbPortalComponent`.
- **Rendimiento:** Utiliza señales reactivas para optimizar la actualización y sincronización de la lista de modales. Crea el portal solo una vez y reutiliza la instancia.
- **Buenas prácticas:** Centraliza la gestión de modales, evita duplicidad y facilita el cierre individual o masivo de modales. Verifica la existencia de un modal antes de operar sobre él.

---
```
