# BmbTagComponent

## Descripción general

`BmbTagComponent` es un componente standalone de Angular diseñado para mostrar etiquetas (tags) personalizables en la interfaz. Permite definir el color, el texto, el estado (activo, deshabilitado), la forma (redondeada), agrupar varias etiquetas, habilitar interacción por clic y permitir el cierre (dismissible). Es ideal para categorizar, filtrar, mostrar estados o agrupar elementos en listas, tarjetas y formularios.

---

## Props / Parámetros

| Propiedad     | Tipo            | Descripción                                         | Valor por defecto | Obligatorio |
| ------------- | --------------- | --------------------------------------------------- | ----------------- | ----------- |
| `appearance`  | `IBmbTagColors` | Apariencia/color de la etiqueta\*                   | `'normal'`        | No          |
| `text`        | `string`        | Texto a mostrar en la etiqueta                      | `''`              | No          |
| `grouped`     | `boolean`       | Agrupa la etiqueta con otras en el mismo contenedor | `false`           | No          |
| `dismissible` | `boolean`       | Permite cerrar (eliminar) la etiqueta               | `false`           | No          |
| `rounded`     | `boolean`       | Muestra la etiqueta con bordes redondeados          | `false`           | No          |
| `activityTag` | `boolean`       | (Deprecado) No se usa actualmente                   | `false`           | No          |
| `isDisabled`  | `boolean`       | Deshabilita la interacción con la etiqueta          | `false`           | No          |
| `isActive`    | `boolean`       | Marca la etiqueta como activa                       | `false`           | No          |
| `enableClick` | `boolean`       | Permite interacción por clic en la etiqueta         | `false`           | No          |

\*Ver sección "Valores válidos para `appearance`" para la lista completa de colores disponibles.

### Outputs

| Output       | Tipo     | Descripción                               |
| ------------ | -------- | ----------------------------------------- |
| `closedTag`  | `string` | Se emite al cerrar (eliminar) la etiqueta |
| `clickedTag` | `string` | Se emite al hacer clic en la etiqueta     |

### Valores válidos para `appearance`

Valores de color MITEC:

- `'normal'`
- `'mitec-blue'`
- `'mitec-red'`
- `'mitec-green'`
- `'mitec-orange'`
- `'mitec-purple'`

Valores de color Creative:

- `'creative-use-violet'`
- `'creative-use-indigo'`
- `'creative-use-emerald'`
- `'creative-use-licorice'`
- `'creative-use-dark-teal'`
- `'creative-use-peach'`
- `'creative-use-sepia'`
- `'creative-use-soft-red'`
- `'creative-use-wattle'`
- `'creative-use-ship-cove'`
- `'creative-use-plantation'`
- `'creative-use-rum'`
- `'creative-use-ripe-lemon'`
- `'creative-use-hibiscus'`

---

## Ejemplo de uso

```html
<bmb-tag
  [appearance]="'mitec-blue'"
  [text]="'Inscrito'"
  [rounded]="true"
  [dismissible]="true"
  [isActive]="true"
  [enableClick]="true"
  (closedTag)="onTagClosed($event)"
  (clickedTag)="onTagClicked($event)"
></bmb-tag>

<!-- Ejemplo de agrupación -->
<div>
  <bmb-tag [text]="'Taller'" [grouped]="true"></bmb-tag>
  <bmb-tag [text]="'Seminario'" [grouped]="true"></bmb-tag>
</div>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbActionIconComponent` (para el icono de cierre)
- Angular core: `ElementRef`, `Renderer2`, `ViewEncapsulation`, `ChangeDetectionStrategy`, `AfterViewInit`

---

## Notas adicionales

- **Accesibilidad:** El componente puede recibir foco y disparar eventos, facilitando la navegación por teclado y tecnologías asistivas. Se recomienda complementar con roles y atributos ARIA si la etiqueta es interactiva.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y soporta agrupación, interacción y cierre de etiquetas.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite elegir entre múltiples apariencias (colores), formas y estados, y agrupar etiquetas dinámicamente en el DOM.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción y el cierre, y utiliza métodos para gestionar clases CSS y agrupación de forma eficiente.

---
