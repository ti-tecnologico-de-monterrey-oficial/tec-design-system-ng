---
name: design-audit
description: Compara componentes y templates de Storybook o Chromatic con un nodo de Figma y genera un PDF de ajustes CSS. Úsala para auditorías de fidelidad de diseño, investigar asociaciones pendientes o mantener este comparador.
---

# Auditor de diseño

Usa los scripts incluidos para medir y generar el PDF. Esta skill coordina el procedimiento; no sustituye las mediciones por estimaciones visuales ni requiere MCP.

## Ejecutar

1. Trabaja desde la raíz del repositorio (donde están `package.json` y `.agents`). Reutiliza los enlaces de Figma y Storybook/Chromatic suministrados en la conversación; solicita solo los que falten. Sirve para cualquier componente, no solo Generic Card. Figma debe incluir `node-id`; Storybook admite documentación o una historia individual. Si ambos enlaces delimitan una sola plantilla Figma y una sola historia, trátalas como el par solicitado aunque sus nombres difieran. Para selecciones múltiples conserva la asociación por evidencia y deja pendientes las parejas ambiguas.
2. Lee [references/uso.md](references/uso.md) para requisitos, credenciales, mensajes y alcance. No leas `.env` para mostrar sus valores. El script carga la credencial existente y pide un token oculto si falta o es rechazado. El usuario debe introducir secretos en su terminal, no en el chat ni en argumentos de comandos.
3. Ejecuta `npm run audit:design` en terminal interactiva. Si operas la terminal mediante herramientas, usa PTY/TTY y entrega cada enlace al prompt correspondiente. Si se necesita un token o login privado que no puedas completar, indica al usuario cómo continuar en su propia terminal; no declares una auditoría completada.
4. Espera el resumen y comprueba el archivo final indicado por el script. Entrega un enlace al PDF si existe y comunica las historias o capas pendientes. No generes un PDF de hallazgos ficticios para llenar una auditoría sin mediciones.

## Reglas de comparación

- Limita Figma al nodo del enlace y sus descendientes. Incluye las etiquetas externas de documentación que estén dentro de ese alcance; no amplíes a padres o hermanos.
- Conserva las asociaciones por nombres, propiedades y etiquetas Desktop/Responsive. Una etiqueta «Responsive / Desktop» permite reutilizar esa referencia. Cuando la asociación siga siendo ambigua, revisa la evidencia y comunica lo pendiente; no fuerces parejas.
- Evalúa únicamente font size, font weight, colores, padding, márgenes y separaciones entre elementos asociados. Los márgenes se evalúan mediante las separaciones medidas en Figma. Excluye siempre font-family, width, height, line-height, radios, sombras, opacidad y grosor de borde, también en componentes individuales. Evalúa el botón y su contenido cuando sea el componente principal seleccionado; excluye botones y descendientes cuando estén anidados dentro de otro componente o template. No agregues severidad, confianza, dimensiones generales o recomendaciones globales por diferencias de píxeles.
- Conserva capturas lado a lado y hallazgos numerados con propiedad, valor esperado, valor encontrado y ajuste recomendado. La auditoría persiste solo el PDF en `dist/design-audit/<fecha>/`.
- «Asociada», «comparada» y «sin diferencias detectadas» no significan cobertura completa. Una capa sin asociación no se considera aprobada.
- Auditar no implica modificar componentes, publicar Storybook ni cambiar Figma. Haz esas acciones solo si forman parte de lo solicitado.

## Mantener el auditor

Lee la sección «Archivos» de [references/uso.md](references/uso.md) y abre únicamente los módulos relevantes. Los scripts conservan imports relativos y usan las dependencias del workspace; esta skill está integrada a este repositorio.

Ejecuta `npm run audit:design:test` tras cambiar reglas. Si cambias capturas o PDF, ejecuta también `npm exec nx run design-audit:smoke`. Usa el navegador instalado o `DESIGN_AUDIT_CHROME_PATH`. Las pruebas locales no sustituyen una validación real de nuevas asociaciones: distingue datos actuales de datos guardados.
