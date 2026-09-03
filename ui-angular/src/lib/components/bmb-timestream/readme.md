# BmbTimestreamComponent

## Descripción general

`BmbTimestreamComponent` es un componente standalone de Angular diseñado para visualizar y gestionar líneas de tiempo de eventos, hitos y actividades. Permite mostrar eventos agrupados por meses y días, seleccionar fechas y eventos, ver detalles en modales, y navegar entre instancias de eventos. Soporta personalización de formato de fecha, idioma, estilos visuales y proyección de contenido adicional. Es ideal para cronogramas académicos, históricos, de proyectos o cualquier flujo temporal interactivo.

---

## Props / Parámetros

| Propiedad    | Tipo               | Descripción                                                  | Valor por defecto                           | Obligatorio |
| ------------ | ------------------ | ------------------------------------------------------------ | ------------------------------------------- | ----------- |
| `isMicro`    | `boolean`          | Modo compacto para visualización                             | `false`                                     | No          |
| `lang`       | `string`           | Idioma para nombres de meses y fechas (`'es'`, `'en'`, etc.) | `'es'`                                      | No          |
| `dateFormat` | `string`           | Formato de fecha para parseo con Luxon                       | `'dd/MM/yyyy'`                              | No          |
| `events`     | `ITimelineEvent[]` | Lista de eventos a mostrar en la línea de tiempo             | `[]`                                        | Sí          |
| `clamp`      | `IBmbClamp`        | Restricciones visuales: min, max y tamaño del componente     | `{ min: 100, max: '100dvh', size: '100%' }` | No          |

---

## Ejemplo de uso

```html
<bmb-timestream
  [lang]="'es'"
  [dateFormat]="'dd/MM/yyyy'"
  [events]="[
    { title: 'Inicio de semestre', start: '20/08/2025', end: '20/08/2025', type: 'active' },
    { title: 'Examen final', start: '10/12/2025', end: '10/12/2025', type: 'pending' }
  ]"
  [clamp]="{ min: 200, max: '80dvh', size: '100%' }"
></bmb-timestream>
```

---

## Dependencias

- `@angular/core` (ChangeDetectionStrategy, ViewEncapsulation, input, signal, TemplateRef, ViewChild, SimpleChanges)
- `@angular/common` (CommonModule)
- `luxon` (DateTime, Info)
- `BmbTimestreamErrorComponent`
- `BmbHitoListComponent`
- `BmbTimestreamDetailsComponent`
- `BmbUserImageComponent`
- `BmbTabsComponent`
- `BmbButtonDirective`
- `BmbDividerComponent`
- `BmbHitoCardComponent`
- `BmbBadgeComponent`
- Servicio: `BmbNativeModalService`
- Tipos: `ITimelineEvent`, `ISelectedDate`, `ITimelineEventParsed`, `IBmbTimelineCustomEvent`, `IBmbNativeModal`, `IBbmBgAppearance`, `IBmbClamp`

---

## Notas adicionales

- **Accesibilidad:** El componente gestiona el foco y el estado activo de fechas y eventos, facilitando la navegación por teclado y tecnologías asistivas. Los modales y tabs son accesibles y pueden recibir foco automáticamente.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta personalización de idioma, formato de fecha y estilos visuales.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y señales reactivas para optimizar el renderizado y la actualización de estado.
- **Personalización:** Permite definir restricciones visuales (`clamp`), proyectar contenido adicional en modales y tabs, y adaptar el modo de visualización (`isMicro`).
- **Gestión de eventos:** Agrupa y ordena eventos por meses y días, permite seleccionar fechas y eventos, y muestra detalles en modales personalizados.
- **Buenas prácticas:** Emite cambios de selección y utiliza métodos robustos para parsear, ordenar y mostrar eventos, asegurando una experiencia fluida y segura.

---
