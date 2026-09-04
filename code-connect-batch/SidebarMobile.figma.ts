// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=299-51512
// source=ui-angular/src/lib/components/bmb-sidebar/bmb-sidebar.component.ts
// component=BmbSidebarComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-sidebar
  componentTitle="Navegación"
  [elements]="[[
    { id: 1, icon: 'home', title: 'Inicio', link: '/home' },
    { id: 2, icon: 'school', title: 'Cursos', link: '/courses' },
    { id: 3, icon: 'calendar_month', title: 'Calendario', link: '/calendar' },
    { id: 4, icon: 'apartment', title: 'Campus', link: '/campus' },
    { id: 5, icon: 'apps', title: 'Aplicaciones', link: '/apps' }
  ], [
    { id: 6, icon: 'build', title: 'Herramientas', link: '/tools' },
    { id: 7, icon: 'help', title: 'Ayuda', link: '/help' },
    { id: 8, icon: 'logout', title: 'Salir', link: '/logout' }
  ]]"
/>`,
  imports: [
    "import { BmbSidebarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-sidebar',
}
