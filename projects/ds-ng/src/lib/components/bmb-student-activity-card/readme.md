# BmbStudentActivityCardComponent

## Descripción general

`BmbStudentActivityCardComponent` es un componente standalone de Angular diseñado para mostrar información detallada sobre actividades estudiantiles, como eventos académicos, de vida universitaria, generales o "save the date". Presenta fechas, título, ubicación, responsable, tipo de evento, imagen y una insignia personalizada, adaptando el estilo visual según el tipo de actividad y el contexto de uso (lista o tarjeta).

---

## Props / Parámetros

| Propiedad     | Tipo            | Descripción                                                    | Valor por defecto       | Obligatorio |
| ------------- | --------------- | -------------------------------------------------------------- | ----------------------- | ----------- |
| `startDate`   | `string`        | Fecha de inicio de la actividad (formato configurable)         | -                       | Sí          |
| `endDate`     | `string`        | Fecha de fin de la actividad (formato configurable)            | -                       | Sí          |
| `title`       | `string`        | Título de la actividad                                         | `''`                    | No          |
| `location`    | `string`        | Ubicación de la actividad                                      | `''`                    | No          |
| `responsible` | `string`        | Responsable o persona encargada                                | `''`                    | No          |
| `type`        | `IBmbEventType` | Tipo de evento (`academic`, `life`, `events`, `save_the_date`) | `'academic'`            | No          |
| `isListItem`  | `boolean`       | Indica si se muestra como elemento de lista                    | `false`                 | No          |
| `image`       | `string`        | URL de la imagen asociada                                      | `''`                    | No          |
| `dateFormat`  | `string`        | Formato de fecha para parseo con Luxon                         | `'yyyy-MM-dd HH:mm:ss'` | No          |
| `badgeText`   | `string`        | Texto de la insignia/badge                                     | `''`                    | No          |

---

## Ejemplo de uso

```html
<bmb-student-activity-card
  [startDate]="'2025-10-20 09:00:00'"
  [endDate]="'2025-10-20 12:00:00'"
  [title]="'Taller de Innovación'"
  [location]="'Aula Magna, Campus Monterrey'"
  [responsible]="'Dra. Ana Pérez'"
  [type]="'academic'"
  [isListItem]="false"
  [image]="'/assets/taller.jpg'"
  [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
  [badgeText]="'Inscríbete'"
></bmb-student-activity-card>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `luxon` (DateTime)
- `BmbBadgeComponent`
- Tipos: `IBmbEventType`, `IBbmBgAppearance`

---

## Notas adicionales

- **Accesibilidad:** El componente puede integrarse con etiquetas descriptivas y roles ARIA para mejorar la experiencia con tecnologías asistivas. Se recomienda complementar con texto alternativo para imágenes.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta diferentes tipos de actividades y formatos de fecha.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Adapta el estilo visual y la insignia según el tipo de evento y el contexto (lista o tarjeta).
- **Buenas prácticas:** Utiliza Luxon para el manejo robusto de fechas y métodos para gestionar clases CSS y tipos de insignia de forma eficiente.

---
