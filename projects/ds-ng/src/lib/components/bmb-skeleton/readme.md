# BmbSkeletonComponent

## Descripción general

`BmbSkeletonComponent` es un componente standalone de Angular diseñado para mostrar elementos de carga (skeleton loaders) en la interfaz mientras se obtienen datos o se procesan operaciones. Permite simular diferentes tipos de contenido (encabezado, input, genéricos) para mejorar la experiencia de usuario y comunicar visualmente que la información está en proceso de carga.

---

## Props / Parámetros

| Propiedad | Tipo             | Descripción                                                        | Valor por defecto | Obligatorio |
|-----------|------------------|--------------------------------------------------------------------|-------------------|-------------|
| `type`    | `BmbSkeletonType`| Tipo de skeleton a mostrar (`header`, `input`, `stray`, `generic1`, `generic2`, `generic3`) | `'header'`        | No          |

---

## Ejemplo de uso

```html
<bmb-skeleton [type]="'input'"></bmb-skeleton>
<bmb-skeleton [type]="'generic2'"></bmb-skeleton>
```

---

## Dependencias

- `@angular/common` (CommonModule)
- `BmbLayoutGridDirective`
- `BmbLayoutGridItemDirective`

---

## Notas adicionales

- **Accesibilidad:** El componente ayuda a comunicar estados de carga, pero se recomienda complementar con mensajes accesibles para tecnologías asistivas.
- **Compatibilidad:** Se integra fácilmente en cualquier template Angular y puede usarse en formularios, tarjetas, listas y paneles.
- **Rendimiento:** Utiliza `ChangeDetectionStrategy.OnPush` para optimizar el renderizado.
- **Personalización:** Permite elegir entre varios tipos de skeleton para simular diferentes estructuras de contenido.
- **Buenas prácticas:** Mejora la percepción de velocidad y reduce la frustración durante la carga de datos, manteniendo la interfaz visualmente consistente.

---
