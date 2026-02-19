# BmbProgressBarComponent

## Descripción general

`BmbProgressBarComponent` es un componente standalone de Angular diseñado para mostrar barras de progreso con diferentes estilos y variaciones visuales. Permite indicar el avance de tareas, procesos o conteos, mostrando información adicional como títulos, enlaces y formatos personalizados de texto. Es útil en dashboards, formularios, procesos de carga y cualquier contexto donde se requiera comunicar el progreso de manera clara y accesible.

---

## Props / Parámetros

| Propiedad    | Tipo                                         | Descripción                                      | Valor por defecto           | Obligatorio |
| ------------ | -------------------------------------------- | ------------------------------------------------ | --------------------------- | ----------- |
| `type`       | `IBmbProgressBarTypes`                       | Tipo de barra (`simple`, `counter`, `container`) | `'simple'`                  | No          |
| `totalCount` | `number`                                     | Valor total para calcular el progreso            | `0`                         | Sí          |
| `counter`    | `number`                                     | Valor actual del progreso                        | `0`                         | Sí          |
| `title`      | `string`                                     | Título o etiqueta descriptiva                    | `''`                        | No          |
| `appearance` | `IBmbProgressBarVariations`                  | Variación visual (`info`, `warning`, `error`)    | `'info'`                    | No          |
| `textLink`   | `string`                                     | Texto del enlace asociado                        | `''`                        | No          |
| `href`       | `string`                                     | URL del enlace asociado                          | `''`                        | No          |
| `target`     | `IBmbTargetLink`                             | Destino del enlace (`_blank`, `_self`, etc.)     | `'_blank'`                  | No          |
| `textFormat` | `(counter: string, total: string) => string` | Función para formatear el texto del contador     | `(c, t) => \`\${c}/\${t}\`` | No          |

---

## Ejemplo de uso

```html
<bmb-progress-bar
  [type]="'counter'"
  [totalCount]="100"
  [counter]="75"
  [componentTitle]="'Progreso de inscripción'"
  [appearance]="'info'"
  [textLink]="'Ver detalles'"
  [href]="'/detalle-progreso'"
  [target]="'_self'"
  [textFormat]="(counter, total) => `${counter} de ${total} completados`"
>
</bmb-progress-bar>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbIconComponent`
- Tipos: `IBmbProgressBarTypes`, `IBmbProgressBarVariations`, `IBmbTargetLink`

---

## Notas adicionales

- **Accesibilidad:** El componente puede mostrar títulos y enlaces descriptivos, facilitando la comprensión para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite personalizar el formato del texto y el destino de los enlaces.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el tipo de barra, la variación visual y el formato del texto según las necesidades del proyecto.
- **Buenas prácticas:** Limita el valor de progreso entre 0 y 100 para evitar inconsistencias visuales y asegura que el texto mostrado sea claro y relevante.

---
