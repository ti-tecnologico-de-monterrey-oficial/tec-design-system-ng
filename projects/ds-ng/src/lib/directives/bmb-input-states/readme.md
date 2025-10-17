# BmbInputStatesDirective

## Descripción general

`BmbInputStatesDirective` es una directiva de Angular que permite gestionar y reaccionar a los eventos de foco (`focus`) y pérdida de foco (`blur`) en elementos de entrada (inputs, textareas, etc.). Facilita la ejecución de funciones personalizadas cuando el usuario interactúa con el campo, permitiendo implementar validaciones, estilos dinámicos o lógica adicional al recibir o perder el foco.

---

## Props / Parámetros

| Propiedad | Tipo     | Descripción                                      | Valor por defecto | Obligatorio |
|-----------|----------|--------------------------------------------------|-------------------|-------------|
| `focus`   | `unknown`| Función a ejecutar cuando el elemento recibe foco| `() => {}`        | No          |
| `blur`    | `unknown`| Función a ejecutar cuando el elemento pierde foco| `() => {}`        | No          |

---

## Ejemplo de uso

```html
<input
  bmb-input-states
  [focus]="onInputFocus"
  [blur]="onInputBlur"
/>
```

```typescript
onInputFocus() {
  // Lógica al recibir foco
}

onInputBlur() {
  // Lógica al perder foco
}
```

---

## Dependencias

- `@angular/core` (Directive, ElementRef, HostListener, Input)

---

## Notas adicionales

- **Accesibilidad:** Permite mejorar la experiencia de usuario al proporcionar retroalimentación visual o lógica adicional al interactuar con campos de entrada.
- **Compatibilidad:** Se puede aplicar a cualquier elemento que soporte eventos de foco y blur en Angular.
- **Rendimiento:** La directiva es ligera y no introduce sobrecarga significativa.
- **Buenas prácticas:** Asegúrate de que las funciones asignadas a `focus` y `blur` sean seguras y no generen efectos secundarios inesperados. Útil para validaciones, estilos dinámicos y control de estados en formularios.

---
