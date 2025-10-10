# BmbProgressCircleComponent

## Descripción general

`BmbProgressCircleComponent` es un componente standalone de Angular diseñado para mostrar el progreso de una tarea o proceso en formato circular. Permite personalizar el porcentaje, el título, la etiqueta de valor, el color y el estilo visual, adaptándose a diferentes estados como éxito, advertencia o error. Es útil en dashboards, indicadores de avance, métricas financieras y cualquier contexto donde se requiera una representación gráfica y atractiva del progreso.

---

## Props / Parámetros

| Propiedad            | Tipo                                         | Descripción                                                        | Valor por defecto | Obligatorio |
|----------------------|----------------------------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `valueLabel`         | `string`                                     | Etiqueta de valor a mostrar en el centro del círculo               | -                 | No          |
| `percent`            | `number`                                     | Porcentaje de progreso (0-100)                                     | `0`               | No          |
| `showValueLabel`     | `boolean`                                    | Muestra la etiqueta de valor en el círculo                         | `false`           | No          |
| `title`              | `string \| string[]`                         | Título o títulos a mostrar en el círculo                           | `''`              | No          |
| `showTitle`          | `boolean`                                    | Muestra el título en el círculo                                    | `false`           | No          |
| `showBackground`     | `boolean`                                    | Muestra el fondo del círculo                                       | `true`            | No          |
| `showRestBackground` | `boolean`                                    | Muestra el fondo del resto del círculo                             | `false`           | No          |
| `fillPathStatus`     | `'gray' \| 'success' \| 'error' \| 'warning'`| Estado visual del trazo de progreso                                | `'success'`       | No          |
| `fullFillPathStatus` | `boolean`                                    | Si el círculo debe estar completamente coloreado                   | `false`           | No          |

---

## Ejemplo de uso

```html
<bmb-progress-circle
  [valueLabel]="'$10,000'"
  [percent]="75"
  [showValueLabel]="true"
  [title]="'Total recaudado'"
  [showTitle]="true"
  [showBackground]="true"
  [fillPathStatus]="'info'"
  [fullFillPathStatus]="false"
></bmb-progress-circle>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- Clase interna: `CircleProgressOptions`
- Interfaz: `BmbProgressCircleOptionsInterface`

---

## Notas adicionales

- **Accesibilidad:** El componente permite mostrar títulos y etiquetas descriptivas, facilitando la comprensión para todas las personas. Se recomienda complementar con texto alternativo si se usa en contextos críticos.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta personalización visual para diferentes estados y estilos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el radio, el color, el porcentaje y el formato del contenido central, adaptándose a métricas financieras, educativas o de avance.
- **Buenas prácticas:** Limita el porcentaje entre 0 y 100 para evitar inconsistencias visuales y asegura que los textos sean claros y relevantes.

---
