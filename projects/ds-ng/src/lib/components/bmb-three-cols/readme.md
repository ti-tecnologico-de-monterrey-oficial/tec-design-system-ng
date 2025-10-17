# BmbThreeColsComponent

## Descripción general

`BmbThreeColsComponent` es un componente standalone de Angular diseñado para estructurar contenido en tres columnas flexibles: izquierda, principal y derecha. Permite proyectar contenido personalizado en cada columna mediante templates, ajustar el espacio entre columnas, la alineación y la justificación, y expandir la columna principal según las necesidades de la interfaz. Es ideal para layouts de dashboards, formularios complejos y vistas con múltiples paneles.

---

## Props / Parámetros

| Propiedad         | Tipo                | Descripción                                                        | Valor por defecto | Obligatorio |
|-------------------|---------------------|--------------------------------------------------------------------|-------------------|-------------|
| `gapSize`         | `SizeNames`         | Tamaño del espacio (gap) entre columnas (`xs`, `s`, `m`, `l`, etc.)| `'m'`             | No          |
| `justify`         | `IJustifyOptions`   | Justificación de las columnas (`spaceBetween`, `center`, etc.)     | `'spaceBetween'`  | No          |
| `alignItems`      | `IAlignItemsOptions`| Alineación vertical de las columnas (`center`, `start`, etc.)      | `'center'`        | No          |
| `expandMainColumn`| `boolean`           | Expande la columna principal para ocupar más espacio               | `false`           | No          |

### ContentChild templates

| Template ref         | Tipo             | Descripción                                  |
|----------------------|------------------|----------------------------------------------|
| `bmbLeftContent`     | `TemplateRef<any>` | Contenido proyectado en la columna izquierda |
| `bmbMainContent`     | `TemplateRef<any>` | Contenido proyectado en la columna principal |
| `bmbRightContent`    | `TemplateRef<any>` | Contenido proyectado en la columna derecha   |

---

## Ejemplo de uso

```html
<bmb-three-cols
  [gapSize]="'l'"
  [justify]="'center'"
  [alignItems]="'start'"
  [expandMainColumn]="true"
>
  <ng-template #bmbLeftContent>
    <div>Menú lateral</div>
  </ng-template>
  <ng-template #bmbMainContent>
    <div>Contenido principal</div>
  </ng-template>
  <ng-template #bmbRightContent>
    <div>Panel de acciones</div>
  </ng-template>
</bmb-three-cols>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbLayoutDirective`
- `BmbLayoutItemDirective`
- Tipos: `SizeNames`, `IJustifyOptions`, `IAlignItemsOptions`
- Angular core: `TemplateRef`, `ContentChild`, `input`, `Component`, `ChangeDetectionStrategy`, `ViewEncapsulation`

---

## Notas adicionales

- **Accesibilidad:** El componente utiliza flexbox y puede integrarse con roles y atributos ARIA para mejorar la experiencia con tecnologías asistivas. Se recomienda estructurar el contenido proyectado con encabezados y etiquetas semánticas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y permite proyectar cualquier tipo de contenido en las tres columnas.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el espacio, la alineación y la justificación de las columnas, así como expandir la columna principal según el contexto visual.
- **Buenas prácticas:** Utiliza templates para proyectar contenido desacoplado y facilita la creación de layouts flexibles y reutilizables.

---
