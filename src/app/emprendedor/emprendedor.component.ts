import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BmbSidebarComponent } from '../../../projects/ds-ng/src/public-api';
import { SidebarElement } from '../../../projects/ds-ng/src/lib/components/bmb-sidebar/bmb-sidebar.interface';

@Component({
  selector: 'bmb-emprendedor',
  standalone: true,
  imports: [RouterModule, BmbSidebarComponent],
  templateUrl: './emprendedor.component.html',
  styleUrls: ['./emprendedor.component.scss'],
})
export default class EmprendedorComponent {
  title = 'Navegacion para mobiles';
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
}
