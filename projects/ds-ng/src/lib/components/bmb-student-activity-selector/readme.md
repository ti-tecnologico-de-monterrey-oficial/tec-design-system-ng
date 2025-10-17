# BmbStudentActivitySelectorComponent

## Descripción general

`BmbStudentActivitySelectorComponent` es un componente standalone de Angular diseñado para gestionar la selección y visualización de pestañas relacionadas con actividades estudiantiles. Permite agrupar y alternar entre diferentes categorías o tipos de actividades, aplicando una apariencia visual consistente a todas las pestañas hijas. Es ideal para interfaces donde se requiere organizar eventos, talleres o actividades en secciones diferenciadas y accesibles.

---

## Props / Parámetros

| Propiedad   | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `appearance`| `IStudentActivityAppearance`| Apariencia visual aplicada a todas las pestañas (`academic`, etc.) | `'academic'`      | No          |

---

## Ejemplo de uso

```html
<bmb-student-activity-selector [appearance]="'academic'">
  <bmb-tab-student-activity
    [label]="'Académicas'"
    [active]="true"
  >
    <!-- Contenido de actividades académicas -->
  </bmb-tab-student-activity>
  <bmb-tab-student-activity
    [label]="'Vida universitaria'"
  >
    <!-- Contenido de actividades de vida universitaria -->
  </bmb-tab-student-activity>
</bmb-student-activity-selector>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbTabStudentActivityComponent`
- Tipos: `IStudentActivityAppearance`
- Angular core: `ChangeDetectorRef`, `QueryList`, `ContentChildren`, `AfterContentInit`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el estado activo de las pestañas, facilitando la navegación por teclado y tecnologías asistivas. Se recomienda complementar con roles y atributos ARIA.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite agrupar múltiples pestañas de actividades estudiantiles.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y `markForCheck` para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite aplicar una apariencia visual consistente a todas las pestañas hijas, adaptándose a diferentes tipos de actividades.
- **Buenas prácticas:** Selecciona automáticamente la primera pestaña si ninguna está activa y propaga la apariencia a todas las pestañas hijas para mantener la coherencia visual.

---
