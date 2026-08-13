# BmbAccordionControlDirective

## Descripción general

`BmbAccordionControlDirective` es una directiva standalone de Angular que permite controlar el estado de expansión y activación de múltiples componentes `BmbAccordionComponent` agrupados. Facilita la gestión centralizada de la apertura/cierre de los acordeones, soportando tanto control interno como externo mediante el parámetro `accordionStates`. Permite que solo un acordeón esté abierto a la vez y sincroniza el estado visual y funcional de todos los acordeones hijos.

---

## Props / Parámetros

| Propiedad         | Tipo                        | Descripción                                                                            | Valor por defecto | Obligatorio |
| ----------------- | --------------------------- | -------------------------------------------------------------------------------------- | ----------------- | ----------- |
| `accordionStates` | `{ [id: string]: boolean }` | Objeto externo para controlar el estado expandido/colapsado de cada acordeón por su ID | `undefined`       | No          |

---

## Ejemplo de uso

```html
<div bmbAccordionControl [accordionStates]="states">
  <bmb-accordion [accordionId]="'panel1'">Contenido 1</bmb-accordion>
  <bmb-accordion [accordionId]="'panel2'">Contenido 2</bmb-accordion>
  <bmb-accordion [accordionId]="'panel3'">Contenido 3</bmb-accordion>
</div>
```

```typescript
states = {
  panel1: true,
  panel2: false,
  panel3: false,
};
```

---

## Dependencias

- `@angular/core` (Directive, ContentChildren, QueryList, AfterContentInit, Input, DoCheck, KeyValueDiffer, KeyValueDiffers, OnDestroy)
- `rxjs` (Subscription)
- `BmbAccordionComponent`

---

## Notas adicionales

- **Accesibilidad:** Permite controlar el foco y el estado activo de los acordeones, facilitando la navegación por teclado y tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede controlar cualquier cantidad de acordeones hijos.
- **Rendimiento:** Utiliza `KeyValueDiffer` para detectar cambios eficientes en el objeto de estados y actualiza solo los acordeones necesarios.
- **Personalización:** Soporta control interno (solo uno abierto a la vez) y control externo (sincronización con un objeto de estados).
- **Buenas prácticas:** Gestiona la suscripción y desuscripción de eventos para evitar fugas de memoria y asegura la sincronización visual y funcional de los acordeones.

---
