# TabsService

## Descripción general

`TabsService` es un servicio singleton de Angular que gestiona el estado y la selección de pestañas (tabs) en la aplicación. Utiliza `BehaviorSubject` de RxJS para almacenar la lista de pestañas y la pestaña seleccionada, permitiendo la suscripción reactiva a los cambios de estado desde cualquier componente. Es ideal para interfaces con navegación por pestañas, paneles dinámicos y vistas que requieren sincronización centralizada de la selección de pestañas.

---

## Props / Parámetros

| Propiedad         | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `tabs$`           | `Observable<IBmbTab[]>`     | Observable de la lista de pestañas                                 | `[]`              | No          |
| `selectedTab$`    | `Observable<IBmbTab \| null>`| Observable de la pestaña seleccionada                              | `null`            | No          |

### Métodos

| Método         | Tipo de retorno   | Descripción                                  |
|----------------|-------------------|----------------------------------------------|
| `setTabs(tabs: IBmbTab[])` | `void` | Actualiza la lista de pestañas               |
| `selectTab(tab: IBmbTab)`  | `void` | Selecciona una pestaña específica            |
| `resetTabs()`              | `void` | Reinicia la lista de pestañas y la selección |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { TabsService } from './services/tabs/tabs.service';
import { IBmbTab } from './components/bmb-tabs/bmb-tabs.component';

@Component({
  selector: 'app-demo-tabs',
  template: `
    <div *ngFor="let tab of tabs">
      <button (click)="select(tab)">{{ tab.label }}</button>
    </div>
    <div *ngIf="selectedTab">
      <h2>Pestaña seleccionada: {{ selectedTab.label }}</h2>
    </div>
  `,
})
export class DemoTabsComponent {
  tabs: IBmbTab[] = [
    { label: 'Inicio', id: 'home' },
    { label: 'Perfil', id: 'profile' },
  ];
  selectedTab: IBmbTab | null = null;

  constructor(private tabsService: TabsService) {
    this.tabsService.setTabs(this.tabs);
    this.tabsService.selectedTab$.subscribe(tab => this.selectedTab = tab);
  }

  select(tab: IBmbTab) {
    this.tabsService.selectTab(tab);
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable)
- `rxjs` (BehaviorSubject, Observable)
- Tipos: `IBmbTab` (definido en `../../components/bmb-tabs/bmb-tabs.component`)

---

## Notas adicionales

- **Accesibilidad:** El servicio no afecta directamente la accesibilidad, pero facilita la gestión centralizada de pestañas para componentes que sí deben ser accesibles y navegables por teclado.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular y funciona con cualquier tipo de pestañas compatibles con la interfaz `IBmbTab`.
- **Rendimiento:** Utiliza observables para optimizar la actualización y sincronización del estado de pestañas entre componentes.
- **Buenas prácticas:** Centraliza la gestión de pestañas y selección, evitando duplicidad y facilitando la actualización global del estado de navegación por pestañas.

---
