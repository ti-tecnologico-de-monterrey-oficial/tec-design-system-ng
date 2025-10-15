# BmbValueCounterComponent

## Descripción general

`BmbValueCounterComponent` es un componente standalone de Angular diseñado para mostrar un contador de valor con etiqueta y progreso visual. Es útil para dashboards, tarjetas de resumen, indicadores de avance o cualquier interfaz donde se requiera mostrar métricas, porcentajes o valores destacados junto a una descripción.

---

## Props / Parámetros

| Propiedad  | Tipo     | Descripción                                 | Valor por defecto | Obligatorio |
|------------|----------|---------------------------------------------|-------------------|-------------|
| `label`    | `string` | Etiqueta descriptiva del contador           | `''`              | No          |
| `value`    | `string` | Valor principal a mostrar                   | `''`              | No          |
| `progress` | `string` | Indicador de progreso (ej. porcentaje)      | `''`              | No          |

---

## Ejemplo de uso

```html
<bmb-value-counter
  [label]="'Tareas completadas'"
  [value]="'15'"
  [progress]="'75%'"
></bmb-value-counter>
```

---

## Dependencias

- `@angular/core` (Component, Input, ViewEncapsulation)
- `@angular/common` (CommonModule)

---

## Notas adicionales

- **Accesibilidad:** Se recomienda complementar el componente con atributos ARIA y descripciones adicionales si se utiliza para mostrar información relevante para tecnologías asistivas.
- **Compatibilidad:** Funciona en cualquier template Angular y puede integrarse en tarjetas, paneles o dashboards.
- **Rendimiento:** Al ser un componente simple, su renderizado es eficiente y no requiere gestión de estado compleja.
- **Personalización:** El estilo visual puede ajustarse mediante CSS y el contenido de los parámetros puede adaptarse a diferentes métricas o indicadores.
- **Buenas prácticas:** Mantén los valores y etiquetas claros y concisos para facilitar la comprensión rápida de la información mostrada.

---
