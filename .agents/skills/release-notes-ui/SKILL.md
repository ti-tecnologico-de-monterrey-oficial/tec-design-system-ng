---
name: release-notes-ui
description: "Genera notas de versión profesionales y accesibles para librerías de UI a partir de CHANGELOG.md, commits o pull requests. Úsala cuando se soliciten release notes, notas de versión, changelog para audiencias no técnicas o resúmenes de una versión, especialmente en español. Filtra cambios por impacto visible, conserva referencias y excluye trabajo interno sin beneficio para las personas."
argument-hint: "Indica la versión, el archivo fuente y cualquier audiencia o formato adicional"
user-invocable: true
---

# Release Notes para Librerías de UI

## Objetivo

Transformar cambios técnicos de una versión en notas de versión claras, concisas y orientadas al beneficio. La audiencia puede incluir personas de diseño, producto, documentación, soporte y desarrollo; por eso cada punto debe explicar qué mejora y por qué importa, sin exigir conocimientos del código.

## Cuándo usar

- Cuando se soliciten notas de versión a partir de `CHANGELOG.md`.
- Cuando haya que resumir commits, pull requests o cambios de una versión.
- Cuando el changelog generado automáticamente sea demasiado técnico, repetitivo o extenso.
- Cuando sea necesario adaptar un release a una audiencia no técnica.

## Procedimiento

1. **Identifica el alcance**
   - Localiza el archivo fuente y la versión solicitada.
   - Si no se indica una versión, usa la primera versión publicada del archivo.
   - Conserva la fecha disponible. Si no existe, no inventes una: usa `Fecha no indicada` o solicita el dato si es esencial.
   - Revisa el estado actual del archivo antes de editarlo. No sobrescribas cambios recientes de otras personas.

2. **Extrae y filtra los cambios**
   - Considera solo cambios con impacto perceptible para quienes usan, diseñan, documentan o mantienen productos con la librería.
   - Clasifica según el tipo de commit cuando esté disponible:
     - `feat` con impacto directo: `🆕 Nuevas Funcionalidades`.
     - `fix` que afecte una experiencia, componente, visualización o flujo: `✅ Problemas Resueltos`.
     - `perf` y `refactor` con beneficio tangible en rendimiento, estabilidad, mantenimiento o experiencia: `⚡ Optimizaciones`.
     - `docs` que mejore la adopción, comprensión o uso: `📘 Mejoras Documentación`.
   - Omite `chore`, `test`, merges, migraciones internas, ajustes de tooling y cambios sin efecto visible.
   - Si un cambio no declara su tipo, evalúa su impacto real. No lo incluyas solo porque el título suene importante.
   - Consolida cambios duplicados, ramas intermedias y commits de una misma funcionalidad en un solo punto.

3. **Traduce a valor para las personas**
   - Escribe en español, con tono profesional, accesible e inclusivo. Usa `personas`, `equipos` y `quienes usan la librería` cuando corresponda.
   - Explica el resultado antes que la implementación: qué pueden hacer ahora, qué problema deja de ocurrir o qué experiencia mejora.
   - Evita nombres de archivos, clases, ramas, comandos, acrónimos y jerga técnica salvo que sean indispensables para identificar una funcionalidad.
   - Traduce ámbitos técnicos en el texto visible:
     - `auth` → `Acceso y seguridad`.
     - `ui` → `Interfaz`.
     - `api` → `Integraciones`.
   - No prometas una mejora que la fuente no sustente. Si el impacto no puede explicarse con claridad, omite el cambio.
   - Destaca la colaboración cuando sea posible, sin atribuir personas si la fuente no las identifica. Ejemplo: `Esta versión reúne el trabajo coordinado de los equipos de diseño, producto y desarrollo...`.

4. **Conserva la trazabilidad**
   - Incluye una referencia al final de cada punto: `(REF-123)`.
   - Usa el identificador disponible en la fuente: issue, ticket o pull request. Para un pull request `#1422`, utiliza `(REF-1422)`.
   - Si ya existe una referencia explícita como `DS01-3810`, consérvala como `(DS01-3810)`.
   - No inventes números. Si no existe ninguna referencia y el punto es indispensable, usa `(REF-no indicado)`; si no es indispensable, omítelo.
   - Evita repetir la misma referencia salvo que represente cambios claramente distintos.

5. **Redacta y valida la salida**
   - Usa exactamente esta estructura, manteniendo solo las secciones que tengan contenido:

     ```markdown
     ## 🚀 [Versión] 🎉 - [Fecha]

     [Párrafo introductorio de máximo 3 líneas]

     ### 🆕 Nuevas Funcionalidades
     - [Beneficio y alcance]. (REF-123)

     ### ✅ Problemas Resueltos
     - [Problema e impacto resuelto]. (REF-456)

     ### ⚡ Optimizaciones
     - [Mejora tangible en rendimiento, estabilidad o experiencia]. (REF-789)

     ### 📘 Mejoras Documentación
     - [Cómo la documentación facilita la adopción o el trabajo]. (REF-321)
     ```

   - El título debe resumir el objetivo principal de la versión, no repetir solamente el número.
   - El párrafo introductorio debe mencionar el objetivo principal, reconocer el trabajo colaborativo y expresar el beneficio principal para las personas. No debe superar tres líneas.
   - Mantén cada viñeta breve, específica y comprensible sin contexto adicional.
   - No incluyas secciones vacías, commits excluidos ni un apartado de cambios internos.
   - Comprueba que cada viñeta tenga una categoría válida, una referencia y un beneficio observable.

## Criterios de calidad

- **Claridad:** una persona no técnica entiende el cambio sin abrir el código.
- **Precisión:** el texto refleja la fuente y no inventa capacidades.
- **Relevancia:** solo aparecen cambios que afectan la experiencia, adopción o mantenimiento visible de la librería.
- **Concisión:** se eliminan duplicados y detalles de implementación.
- **Inclusión:** el lenguaje se refiere a personas y equipos, evitando expresiones excluyentes.
- **Trazabilidad:** cada punto puede rastrearse a una referencia de origen.

## Reglas para editar el changelog

- Si se solicita únicamente generar el texto, devuelve las notas sin modificar archivos.
- Si se solicita actualizar `CHANGELOG.md`, modifica solo la sección de la versión indicada y preserva el historial anterior.
- No borres el contenido fuente sin autorización. Si es necesario evitar duplicación, conserva el detalle automático en un comentario HTML o en una sección claramente no visible para la lectura normal.
- Antes de terminar, revisa el diff y valida encabezados, referencias y Markdown básico.
