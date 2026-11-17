// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=299-51502
// source=ui-angular/src/lib/components/bmb-sidebar/bmb-sidebar.component.ts
// component=BmbSidebarComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  elements: SidebarElement[][] = [
    [
      {
        id: 1,
        icon: ${getIcon('assignment_add', 'typescript')},
        title: 'Elegir documentos',
        link: '/home',
      },
      {
        id: 2,
        icon: ${getIcon('task', 'typescript')},
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
      },
      {
        id: 3,
        icon: ${getIcon('note_alt', 'typescript')},
        title: 'Crear envelope',
        link: '#contact',
        target: '_self',
      },
      {
        id: 4,
        icon: ${getIcon('checklist_rtl', 'typescript')},
        title: 'Estado de archivos anonimos',
        link: 'inicio',
        children: [
          {
            id: 4.1,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item 1',
            link: '/emprendedor',
          },
          {
            id: 4.2,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item 2',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
      {
        id: 5,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin.usuariosusuariosusuarios',
        link: 'vivencia',
        children: [
          { id: 5.1, icon: ${getIcon('file_copy', 'typescript')}, title: 'Sub-item 3', link: '/home' },
          {
            id: 5.2,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
            target: '_blank',
          },
        ],
      },
    ],
    [
      {
        id: 7,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia1',
      },
      {
        id: 8,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia2',
      },
      {
        id: 9,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia3',
      },
    ],
  ];
}
</script>

<bmb-sidebar
  [elements]="elements"
  componentTitle="Navegacion para mobiles"
  position="left"
/>`,
  imports: [
    "import type { SidebarElement } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbSidebarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-sidebar',
}
