# BmbStepProgressBarComponent

## Descripción general

`BmbStepProgressBarComponent` es un componente standalone de Angular que permite visualizar y gestionar el progreso en flujos multi-etapa, como formularios, procesos o tutoriales. Soporta orientación horizontal, vertical y modo panel, proyecta contenido específico por paso, y adapta automáticamente la visualización para dispositivos móviles y tabletas. Permite personalizar etiquetas, estilos y controlar la interacción con los pasos.

---

## Props / Parámetros

| Propiedad         | Tipo                                           | Descripción                              | Valor por defecto | Obligatorio |
| ----------------- | ---------------------------------------------- | ---------------------------------------- | ----------------- | ----------- |
| `activeStep`      | `number` (model)                               | Índice del paso actualmente activo       | `0`               | No          |
| `totalSteps`      | `number`                                       | Número total de pasos a mostrar          | `0`               | Sí          |
| `size`            | `'normal' \| 'default' \| 'small' \| 'medium'` | Tamaño visual de la barra de pasos       | `'normal'`        | No          |
| `freeze`          | `boolean`                                      | Deshabilita la interacción con los pasos | `false`           | No          |
| `type`            | `'horizontal' \| 'vertical' \| 'step-panel'`   | Orientación o modo de visualización      | `'vertical'`      | No          |
| `labelSteps`      | `string[]`                                     | Etiquetas para cada paso                 | `[]`              | No          |
| `labelComplete`   | `string`                                       | Etiqueta para pasos completados          | `'Completo'`      | No          |
| `labelIncomplete` | `string`                                       | Etiqueta para pasos pendientes           | `'Pendiente'`     | No          |
| `stepTemplates`   | `TemplateRef<any>[]`                           | Plantillas personalizadas para cada paso | `[]`              | No          |

### Outputs

| Output             | Tipo     | Descripción                              |
| ------------------ | -------- | ---------------------------------------- |
| `onStepPress`      | `number` | Se emite al seleccionar un paso          |
| `onStepPanelPress` | `number` | Se emite al seleccionar un panel de paso |

---

## Ejemplo de uso

```html
<bmb-step-progress-bar
  [activeStep]="1"
  [totalSteps]="4"
  [size]="'medium'"
  [type]="'horizontal'"
  [labelSteps]="['Inicio', 'Datos', 'Confirmación', 'Finalizado']"
  [labelComplete]="'Hecho'"
  [labelIncomplete]="'Por completar'"
  [freeze]="false"
  (onStepPress)="handleStepChange($event)"
  (onStepPanelPress)="handlePanelStep($event)"
></bmb-step-progress-bar>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Angular core: `TemplateRef`, `ChangeDetectionStrategy`, `ViewEncapsulation`, `DestroyRef`, `signal`, `computed`
- MediaQuery API para detección de dispositivos móviles/tablet

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo, facilitando la navegación por teclado y tecnologías asistivas. Las etiquetas se truncan automáticamente para evitar desbordamientos en dispositivos móviles.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta orientación horizontal, vertical y modo panel, adaptándose a diferentes layouts y dispositivos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite proyectar contenido específico para cada paso mediante plantillas, ajustar etiquetas y estilos visuales, y controlar la interacción con los pasos.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la navegación y selección de pasos, y utiliza lógica interna para truncar etiquetas y gestionar el estado visual de forma eficiente.

---
