# BmbOverlayComponent

## Descripción general

`BmbOverlayComponent` es un componente standalone de Angular diseñado para mostrar una capa superpuesta (overlay) sobre el contenido de la interfaz. Permite controlar su visibilidad y emitir eventos al interactuar con la capa, facilitando la creación de modales, diálogos, menús flotantes y cualquier interacción que requiera bloquear o resaltar partes de la pantalla.

---

## Props / Parámetros

| Propiedad | Tipo      | Descripción                         | Valor por defecto | Obligatorio |
| --------- | --------- | ----------------------------------- | ----------------- | ----------- |
| `active`  | `boolean` | Controla la visibilidad del overlay | `false`           | No          |
| `uid`     | `string`  | Identificador único del overlay     | `getUUID()`       | No          |

### Outputs

| Output    | Tipo     | Descripción                                            |
| --------- | -------- | ------------------------------------------------------ |
| `onClick` | `string` | Se emite al hacer clic en el overlay, pasando el `uid` |

---

## Ejemplo de uso

```html
<bmb-overlay
  [active]="true"
  [uid]="'overlay-123'"
  (onClick)="handleOverlayClick($event)"
></bmb-overlay>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `@angular/cdk/overlay` (OverlayModule)
- Utilidad interna: `getUUID`

---

## Notas adicionales

- **Accesibilidad:** El overlay puede usarse para bloquear la interacción con el fondo y resaltar contenido importante, mejorando la experiencia para todas las personas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse junto con modales, menús o diálogos personalizados.
- **Rendimiento:** El componente es ligero y utiliza buenas prácticas de Angular para optimizar el renderizado.
- **Personalización:** El identificador único (`uid`) permite distinguir entre múltiples overlays en la misma vista.
- **Buenas prácticas:** Emite eventos desacoplados para manejar la interacción de forma flexible y segura.

---
