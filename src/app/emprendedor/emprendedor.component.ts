import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BmbSidebarComponent } from '../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-emprendedor',
  standalone: true,
  imports: [RouterModule, BmbSidebarComponent],
  templateUrl: './emprendedor.component.html',
  styleUrl: './emprendedor.component.scss',
})
export default class EmprendedorComponent {
  sidebarElements: {
    id: number;
    icon: string;
    title: string;
    link: string;
    target?: string;
  }[][] = [
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
        title: 'Estado de archivos',
        link: 'inicio',
      },
    ],
    [
      {
        id: 5,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia',
      },
    ],
  ];
}
