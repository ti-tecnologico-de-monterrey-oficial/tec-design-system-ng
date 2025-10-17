# BmbProjectionContentService

## Descripción general

`BmbProjectionContentService` es un servicio singleton de Angular que gestiona la proyección dinámica de contenido en un portal global (`BmbPortalComponent`). Permite abrir y cerrar contenido proyectado (componentes o templates) en diferentes modos visuales (`over`, `partial`, `outside`), con opciones avanzadas como fijar tamaño al elemento de referencia, contexto de entrada/salida, backdrop y enfoque automático. Es ideal para modales, popovers, tooltips, overlays y cualquier escenario donde se requiera proyectar contenido fuera del flujo normal del DOM.

---

## Props / Parámetros

| Propiedad         | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `contentList`     | `signal<IBmbProjectionContent \| null>` | Señal reactiva que almacena el contenido proyectado actual | `null`            | No          |

### IBmbProjectionContent

| Propiedad        | Tipo                                 | Descripción                                                        | Valor por defecto | Obligatorio |
|------------------|--------------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `content`        | `TemplateRef<any> \| Type<any> \| null` | Componente o template a proyectar                                 | `null`            | Sí          |
| `targetRef`      | `HTMLElement \| null`                | Elemento de referencia para posicionar el contenido                | `null`            | No          |
| `mode`           | `'over' \| 'partial' \| 'outside'`   | Modo de proyección visual                                          | `'over'`          | No          |
| `fixSizeToRef`   | `boolean`                            | Fija el tamaño al elemento de referencia                           | `false`           | No          |
| `inputContext`   | `{ [key: string]: any }`             | Contexto de entrada para el contenido proyectado                   | `{}`              | No          |
| `showBackdrop`   | `boolean`                            | Muestra fondo (backdrop) detrás del contenido proyectado           | `false`           | No          |
| `outputContext`  | `{ [key: string]: (value: any) => void }` | Callbacks para eventos de salida del contenido proyectado      | `{}`              | No          |
| `focusOnOpen`    | `boolean`                            | Enfoca el contenido al abrirlo                                     | `false`           | No          |

---

## Ejemplo de uso

```typescript
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BmbProjectionContentService, IBmbProjectionContent } from './services/projection/projection.service';

@Component({
  selector: 'app-demo-projection',
  template: `
    <ng-template #customContent let-data>
      <div>Contenido proyectado: {{ data }}</div>
    </ng-template>
    <button (click)="abrir()">Abrir contenido</button>
    <button (click)="cerrar()">Cerrar contenido</button>
  `,
})
export class DemoProjectionComponent {
  @ViewChild('customContent') customContent!: TemplateRef<any>;

  constructor(private projectionService: BmbProjectionContentService) {}

  abrir() {
    const content: IBmbProjectionContent = {
      content: this.customContent,
      inputContext: { data: 'Ejemplo' },
      mode: 'over',
      showBackdrop: true,
      focusOnOpen: true,
    };
    this.projectionService.openContent(content);
  }

  cerrar() {
    this.projectionService.closeContent();
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable, signal, ApplicationRef, EnvironmentInjector, ComponentRef, createComponent, EmbeddedViewRef, TemplateRef, Type)
- Componente: `BmbPortalComponent`
- Tipos: `IBmbProjectionContent`, `IBmbProjectedContentMode`

---

## Notas adicionales

- **Accesibilidad:** Permite proyectar contenido con enfoque automático y fondo, facilitando la gestión de modales y overlays accesibles. Se recomienda que el contenido proyectado implemente roles y atributos ARIA.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular y funciona con cualquier tipo de contenido compatible con Angular templates o componentes.
- **Rendimiento:** Utiliza señales reactivas para optimizar la actualización y sincronización del contenido proyectado. El portal se crea solo una vez y se reutiliza.
- **Personalización:** Permite definir el modo de proyección, contexto de entrada/salida, fondo, tamaño y enfoque, facilitando la construcción de overlays y modales avanzados.
- **Buenas prácticas:** Centraliza la gestión de contenido proyectado, evita duplicidad y facilita el cierre y apertura dinámica de contenido en el portal global.

---
