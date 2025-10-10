# BmbLegendComponent

## Descripción general

`BmbLegendComponent` es un componente standalone de Angular diseñado para mostrar leyendas o indicadores visuales en la interfaz. Permite asociar una etiqueta (`label`) y un valor (`value`) junto con una variación visual (`indicatorAppearance`) que comunica el estado o tipo de información (por ejemplo: éxito, advertencia, error, marca, etc.). Es útil para resúmenes, dashboards, tarjetas informativas y cualquier contexto donde se requiera destacar información clave de manera clara y accesible.

---

## Props / Parámetros

| Propiedad            | Tipo                      | Descripción                                                        | Valor por defecto | Obligatorio |
|----------------------|---------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `label`              | `string`                  | Etiqueta descriptiva de la leyenda                                 | `''`              | No          |
| `value`              | `string`                  | Valor o información principal a mostrar                            | `''`              | No          |
| `indicatorAppearance`| `IBmbLegendVariations`    | Variación visual del indicador (`normal`, `strong`, `success`, `info`, `warning`, `error`, `brand`) | `'normal'`        | No          |

---

## Ejemplo de uso

```html
<bmb-legend
  [label]="'Estado'"
  [value]="'Activo'"
  [indicatorAppearance]="'success'"
></bmb-legend>
```

---

## Dependencias

- `@angular/common` (CommonModule)

---

## Notas adicionales

- **Accesibilidad:** El componente utiliza variaciones visuales para comunicar estados, facilitando la comprensión para todas las personas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y es útil en dashboards, tarjetas, listas y resúmenes.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar la apariencia del indicador según el contexto y el tipo de información a mostrar.
- **Buenas prácticas:** Utiliza propiedades simples y claras para facilitar su uso y mantenimiento.

---
