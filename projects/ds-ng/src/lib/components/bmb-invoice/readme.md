# BmbInvoiceComponent

## Descripción general

`BmbInvoiceComponent` es un componente standalone de Angular diseñado para mostrar facturas o resúmenes de conceptos de cobro de manera clara y visual. Permite listar conceptos, cantidades, precios y mostrar el total, incluyendo equivalencias y etiquetas visuales (badges) para resaltar información relevante. Su objetivo principal es facilitar la visualización de datos financieros o de cobro en interfaces modernas y accesibles.

---

## Props / Parámetros

| Propiedad           | Tipo                | Descripción                                                                 | Valor por defecto | Obligatorio |
|---------------------|---------------------|-----------------------------------------------------------------------------|-------------------|-------------|
| `appearanceContrast`| `IBmbContrast`      | Contraste visual del componente (`default`, `primary`, `alternative`)       | `'default'`       | No          |
| `data`              | `IBmbInvoice`       | Datos de la factura: conceptos, total y equivalencias                       | -                 | Sí          |

### Interfaces relacionadas

#### IBmbConcept

```typescript
interface IBmbConcept {
  concept: string;
  quantity: string;
  price?: number;
  badge?: { label: string; appearance: IBbmBgAppearance; container: boolean };
}
```

#### IBmbInvoice

```typescript
interface IBmbInvoice {
  concept: IBmbConcept[];
  total: {
    label: string;
    value: string;
    equivalence: string[];
  };
}
```

---

## Ejemplo de uso

```html
<bmb-invoice
  [appearanceContrast]="'primary'"
  [data]="{
    concept: [
      { concept: 'Inscripción', quantity: '1', price: 12000 },
      { concept: 'Descuento', quantity: '1', price: -2000, badge: { label: 'Beca', appearance: 'success', container: true } }
    ],
    total: {
      label: 'Total a pagar',
      value: '$10,000',
      equivalence: ['USD $550', 'EUR €500']
    }
  }"
>
</bmb-invoice>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbBadgeComponent`
- Tipos: `IBbmBgAppearance`, `IBmbContrast`

---

## Notas adicionales

- **Accesibilidad:** El componente utiliza badges y estilos visuales para resaltar información importante, facilitando la comprensión para todas las personas.
- **Compatibilidad:** Puede integrarse en cualquier template Angular y acepta datos dinámicos.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** El contraste visual puede adaptarse según el contexto de la interfaz.
- **Validación:** La función `isNegative` permite identificar y resaltar valores negativos en los conceptos o totales.

---
