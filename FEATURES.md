# Novedades ## [v1.6.3-h] -
2026-05-04

### 🚀 Novedades

*
Formato
*
new config
*
build
*
formato
*
Formato
*
Formato
*
Formato
*
Add conditional visibility and cascading options to filter card component
*
fix(component/sidebar): Se realizo refactorización de código para depurar elementos y simplificar estructura. La navegación ahora es en su mayoría manejo con CSS.
*
feat(component / dropdown): Se corrigió la posición del menú
*
Formato
*
fix(component / portal): Se agregó un parche de seguridad
*
feat(component / interactive icon): se agregó el tooltip al interactive icon
*
feat(component / icon): Se agregaron iconos personalizados
*
feat(component/sidebar): se realizaron ajustes para manejar las versión móvil o de escritorio mediante consultar de CSS.
*
feat(utils): Se agregaron funciones beforeClose y afterClose a los servicios de Modal y ProjectedContent
*
fix(component / Projection service): Se agregó un parche de seguridad
*
fix(component / native modal): Se agregó un parche de seguridad
*
se agergó soporte para angular 21
*
feat(component/multi-dot-paginator): se agrego el botón como último índice. Se implementó funcionalidad para que permita seleccionar solo un índice.
*
utils(app): Actualización de la app demo
*
topbar user
*
test: Add unit tests for BmbFilterCardComponent, along with related dependency updates.
*
chore: se eliminó código que solo se usaba para validación y pruebas
*
roll back user summary changes
*
fix(component / multi dot paginator): Se agregaron animaciones a los puntos del multi dot paginator
*
chore: escenarios de pruebas integrales en aplicaciones
*
feat(commponent/sidebar): se agregó implementación para soportar eventos personalizados.
*
fix(component/action-menu): se agregaron estilos para organizar contenido de manera responsiva.
*
feat(component/sidebar): se agrego consulta para definir el ancho del 'Sidebar' según dispositivo.
*
feat(component / dot paginator): Se actualizaron los margenes para los dot paginators
*
feat: implement BmbFilterCard component with support for conditional and cascading filters.
*
chore: se agregaron casos de pruebas para el nuevo código de sidebar
*
chore: se cambio el nombre de web a desktop por homologación.
*
doc(utils): Se actualizaron los archivos MD
*
topbar user
*
version
*
fix(component/action-menu): se agregaron estilos para el texto secundario contenido ya sea en el lado derecho o como soporte. Se emitió el click para la variante interactiva con texto del lado izquierdo.
*
utils(dependencias): Actualización de dependencias
*
feat(component / profile): Se agregó un estado de carga
*
topbar user
*
feat: Add bmb-filter-card component with dynamic filtering.
*
fix(component / home card): Se actualizaron los estilos responsivos para la home card
*
Formato
*
Formato
*
fix(component / multi dot paginator): Se actualizaron los estilos responsivos para el multi dot paginator
*
feat(component / image): se agregó la posibilidad de evitar el encoding en la fuente de la imagen
*
feat(component/fab): se ealizaron modificaciones para que la versión 'mitec' sea fija (según diseño en Figma)  y no pueda ser modificada.
*
fix(component / image): se actualizaron los estilos para permitir cambiar el cursor si hay un evento click
*
feat(component/sidebar): se agregó la misma animación para todos los menús y submenús.
*
fix(component / profile): Se corrigieron los estilos del profile
*
feat(test): Se actualizaron los componentes para soportar testID
*
actualizacion de paquetes
*
feat(component/container-button): se agregó la documentación de variantes 'Square' como pestaña en el componente principal.
*
feat: Add `bmb-filter-card` component with dynamic visibility and option rules.
*
feat: Add BmbFilterCard component with dynamic filtering capabilities.
*
chore: se agregaron ejemplos para soporte de la aplicación.
*
feat: `bmb-filter-card`.
*
topbar user
*
fix(component / notification card): Se corrigió el tamaño de las notificaciones
*
fix(component / dropdown): Se corrigió el desface de menú del dropdown
*
Formato
*
fix(component / search card): Se corrigieron los colores de los servicios
*
fix(component / tooltip): Se solucionó el problema del contenido del tooltip
*
Update preview.ts
*
utils(workflows): Se actualizaron los sistemas base de node
*
chore: se agregó nueva variable para punto de ruptura para dispositivos móviles.
*
fix(component / Digital ID): Se corrigió el tamaño de la imagen para el digial ID
*
chore: se implementó consulta más especifica para evitar impacto en elementos que no son del 'Sidebar'.
*
chore: refactorización de código para detener la propagación.
*
chore: se actualizo la organización de pestañas para los casos en que se contengan varias de estas.
*
fix(component / dropdown): Se agergó un ancho minimo al dropdown
*
Update bmb-multi-dot-paginator-item.component.scss
*
fix(component / icon): Se soluciono el problema de iconos duplicados
*
chore: se agregó código para prevenir la propagación y detenerla.
*
chore: se eliminó código que no se utiliza.
*
topbar user
*
feat: Add BmbFilterCard component.
*
Update bmb-sidebar.component.html
*
fix(component / progress bar): Se corrigió el NAN cuando el valor inicial y total son cero
*
chore: se eliminó código no útil (no utilizado).
*
chore: se eliminó código que no se utiliza

### 🆕 Nuevos Componentes

- **Formato**:
Formato
- **new config**:
new config
- **build**:
build
- **formato**:
formato
- **Formato**:
Formato
- **Formato**:
Formato
- **Formato**:
Formato
- **Add conditional visibility and cascading options to filter card component**:
Add conditional visibility and cascading options to filter card component
- **fix(component/sidebar): Se realizo refactorización de código para depurar elementos y simplificar estructura. La navegación ahora es en su mayoría manejo con CSS.**:
fix(component/sidebar): Se realizo refactorización de código para depurar elementos y simplificar estructura. La navegación ahora es en su mayoría manejo con CSS.
- **feat(component / dropdown): Se corrigió la posición del menú**:
feat(component / dropdown): Se corrigió la posición del menú
- **Formato**:
Formato
- **fix(component / portal): Se agregó un parche de seguridad**:
fix(component / portal): Se agregó un parche de seguridad
- **feat(component / interactive icon): se agregó el tooltip al interactive icon**:
feat(component / interactive icon): se agregó el tooltip al interactive icon
- **feat(component / icon): Se agregaron iconos personalizados**:
feat(component / icon): Se agregaron iconos personalizados
- **feat(component/sidebar): se realizaron ajustes para manejar las versión móvil o de escritorio mediante consultar de CSS.**:
feat(component/sidebar): se realizaron ajustes para manejar las versión móvil o de escritorio mediante consultar de CSS.
- **feat(utils): Se agregaron funciones beforeClose y afterClose a los servicios de Modal y ProjectedContent**:
feat(utils): Se agregaron funciones beforeClose y afterClose a los servicios de Modal y ProjectedContent
- **fix(component / Projection service): Se agregó un parche de seguridad**:
fix(component / Projection service): Se agregó un parche de seguridad
- **fix(component / native modal): Se agregó un parche de seguridad**:
fix(component / native modal): Se agregó un parche de seguridad
- **se agergó soporte para angular 21**:
se agergó soporte para angular 21
- **feat(component/multi-dot-paginator): se agrego el botón como último índice. Se implementó funcionalidad para que permita seleccionar solo un índice.**:
feat(component/multi-dot-paginator): se agrego el botón como último índice. Se implementó funcionalidad para que permita seleccionar solo un índice.
- **utils(app): Actualización de la app demo**:
utils(app): Actualización de la app demo
- **topbar user**:
topbar user
- **test: Add unit tests for BmbFilterCardComponent, along with related dependency updates.**:
test: Add unit tests for BmbFilterCardComponent, along with related dependency updates.
- **chore: se eliminó código que solo se usaba para validación y pruebas**:
chore: se eliminó código que solo se usaba para validación y pruebas
- **roll back user summary changes**:
roll back user summary changes
- **fix(component / multi dot paginator): Se agregaron animaciones a los puntos del multi dot paginator**:
fix(component / multi dot paginator): Se agregaron animaciones a los puntos del multi dot paginator
- **chore: escenarios de pruebas integrales en aplicaciones**:
chore: escenarios de pruebas integrales en aplicaciones
- **feat(commponent/sidebar): se agregó implementación para soportar eventos personalizados.**:
feat(commponent/sidebar): se agregó implementación para soportar eventos personalizados.
- **fix(component/action-menu): se agregaron estilos para organizar contenido de manera responsiva.**:
fix(component/action-menu): se agregaron estilos para organizar contenido de manera responsiva.
- **feat(component/sidebar): se agrego consulta para definir el ancho del 'Sidebar' según dispositivo.**:
feat(component/sidebar): se agrego consulta para definir el ancho del 'Sidebar' según dispositivo.
- **feat(component / dot paginator): Se actualizaron los margenes para los dot paginators**:
feat(component / dot paginator): Se actualizaron los margenes para los dot paginators
- **feat: implement BmbFilterCard component with support for conditional and cascading filters.**:
feat: implement BmbFilterCard component with support for conditional and cascading filters.
- **chore: se agregaron casos de pruebas para el nuevo código de sidebar**:
chore: se agregaron casos de pruebas para el nuevo código de sidebar
- **chore: se cambio el nombre de web a desktop por homologación.**:
chore: se cambio el nombre de web a desktop por homologación.
- **doc(utils): Se actualizaron los archivos MD**:
doc(utils): Se actualizaron los archivos MD
- **topbar user**:
topbar user
- **version**:
version
- **fix(component/action-menu): se agregaron estilos para el texto secundario contenido ya sea en el lado derecho o como soporte. Se emitió el click para la variante interactiva con texto del lado izquierdo.**:
fix(component/action-menu): se agregaron estilos para el texto secundario contenido ya sea en el lado derecho o como soporte. Se emitió el click para la variante interactiva con texto del lado izquierdo.
- **utils(dependencias): Actualización de dependencias**:
utils(dependencias): Actualización de dependencias
- **feat(component / profile): Se agregó un estado de carga**:
feat(component / profile): Se agregó un estado de carga
- **topbar user**:
topbar user
- **feat: Add bmb-filter-card component with dynamic filtering.**:
feat: Add bmb-filter-card component with dynamic filtering.
- **fix(component / home card): Se actualizaron los estilos responsivos para la home card**:
fix(component / home card): Se actualizaron los estilos responsivos para la home card
- **Formato**:
Formato
- **Formato**:
Formato
- **fix(component / multi dot paginator): Se actualizaron los estilos responsivos para el multi dot paginator**:
fix(component / multi dot paginator): Se actualizaron los estilos responsivos para el multi dot paginator
- **feat(component / image): se agregó la posibilidad de evitar el encoding en la fuente de la imagen**:
feat(component / image): se agregó la posibilidad de evitar el encoding en la fuente de la imagen
- **feat(component/fab): se ealizaron modificaciones para que la versión 'mitec' sea fija (según diseño en Figma)  y no pueda ser modificada.**:
feat(component/fab): se ealizaron modificaciones para que la versión 'mitec' sea fija (según diseño en Figma)  y no pueda ser modificada.
- **fix(component / image): se actualizaron los estilos para permitir cambiar el cursor si hay un evento click**:
fix(component / image): se actualizaron los estilos para permitir cambiar el cursor si hay un evento click
- **feat(component/sidebar): se agregó la misma animación para todos los menús y submenús.**:
feat(component/sidebar): se agregó la misma animación para todos los menús y submenús.
- **fix(component / profile): Se corrigieron los estilos del profile**:
fix(component / profile): Se corrigieron los estilos del profile
- **feat(test): Se actualizaron los componentes para soportar testID**:
feat(test): Se actualizaron los componentes para soportar testID
- **actualizacion de paquetes**:
actualizacion de paquetes
- **feat(component/container-button): se agregó la documentación de variantes 'Square' como pestaña en el componente principal.**:
feat(component/container-button): se agregó la documentación de variantes 'Square' como pestaña en el componente principal.
- **feat: Add `bmb-filter-card` component with dynamic visibility and option rules.**:
feat: Add `bmb-filter-card` component with dynamic visibility and option rules.
- **feat: Add BmbFilterCard component with dynamic filtering capabilities.**:
feat: Add BmbFilterCard component with dynamic filtering capabilities.
- **chore: se agregaron ejemplos para soporte de la aplicación.**:
chore: se agregaron ejemplos para soporte de la aplicación.
- **feat: `bmb-filter-card`.**:
feat: `bmb-filter-card`.
- **topbar user**:
topbar user
- **fix(component / notification card): Se corrigió el tamaño de las notificaciones**:
fix(component / notification card): Se corrigió el tamaño de las notificaciones
- **fix(component / dropdown): Se corrigió el desface de menú del dropdown**:
fix(component / dropdown): Se corrigió el desface de menú del dropdown
- **Formato**:
Formato
- **fix(component / search card): Se corrigieron los colores de los servicios**:
fix(component / search card): Se corrigieron los colores de los servicios
- **fix(component / tooltip): Se solucionó el problema del contenido del tooltip**:
fix(component / tooltip): Se solucionó el problema del contenido del tooltip
- **Update preview.ts**:
Update preview.ts
- **utils(workflows): Se actualizaron los sistemas base de node**:
utils(workflows): Se actualizaron los sistemas base de node
- **chore: se agregó nueva variable para punto de ruptura para dispositivos móviles.**:
chore: se agregó nueva variable para punto de ruptura para dispositivos móviles.
- **fix(component / Digital ID): Se corrigió el tamaño de la imagen para el digial ID**:
fix(component / Digital ID): Se corrigió el tamaño de la imagen para el digial ID
- **chore: se implementó consulta más especifica para evitar impacto en elementos que no son del 'Sidebar'.**:
chore: se implementó consulta más especifica para evitar impacto en elementos que no son del 'Sidebar'.
- **chore: refactorización de código para detener la propagación.**:
chore: refactorización de código para detener la propagación.
- **chore: se actualizo la organización de pestañas para los casos en que se contengan varias de estas.**:
chore: se actualizo la organización de pestañas para los casos en que se contengan varias de estas.
- **fix(component / dropdown): Se agergó un ancho minimo al dropdown**:
fix(component / dropdown): Se agergó un ancho minimo al dropdown
- **Update bmb-multi-dot-paginator-item.component.scss**:
Update bmb-multi-dot-paginator-item.component.scss
- **fix(component / icon): Se soluciono el problema de iconos duplicados**:
fix(component / icon): Se soluciono el problema de iconos duplicados
- **chore: se agregó código para prevenir la propagación y detenerla.**:
chore: se agregó código para prevenir la propagación y detenerla.
- **chore: se eliminó código que no se utiliza.**:
chore: se eliminó código que no se utiliza.
- **topbar user**:
topbar user
- **feat: Add BmbFilterCard component.**:
feat: Add BmbFilterCard component.
- **Update bmb-sidebar.component.html**:
Update bmb-sidebar.component.html
- **fix(component / progress bar): Se corrigió el NAN cuando el valor inicial y total son cero**:
fix(component / progress bar): Se corrigió el NAN cuando el valor inicial y total son cero
- **chore: se eliminó código no útil (no utilizado).**:
chore: se eliminó código no útil (no utilizado).
- **chore: se eliminó código que no se utiliza**:
chore: se eliminó código que no se utiliza

### 🔄 Componentes Actualizados

- **Formato**:
Formato
- **new config**:
new config
- **build**:
build
- **formato**:
formato
- **Formato**:
Formato
- **Formato**:
Formato
- **Formato**:
Formato
- **Add conditional visibility and cascading options to filter card component**:
Add conditional visibility and cascading options to filter card component
- **fix(component/sidebar): Se realizo refactorización de código para depurar elementos y simplificar estructura. La navegación ahora es en su mayoría manejo con CSS.**:
fix(component/sidebar): Se realizo refactorización de código para depurar elementos y simplificar estructura. La navegación ahora es en su mayoría manejo con CSS.
- **feat(component / dropdown): Se corrigió la posición del menú**:
feat(component / dropdown): Se corrigió la posición del menú
- **Formato**:
Formato
- **fix(component / portal): Se agregó un parche de seguridad**:
fix(component / portal): Se agregó un parche de seguridad
- **feat(component / interactive icon): se agregó el tooltip al interactive icon**:
feat(component / interactive icon): se agregó el tooltip al interactive icon
- **feat(component / icon): Se agregaron iconos personalizados**:
feat(component / icon): Se agregaron iconos personalizados
- **feat(component/sidebar): se realizaron ajustes para manejar las versión móvil o de escritorio mediante consultar de CSS.**:
feat(component/sidebar): se realizaron ajustes para manejar las versión móvil o de escritorio mediante consultar de CSS.
- **feat(utils): Se agregaron funciones beforeClose y afterClose a los servicios de Modal y ProjectedContent**:
feat(utils): Se agregaron funciones beforeClose y afterClose a los servicios de Modal y ProjectedContent
- **fix(component / Projection service): Se agregó un parche de seguridad**:
fix(component / Projection service): Se agregó un parche de seguridad
- **fix(component / native modal): Se agregó un parche de seguridad**:
fix(component / native modal): Se agregó un parche de seguridad
- **se agergó soporte para angular 21**:
se agergó soporte para angular 21
- **feat(component/multi-dot-paginator): se agrego el botón como último índice. Se implementó funcionalidad para que permita seleccionar solo un índice.**:
feat(component/multi-dot-paginator): se agrego el botón como último índice. Se implementó funcionalidad para que permita seleccionar solo un índice.
- **utils(app): Actualización de la app demo**:
utils(app): Actualización de la app demo
- **topbar user**:
topbar user
- **test: Add unit tests for BmbFilterCardComponent, along with related dependency updates.**:
test: Add unit tests for BmbFilterCardComponent, along with related dependency updates.
- **chore: se eliminó código que solo se usaba para validación y pruebas**:
chore: se eliminó código que solo se usaba para validación y pruebas
- **roll back user summary changes**:
roll back user summary changes
- **fix(component / multi dot paginator): Se agregaron animaciones a los puntos del multi dot paginator**:
fix(component / multi dot paginator): Se agregaron animaciones a los puntos del multi dot paginator
- **chore: escenarios de pruebas integrales en aplicaciones**:
chore: escenarios de pruebas integrales en aplicaciones
- **feat(commponent/sidebar): se agregó implementación para soportar eventos personalizados.**:
feat(commponent/sidebar): se agregó implementación para soportar eventos personalizados.
- **fix(component/action-menu): se agregaron estilos para organizar contenido de manera responsiva.**:
fix(component/action-menu): se agregaron estilos para organizar contenido de manera responsiva.
- **feat(component/sidebar): se agrego consulta para definir el ancho del 'Sidebar' según dispositivo.**:
feat(component/sidebar): se agrego consulta para definir el ancho del 'Sidebar' según dispositivo.
- **feat(component / dot paginator): Se actualizaron los margenes para los dot paginators**:
feat(component / dot paginator): Se actualizaron los margenes para los dot paginators
- **feat: implement BmbFilterCard component with support for conditional and cascading filters.**:
feat: implement BmbFilterCard component with support for conditional and cascading filters.
- **chore: se agregaron casos de pruebas para el nuevo código de sidebar**:
chore: se agregaron casos de pruebas para el nuevo código de sidebar
- **chore: se cambio el nombre de web a desktop por homologación.**:
chore: se cambio el nombre de web a desktop por homologación.
- **doc(utils): Se actualizaron los archivos MD**:
doc(utils): Se actualizaron los archivos MD
- **topbar user**:
topbar user
- **version**:
version
- **fix(component/action-menu): se agregaron estilos para el texto secundario contenido ya sea en el lado derecho o como soporte. Se emitió el click para la variante interactiva con texto del lado izquierdo.**:
fix(component/action-menu): se agregaron estilos para el texto secundario contenido ya sea en el lado derecho o como soporte. Se emitió el click para la variante interactiva con texto del lado izquierdo.
- **utils(dependencias): Actualización de dependencias**:
utils(dependencias): Actualización de dependencias
- **feat(component / profile): Se agregó un estado de carga**:
feat(component / profile): Se agregó un estado de carga
- **topbar user**:
topbar user
- **feat: Add bmb-filter-card component with dynamic filtering.**:
feat: Add bmb-filter-card component with dynamic filtering.
- **fix(component / home card): Se actualizaron los estilos responsivos para la home card**:
fix(component / home card): Se actualizaron los estilos responsivos para la home card
- **Formato**:
Formato
- **Formato**:
Formato
- **fix(component / multi dot paginator): Se actualizaron los estilos responsivos para el multi dot paginator**:
fix(component / multi dot paginator): Se actualizaron los estilos responsivos para el multi dot paginator
- **feat(component / image): se agregó la posibilidad de evitar el encoding en la fuente de la imagen**:
feat(component / image): se agregó la posibilidad de evitar el encoding en la fuente de la imagen
- **feat(component/fab): se ealizaron modificaciones para que la versión 'mitec' sea fija (según diseño en Figma)  y no pueda ser modificada.**:
feat(component/fab): se ealizaron modificaciones para que la versión 'mitec' sea fija (según diseño en Figma)  y no pueda ser modificada.
- **fix(component / image): se actualizaron los estilos para permitir cambiar el cursor si hay un evento click**:
fix(component / image): se actualizaron los estilos para permitir cambiar el cursor si hay un evento click
- **feat(component/sidebar): se agregó la misma animación para todos los menús y submenús.**:
feat(component/sidebar): se agregó la misma animación para todos los menús y submenús.
- **fix(component / profile): Se corrigieron los estilos del profile**:
fix(component / profile): Se corrigieron los estilos del profile
- **feat(test): Se actualizaron los componentes para soportar testID**:
feat(test): Se actualizaron los componentes para soportar testID
- **actualizacion de paquetes**:
actualizacion de paquetes
- **feat(component/container-button): se agregó la documentación de variantes 'Square' como pestaña en el componente principal.**:
feat(component/container-button): se agregó la documentación de variantes 'Square' como pestaña en el componente principal.
- **feat: Add `bmb-filter-card` component with dynamic visibility and option rules.**:
feat: Add `bmb-filter-card` component with dynamic visibility and option rules.
- **feat: Add BmbFilterCard component with dynamic filtering capabilities.**:
feat: Add BmbFilterCard component with dynamic filtering capabilities.
- **chore: se agregaron ejemplos para soporte de la aplicación.**:
chore: se agregaron ejemplos para soporte de la aplicación.
- **feat: `bmb-filter-card`.**:
feat: `bmb-filter-card`.
- **topbar user**:
topbar user
- **fix(component / notification card): Se corrigió el tamaño de las notificaciones**:
fix(component / notification card): Se corrigió el tamaño de las notificaciones
- **fix(component / dropdown): Se corrigió el desface de menú del dropdown**:
fix(component / dropdown): Se corrigió el desface de menú del dropdown
- **Formato**:
Formato
- **fix(component / search card): Se corrigieron los colores de los servicios**:
fix(component / search card): Se corrigieron los colores de los servicios
- **fix(component / tooltip): Se solucionó el problema del contenido del tooltip**:
fix(component / tooltip): Se solucionó el problema del contenido del tooltip
- **Update preview.ts**:
Update preview.ts
- **utils(workflows): Se actualizaron los sistemas base de node**:
utils(workflows): Se actualizaron los sistemas base de node
- **chore: se agregó nueva variable para punto de ruptura para dispositivos móviles.**:
chore: se agregó nueva variable para punto de ruptura para dispositivos móviles.
- **fix(component / Digital ID): Se corrigió el tamaño de la imagen para el digial ID**:
fix(component / Digital ID): Se corrigió el tamaño de la imagen para el digial ID
- **chore: se implementó consulta más especifica para evitar impacto en elementos que no son del 'Sidebar'.**:
chore: se implementó consulta más especifica para evitar impacto en elementos que no son del 'Sidebar'.
- **chore: refactorización de código para detener la propagación.**:
chore: refactorización de código para detener la propagación.
- **chore: se actualizo la organización de pestañas para los casos en que se contengan varias de estas.**:
chore: se actualizo la organización de pestañas para los casos en que se contengan varias de estas.
- **fix(component / dropdown): Se agergó un ancho minimo al dropdown**:
fix(component / dropdown): Se agergó un ancho minimo al dropdown
- **Update bmb-multi-dot-paginator-item.component.scss**:
Update bmb-multi-dot-paginator-item.component.scss
- **fix(component / icon): Se soluciono el problema de iconos duplicados**:
fix(component / icon): Se soluciono el problema de iconos duplicados
- **chore: se agregó código para prevenir la propagación y detenerla.**:
chore: se agregó código para prevenir la propagación y detenerla.
- **chore: se eliminó código que no se utiliza.**:
chore: se eliminó código que no se utiliza.
- **topbar user**:
topbar user
- **feat: Add BmbFilterCard component.**:
feat: Add BmbFilterCard component.
- **Update bmb-sidebar.component.html**:
Update bmb-sidebar.component.html
- **fix(component / progress bar): Se corrigió el NAN cuando el valor inicial y total son cero**:
fix(component / progress bar): Se corrigió el NAN cuando el valor inicial y total son cero
- **chore: se eliminó código no útil (no utilizado).**:
chore: se eliminó código no útil (no utilizado).
- **chore: se eliminó código que no se utiliza**:
chore: se eliminó código que no se utiliza

---
