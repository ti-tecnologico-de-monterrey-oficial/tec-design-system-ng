# BmbTextEditorComponent

## Descripción general

`BmbTextEditorComponent` es un componente standalone de Angular que proporciona un editor de texto enriquecido (WYSIWYG) para la edición de contenido HTML. Permite aplicar formato, insertar enlaces, imágenes y tablas, cambiar la alineación del texto y limpiar el formato, todo mediante una interfaz visual y controles accesibles. Es ideal para formularios, blogs, sistemas de mensajería y cualquier aplicación que requiera edición avanzada de texto.

---

## Props / Parámetros

| Propiedad   | Tipo         | Descripción                                                        | Valor por defecto         | Obligatorio |
|-------------|--------------|--------------------------------------------------------------------|---------------------------|-------------|
| `control`   | `FormControl`| Control reactivo para gestionar el valor del contenido HTML         | `new FormControl('')`     | No          |

---

## Ejemplo de uso

```html
<bmb-text-editor [control]="editorControl"></bmb-text-editor>
```

```typescript
import { FormControl } from '@angular/forms';

export class MiComponente {
  editorControl = new FormControl('');
}
```

---

## Dependencias

- `@angular/core` (ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ViewChild, input, Component)
- `@angular/forms` (FormControl)
- `@angular/platform-browser` (DomSanitizer, SafeHtml)
- `BmbButtonDirective`
- `BmbIconComponent`

---

## Notas adicionales

- **Accesibilidad:** El editor puede recibir foco automáticamente y soporta navegación por teclado. Se recomienda complementar con etiquetas ARIA y roles para mejorar la experiencia con tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse con formularios reactivos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Seguridad:** El contenido HTML se puede sanitizar usando `DomSanitizer` para evitar vulnerabilidades XSS.
- **Personalización:** Permite insertar tablas, imágenes y enlaces, aplicar alineaciones y limpiar el formato del texto.
- **Buenas prácticas:** Emite cambios al control reactivo y valida URLs antes de insertar imágenes o enlaces. El método `insertHtml` permite proyectar contenido HTML personalizado en la posición actual del cursor.

---
