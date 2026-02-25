import {
  Component,
  effect,
  Input,
  model,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbAccordionComponent,
  BmbInputComponent,
  BmbFormValidatorComponent,
  BmbButtonDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbContainerButtonComponent,
  BmbTextLinkComponent,
  BmbDividerComponent,
  BmbHomeCardComponent,
  IBmbProjectionContent,
  BmbProjectionContentService,
  BmbMediaCardComponent,
  BmbAdvertisementCardComponent,
  BmbActionMenuComponent,
  BmbItemComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { HelpMenuComponent } from '../../components/help-menu/help-menu.component';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbAccordionComponent,
    BmbInputComponent,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbContainerButtonComponent,
    BmbTextLinkComponent,
    BmbDividerComponent,
    BmbHomeCardComponent,
    BmbMediaCardComponent,
    CdkDragPlaceholder,
    BmbAdvertisementCardComponent,
    BmbActionMenuComponent,
    BmbItemComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  bookmarkActive = model<boolean>(false);
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('notificationTemplate')
  notificationTemplate!: TemplateRef<unknown>;

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
      url: 'https://web.whatsapp.com/send?phone=528116255123&text=Requiero%20ayuda%20con%20lo%20siguiente:%20',
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
      icono:
        'https://saprodtecportal.blob.core.windows.net/mitec/colaboradores/PublishingImages/TecServices-Iconos/Correo.png',
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

  constructor(
    private router: Router,
    private contentProjected: BmbProjectionContentService,
  ) {
    effect(() => {
      // console.log('Bookmark active state changed:', this.bookmarkActive());
    });

    // setTimeout(() => {
    //   console.log('show notification');

    //   this.notificationService.addNotification({
    //     title: 'Welcome to the Home Page!',
    //     content: this.notificationTemplate,
    //     isFullColor: false,
    //     component: 'notification',
    //     type: 'info',
    //     delay: 500000,
    //   });
    //   this.notificationService.addNotification({
    //     title: 'Welcome to the Home Page!',
    //     content: 'This is a simple notification message.',
    //     isFullColor: false,
    //     component: 'notification',
    //     type: 'info',
    //     delay: 5000,
    //   });
    // }, 1000);
  }

  templateClick(event: MouseEvent | KeyboardEvent) {
    const data: IBmbProjectionContent = {
      content: this.modalTemplate,
      targetRef: event.target as HTMLElement,
      mode: 'outside',
    };

    this.contentProjected.openContent(data);
  }

  logBookmarkChange(event: boolean) {
    console.log('Bookmark active state:', event);
  }

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/homeCardTransition']);
  }

  onExpandClick2() {
    console.log('Expand clicked');

    this.router.navigate(['/dropdown']);
  }

  handleHelpButtonClick(event: MouseEvent | KeyboardEvent): void {
    const data: IBmbProjectionContent = {
      content: HelpMenuComponent,
      targetRef: event.target as HTMLElement,
      mode: 'outside',
    };

    this.contentProjected.openContent(data);
  }

  handleImageCard(event: MouseEvent | KeyboardEvent): void {
    console.log('Image card clicked', event);
  }

  handleOpen(value: string): void {
    console.info('handleOpen', value);
  }
}
