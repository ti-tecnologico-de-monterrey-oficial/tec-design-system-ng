import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BmbSidebarComponent,
  IBmbApp,
  IBmbInteractiveIconAppearance,
  IBmbInteractiveIconType,
} from '../../../projects/ds-ng/src/public-api';
import { BmbInteractiveIconComponent } from 'ds-ng';
import { BmbIconComponent } from 'ds-ng';
import { SidebarElement } from '../../../projects/ds-ng/src/lib/components/bmb-sidebar/bmb-sidebar.interface';
import { BmbDrawerOverlayComponent } from '../../../projects/ds-ng/src/lib/components/bmb-drawer-overlay/bmb-drawer-overlay.component';

@Component({
  selector: 'bmb-emprendedor',
  standalone: true,
  imports: [
    RouterModule,
    BmbSidebarComponent,
    BmbDrawerOverlayComponent,
    BmbIconComponent,
    BmbInteractiveIconComponent,
  ],
  templateUrl: './emprendedor.component.html',
  styleUrls: ['./emprendedor.component.scss'],
})
export default class EmprendedorComponent {
  sidebarElements: SidebarElement[][] = [
    [
      {
        id: 1,
        icon: 'assignment_add',
        title: 'Elegir documentos',
        link: '/home',
      },
      {
        id: 2,
        icon: 'task',
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
      },
      {
        id: 3,
        icon: 'note_alt',
        title: 'Crear envelope',
        link: '#contact',
        target: '_self',
      },
      {
        id: 4,
        icon: 'checklist_rtl',
        title: 'Estado de archivos anonimos',
        link: 'inicio',
        children: [
          {
            id: 4.1,
            icon: 'file_copy',
            title: 'Sub-item 1',
            link: '/emprendedor',
          },
          {
            id: 4.2,
            icon: 'file_copy',
            title: 'Sub-item 2',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
      {
        id: 5,
        icon: 'account_box',
        title: 'Admin.usuariosusuariosusuarios',
        link: 'vivencia',
        children: [
          {
            id: 5.1,
            icon: 'file_copy',
            title: 'Sub-item 3',
            link: '/home',
          },
          {
            id: 5.2,
            icon: 'file_copy',
            title: 'Sub-item 4',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
    ],
    [
      {
        id: 7,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia1',
      },
      {
        id: 8,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia2',
      },
      {
        id: 9,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia3',
      },
      {
        id: 10,
        icon: 'account_box',
        title: 'Hi',
        link: 'vivencia4',
      },
      {
        id: 11,
        icon: 'account_box',
        title: 'Hi',
        link: 'vivencia5',
      },
    ],
  ];

  //For storybook drawer
  title = 'Apps';
  menu = [
    {
      appearance: 'red',
      title: 'App 1',
      icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'App 2',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'green',
      title: 'App 3',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'Menú de servicios',
      icon: 'lists',
      setButtonTemplate: true,
      buttonClick: this.handleButtonClick.bind(this),
    },
  ];

  handleButtonClick() {
    console.log('Button clicked!');
  }

  dataSearch = [
    'Carlee Bengochea',
    'Reynard Howgate',
    'Pearce Jore',
    'Giacopo Mellings',
    'Clyve Nerval',
    'Pauletta Pavelka',
    'Midge Girardot',
  ];
  tabs = [
    { title: 'Mas usados', id: 0, isActive: true },
    { title: 'Recomendados', id: 1, isActive: false },
    { title: 'Contextuales', id: 2, isActive: false },
  ];
  appServices: { [key: number]: IBmbApp[] } = {
    0: [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 4',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 5',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 6',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 7',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    1: [
      {
        appearance: 'red',
        title: 'App 8',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 9',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 10',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 11',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 12',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 13',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 14',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    2: [
      {
        appearance: 'red',
        title: 'App 15',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 16',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 17',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 18',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 19',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 20',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 21',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };
}
