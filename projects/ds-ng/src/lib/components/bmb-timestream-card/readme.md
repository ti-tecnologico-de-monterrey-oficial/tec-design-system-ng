# BmbTimestreamCardComponent

## Descripción general

`BmbTimestreamCardComponent` es un componente standalone de Angular que encapsula la visualización de una línea de tiempo de eventos (timestream) dentro de una tarjeta, integrando filtros avanzados, navegación local, encabezados personalizados y estilos visuales configurables. Permite mostrar eventos agrupados, aplicar filtros por tipo e instancia, alternar la visibilidad del panel de filtros y proyectar contenido adicional en la tarjeta. Es ideal para cronogramas académicos, históricos, de proyectos o cualquier flujo temporal interactivo en dashboards y portales.

---

## Props / Parámetros

| Propiedad          | Tipo               | Descripción                                                  | Valor por defecto | Obligatorio |
| ------------------ | ------------------ | ------------------------------------------------------------ | ----------------- | ----------- |
| `title`            | `string`           | Título principal de la tarjeta                               | -                 | Sí          |
| `subtitle`         | `string`           | Subtítulo o descripción breve                                | `''`              | No          |
| `dataLocalNav`     | `IBmbDataTopBar[]` | Datos para navegación local en la tarjeta                    | `[]`              | No          |
| `icon`             | `string`           | Ícono principal de la tarjeta                                | `'trending_up'`   | No          |
| `bgIconAppearance` | `IBmbColor`        | Color de fondo del ícono                                     | `'mitec-red'`     | No          |
| `lang`             | `string`           | Idioma para nombres de meses y fechas (`'es'`, `'en'`, etc.) | `'es'`            | No          |
| `dateFormat`       | `string`           | Formato de fecha para parseo con Luxon                       | `'dd/MM/yyyy'`    | No          |
| `events`           | `ITimelineEvent[]` | Lista de eventos a mostrar en la línea de tiempo             | `[]`              | Sí          |

### Propiedades internas y filtros

| Propiedad          | Tipo                       | Descripción                                | Valor por defecto                       |
| ------------------ | -------------------------- | ------------------------------------------ | --------------------------------------- |
| `clamp`            | `IBmbClamp`                | Restricciones visuales del timestream      | `{ min: 0, max: '100%', size: '100%' }` |
| `isMobile`         | `boolean`                  | Indica si la vista es móvil                | `false`                                 |
| `actionHeaders`    | `IBmbActionHeader[]`       | Encabezados de acción para la tarjeta      | `[ { icon: 'tune', ... } ]`             |
| `isFiltersEnabled` | `boolean`                  | Estado de visibilidad del panel de filtros | `false`                                 |
| `filteredEvents`   | `signal<ITimelineEvent[]>` | Eventos filtrados para mostrar             | `[]`                                    |
| `filters`          | `IBmbControlType[]`        | Configuración de filtros disponibles       | Ver definición en código                |

---

## Ejemplo de uso

```html
<bmb-timestream-card
  [title]="'Cronograma académico'"
  [subtitle]="'Eventos importantes del semestre'"
  [dataLocalNav]="[{ label: 'Inicio', link: '/inicio' }]"
  [icon]="'calendar_today'"
  [bgIconAppearance]="'mitec-blue'"
  [lang]="'es'"
  [dateFormat]="'dd/MM/yyyy'"
  [events]="eventos"
></bmb-timestream-card>
```

```typescript
const eventos: ITimelineEvent[] = [
  {
    title: 'Inicio de semestre',
    start: '20/08/2025',
    end: '20/08/2025',
    type: 'active',
  },
  {
    title: 'Examen final',
    start: '10/12/2025',
    end: '10/12/2025',
    type: 'pending',
  },
];
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbHomeCardComponent`
- `BmbIconComponent`
- `BmbTimestreamComponent`
- `BmbFilterCardComponent`
- `BmbCardComponent`
- `BmbCardContentComponent`
- Tipos: `IBmbColor`, `IBmbDataTopBar`, `IBmbClamp`, `ITimelineEvent`, `IBmbTimestreamFilters`, `IBmbControlType`, `IBmbActionHeader`
- Utilidad: `timestreamFilter` (filtrado de eventos)

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo de filtros y eventos, facilitando la navegación por teclado y tecnologías asistivas. Los encabezados y acciones pueden recibir foco y disparar eventos.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta personalización de idioma, formato de fecha, colores y navegación local.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite definir filtros avanzados, alternar la visibilidad del panel de filtros, proyectar contenido adicional y ajustar el estilo visual de la tarjeta.
- **Gestión de eventos:** Aplica filtros por tipo e instancia, agrupa y ordena eventos, y actualiza la visualización en tiempo real según la interacción.
- **Buenas prácticas:** Emite cambios de selección y utiliza métodos robustos para filtrar y mostrar eventos, asegurando una experiencia fluida y segura.

---
