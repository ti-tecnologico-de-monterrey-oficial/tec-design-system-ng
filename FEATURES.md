# Novedades ## [v1.6.4-i] -
2026-09-04

### 🚀 Novedades

*
test: Se corrigieron todos los archivos de test rotos
*
feat(component/ai-chat-card): se realizaron ajustes para no tener dependencias del "AI chat bar" esto permitirá desarrollo más flexible.
*
feat(component) BmbDateRange & ButtonIcon migrados
*
feat(component) bmb-loader & bmb-home-card migrados
*
chore: se agregaron más casos de prueba en la aplicación de prueba del componente.
*
feat(component) BmbFocusElement & BmbFrequentAppsSelector
*
chore: se agregaron páginas de pruebas de componentes.
*
chore: checkbox(input validator) migrados
*
chore: aplicación para pruebas del "AI Chat card".
*
feat(component/ai-chat-bubble): se modificaron las acciones para permitir que sean opcionales o muestre las asignadas por defecto.
*
feat(component / portal): Se optimizaron los eventos y salidas
*
chore: se agregaron correcciones para cubrir los casos de pruebas existentes antes de modificación de acciones opcionales.
*
list group migrado
*
chore: ai chat editor renombrado y reestructurado
*
chore: se agregó ejemplo de nuevo botón en el encabezado.
*
icon migrado
*
chore(component / portal): se refactorizaron los signals
*
chore: se agregó documentación de la detonación del "AI Chat card" desde elementos externos al componente.
*
feat(component / multi dot paginator): Se agregó la posibilidad de agregar el contenido de manera asincrona
*
fix(component / search card): Se removieron las tabs de manera nativa del componente
*
chore: se agregó funcionalidad para llevar el scroll al final de la sección de "AI chat bubble" y mover el foco al input del "AI Chat bar" contenido en el "AI chat card".
*
feat(component) cambiar nombre de chat-editor a chat-ai-editor
*
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
*
chore: se agregó validación para cubrir el máximo de íconos en el encabezado según lineamiento.
*
chore: se realizo ajuste para mostrar "AI Chat card" en modo "chat" para poder detonar desde otra instancia.
*
chore: se agregaron correcciones por casos de pruebas.
*
chore:  se agregó documentación
*
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
*
chore: se actualizaron estilos (CSS) para correcto funcionamiento "inline" para no afectar al modo "expanded".
*
feat(component / dropdown): Se agregó la posibilidad de que los elementos del dropdown tengan más de una línea
*
feat(component / dropdown): Se modificó el cálculo del tamaño del modal del dropdown
*
chore: se modificó la jerarquía de contenedores para controlar el alto de manera flexible.
*
chore: Se corrigió el flujo de sonarqube
*
fixed imports @shared
*
feat(component) BmbTopBarItem test solo dejar de creación
*
chore: se agregaron correcciones por casos de pruebas.
*
feat(component) bmb-home-card & bmb-loader migrados
*
chore: se agrego funcionalidad para regresar al modo del cual se detono el modo "chat" siempre que sea colapsado.
*
Se actualizaron las pruebas
*
feat(component) merge resuelto
*
chore: se realizaron ajustes al para limitar el alto del contenedor del "Ai Chat card".
*
chore: se agregó mensaje de error en consola para aclaración de lineamiento a los desarrolladores.
*
chore: Se actualizó el proceso de pruebas
*
feat(component/top-bar): se modifico el ancho y ancho máximo para ajuste con base a su contenedor.
*
Update opencode.json
*
feat(component) merge resuelto
*
feat(component) merge feature-prod y scss _shared por shared
*
feat: update Storybook configuration and add Changelog
*
chore: Se eliminó la carpeta core
*
bmb layout
*
bmb layout compelted
*
feat(component) BmbGenericCardButton templates agregados
*
migration
*
feat(component) migración bmb-icon-status & bmb-paginator
*
chore: se agregó componente bmb-ai-chat-card para evitar ruptura de código. En el nuevo componente se permite agregar los bmb-ai-chat-bubble e implementar sus propiedades sin agregarlas como dependencias.
*
feat(component) migraciòn bmb-fab & bmb-dot
*
feat(component) migraciòn bmb-hito-list & bmb-icon-item
*
feat(component) migración bmb-icon-status & bmb-paginato
*
feat(component) migración bmb-icon-status & bmb-paginator
*
feat(component) acción copy en bmb-ai-chat-bubble y algunos warning
*
chore: se agregó documentación para uso de métodos de apoyo para generar detalle en las historias de Storybook.
*
Revert "fix: Se removieron las importanciones invalidas"
*
fix: Se removieron las importanciones invalidas
*
chore: cambios de diseño alternativo
*
chore: se agregaron logs para indicar componentes descontinuados. Se quitaron dependencias de componentes descontinuados.
*
chore: se descontinuo el botón de cambio de rol en el componente "Top bar".
*
fix(component / ai chat bubble): Se corrigió la emisión del evento
*
chore: se modificaron ejemplos de documentación para más claridad.
*
feat(component / search card): Se agregó la opción de deshabilitar los favoritos
*
refactor(bmb-home-card-header): streamline action handling for mobile and desktop views
*
feat(componente/top-bar): se agregó nuevo botón de favoritos.
*
feat(component) merge feature-prod
*
feat(component/chat-bar): se agregó característica para poner opcional el cambiar el ícono del bot en el "AI Chat bar".
*
fix(component / modals): Ahora los modales nativos en las actions reciben parametros
*
merge
*
chore: Se agregó compatibilidad en los scripts para windows
*
fix(component / table): Se removió la columna duplicada select
*
fixed imports
*
chore: se agregó propiedad para mostrar micrófono en el "AI Chat bar".
*
v1.6.4-d pack
*
feat(component) merge conflictos
*
feat(component) exportar todo desde index
*
chore: se agregó el nuevo componente al index para uso de los desarrolladores.
*
chore: se agregó validación para evitar errores.
*
fix imports
*
chore: se agregó un comando antes de ejecutar chromatic para asegurar la actualización
*
chore: se eliminó advertencia.
*
feat(component) bmb-hito-list & bmb-icon-item
*
Update index.ts
*
Se realiza la mezcla ara integrarlo a "AI chat card"
*
feat(component) update feature-prod
*
fix(tests): remove unused imports in BmbLayoutItemDirective spec
*
refactor(bmb-ai-chat-bubble): remove unused imports from component and stories
*
revert change
*
feat(component) bmb-breadcrumb & bmb-bookmark migrados
*
chore: se eliminaron archivo por desaclople.
*
chore: se completó el desacoplo del componente bmb-tags.
*
feat(components/home card): Se agregó la propiedad showExpandAndCollapseButton al home card
*
feat(component/home-card-header): se agregó funcionalidad responsiva.
*
feat(component / filter card): Se agregó la pestaña de favoritos
*
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
*
feat(component) archivo nxw
*
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
*
feat(component/ai-chat-bubble): se implemento listado para propt en elementos de "Action menu".
*
Temporal
*
chore: se modifico la referencia de componente bmb-tags derivado del desacoplo del componente.
*
feat(component / action menu): Se eliminó la dependencia del homecard header
*
feat(component/home card header): Se agruparon los elementos de las actions en modo responsivo
*
feat(component) remplazar --docs por --documentation
*
fix(component/Portal): Se cierran los elementos proyectados si se detcta el evento de cambio de ruta en el navegador
*
feat(component) levantar proyecto con merge de rama principal
*
chore: Se agregó el MCP de NX en el proyecto
*
feat(component) solución de merge e importación _shared
*
chore: se modificó el gap del contenido.
*
chore: se agregó mayor detalle en la documentación para pruebas.
*
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
*
Formato
*
chore: se realizó depuración de código para el manejo de id del elemento.
*
chore: se eliminaron advertencias.
*
chore: nuevo escenario de pruebas.
*
chore: se eliminaron los colores no necesarios
*
chore: "Progress bar" responsivo para "Dropzone".
*
chore: se eliminó código no necesario.
*
chore: se realizaron ajustes para eliminar advertencias de código.
*
chore: se agregó configuración correcta para funcionalidad del toggle.
*
migracion
*
chore: se corrigieron errores de ubicación de archivo, nombre atributo y advertencias.
*
fix(component / sidebar): Se corrigieron las alineciones dentro de los elementos del sidebar
*
chore: se corrigió el uso del scrollbar.
*
chore: se realizo ajuste por exportación de tipo de dato.
*
chore: se realizo ajuste para permitir característica de mostrar el "Text link" sin el texto de soporte.
*
chore: se corrigió la referencia.
*
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
*
feat(component) merge feature-prod
*
chore: se eliminó uso de css no necesario.
*
chore: se agregó atributo para permitir el toggle en los íconos.
*
chore: "Progress bar" responsivo para "Dropzone"
*
fix(CI/CD): se corrigieron las pruebas automatizadas
*
feat(component) merge con rama principal
*
chore: se eliminaron líneas duplicadas.
*
feat(component) merge con feature-prod
*
chore(app): Se devolvío la funcionalidad del sandbox
*
fix(dropdown): Se corrigió el componente dropdown, en su versión de selección múltiple
*
feat(component) BmbiFrame versatil
*
feat(component) BmbIframe se agrego soporte nativo a componente
*
chore(component) skeleton & value-counter migración
*
fix(component / calendar): Se corrigió el error de los filtros y los botones en responsivo
*
feat(component/home-card-header): se agrego documentación del componente.
*
chore: Se agregó un SKILL de bamboo, se actualizaron los controles de storybook y se actualizó la documentación para agentes de código
*
chore: strorybook
*
feat(component) ajustar chat usuario y espacios
*
feat(component/action-icon): se implementó la emisión del evento especificando el nombre del ícono para distinguir entre el ícono principal y el  alternativo. Se agregó también documentación para uso del componente en cambio de idioma.
*
feat(component/navidation-bar): se agrego emisión de click en elemento.
*
fix(component) ajustar svg warning para visualizarse proporcional
*
chore: variables de color actualizadas
*
feat(component) chat-burbble fijar copy_icon en vista movil y ajuste de color de iconos en chat de usuario
*
chore: se realizó ajuste para homologar con Figma.
*
chore: se agregaron más íconos al listado.
*
feat(component) BmbIframe merge con feature-prod
*
chore: se desacopla el componente navigation bar
*
docs: update release notes and prompts for version 1.6.4, enhancing clarity and adding new component details
*
fix: update Dockerfiles and publish workflow to use ui-angular directory and adjust build paths
*
chore: se removieron errores de advertencia en el código.
*
Add action headers to home card and enhance button components with output events
*
fix: update TypeScript configuration for production builds and add new tsconfig file
*
fix(component/home card header): se agregó el evento del ratón al homecard
*
chore: se quito código no necesario.
*
feat(component) merge package.json
*
feat(component) merge feature-prod
*
chore: se agregó configuración completa del Action icon.
*
feat(component) remover .event
*
fix: update button click event handling to remove unnecessary event wrapping
*
chore: se removieron errores de advertencia en el código.
*
ci(styles): ensure build:styles outputs to dist/ui-angular so CSS is included in published package
*
feat(component/dropdown-menu): se realizo ajuste para que no permita diferente ícono)
*
feat(components) atender comentarios de pr
*
Fix docs tabs: give each tab panel a unique content id so TableOfContents/Docs target the correct panel
*
ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts
*
chore: se agrego documentación de referencia al "Translations service" para cambio de idioma.
*
fix(component/home card): Se agregó compatibilidad con accent colors para las acciones del header
*
fix: update package version format to include '-a' suffix for consistency
*
fix(ui-angular): build with partial compilation mode for package publish
*
fix(component/bmb-alert-center): add eslint directive for output prefix rule
*
merge
*
chore: se agregó configuración para permitir Typescript dentro de los archivos de documentación de Storybook.
*
feat(component) fix merge conflict
*
feat(merge) conflic new-bamboo

### 🆕 Nuevos Componentes

- **test: Se corrigieron todos los archivos de test rotos**:
test: Se corrigieron todos los archivos de test rotos
- **feat(component/ai-chat-card): se realizaron ajustes para no tener dependencias del "AI chat bar" esto permitirá desarrollo más flexible.**:
feat(component/ai-chat-card): se realizaron ajustes para no tener dependencias del "AI chat bar" esto permitirá desarrollo más flexible.
- **feat(component) BmbDateRange & ButtonIcon migrados**:
feat(component) BmbDateRange & ButtonIcon migrados
- **feat(component) bmb-loader & bmb-home-card migrados**:
feat(component) bmb-loader & bmb-home-card migrados
- **chore: se agregaron más casos de prueba en la aplicación de prueba del componente.**:
chore: se agregaron más casos de prueba en la aplicación de prueba del componente.
- **feat(component) BmbFocusElement & BmbFrequentAppsSelector**:
feat(component) BmbFocusElement & BmbFrequentAppsSelector
- **chore: se agregaron páginas de pruebas de componentes.**:
chore: se agregaron páginas de pruebas de componentes.
- **chore: checkbox(input validator) migrados**:
chore: checkbox(input validator) migrados
- **chore: aplicación para pruebas del "AI Chat card".**:
chore: aplicación para pruebas del "AI Chat card".
- **feat(component/ai-chat-bubble): se modificaron las acciones para permitir que sean opcionales o muestre las asignadas por defecto.**:
feat(component/ai-chat-bubble): se modificaron las acciones para permitir que sean opcionales o muestre las asignadas por defecto.
- **feat(component / portal): Se optimizaron los eventos y salidas**:
feat(component / portal): Se optimizaron los eventos y salidas
- **chore: se agregaron correcciones para cubrir los casos de pruebas existentes antes de modificación de acciones opcionales.**:
chore: se agregaron correcciones para cubrir los casos de pruebas existentes antes de modificación de acciones opcionales.
- **list group migrado**:
list group migrado
- **chore: ai chat editor renombrado y reestructurado**:
chore: ai chat editor renombrado y reestructurado
- **chore: se agregó ejemplo de nuevo botón en el encabezado.**:
chore: se agregó ejemplo de nuevo botón en el encabezado.
- **icon migrado**:
icon migrado
- **chore(component / portal): se refactorizaron los signals**:
chore(component / portal): se refactorizaron los signals
- **chore: se agregó documentación de la detonación del "AI Chat card" desde elementos externos al componente.**:
chore: se agregó documentación de la detonación del "AI Chat card" desde elementos externos al componente.
- **feat(component / multi dot paginator): Se agregó la posibilidad de agregar el contenido de manera asincrona**:
feat(component / multi dot paginator): Se agregó la posibilidad de agregar el contenido de manera asincrona
- **fix(component / search card): Se removieron las tabs de manera nativa del componente**:
fix(component / search card): Se removieron las tabs de manera nativa del componente
- **chore: se agregó funcionalidad para llevar el scroll al final de la sección de "AI chat bubble" y mover el foco al input del "AI Chat bar" contenido en el "AI chat card".**:
chore: se agregó funcionalidad para llevar el scroll al final de la sección de "AI chat bubble" y mover el foco al input del "AI Chat bar" contenido en el "AI chat card".
- **feat(component) cambiar nombre de chat-editor a chat-ai-editor**:
feat(component) cambiar nombre de chat-editor a chat-ai-editor
- **chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".**:
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
- **chore: se agregó validación para cubrir el máximo de íconos en el encabezado según lineamiento.**:
chore: se agregó validación para cubrir el máximo de íconos en el encabezado según lineamiento.
- **chore: se realizo ajuste para mostrar "AI Chat card" en modo "chat" para poder detonar desde otra instancia.**:
chore: se realizo ajuste para mostrar "AI Chat card" en modo "chat" para poder detonar desde otra instancia.
- **chore: se agregaron correcciones por casos de pruebas.**:
chore: se agregaron correcciones por casos de pruebas.
- **chore:  se agregó documentación**:
chore:  se agregó documentación
- **chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".**:
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
- **chore: se actualizaron estilos (CSS) para correcto funcionamiento "inline" para no afectar al modo "expanded".**:
chore: se actualizaron estilos (CSS) para correcto funcionamiento "inline" para no afectar al modo "expanded".
- **feat(component / dropdown): Se agregó la posibilidad de que los elementos del dropdown tengan más de una línea**:
feat(component / dropdown): Se agregó la posibilidad de que los elementos del dropdown tengan más de una línea
- **feat(component / dropdown): Se modificó el cálculo del tamaño del modal del dropdown**:
feat(component / dropdown): Se modificó el cálculo del tamaño del modal del dropdown
- **chore: se modificó la jerarquía de contenedores para controlar el alto de manera flexible.**:
chore: se modificó la jerarquía de contenedores para controlar el alto de manera flexible.
- **chore: Se corrigió el flujo de sonarqube**:
chore: Se corrigió el flujo de sonarqube
- **fixed imports @shared**:
fixed imports @shared
- **feat(component) BmbTopBarItem test solo dejar de creación**:
feat(component) BmbTopBarItem test solo dejar de creación
- **chore: se agregaron correcciones por casos de pruebas.**:
chore: se agregaron correcciones por casos de pruebas.
- **feat(component) bmb-home-card & bmb-loader migrados**:
feat(component) bmb-home-card & bmb-loader migrados
- **chore: se agrego funcionalidad para regresar al modo del cual se detono el modo "chat" siempre que sea colapsado.**:
chore: se agrego funcionalidad para regresar al modo del cual se detono el modo "chat" siempre que sea colapsado.
- **Se actualizaron las pruebas**:
Se actualizaron las pruebas
- **feat(component) merge resuelto**:
feat(component) merge resuelto
- **chore: se realizaron ajustes al para limitar el alto del contenedor del "Ai Chat card".**:
chore: se realizaron ajustes al para limitar el alto del contenedor del "Ai Chat card".
- **chore: se agregó mensaje de error en consola para aclaración de lineamiento a los desarrolladores.**:
chore: se agregó mensaje de error en consola para aclaración de lineamiento a los desarrolladores.
- **chore: Se actualizó el proceso de pruebas**:
chore: Se actualizó el proceso de pruebas
- **feat(component/top-bar): se modifico el ancho y ancho máximo para ajuste con base a su contenedor.**:
feat(component/top-bar): se modifico el ancho y ancho máximo para ajuste con base a su contenedor.
- **Update opencode.json**:
Update opencode.json
- **feat(component) merge resuelto**:
feat(component) merge resuelto
- **feat(component) merge feature-prod y scss _shared por shared**:
feat(component) merge feature-prod y scss _shared por shared
- **feat: update Storybook configuration and add Changelog**:
feat: update Storybook configuration and add Changelog

- Modified Storybook main configuration to include additional story file patterns.
- Added a new Changelog.mdx file to display the changelog using Storybook's documentation features.
- Enhanced the bmb-search-card component stories by adding a new 'disableFavoritesTab' property with documentation.
- **chore: Se eliminó la carpeta core**:
chore: Se eliminó la carpeta core
- **bmb layout**:
bmb layout
- **bmb layout compelted**:
bmb layout compelted
- **feat(component) BmbGenericCardButton templates agregados**:
feat(component) BmbGenericCardButton templates agregados
- **migration**:
migration
- **feat(component) migración bmb-icon-status & bmb-paginator**:
feat(component) migración bmb-icon-status & bmb-paginator
- **chore: se agregó componente bmb-ai-chat-card para evitar ruptura de código. En el nuevo componente se permite agregar los bmb-ai-chat-bubble e implementar sus propiedades sin agregarlas como dependencias.**:
chore: se agregó componente bmb-ai-chat-card para evitar ruptura de código. En el nuevo componente se permite agregar los bmb-ai-chat-bubble e implementar sus propiedades sin agregarlas como dependencias.
- **feat(component) migraciòn bmb-fab & bmb-dot**:
feat(component) migraciòn bmb-fab & bmb-dot
- **feat(component) migraciòn bmb-hito-list & bmb-icon-item**:
feat(component) migraciòn bmb-hito-list & bmb-icon-item
- **feat(component) migración bmb-icon-status & bmb-paginato**:
feat(component) migración bmb-icon-status & bmb-paginato
- **feat(component) migración bmb-icon-status & bmb-paginator**:
feat(component) migración bmb-icon-status & bmb-paginator
- **feat(component) acción copy en bmb-ai-chat-bubble y algunos warning**:
feat(component) acción copy en bmb-ai-chat-bubble y algunos warning
- **chore: se agregó documentación para uso de métodos de apoyo para generar detalle en las historias de Storybook.**:
chore: se agregó documentación para uso de métodos de apoyo para generar detalle en las historias de Storybook.
- **Revert "fix: Se removieron las importanciones invalidas"**:
Revert "fix: Se removieron las importanciones invalidas"

This reverts commit 599e2b49b8fcb57f1666f4638ab89204b542f0eb.
- **fix: Se removieron las importanciones invalidas**:
fix: Se removieron las importanciones invalidas
- **chore: cambios de diseño alternativo**:
chore: cambios de diseño alternativo
- **chore: se agregaron logs para indicar componentes descontinuados. Se quitaron dependencias de componentes descontinuados.**:
chore: se agregaron logs para indicar componentes descontinuados. Se quitaron dependencias de componentes descontinuados.
- **chore: se descontinuo el botón de cambio de rol en el componente "Top bar".**:
chore: se descontinuo el botón de cambio de rol en el componente "Top bar".
- **fix(component / ai chat bubble): Se corrigió la emisión del evento**:
fix(component / ai chat bubble): Se corrigió la emisión del evento
- **chore: se modificaron ejemplos de documentación para más claridad.**:
chore: se modificaron ejemplos de documentación para más claridad.
- **feat(component / search card): Se agregó la opción de deshabilitar los favoritos**:
feat(component / search card): Se agregó la opción de deshabilitar los favoritos
- **refactor(bmb-home-card-header): streamline action handling for mobile and desktop views**:
refactor(bmb-home-card-header): streamline action handling for mobile and desktop views
- **feat(componente/top-bar): se agregó nuevo botón de favoritos.**:
feat(componente/top-bar): se agregó nuevo botón de favoritos.
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **feat(component/chat-bar): se agregó característica para poner opcional el cambiar el ícono del bot en el "AI Chat bar".**:
feat(component/chat-bar): se agregó característica para poner opcional el cambiar el ícono del bot en el "AI Chat bar".
- **fix(component / modals): Ahora los modales nativos en las actions reciben parametros**:
fix(component / modals): Ahora los modales nativos en las actions reciben parametros
- **merge**:
merge
- **chore: Se agregó compatibilidad en los scripts para windows**:
chore: Se agregó compatibilidad en los scripts para windows
- **fix(component / table): Se removió la columna duplicada select**:
fix(component / table): Se removió la columna duplicada select
- **fixed imports**:
fixed imports
- **chore: se agregó propiedad para mostrar micrófono en el "AI Chat bar".**:
chore: se agregó propiedad para mostrar micrófono en el "AI Chat bar".
- **v1.6.4-d pack**:
v1.6.4-d pack
- **feat(component) merge conflictos**:
feat(component) merge conflictos
- **feat(component) exportar todo desde index**:
feat(component) exportar todo desde index
- **chore: se agregó el nuevo componente al index para uso de los desarrolladores.**:
chore: se agregó el nuevo componente al index para uso de los desarrolladores.
- **chore: se agregó validación para evitar errores.**:
chore: se agregó validación para evitar errores.
- **fix imports**:
fix imports
- **chore: se agregó un comando antes de ejecutar chromatic para asegurar la actualización**:
chore: se agregó un comando antes de ejecutar chromatic para asegurar la actualización
- **chore: se eliminó advertencia.**:
chore: se eliminó advertencia.
- **feat(component) bmb-hito-list & bmb-icon-item**:
feat(component) bmb-hito-list & bmb-icon-item
- **Update index.ts**:
Update index.ts
- **Se realiza la mezcla ara integrarlo a "AI chat card"**:
Se realiza la mezcla ara integrarlo a "AI chat card"

Chat ia bubble copy
- **feat(component) update feature-prod**:
feat(component) update feature-prod
- **fix(tests): remove unused imports in BmbLayoutItemDirective spec**:
fix(tests): remove unused imports in BmbLayoutItemDirective spec
- **refactor(bmb-ai-chat-bubble): remove unused imports from component and stories**:
refactor(bmb-ai-chat-bubble): remove unused imports from component and stories
- **revert change**:
revert change
- **feat(component) bmb-breadcrumb & bmb-bookmark migrados**:
feat(component) bmb-breadcrumb & bmb-bookmark migrados
- **chore: se eliminaron archivo por desaclople.**:
chore: se eliminaron archivo por desaclople.
- **chore: se completó el desacoplo del componente bmb-tags.**:
chore: se completó el desacoplo del componente bmb-tags.
- **feat(components/home card): Se agregó la propiedad showExpandAndCollapseButton al home card**:
feat(components/home card): Se agregó la propiedad showExpandAndCollapseButton al home card
- **feat(component/home-card-header): se agregó funcionalidad responsiva.**:
feat(component/home-card-header): se agregó funcionalidad responsiva.
- **feat(component / filter card): Se agregó la pestaña de favoritos**:
feat(component / filter card): Se agregó la pestaña de favoritos
- **chore: se realizó ajuste por homologación de nomenclatura de clases de css.**:
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
- **feat(component) archivo nxw**:
feat(component) archivo nxw
- **chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".**:
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
- **feat(component/ai-chat-bubble): se implemento listado para propt en elementos de "Action menu".**:
feat(component/ai-chat-bubble): se implemento listado para propt en elementos de "Action menu".
- **Temporal**:
Temporal
- **chore: se modifico la referencia de componente bmb-tags derivado del desacoplo del componente.**:
chore: se modifico la referencia de componente bmb-tags derivado del desacoplo del componente.
- **feat(component / action menu): Se eliminó la dependencia del homecard header**:
feat(component / action menu): Se eliminó la dependencia del homecard header
- **feat(component/home card header): Se agruparon los elementos de las actions en modo responsivo**:
feat(component/home card header): Se agruparon los elementos de las actions en modo responsivo
- **feat(component) remplazar --docs por --documentation**:
feat(component) remplazar --docs por --documentation
- **fix(component/Portal): Se cierran los elementos proyectados si se detcta el evento de cambio de ruta en el navegador**:
fix(component/Portal): Se cierran los elementos proyectados si se detcta el evento de cambio de ruta en el navegador
- **feat(component) levantar proyecto con merge de rama principal**:
feat(component) levantar proyecto con merge de rama principal
- **chore: Se agregó el MCP de NX en el proyecto**:
chore: Se agregó el MCP de NX en el proyecto
- **feat(component) solución de merge e importación _shared**:
feat(component) solución de merge e importación _shared
- **chore: se modificó el gap del contenido.**:
chore: se modificó el gap del contenido.
- **chore: se agregó mayor detalle en la documentación para pruebas.**:
chore: se agregó mayor detalle en la documentación para pruebas.
- **chore: se realizó ajuste por homologación de nomenclatura de clases de css.**:
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
- **Formato**:
Formato
- **chore: se realizó depuración de código para el manejo de id del elemento.**:
chore: se realizó depuración de código para el manejo de id del elemento.
- **chore: se eliminaron advertencias.**:
chore: se eliminaron advertencias.
- **chore: nuevo escenario de pruebas.**:
chore: nuevo escenario de pruebas.
- **chore: se eliminaron los colores no necesarios**:
chore: se eliminaron los colores no necesarios
- **chore: "Progress bar" responsivo para "Dropzone".**:
chore: "Progress bar" responsivo para "Dropzone".
- **chore: se eliminó código no necesario.**:
chore: se eliminó código no necesario.
- **chore: se realizaron ajustes para eliminar advertencias de código.**:
chore: se realizaron ajustes para eliminar advertencias de código.
- **chore: se agregó configuración correcta para funcionalidad del toggle.**:
chore: se agregó configuración correcta para funcionalidad del toggle.
- **migracion**:
migracion
- **chore: se corrigieron errores de ubicación de archivo, nombre atributo y advertencias.**:
chore: se corrigieron errores de ubicación de archivo, nombre atributo y advertencias.
- **fix(component / sidebar): Se corrigieron las alineciones dentro de los elementos del sidebar**:
fix(component / sidebar): Se corrigieron las alineciones dentro de los elementos del sidebar
- **chore: se corrigió el uso del scrollbar.**:
chore: se corrigió el uso del scrollbar.
- **chore: se realizo ajuste por exportación de tipo de dato.**:
chore: se realizo ajuste por exportación de tipo de dato.
- **chore: se realizo ajuste para permitir característica de mostrar el "Text link" sin el texto de soporte.**:
chore: se realizo ajuste para permitir característica de mostrar el "Text link" sin el texto de soporte.
- **chore: se corrigió la referencia.**:
chore: se corrigió la referencia.
- **chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".**:
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".

chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **chore: se eliminó uso de css no necesario.**:
chore: se eliminó uso de css no necesario.
- **chore: se agregó atributo para permitir el toggle en los íconos.**:
chore: se agregó atributo para permitir el toggle en los íconos.
- **chore: "Progress bar" responsivo para "Dropzone"**:
chore: "Progress bar" responsivo para "Dropzone"

chore: "Progress bar" responsivo para "Dropzone".
- **fix(CI/CD): se corrigieron las pruebas automatizadas**:
fix(CI/CD): se corrigieron las pruebas automatizadas
- **feat(component) merge con rama principal**:
feat(component) merge con rama principal
- **chore: se eliminaron líneas duplicadas.**:
chore: se eliminaron líneas duplicadas.
- **feat(component) merge con feature-prod**:
feat(component) merge con feature-prod
- **chore(app): Se devolvío la funcionalidad del sandbox**:
chore(app): Se devolvío la funcionalidad del sandbox
- **fix(dropdown): Se corrigió el componente dropdown, en su versión de selección múltiple**:
fix(dropdown): Se corrigió el componente dropdown, en su versión de selección múltiple
- **feat(component) BmbiFrame versatil**:
feat(component) BmbiFrame versatil
- **feat(component) BmbIframe se agrego soporte nativo a componente**:
feat(component) BmbIframe se agrego soporte nativo a componente
- **chore(component) skeleton & value-counter migración**:
chore(component) skeleton & value-counter migración
- **fix(component / calendar): Se corrigió el error de los filtros y los botones en responsivo**:
fix(component / calendar): Se corrigió el error de los filtros y los botones en responsivo
- **feat(component/home-card-header): se agrego documentación del componente.**:
feat(component/home-card-header): se agrego documentación del componente.
- **chore: Se agregó un SKILL de bamboo, se actualizaron los controles de storybook y se actualizó la documentación para agentes de código**:
chore: Se agregó un SKILL de bamboo, se actualizaron los controles de storybook y se actualizó la documentación para agentes de código
- **chore: strorybook**:
chore: strorybook
- **feat(component) ajustar chat usuario y espacios**:
feat(component) ajustar chat usuario y espacios
- **feat(component/action-icon): se implementó la emisión del evento especificando el nombre del ícono para distinguir entre el ícono principal y el  alternativo. Se agregó también documentación para uso del componente en cambio de idioma.**:
feat(component/action-icon): se implementó la emisión del evento especificando el nombre del ícono para distinguir entre el ícono principal y el  alternativo. Se agregó también documentación para uso del componente en cambio de idioma.
- **feat(component/navidation-bar): se agrego emisión de click en elemento.**:
feat(component/navidation-bar): se agrego emisión de click en elemento.
- **fix(component) ajustar svg warning para visualizarse proporcional**:
fix(component) ajustar svg warning para visualizarse proporcional
- **chore: variables de color actualizadas**:
chore: variables de color actualizadas
- **feat(component) chat-burbble fijar copy_icon en vista movil y ajuste de color de iconos en chat de usuario**:
feat(component) chat-burbble fijar copy_icon en vista movil y ajuste de color de iconos en chat de usuario
- **chore: se realizó ajuste para homologar con Figma.**:
chore: se realizó ajuste para homologar con Figma.
- **chore: se agregaron más íconos al listado.**:
chore: se agregaron más íconos al listado.
- **feat(component) BmbIframe merge con feature-prod**:
feat(component) BmbIframe merge con feature-prod
- **chore: se desacopla el componente navigation bar**:
chore: se desacopla el componente navigation bar
- **docs: update release notes and prompts for version 1.6.4, enhancing clarity and adding new component details**:
docs: update release notes and prompts for version 1.6.4, enhancing clarity and adding new component details
- **fix: update Dockerfiles and publish workflow to use ui-angular directory and adjust build paths**:
fix: update Dockerfiles and publish workflow to use ui-angular directory and adjust build paths
- **chore: se removieron errores de advertencia en el código.**:
chore: se removieron errores de advertencia en el código.
- **Add action headers to home card and enhance button components with output events**:
Add action headers to home card and enhance button components with output events
- **fix: update TypeScript configuration for production builds and add new tsconfig file**:
fix: update TypeScript configuration for production builds and add new tsconfig file
- **fix(component/home card header): se agregó el evento del ratón al homecard**:
fix(component/home card header): se agregó el evento del ratón al homecard
- **chore: se quito código no necesario.**:
chore: se quito código no necesario.
- **feat(component) merge package.json**:
feat(component) merge package.json
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **chore: se agregó configuración completa del Action icon.**:
chore: se agregó configuración completa del Action icon.
- **feat(component) remover .event**:
feat(component) remover .event
- **fix: update button click event handling to remove unnecessary event wrapping**:
fix: update button click event handling to remove unnecessary event wrapping
- **chore: se removieron errores de advertencia en el código.**:
chore: se removieron errores de advertencia en el código.
- **ci(styles): ensure build:styles outputs to dist/ui-angular so CSS is included in published package**:
ci(styles): ensure build:styles outputs to dist/ui-angular so CSS is included in published package

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **feat(component/dropdown-menu): se realizo ajuste para que no permita diferente ícono)**:
feat(component/dropdown-menu): se realizo ajuste para que no permita diferente ícono)
- **feat(components) atender comentarios de pr**:
feat(components) atender comentarios de pr
- **Fix docs tabs: give each tab panel a unique content id so TableOfContents/Docs target the correct panel**:
Fix docs tabs: give each tab panel a unique content id so TableOfContents/Docs target the correct panel

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts**:
ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **chore: se agrego documentación de referencia al "Translations service" para cambio de idioma.**:
chore: se agrego documentación de referencia al "Translations service" para cambio de idioma.
- **fix(component/home card): Se agregó compatibilidad con accent colors para las acciones del header**:
fix(component/home card): Se agregó compatibilidad con accent colors para las acciones del header
- **fix: update package version format to include '-a' suffix for consistency**:
fix: update package version format to include '-a' suffix for consistency
- **fix(ui-angular): build with partial compilation mode for package publish**:
fix(ui-angular): build with partial compilation mode for package publish

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **fix(component/bmb-alert-center): add eslint directive for output prefix rule**:
fix(component/bmb-alert-center): add eslint directive for output prefix rule
- **merge**:
merge
- **chore: se agregó configuración para permitir Typescript dentro de los archivos de documentación de Storybook.**:
chore: se agregó configuración para permitir Typescript dentro de los archivos de documentación de Storybook.
- **feat(component) fix merge conflict**:
feat(component) fix merge conflict
- **feat(merge) conflic new-bamboo**:
feat(merge) conflic new-bamboo

### 🔄 Componentes Actualizados

- **test: Se corrigieron todos los archivos de test rotos**:
test: Se corrigieron todos los archivos de test rotos
- **feat(component/ai-chat-card): se realizaron ajustes para no tener dependencias del "AI chat bar" esto permitirá desarrollo más flexible.**:
feat(component/ai-chat-card): se realizaron ajustes para no tener dependencias del "AI chat bar" esto permitirá desarrollo más flexible.
- **feat(component) BmbDateRange & ButtonIcon migrados**:
feat(component) BmbDateRange & ButtonIcon migrados
- **feat(component) bmb-loader & bmb-home-card migrados**:
feat(component) bmb-loader & bmb-home-card migrados
- **chore: se agregaron más casos de prueba en la aplicación de prueba del componente.**:
chore: se agregaron más casos de prueba en la aplicación de prueba del componente.
- **feat(component) BmbFocusElement & BmbFrequentAppsSelector**:
feat(component) BmbFocusElement & BmbFrequentAppsSelector
- **chore: se agregaron páginas de pruebas de componentes.**:
chore: se agregaron páginas de pruebas de componentes.
- **chore: checkbox(input validator) migrados**:
chore: checkbox(input validator) migrados
- **chore: aplicación para pruebas del "AI Chat card".**:
chore: aplicación para pruebas del "AI Chat card".
- **feat(component/ai-chat-bubble): se modificaron las acciones para permitir que sean opcionales o muestre las asignadas por defecto.**:
feat(component/ai-chat-bubble): se modificaron las acciones para permitir que sean opcionales o muestre las asignadas por defecto.
- **feat(component / portal): Se optimizaron los eventos y salidas**:
feat(component / portal): Se optimizaron los eventos y salidas
- **chore: se agregaron correcciones para cubrir los casos de pruebas existentes antes de modificación de acciones opcionales.**:
chore: se agregaron correcciones para cubrir los casos de pruebas existentes antes de modificación de acciones opcionales.
- **list group migrado**:
list group migrado
- **chore: ai chat editor renombrado y reestructurado**:
chore: ai chat editor renombrado y reestructurado
- **chore: se agregó ejemplo de nuevo botón en el encabezado.**:
chore: se agregó ejemplo de nuevo botón en el encabezado.
- **icon migrado**:
icon migrado
- **chore(component / portal): se refactorizaron los signals**:
chore(component / portal): se refactorizaron los signals
- **chore: se agregó documentación de la detonación del "AI Chat card" desde elementos externos al componente.**:
chore: se agregó documentación de la detonación del "AI Chat card" desde elementos externos al componente.
- **feat(component / multi dot paginator): Se agregó la posibilidad de agregar el contenido de manera asincrona**:
feat(component / multi dot paginator): Se agregó la posibilidad de agregar el contenido de manera asincrona
- **fix(component / search card): Se removieron las tabs de manera nativa del componente**:
fix(component / search card): Se removieron las tabs de manera nativa del componente
- **chore: se agregó funcionalidad para llevar el scroll al final de la sección de "AI chat bubble" y mover el foco al input del "AI Chat bar" contenido en el "AI chat card".**:
chore: se agregó funcionalidad para llevar el scroll al final de la sección de "AI chat bubble" y mover el foco al input del "AI Chat bar" contenido en el "AI chat card".
- **feat(component) cambiar nombre de chat-editor a chat-ai-editor**:
feat(component) cambiar nombre de chat-editor a chat-ai-editor
- **chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".**:
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
- **chore: se agregó validación para cubrir el máximo de íconos en el encabezado según lineamiento.**:
chore: se agregó validación para cubrir el máximo de íconos en el encabezado según lineamiento.
- **chore: se realizo ajuste para mostrar "AI Chat card" en modo "chat" para poder detonar desde otra instancia.**:
chore: se realizo ajuste para mostrar "AI Chat card" en modo "chat" para poder detonar desde otra instancia.
- **chore: se agregaron correcciones por casos de pruebas.**:
chore: se agregaron correcciones por casos de pruebas.
- **chore:  se agregó documentación**:
chore:  se agregó documentación
- **chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".**:
chore: se realizó ajuste en componente bmb-home-card-header para implementar particularidad de "AI Chat card".
- **chore: se actualizaron estilos (CSS) para correcto funcionamiento "inline" para no afectar al modo "expanded".**:
chore: se actualizaron estilos (CSS) para correcto funcionamiento "inline" para no afectar al modo "expanded".
- **feat(component / dropdown): Se agregó la posibilidad de que los elementos del dropdown tengan más de una línea**:
feat(component / dropdown): Se agregó la posibilidad de que los elementos del dropdown tengan más de una línea
- **feat(component / dropdown): Se modificó el cálculo del tamaño del modal del dropdown**:
feat(component / dropdown): Se modificó el cálculo del tamaño del modal del dropdown
- **chore: se modificó la jerarquía de contenedores para controlar el alto de manera flexible.**:
chore: se modificó la jerarquía de contenedores para controlar el alto de manera flexible.
- **chore: Se corrigió el flujo de sonarqube**:
chore: Se corrigió el flujo de sonarqube
- **fixed imports @shared**:
fixed imports @shared
- **feat(component) BmbTopBarItem test solo dejar de creación**:
feat(component) BmbTopBarItem test solo dejar de creación
- **chore: se agregaron correcciones por casos de pruebas.**:
chore: se agregaron correcciones por casos de pruebas.
- **feat(component) bmb-home-card & bmb-loader migrados**:
feat(component) bmb-home-card & bmb-loader migrados
- **chore: se agrego funcionalidad para regresar al modo del cual se detono el modo "chat" siempre que sea colapsado.**:
chore: se agrego funcionalidad para regresar al modo del cual se detono el modo "chat" siempre que sea colapsado.
- **Se actualizaron las pruebas**:
Se actualizaron las pruebas
- **feat(component) merge resuelto**:
feat(component) merge resuelto
- **chore: se realizaron ajustes al para limitar el alto del contenedor del "Ai Chat card".**:
chore: se realizaron ajustes al para limitar el alto del contenedor del "Ai Chat card".
- **chore: se agregó mensaje de error en consola para aclaración de lineamiento a los desarrolladores.**:
chore: se agregó mensaje de error en consola para aclaración de lineamiento a los desarrolladores.
- **chore: Se actualizó el proceso de pruebas**:
chore: Se actualizó el proceso de pruebas
- **feat(component/top-bar): se modifico el ancho y ancho máximo para ajuste con base a su contenedor.**:
feat(component/top-bar): se modifico el ancho y ancho máximo para ajuste con base a su contenedor.
- **Update opencode.json**:
Update opencode.json
- **feat(component) merge resuelto**:
feat(component) merge resuelto
- **feat(component) merge feature-prod y scss _shared por shared**:
feat(component) merge feature-prod y scss _shared por shared
- **feat: update Storybook configuration and add Changelog**:
feat: update Storybook configuration and add Changelog

- Modified Storybook main configuration to include additional story file patterns.
- Added a new Changelog.mdx file to display the changelog using Storybook's documentation features.
- Enhanced the bmb-search-card component stories by adding a new 'disableFavoritesTab' property with documentation.
- **chore: Se eliminó la carpeta core**:
chore: Se eliminó la carpeta core
- **bmb layout**:
bmb layout
- **bmb layout compelted**:
bmb layout compelted
- **feat(component) BmbGenericCardButton templates agregados**:
feat(component) BmbGenericCardButton templates agregados
- **migration**:
migration
- **feat(component) migración bmb-icon-status & bmb-paginator**:
feat(component) migración bmb-icon-status & bmb-paginator
- **chore: se agregó componente bmb-ai-chat-card para evitar ruptura de código. En el nuevo componente se permite agregar los bmb-ai-chat-bubble e implementar sus propiedades sin agregarlas como dependencias.**:
chore: se agregó componente bmb-ai-chat-card para evitar ruptura de código. En el nuevo componente se permite agregar los bmb-ai-chat-bubble e implementar sus propiedades sin agregarlas como dependencias.
- **feat(component) migraciòn bmb-fab & bmb-dot**:
feat(component) migraciòn bmb-fab & bmb-dot
- **feat(component) migraciòn bmb-hito-list & bmb-icon-item**:
feat(component) migraciòn bmb-hito-list & bmb-icon-item
- **feat(component) migración bmb-icon-status & bmb-paginato**:
feat(component) migración bmb-icon-status & bmb-paginato
- **feat(component) migración bmb-icon-status & bmb-paginator**:
feat(component) migración bmb-icon-status & bmb-paginator
- **feat(component) acción copy en bmb-ai-chat-bubble y algunos warning**:
feat(component) acción copy en bmb-ai-chat-bubble y algunos warning
- **chore: se agregó documentación para uso de métodos de apoyo para generar detalle en las historias de Storybook.**:
chore: se agregó documentación para uso de métodos de apoyo para generar detalle en las historias de Storybook.
- **Revert "fix: Se removieron las importanciones invalidas"**:
Revert "fix: Se removieron las importanciones invalidas"

This reverts commit 599e2b49b8fcb57f1666f4638ab89204b542f0eb.
- **fix: Se removieron las importanciones invalidas**:
fix: Se removieron las importanciones invalidas
- **chore: cambios de diseño alternativo**:
chore: cambios de diseño alternativo
- **chore: se agregaron logs para indicar componentes descontinuados. Se quitaron dependencias de componentes descontinuados.**:
chore: se agregaron logs para indicar componentes descontinuados. Se quitaron dependencias de componentes descontinuados.
- **chore: se descontinuo el botón de cambio de rol en el componente "Top bar".**:
chore: se descontinuo el botón de cambio de rol en el componente "Top bar".
- **fix(component / ai chat bubble): Se corrigió la emisión del evento**:
fix(component / ai chat bubble): Se corrigió la emisión del evento
- **chore: se modificaron ejemplos de documentación para más claridad.**:
chore: se modificaron ejemplos de documentación para más claridad.
- **feat(component / search card): Se agregó la opción de deshabilitar los favoritos**:
feat(component / search card): Se agregó la opción de deshabilitar los favoritos
- **refactor(bmb-home-card-header): streamline action handling for mobile and desktop views**:
refactor(bmb-home-card-header): streamline action handling for mobile and desktop views
- **feat(componente/top-bar): se agregó nuevo botón de favoritos.**:
feat(componente/top-bar): se agregó nuevo botón de favoritos.
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **feat(component/chat-bar): se agregó característica para poner opcional el cambiar el ícono del bot en el "AI Chat bar".**:
feat(component/chat-bar): se agregó característica para poner opcional el cambiar el ícono del bot en el "AI Chat bar".
- **fix(component / modals): Ahora los modales nativos en las actions reciben parametros**:
fix(component / modals): Ahora los modales nativos en las actions reciben parametros
- **merge**:
merge
- **chore: Se agregó compatibilidad en los scripts para windows**:
chore: Se agregó compatibilidad en los scripts para windows
- **fix(component / table): Se removió la columna duplicada select**:
fix(component / table): Se removió la columna duplicada select
- **fixed imports**:
fixed imports
- **chore: se agregó propiedad para mostrar micrófono en el "AI Chat bar".**:
chore: se agregó propiedad para mostrar micrófono en el "AI Chat bar".
- **v1.6.4-d pack**:
v1.6.4-d pack
- **feat(component) merge conflictos**:
feat(component) merge conflictos
- **feat(component) exportar todo desde index**:
feat(component) exportar todo desde index
- **chore: se agregó el nuevo componente al index para uso de los desarrolladores.**:
chore: se agregó el nuevo componente al index para uso de los desarrolladores.
- **chore: se agregó validación para evitar errores.**:
chore: se agregó validación para evitar errores.
- **fix imports**:
fix imports
- **chore: se agregó un comando antes de ejecutar chromatic para asegurar la actualización**:
chore: se agregó un comando antes de ejecutar chromatic para asegurar la actualización
- **chore: se eliminó advertencia.**:
chore: se eliminó advertencia.
- **feat(component) bmb-hito-list & bmb-icon-item**:
feat(component) bmb-hito-list & bmb-icon-item
- **Update index.ts**:
Update index.ts
- **Se realiza la mezcla ara integrarlo a "AI chat card"**:
Se realiza la mezcla ara integrarlo a "AI chat card"

Chat ia bubble copy
- **feat(component) update feature-prod**:
feat(component) update feature-prod
- **fix(tests): remove unused imports in BmbLayoutItemDirective spec**:
fix(tests): remove unused imports in BmbLayoutItemDirective spec
- **refactor(bmb-ai-chat-bubble): remove unused imports from component and stories**:
refactor(bmb-ai-chat-bubble): remove unused imports from component and stories
- **revert change**:
revert change
- **feat(component) bmb-breadcrumb & bmb-bookmark migrados**:
feat(component) bmb-breadcrumb & bmb-bookmark migrados
- **chore: se eliminaron archivo por desaclople.**:
chore: se eliminaron archivo por desaclople.
- **chore: se completó el desacoplo del componente bmb-tags.**:
chore: se completó el desacoplo del componente bmb-tags.
- **feat(components/home card): Se agregó la propiedad showExpandAndCollapseButton al home card**:
feat(components/home card): Se agregó la propiedad showExpandAndCollapseButton al home card
- **feat(component/home-card-header): se agregó funcionalidad responsiva.**:
feat(component/home-card-header): se agregó funcionalidad responsiva.
- **feat(component / filter card): Se agregó la pestaña de favoritos**:
feat(component / filter card): Se agregó la pestaña de favoritos
- **chore: se realizó ajuste por homologación de nomenclatura de clases de css.**:
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
- **feat(component) archivo nxw**:
feat(component) archivo nxw
- **chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".**:
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
- **feat(component/ai-chat-bubble): se implemento listado para propt en elementos de "Action menu".**:
feat(component/ai-chat-bubble): se implemento listado para propt en elementos de "Action menu".
- **Temporal**:
Temporal
- **chore: se modifico la referencia de componente bmb-tags derivado del desacoplo del componente.**:
chore: se modifico la referencia de componente bmb-tags derivado del desacoplo del componente.
- **feat(component / action menu): Se eliminó la dependencia del homecard header**:
feat(component / action menu): Se eliminó la dependencia del homecard header
- **feat(component/home card header): Se agruparon los elementos de las actions en modo responsivo**:
feat(component/home card header): Se agruparon los elementos de las actions en modo responsivo
- **feat(component) remplazar --docs por --documentation**:
feat(component) remplazar --docs por --documentation
- **fix(component/Portal): Se cierran los elementos proyectados si se detcta el evento de cambio de ruta en el navegador**:
fix(component/Portal): Se cierran los elementos proyectados si se detcta el evento de cambio de ruta en el navegador
- **feat(component) levantar proyecto con merge de rama principal**:
feat(component) levantar proyecto con merge de rama principal
- **chore: Se agregó el MCP de NX en el proyecto**:
chore: Se agregó el MCP de NX en el proyecto
- **feat(component) solución de merge e importación _shared**:
feat(component) solución de merge e importación _shared
- **chore: se modificó el gap del contenido.**:
chore: se modificó el gap del contenido.
- **chore: se agregó mayor detalle en la documentación para pruebas.**:
chore: se agregó mayor detalle en la documentación para pruebas.
- **chore: se realizó ajuste por homologación de nomenclatura de clases de css.**:
chore: se realizó ajuste por homologación de nomenclatura de clases de css.
- **Formato**:
Formato
- **chore: se realizó depuración de código para el manejo de id del elemento.**:
chore: se realizó depuración de código para el manejo de id del elemento.
- **chore: se eliminaron advertencias.**:
chore: se eliminaron advertencias.
- **chore: nuevo escenario de pruebas.**:
chore: nuevo escenario de pruebas.
- **chore: se eliminaron los colores no necesarios**:
chore: se eliminaron los colores no necesarios
- **chore: "Progress bar" responsivo para "Dropzone".**:
chore: "Progress bar" responsivo para "Dropzone".
- **chore: se eliminó código no necesario.**:
chore: se eliminó código no necesario.
- **chore: se realizaron ajustes para eliminar advertencias de código.**:
chore: se realizaron ajustes para eliminar advertencias de código.
- **chore: se agregó configuración correcta para funcionalidad del toggle.**:
chore: se agregó configuración correcta para funcionalidad del toggle.
- **migracion**:
migracion
- **chore: se corrigieron errores de ubicación de archivo, nombre atributo y advertencias.**:
chore: se corrigieron errores de ubicación de archivo, nombre atributo y advertencias.
- **fix(component / sidebar): Se corrigieron las alineciones dentro de los elementos del sidebar**:
fix(component / sidebar): Se corrigieron las alineciones dentro de los elementos del sidebar
- **chore: se corrigió el uso del scrollbar.**:
chore: se corrigió el uso del scrollbar.
- **chore: se realizo ajuste por exportación de tipo de dato.**:
chore: se realizo ajuste por exportación de tipo de dato.
- **chore: se realizo ajuste para permitir característica de mostrar el "Text link" sin el texto de soporte.**:
chore: se realizo ajuste para permitir característica de mostrar el "Text link" sin el texto de soporte.
- **chore: se corrigió la referencia.**:
chore: se corrigió la referencia.
- **chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".**:
chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".

chore: se agregaron validaciones para funcionalidad responsiva de las acciones mostradas en el encabezado del "Home card".
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **chore: se eliminó uso de css no necesario.**:
chore: se eliminó uso de css no necesario.
- **chore: se agregó atributo para permitir el toggle en los íconos.**:
chore: se agregó atributo para permitir el toggle en los íconos.
- **chore: "Progress bar" responsivo para "Dropzone"**:
chore: "Progress bar" responsivo para "Dropzone"

chore: "Progress bar" responsivo para "Dropzone".
- **fix(CI/CD): se corrigieron las pruebas automatizadas**:
fix(CI/CD): se corrigieron las pruebas automatizadas
- **feat(component) merge con rama principal**:
feat(component) merge con rama principal
- **chore: se eliminaron líneas duplicadas.**:
chore: se eliminaron líneas duplicadas.
- **feat(component) merge con feature-prod**:
feat(component) merge con feature-prod
- **chore(app): Se devolvío la funcionalidad del sandbox**:
chore(app): Se devolvío la funcionalidad del sandbox
- **fix(dropdown): Se corrigió el componente dropdown, en su versión de selección múltiple**:
fix(dropdown): Se corrigió el componente dropdown, en su versión de selección múltiple
- **feat(component) BmbiFrame versatil**:
feat(component) BmbiFrame versatil
- **feat(component) BmbIframe se agrego soporte nativo a componente**:
feat(component) BmbIframe se agrego soporte nativo a componente
- **chore(component) skeleton & value-counter migración**:
chore(component) skeleton & value-counter migración
- **fix(component / calendar): Se corrigió el error de los filtros y los botones en responsivo**:
fix(component / calendar): Se corrigió el error de los filtros y los botones en responsivo
- **feat(component/home-card-header): se agrego documentación del componente.**:
feat(component/home-card-header): se agrego documentación del componente.
- **chore: Se agregó un SKILL de bamboo, se actualizaron los controles de storybook y se actualizó la documentación para agentes de código**:
chore: Se agregó un SKILL de bamboo, se actualizaron los controles de storybook y se actualizó la documentación para agentes de código
- **chore: strorybook**:
chore: strorybook
- **feat(component) ajustar chat usuario y espacios**:
feat(component) ajustar chat usuario y espacios
- **feat(component/action-icon): se implementó la emisión del evento especificando el nombre del ícono para distinguir entre el ícono principal y el  alternativo. Se agregó también documentación para uso del componente en cambio de idioma.**:
feat(component/action-icon): se implementó la emisión del evento especificando el nombre del ícono para distinguir entre el ícono principal y el  alternativo. Se agregó también documentación para uso del componente en cambio de idioma.
- **feat(component/navidation-bar): se agrego emisión de click en elemento.**:
feat(component/navidation-bar): se agrego emisión de click en elemento.
- **fix(component) ajustar svg warning para visualizarse proporcional**:
fix(component) ajustar svg warning para visualizarse proporcional
- **chore: variables de color actualizadas**:
chore: variables de color actualizadas
- **feat(component) chat-burbble fijar copy_icon en vista movil y ajuste de color de iconos en chat de usuario**:
feat(component) chat-burbble fijar copy_icon en vista movil y ajuste de color de iconos en chat de usuario
- **chore: se realizó ajuste para homologar con Figma.**:
chore: se realizó ajuste para homologar con Figma.
- **chore: se agregaron más íconos al listado.**:
chore: se agregaron más íconos al listado.
- **feat(component) BmbIframe merge con feature-prod**:
feat(component) BmbIframe merge con feature-prod
- **chore: se desacopla el componente navigation bar**:
chore: se desacopla el componente navigation bar
- **docs: update release notes and prompts for version 1.6.4, enhancing clarity and adding new component details**:
docs: update release notes and prompts for version 1.6.4, enhancing clarity and adding new component details
- **fix: update Dockerfiles and publish workflow to use ui-angular directory and adjust build paths**:
fix: update Dockerfiles and publish workflow to use ui-angular directory and adjust build paths
- **chore: se removieron errores de advertencia en el código.**:
chore: se removieron errores de advertencia en el código.
- **Add action headers to home card and enhance button components with output events**:
Add action headers to home card and enhance button components with output events
- **fix: update TypeScript configuration for production builds and add new tsconfig file**:
fix: update TypeScript configuration for production builds and add new tsconfig file
- **fix(component/home card header): se agregó el evento del ratón al homecard**:
fix(component/home card header): se agregó el evento del ratón al homecard
- **chore: se quito código no necesario.**:
chore: se quito código no necesario.
- **feat(component) merge package.json**:
feat(component) merge package.json
- **feat(component) merge feature-prod**:
feat(component) merge feature-prod
- **chore: se agregó configuración completa del Action icon.**:
chore: se agregó configuración completa del Action icon.
- **feat(component) remover .event**:
feat(component) remover .event
- **fix: update button click event handling to remove unnecessary event wrapping**:
fix: update button click event handling to remove unnecessary event wrapping
- **chore: se removieron errores de advertencia en el código.**:
chore: se removieron errores de advertencia en el código.
- **ci(styles): ensure build:styles outputs to dist/ui-angular so CSS is included in published package**:
ci(styles): ensure build:styles outputs to dist/ui-angular so CSS is included in published package

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **feat(component/dropdown-menu): se realizo ajuste para que no permita diferente ícono)**:
feat(component/dropdown-menu): se realizo ajuste para que no permita diferente ícono)
- **feat(components) atender comentarios de pr**:
feat(components) atender comentarios de pr
- **Fix docs tabs: give each tab panel a unique content id so TableOfContents/Docs target the correct panel**:
Fix docs tabs: give each tab panel a unique content id so TableOfContents/Docs target the correct panel

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts**:
ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **chore: se agrego documentación de referencia al "Translations service" para cambio de idioma.**:
chore: se agrego documentación de referencia al "Translations service" para cambio de idioma.
- **fix(component/home card): Se agregó compatibilidad con accent colors para las acciones del header**:
fix(component/home card): Se agregó compatibilidad con accent colors para las acciones del header
- **fix: update package version format to include '-a' suffix for consistency**:
fix: update package version format to include '-a' suffix for consistency
- **fix(ui-angular): build with partial compilation mode for package publish**:
fix(ui-angular): build with partial compilation mode for package publish

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;
- **fix(component/bmb-alert-center): add eslint directive for output prefix rule**:
fix(component/bmb-alert-center): add eslint directive for output prefix rule
- **merge**:
merge
- **chore: se agregó configuración para permitir Typescript dentro de los archivos de documentación de Storybook.**:
chore: se agregó configuración para permitir Typescript dentro de los archivos de documentación de Storybook.
- **feat(component) fix merge conflict**:
feat(component) fix merge conflict
- **feat(merge) conflic new-bamboo**:
feat(merge) conflic new-bamboo

### 🗑️ Eliminaciones y
Deprecaciones

- **fix(tests): remove unused imports in BmbLayoutItemDirective spec**:
fix(tests): remove unused imports in BmbLayoutItemDirective spec
- **refactor(bmb-ai-chat-bubble): remove unused imports from component and stories**:
refactor(bmb-ai-chat-bubble): remove unused imports from component and stories
- **feat(component) remover .event**:
feat(component) remover .event
- **fix: update button click event handling to remove unnecessary event wrapping**:
fix: update button click event handling to remove unnecessary event wrapping
- **ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts**:
ci(publish): remove dist/ui-angular before build to avoid publishing full-compiled artifacts

Co-authored-by: Copilot &lt;223556219+Copilot@users.noreply.github.com&gt;

---
