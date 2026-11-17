# BmbCalendarService

## Descripción general

`BmbCalendarService` es un servicio singleton de Angular que gestiona el estado y las operaciones sobre eventos de calendario en la aplicación. Utiliza señales reactivas (`signal`) para almacenar la lista de eventos y el estado de carga, permitiendo agregar, editar, eliminar y consultar eventos de manera centralizada y eficiente. Es ideal para aplicaciones que requieren gestión dinámica de eventos, como calendarios, agendas y sistemas de planificación.

---

## Props / Parámetros

| Propiedad   | Tipo                          | Descripción                                                        | Valor por defecto | Obligatorio |
| ----------- | ----------------------------- | ------------------------------------------------------------------ | ----------------- | ----------- |
| `eventList` | `signal<IBmbCalendarEvent[]>` | Señal reactiva que almacena la lista de eventos del calendario     | `[]`              | No          |
| `isLoading` | `signal<boolean>`             | Señal reactiva que indica si el calendario está en estado de carga | `false`           | No          |

### Métodos

| Método                                           | Tipo de retorno       | Descripción                                                                |
| ------------------------------------------------ | --------------------- | -------------------------------------------------------------------------- |
| `addMultipleEvents(events: IBmbCalendarEvent[])` | `void`                | Agrega múltiples eventos al calendario, asignando un ID único si no existe |
| `addEvent(event: IBmbCalendarEvent)`             | `void`                | Agrega un solo evento al calendario, asignando un ID único si no existe    |
| `deleteEvent(id: string)`                        | `void`                | Elimina un evento por su ID                                                |
| `editEvent(id: string)`                          | `void`                | Edita un evento por su ID (actualmente no modifica propiedades)            |
| `getEventList()`                                 | `IBmbCalendarEvent[]` | Devuelve la lista actual de eventos del calendario                         |
| `setIsLoading(state: boolean)`                   | `void`                | Actualiza el estado de carga del calendario                                |
| `getIsLoading()`                                 | `boolean`             | Devuelve el estado actual de carga del calendario                          |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { BmbCalendarService } from './services/calendar/calendar.service';
import { IBmbCalendarEvent } from './components/bmb-calendar/types';

@Component({
  selector: 'app-calendar',
  template: `
    <div *ngIf="calendarService.getIsLoading()">Cargando...</div>
    <ul>
      <li *ngFor="let event of calendarService.getEventList()">
        {{ event.title }} - {{ event.date }}
        <button (click)="delete(event.id)">Eliminar</button>
      </li>
    </ul>
    <button (click)="addSampleEvent()">Agregar evento</button>
  `,
})
export class CalendarComponent {
  constructor(public calendarService: BmbCalendarService) {}

  addSampleEvent() {
    this.calendarService.addEvent({
      title: 'Reunión',
      date: '2025-10-15',
      id: undefined,
    });
  }

  delete(id: string) {
    this.calendarService.deleteEvent(id);
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable, signal)
- Tipos: `IBmbCalendarEvent` (definido en `../../components/bmb-calendar/types`)
- Utilidad: `getUUID` (definido en `../../utils/utils`)

---

## Notas adicionales

- **Accesibilidad:** El servicio no afecta directamente la accesibilidad, pero facilita la gestión centralizada de datos para componentes que sí deben ser accesibles.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular.
- **Rendimiento:** Utiliza señales reactivas para optimizar la actualización y sincronización de datos entre componentes.
- **Buenas prácticas:** Centraliza la gestión del estado de eventos de calendario, evitando duplicidad y facilitando la actualización global de la información. El método `editEvent` está preparado para futuras ampliaciones (actualmente no modifica propiedades).

---
