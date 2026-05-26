# BmbStatCounterComponent

## Descripción general

`BmbStatCounterComponent` es un componente standalone de Angular diseñado para mostrar y gestionar un contador de pasos o estados en procesos, flujos o indicadores visuales. Permite visualizar el progreso, seleccionar el paso activo y emitir eventos al interactuar con los pasos, facilitando la navegación y el seguimiento en interfaces de usuario como formularios, tutoriales o dashboards.

---

## Props / Parámetros

| Propiedad    | Tipo     | Descripción                        | Valor por defecto | Obligatorio |
| ------------ | -------- | ---------------------------------- | ----------------- | ----------- |
| `activeStep` | `number` | Índice del paso actualmente activo | `0`               | No          |
| `totalSteps` | `number` | Número total de pasos a mostrar    | `0`               | No          |

### Outputs

| Output        | Tipo     | Descripción                                                        |
| ------------- | -------- | ------------------------------------------------------------------ |
| `onStepPress` | `number` | Se emite al hacer clic en un paso, enviando el índice seleccionado |

---

## Ejemplo de uso

```html
<bmb-stat-counter
  [activeStep]="2"
  [totalSteps]="5"
  (onStepPress)="handleStepChange($event)"
></bmb-stat-counter>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Angular core: `EventEmitter`, `ChangeDetectionStrategy`, `ViewEncapsulation`

---

## Notas adicionales

- **Accesibilidad:** El componente puede integrarse con etiquetas ARIA y roles para mejorar la experiencia con tecnologías asistivas. Se recomienda indicar visualmente el paso activo y permitir navegación por teclado.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en flujos de pasos, tutoriales, formularios o dashboards.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el número de pasos y el paso activo dinámicamente, y emitir eventos para manejar la lógica de navegación.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción y utiliza métodos para generar la estructura de pasos de forma eficiente.

---
