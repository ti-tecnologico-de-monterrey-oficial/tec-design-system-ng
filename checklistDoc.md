Estructura documentación Storybook

-ON THIS PAGE (opcional): sección con el compendio de índice de la historia, este aparecerá del lado derecho y estará visible en todo momento para ayudar en la navegación de la documentación. Se mostrará solo para las historias con un contenido extenso.

-Pestañas (opcional): sección de pestañas para las historias que requieran tener documentación múltiple, por ejemplo las historias de los COMPONENTS/Inputs en donde es conveniente incluir la documentación del Form validator para no modificar la estructura del menú lateral izquierdo. Esta sesión se muestrará siempre sobre el nombre de la historia.

-Nombre de la historia.

-Description: sección con detalle de utilidad y funcionamiento.
General documentation: liga de supernova que proveerá la documentación completa a los desarrolladores.
-DOM Architecture (opcional): sección con detalle de la arquitectura DOM, esto será de utilidad para que los desarrolladores conozcan a detalle la construcción del componente bmb, incluso será de su conocimiento cuando Bambo usa Bamboo en su implementación.

-Considerations / Restrictions (opcional): sección con detalle de algunas consideraciones especiales y/o información importante y/o limitantes de implementación.

-Reactive form example (opcional): sección con los ejemplos necesarios para que los desarrolladores los usen cuando implementen formularios reactivos. Esta sección será sólo para las historias de COMPONENTS/Inputs que son soportados por Form validator.
TypeScript example for reactive form: sección con ejemplo TypeScript para formulario reactivo.
HTML example for reactive form: sección con ejemplo HTML para formulario reactivo.
-TypeScript example (opcional): sección con ejemplo en TypeScript para que los desarrolladores lo implementen.

-HTML example (opcional): sección con ejemplo en HTML para que los desarrolladores lo implementen.

-PROPERTIES AND EVENTS (opcional)
PROPERTIES: tabla con detalle de las propiedades o entradas enviadas por los desarrolladores en la implementación del componente bmb.
EVENTS: tabla con detalle de los eventos o salidas que son notificaciones por parte del componente bmb para los desarrolladores.
-STORIES (opcional): sección con ejemplos de implementación con combinaciones de propiedades y eventos específicos.

Checklist:
ON THIS PAGE (optional, TABLE OF CONTENTS) [Done, is in preview, if not so add parameters: { docs: { toc: TOC_OBJ...]
-Tabs (optional) [Create MDX]
-Name [Done, is is .stories]
-Description [Add ${getGeneralDescription('')} to parameters: { docs: { description: { component: ``...]
General documentation [is in getGeneralDescription]
getGeneralComponentDescription('') General documentation helper
-DOM Architecture (optional) [Add ${getArchitectureSection(``)} to parameters: { docs: { description: { component: ``...]
-Considerations / Restrictions (optional) [Add ${getSpecialSpecifications(` ### []:`)} to parameters: { docs: { description: { component: `...]
-Reactive form example (optional) [Add ${getFormExampleBlock('', '', '', '')} to parameters: { docs: { description: { component: `...]
TypeScript example for reactive form [is in getFormExampleBlock]
HTML example for reactive form [is in getFormExampleBlock]
-TypeScript example [Add ${getBasicExampleBlock('')} to parameters: { docs: { description: { component: ``...]
-HTML example [is in getBasicExampleBlock]
-PROPERTIES AND EVENTS [Done, is in preview]
PROPERTIES [Clear in parameters: { controls: { exclude: ['']}, ...]
EVENTS [Clear in parameters: { controls: { exclude: [''] ...]
-VARIANT TEMPLATES (optional) [Done, is in preview or in GeneralTemplate.mdx]
