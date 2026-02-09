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
  BmbNotificationService,
  BmbAdvertisementCardComponent,
  BmbActionMenuComponent,
  BmbItemComponent,
  BmbHomeCardChatComponent,
  IChatBarActions,
  IBmbChatMessage,
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
    BmbHomeCardChatComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  bookmarkActive = model<boolean>(false);
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('notificationTemplate')
  notificationTemplate!: TemplateRef<unknown>;

  @Input() mode: 'compact' | 'chat' | 'expanded' = 'compact';
  @Input() currentBot = {
    name: 'TecBot',
    icon: 'bot_tecStandar',
  };

  items = [
    {
      label: 'Correo',
      icon: 'mail',
      value: 'correo',
      valueLink: 'mailto:tecservices@servicios.tec.mx',
      isActive: false,
    },
    {
      label: 'Teléfono',
      icon: 'mobile',
      value: '52 81 8358 2000',
      valueLink: 'tel:52 81 8358 2000',
      isActive: true,
    },
    {
      label: 'Celular',
      icon: 'mobile',
      value: '+52 81 1625 5123 (solo texto)',
      valueLink: '',
      isActive: false,
    },
    {
      label: 'Preguntas',
      icon: 'question_exchange',
      value: 'Preguntas',
      valueLink: '',
      isActive: true,
    },
  ];

  actionList: IChatBarActions[] = [
    {
      name: 'Expandir Chat',
      icon: '',
      action: () => {
        this.mode = 'expanded';
      },
    },
    {
      name: 'Iniciar nuevo chat',
      icon: '',
      action: () => {},
    },
  ];

  messages: IBmbChatMessage[] = [
    {
      type: 'text',
      content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
      isUserMessage: false,
      time: new Date('2025-02-19T14:31:00'),
    },
    {
      type: 'text',
      content: {
        text: 'Hola, me gustaria un pequeño resumen de la festividad del dia de la bandera en México',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:32:00'),
    },
    {
      type: 'text',
      content: {
        text: 'El Día de la Bandera en México se celebra el 24 de febrero de cada año. Esta fecha conmemora la adopción de la bandera actual en 1821, tras la independencia del país. Es un día para rendir homenaje a los símbolos patrios y a la historia de México, destacando la importancia de la unidad y el orgullo nacional. En este día se realizan ceremonias cívicas y militares en todo el país.',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: false,
      time: new Date('2025-02-19T14:33:00'),
    },
    {
      type: 'text',
      content: { text: 'Gracias.' },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:34:00'),
    },
  ];

  constructor(
    private router: Router,
    private contentProjected: BmbProjectionContentService,
    private notificationService: BmbNotificationService,
  ) {
    effect(() => {
      console.log('Bookmark active state changed:', this.bookmarkActive());
    });

    setTimeout(() => {
      console.log('show notification');

      // this.notificationService.addNotification({
      //   title: 'Welcome to the Home Page!',
      //   content: this.notificationTemplate,
      //   isFullColor: false,
      //   component: 'notification',
      //   type: 'info',
      //   delay: 500000,
      // });
      this.notificationService.addNotification({
        title: 'Welcome to the Home Page!',
        content: 'This is a simple notification message.',
        isFullColor: false,
        component: 'notification',
        type: 'info',
        delay: 5000,
      });
    }, 1000);
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
}
