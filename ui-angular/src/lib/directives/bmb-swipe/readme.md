# BmbSwipeDirective

## Descripción general

`bmbSwipe` es una directiva standalone de Angular que convierte a su elemento
host en un contenedor deslizable ("swipe to reveal"), similar al patrón que se
utiliza en listas de aplicaciones móviles. Al arrastrar el elemento hacia la
izquierda o hacia la derecha se revela una sección con acciones, donde se
pueden colocar uno o varios `bmb-action-icon`.

Las acciones se declaran mediante `ng-template` decorados con las directivas
auxiliares `bmbSwipeLeftActions` (se muestran al deslizar hacia la derecha) y
`bmbSwipeRightActions` (se muestran al deslizar hacia la izquierda).

---

## Props / Parámetros

| Propiedad              | Tipo      | Descripción                                                                             | Valor por defecto | Obligatorio |
| ----------------------- | --------- | ---------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `bmbSwipeDisabled`      | `boolean` | Deshabilita el gesto de deslizamiento sin remover la directiva.                          | `false`             | No          |
| `bmbSwipeThreshold`     | `number`  | Fracción (0-1) del ancho de las acciones que debe arrastrarse para que se abra la sección. | `0.4`               | No          |
| `bmbSwipeCloseOnAction` | `boolean` | Cierra la sección revelada automáticamente al presionar una acción.                       | `true`              | No          |

## Eventos

| Evento               | Tipo                    | Descripción                                                                |
| --------------------- | ----------------------- | --------------------------------------------------------------------------- |
| `bmbSwipeOpenChange` | `IBmbSwipeSide \| null` | Emite el lado revelado (`'left'` \| `'right'`), o `null` cuando está cerrado. |

## Métodos públicos

| Método    | Descripción                                     |
| --------- | ------------------------------------------------ |
| `close()` | Cierra la sección revelada de forma programática. |

---

## Ejemplo de uso

```html
<div bmbSwipe class="list-item">
  <ng-template bmbSwipeLeftActions>
    <bmb-action-icon icon="star" (buttonClick)="favorite(item)" />
  </ng-template>

  <ng-template bmbSwipeRightActions>
    <bmb-action-icon icon="archive" (buttonClick)="archive(item)" />
    <bmb-action-icon icon="trash-can" (buttonClick)="remove(item)" />
  </ng-template>

  {{ item.title }}
</div>
```

```typescript
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  imports: [
    BmbSwipeDirective,
    BmbSwipeLeftActionsDirective,
    BmbSwipeRightActionsDirective,
    BmbActionIconComponent,
  ],
  // ...
})
export class MyListItemComponent {}
```

---

## Dependencias

- `@angular/core` (Directive, ElementRef, Renderer2, TemplateRef, ViewContainerRef, ContentChild, input, output)
- `BmbActionIconComponent` (recomendado para el contenido de las acciones)

---

## Notas adicionales

- **Compatibilidad:** Utiliza Pointer Events, por lo que funciona tanto con mouse como con touch.
- **Accesibilidad:** Complementa las acciones con atributos `alt`/`aria-label` en cada `bmb-action-icon`.
- **Rendimiento:** El contenido se traslada usando `transform: translateX()`, evitando reflows innecesarios.
- **Personalización:** Si solo se declara una de las dos plantillas (`bmbSwipeLeftActions` o `bmbSwipeRightActions`), únicamente ese lado podrá revelarse.

---
