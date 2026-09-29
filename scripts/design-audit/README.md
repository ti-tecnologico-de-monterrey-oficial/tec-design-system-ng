# Auditor de diseño

Desde la raíz del repositorio:

```bash
npm run audit:design
```

Pega el enlace del conjunto o sección que contiene las variantes en Figma y el enlace de documentación de Storybook (local o publicada en Chromatic). El agente obtiene los IDs, descubre las historias y genera `dist/design-audit/<fecha>/reporte.pdf`, como único archivo de salida; las imágenes están incluidas en el PDF. No hay JSON que preparar ni selectores que escribir.

El enlace `/docs/...--documentation` se acepta directamente: se recorren las historias del grupo, las referencias de imports y las historias incrustadas detectables en el DOM. No se piden enlaces individuales ni se requieren nombres Desktop/Mobile. Se enumeran las variantes dentro del nodo seleccionado de Figma y se asocian por nombres y valores de propiedades; si difieren, se buscan candidatos usando imágenes, texto y dimensiones. La similitud es heurística, no una prueba de identidad: requiere umbral y una separación clara respecto a otras opciones en ambas direcciones. Las sugerencias ambiguas se notifican en la terminal. El PDF contiene únicamente variantes comparadas con diferencias e imágenes. Las asociaciones ambiguas, errores y diseños sin pareja se notifican en la terminal; nunca se consideran aprobados. Si no hay diferencias comparables, no se genera PDF. La URL de Figma define el límite exacto: solo se lee ese nodo y sus descendientes. No se sube a secciones padre ni se incluyen piezas hermanas. Para revisar varias tarjetas juntas, selecciona su frame o conjunto en Figma y copia su enlace. En familias con prefijo Template\_ excluye títulos, separadores y anotaciones que no sean plantillas.

El token de Figma se pide con entrada oculta solo cuando hace falta. También admite `FIGMA_ACCESS_TOKEN` en el entorno o `.env` existente. Requiere `file_content:read` y acceso al archivo. Para un access token OAuth ya emitido usa `FIGMA_AUTH_TYPE=oauth`; no implementa el flujo de emisión/renovación OAuth. Los tokens introducidos no se guardan.

Si Storybook es privado, inicia sesión personalmente en el navegador que abre el agente y vuelve a pegar el enlace de la historia cuando lo solicite. No automatiza contraseñas ni guarda la sesión en disco. Usa el enlace de **View Storybook**, no el panel administrativo de Chromatic. El token de publicación de Chromatic no sustituye una sesión de lectura.

Necesita las dependencias del repo y Chromium de Playwright o Chrome instalado en macOS. Si falta navegador: `npm exec playwright install chromium`. También acepta `DESIGN_AUDIT_CHROME_PATH`.

El PDF compara los recortes sin reescalar, señala diferencias en rosa y añade imágenes con posiciones numeradas, valores esperados/encontrados, recomendaciones, severidad, confianza y enlaces. Asocia automáticamente la raíz visible y capas de texto exacto único. Las capas ambiguas quedan pendientes: no inventa una asociación. Es un auditor determinista, no un modelo de visión semántica.

**Alcance:** render inicial de cada historia descubierta. Las variantes fuera de los enlaces proporcionados y combinaciones de controles sin historia publicada no se descubren automáticamente. Para hover/focus o estados interactivos, proporciona historias dedicadas al estado. No espera automáticamente funciones `play` asíncronas. Los iconos, gradientes, sombras y capas sin asociación se comparan visualmente; no como propiedades semánticas. El ancho inicial del viewport se basa en Figma (mínimo 320 px); comprueba los recortes del reporte para detectar diferencias de contexto responsive. Fuentes distintas y antialiasing pueden causar diferencias visuales.

Opcionalmente ajusta tolerancias por entorno, sin cambiar archivos: `AUDIT_TOLERANCE_PX` (1), `AUDIT_COLOR_THRESHOLD` (24 de 255) y `AUDIT_MAX_DIFF_RATIO` (0.01). Los colores estructurales se comparan exactamente. Una auditoría fallida sale con código 1; los hallazgos se reportan en el PDF sin hacer fallar el comando.

Pruebas: `npm run audit:design:test`. Los reportes pueden contener diseños privados; `dist/` está ignorado por Git.

Referencias: [API Figma](https://developers.figma.com/docs/rest-api/file-endpoints/), [enlaces Chromatic](https://www.chromatic.com/docs/permalinks/), [sesiones Playwright](https://playwright.dev/docs/auth).

Las peticiones a Figma esperan sin un timeout impuesto por el agente y sin mensajes por petición. Las imágenes se solicitan en lotes de hasta 40 nodos. Si hay instancias con prefijo Template\_, se excluyen anotaciones y otros elementos sin ese prefijo. Una selección desproporcionada respecto a las historias se detiene antes de exportar imágenes y solicita un enlace más específico.

Las copias idénticas de una variante se agrupan para evitar ambigüedad. Para familias ya identificadas se distingue el dispositivo y el tema del texto; las diferencias de estilo no bloquean esa asociación. El recorte prioriza la tarjeta real sobre el contenedor del ejemplo de Storybook.

El reporte de ajustes solo incluye propiedades internas identificables: tipografía, color, padding/radio de contenedores asociados, dimensiones de imágenes y separación entre capas asociadas. Omite ancho/alto de componentes y de textos. La máscara visual sirve como evidencia, no crea por sí sola una recomendación genérica. Los elementos ambiguos no generan ajustes inventados. `data-figma-node-id` permite asociaciones explícitas; sin él se usan textos únicos y, cuando existe una sola imagen en ambos lados, esa imagen. Los márgenes se reportan como separación medida, sin asumir si CSS la implementa con margin o gap.

La inspección del Storybook publicado confirmó estas equivalencias: Actions → Informative_ButtonSimple, Flat → Informative_Simple, Informative → Informative_Media, Home → Informative_Document y Empty → ContainerButton_EmptyState. Informative_Media_Simple conserva su coincidencia literal; no se sustituye por Informative_Simple. La detección del tema usa el conjunto del texto visible, no el primer icono. Las referencias sin dispositivo declarado se identifican como tales; no prueban que exista un diseño responsive independiente.

Los textos repetidos pueden compararse cuando todas sus apariciones en Figma comparten el mismo estilo; no se inventa su correspondencia geométrica. Las ejecuciones sin propiedades medibles y las capas sin asociar se notifican como pendientes. «Sin diferencias detectadas» solo describe las propiedades medidas, no valida la cobertura completa.

Las capturas aportadas por el usuario confirman una referencia compartida **Responsive / Desktop** para Empty, Informative balance, Informative media expanded vertical e Informative media detail vertical. Se permite comparar ambas historias contra esa referencia; no se exige otra pieza Figma por dispositivo. Para estos casos se captura Desktop a 1280 px y Mobile a 390 px de viewport, manteniendo las medidas originales del render Figma. Esta regla no se extiende a otras familias o estados sin confirmación. Las capturas sirven para confirmar correspondencias, no para deducir medidas CSS a partir del zoom.

El descubrimiento también lee etiquetas externas de nombre y Desktop/Responsive situadas encima de la pieza, dentro del nodo seleccionado. Estas etiquetas pueden estar en otro frame superpuesto de documentación. Se conservan sus IDs como evidencia y se rechazan empates espaciales. Se priorizan las especificaciones etiquetadas frente a copias sin etiquetar de la galería de temas. Una etiqueta «Responsive / Desktop» habilita ambas historias sin una lista especial por familia. Los renders se solicitan únicamente para las parejas o candidatos necesarios.


Alcance del reporte actualizado: solo font size, font weight, colores, padding del contenedor principal y separación entre elementos asociados. Se excluyen botones y descendientes, familia tipográfica, line height, contenido del texto, radios, tamaños de imágenes y padding de contenedores internos. El PDF conserva las capturas y las ubicaciones numeradas de los ajustes; no muestra severidad, confianza ni una diferencia global de píxeles que marque propiedades excluidas. Los PDF existentes no se modifican.
