import { Component } from '@angular/core';
import {
  BmbActionMenuComponent,
  BmbItemComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-menu-page',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [CommonModule, BmbActionMenuComponent, BmbItemComponent],
})
export class MenuPageComponent {
  items = [
    // {
    //   label: 'Correo',
    //   icon: 'mail',
    //   value: 'correo',
    //   valueLink: 'mailto:tecservices@servicios.tec.mx',
    //   isActive: false,
    // },
    // {
    //   label: 'Teléfono',
    //   icon: 'mobile',
    //   value: '52 81 8358 2000',
    //   valueLink: 'tel:52 81 8358 2000',
    //   isActive: true,
    // },
    // {
    //   label: 'Celular',
    //   icon: 'mobile',
    //   value: '+52 81 1625 5123 (solo texto)',
    //   valueLink: '',
    //   isActive: false,
    // },
    // {
    //   label: 'Preguntas',
    //   icon: 'question_exchange',
    //   value: 'Preguntas',
    //   valueLink: '',
    //   isActive: true,
    // },

    {
      Id: '8',
      Title: 'Preguntas frecuentes',
      icono:
        'https://saprodtecportal.blob.core.windows.net/mitec/colaboradores/PublishingImages/TecServices-Iconos/preguntas.png',
      url: 'http://tecprod.service-now.com/tec?id=kb_search&kb_knowledge_base=053ae72397f6d510655570700153afb4',
      orden: 1,
      Audiencias_x0020_de_x0020_destin:
        '00000000-0000-0000-0000-000000000000; ',
      AudienciaCoincidente: '00000000-0000-0000-0000-000000000000',
      validUrl: true,
      isTecService: true,
      isSvg: false,
    },
    {
      Id: '6',
      Title: '+52 81 1625 5123 (solo texto)',
      icono:
        'https://saprodtecportal.blob.core.windows.net/mitec/colaboradores/PublishingImages/TecServices-Iconos/wa.png',
      orden: 3,
      Audiencias_x0020_de_x0020_destin:
        '00000000-0000-0000-0000-000000000000; ',
      AudienciaCoincidente: '00000000-0000-0000-0000-000000000000',
      validUrl: false,
      isTecService: true,
      isSvg: false,
    },
    {
      Id: '4',
      Title: 'tecservices@servicios.tec.mx',
      icono: 'home',
      url: 'https://tecprod.service-now.com/tec?id=sc_cat_item&sys_id=bb0f80ef97a4ca90655570700153af16',
      orden: 4,
      Audiencias_x0020_de_x0020_destin:
        '00000000-0000-0000-0000-000000000000; ',
      AudienciaCoincidente: '00000000-0000-0000-0000-000000000000',
      validUrl: true,
      isTecService: true,
      isSvg: false,
    },
    {
      Id: '7',
      Title: '52 81 8358 2000',
      icono:
        'https://saprodtecportal.blob.core.windows.net/mitec/colaboradores/PublishingImages/TecServices-Iconos/telefono.png',
      url: 'tel:+528183582000',
      orden: 5,
      Audiencias_x0020_de_x0020_destin:
        '00000000-0000-0000-0000-000000000000; ',
      AudienciaCoincidente: '00000000-0000-0000-0000-000000000000',
      validUrl: false,
      isTecService: true,
      isSvg: false,
    },
    {
      Title: '¡Califica tu experiencia!',
      icono: 'mood',
      url: 'https://sitiosmiespacio.itesm.mx/publicos/evaluacionescsc/Paginas/Experiencia/intermediario_audiencias_experiencia.html?IDExp=82&IDPlat=2',
      isTecService: false,
    },
  ];

  handleOpen(value: string): void {
    // console.info('handleOpen', value);
  }
}
