# BmbNavigationBarComponent

## Descripción general

`BmbNavigationBarComponent` es un componente standalone de Angular diseñado para mostrar una barra de navegación con acciones personalizables, íconos y opciones de alineación y espaciado. Permite organizar accesos rápidos, botones y acciones en la parte superior o inferior de la interfaz, facilitando la navegación y la interacción en aplicaciones modernas.

---

## Props / Parámetros

| Propiedad     | Tipo                       | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------|----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `actionHeaders` | `IBmbActionHeader[]`     | Lista de acciones con íconos y funciones asociadas                 | `[]`              | No          |
| `iconSize`      | `number \| undefined`    | Tamaño de los íconos en píxeles                                    | -                 | No          |
| `gapSize`       | `SizeNames`              | Espaciado entre los elementos de la barra                          | `'m'`             | No          |
| `justify`       | `IJustifyOptions`        | Justificación de los elementos (`spaceBetween`, `center`, etc.)    | `'spaceBetween'`  | No          |
| `alignItems`    | `IAlignItemsOptions`     | Alineación vertical de los elementos (`start`, `center`, etc.)     | `'start'`         | No          |

---

## Ejemplo de uso

```html
<bmb-navigation-bar
  [actionHeaders]="[
    { icon: 'home', label: 'Inicio', action: onHomeClick },
    { icon: 'settings', label: 'Configuración', action: onSettingsClick }
  ]"
  [iconSize]="24"
  [gapSize]="'l'"
  [justify]="'center'"
  [alignItems]="'center'"
>
</bmb-navigation-bar>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbActionIconComponent`
- `BmbLayoutDirective`
- `BmbLayoutItemDirective`
- Tipos: `IBmbActionHeader`, `SizeNames`, `IJustifyOptions`, `IAlignItemsOptions`

---

## Notas adicionales

- **Accesibilidad:** Permite configurar etiquetas y acciones para cada ícono, facilitando la navegación por teclado y tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en encabezados, barras laterales o pie de página.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite ajustar el tamaño de íconos, el espaciado y la alineación para adaptarse a diferentes diseños y necesidades.
- **Buenas prácticas:** Las acciones se gestionan mediante funciones asociadas a cada elemento, promoviendo una lógica desacoplada y flexible.

---
