# BmbButtonDirective

## Descripción general

`BmbButtonDirective` es una directiva standalone de Angular que transforma cualquier elemento en un botón visualmente consistente y accesible, permitiendo personalizar apariencia, tamaño, posición y presencia de íconos. Soporta estilos alternativos, modo toggle, bordes redondeados, adaptación a móvil y proyección dinámica de íconos. Es ideal para estandarizar botones en aplicaciones web y móviles, facilitando la integración de controles interactivos y accesibles.

---

## Props / Parámetros

| Propiedad           | Tipo                        | Descripción                                                        | Valor por defecto | Obligatorio |
|---------------------|-----------------------------|--------------------------------------------------------------------|-------------------|-------------|
| `icon`              | `string`                    | Nombre del ícono a mostrar                                         | `''`              | No          |
| `iconSize`          | `number \| undefined`       | Tamaño del ícono en píxeles                                        | `16`              | No          |
| `position`          | `IBmbHorizontalPosition`    | Posición del ícono (`'left'` o `'right'`)                          | `'left'`          | No          |
| `case`              | `boolean`                   | Aplica estilo alternativo (mayúsculas, etc.)                       | `false`           | No          |
| `appearance`        | `IButtonAppearance`         | Apariencia visual (`'primary'`, `'secondary'`, etc.)               | `'primary'`       | No          |
| `size`              | `IButtonSize`               | Tamaño del botón (`'small'`, `'medium'`, `'large'`)                | `'small'`         | No          |
| `isToggleActive`    | `boolean`                   | Estado activo del botón toggle                                     | `false`           | No          |
| `enableButtonToggle`| `boolean`                   | Habilita modo toggle                                               | `false`           | No          |
| `isRounded`         | `boolean`                   | Aplica bordes redondeados                                          | `true`            | No          |
| `isMobile`          | `boolean`                   | Aplica estilos para móvil                                          | `false`           | No          |
| `iconAlt`           | `string`                    | Texto alternativo para el ícono                                    | `'icon'`          | No          |

---

## Ejemplo de uso

```html
<button bmbButton
  [icon]="'check'"
  [iconSize]="20"
  [position]="'right'"
  [appearance]="'secondary'"
  [size]="'medium'"
  [isToggleActive]="true"
  [enableButtonToggle]="true"
  [isRounded]="true"
  [isMobile]="false"
  [iconAlt]="'Confirmar'"
>
  Confirmar
</button>
```

---

## Dependencias

- `@angular/core` (Directive, ElementRef, HostBinding, ViewContainerRef, ChangeDetectorRef, Renderer2, input, SimpleChanges)
- `BmbIconComponent`
- Tipos: `IBmbHorizontalPosition`, `IButtonAppearance`, `IButtonSize`

---

## Notas adicionales

- **Accesibilidad:** El ícono proyectado incluye texto alternativo (`iconAlt`). Se recomienda complementar el botón con atributos ARIA y roles adecuados.
- **Compatibilidad:** Se puede aplicar a cualquier elemento HTML y funciona en cualquier template Angular.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` y actualiza atributos y contenido solo cuando cambian los inputs.
- **Personalización:** Permite ajustar apariencia, tamaño, posición y modo toggle, así como proyectar íconos dinámicamente.
- **Buenas prácticas:** Gestiona clases CSS y atributos de forma eficiente, asegurando consistencia visual y funcional en todos los botones.

---
