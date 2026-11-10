# Consulta de texto truncado

`BmbFullTextDirective` permite consultar el texto completo de un control sin
activarlo durante una pulsación prolongada. Está exportada desde `ui-angular`.

La presentación y el posicionamiento reutilizan `BmbTooltipBaseComponent` en modo
manual. La directiva crea una instancia solo al abrir y la destruye al cerrar;
no mantiene un tooltip visual propio. El componente base usa `manual=false` por
defecto, por lo que los tooltips existentes conservan sus eventos automáticos.
Con `manual=true`, `anchor` indica el control de referencia y `showTooltip()` /
`hideTooltip()` permiten controlar la visibilidad. `floatingElement` expone el
diálogo para gestionar el paso del puntero desde el control hasta el tooltip.

```html
<button
  [bmbFullText]="label"
  [bmbFullTextEnabled]="true"
  bmbFullTextTarget=".label"
  (click)="navigate()"
>
  <span class="label">{{ label }}</span>
</button>
```

- Importar `BmbFullTextDirective` en el componente consumidor.
- `bmbFullText`: texto completo. Debe conservarse también como nombre accesible
  del control, por ejemplo mediante su contenido de texto sin recortarlo en TS.
- `bmbFullTextEnabled`: habilita la consulta; su valor inicial es `true`.
- `bmbFullTextTarget`: selector opcional del texto truncado dentro del control.
  Si se omite se mide el propio elemento que tiene la directiva.
- Los estilos se incluyen en el core de los temas Bamboo. La clase del texto
  sigue siendo responsabilidad del consumidor; una clase sola no agrega el gesto.

Solo se abre si el texto tiene desbordamiento real. Se consulta con hover de
mouse, foco visible de teclado o pulsación primaria de 500 ms. Mover el puntero
más de 10 px, desplazar o cancelar el gesto cancela la pulsación pendiente.
El scroll horizontal del componente conserva su comportamiento nativo.

La pulsación prolongada consume únicamente su clic posterior; el toque breve,
el clic normal y la activación de teclado conservan los eventos del consumidor.
El tooltip permanece tras soltar el dedo. Se cierra con Escape, al tocar fuera,
al perder el foco o al desplazar/redimensionar la vista. Con mouse se puede mover
el puntero desde el control hasta el tooltip sin cerrarlo. Solo hay uno abierto
por documento; al destruir el control se limpian timers, listeners y contenido.

## BmbTabs

`showFullText` es `false` por defecto. Activarlo aplica la directiva a las
etiquetas, incluidas las que tienen badge:

```html
<bmb-tabs [tabs]="tabs" [showFullText]="true" (selected)="select($event)" />
```

En este modo las flechas izquierda/derecha, Home y End permiten enfocar etiquetas
sin seleccionar la pestaña. Enter o Espacio conservan la activación del botón.
El ejemplo `/issue/full-text` permite activar/desactivar la opción y contar los
eventos de selección. No se integra todavía en otros componentes.
