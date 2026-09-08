// eslint-disable @typescript-eslint/no-inferrable-types
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Input,
  model,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbDividerComponent,
  BmbHomeCardComponent,
  IBmbProjectionContent,
  BmbProjectionContentService,
  BmbImageComponent,
  BmbNativeModalService,
  ThemeService,
  BmbTextEditorComponent,
  IBmbActionHeader,
  BmbAccordionComponent,
  BmbActionMenuComponent,
  BmbItemHyperlinkComponent,
} from 'ui-angular';

import { HelpMenuComponent } from '../help-menu/help-menu.component';
import { ModalWDropdownComponent } from '../modal-w-dropdown/modal-w-dropdown.component';
import { FormControl } from '@angular/forms';

@Component({
  //eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bmb-home',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbDividerComponent,
    BmbHomeCardComponent,
    BmbImageComponent,
    BmbTextEditorComponent,
    BmbAccordionComponent,
    BmbActionMenuComponent,
    BmbItemHyperlinkComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  @Input() id_grado_logro!: number | string | null | undefined;
  @Input() nombre_grado_logro = '';

  bookmarkActive = model<boolean>(false);
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('notificationTemplate')
  notificationTemplate!: TemplateRef<unknown>;
  textEditorControl: FormControl = new FormControl('');

  router = inject(Router);
  contentProjected = inject(BmbProjectionContentService);
  modalService = inject(BmbNativeModalService);
  themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      const theme = this.currentTheme();

      console.log('Current theme:', theme);
    });
  }

  currentTheme = computed(() => {
    console.log('Computing current theme...');

    return this.themeService.getTheme();
  });

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

  handleImageClick(event: unknown): void {
    console.log('Image clicked:', event);
  }

  handleModalWithDropdown(): void {
    this.modalService.openModal({
      title: 'Modal with Dropdown',
      content: ModalWDropdownComponent,
      inputContext: {
        isFilterable: false,
      },
      size: 'medium',
      beforeCloseModal: (event) => {
        console.log(event);
      },
      afterCloseModal: (event) => {
        console.log(event);
      },
      afterOpenModal: (event) => {
        console.log(event);
      },
    });
  }

  printPaymentDetails(event: MouseEvent | KeyboardEvent): void {
    console.log('Payment details printed', event);
  }

  private readonly configLogros: Record<
    string | number,
    { claseColor: string; llenos: number }
  > = {
    0: { claseColor: '--general-contrasts-80', llenos: 0 }, //No hay suficiente información
    1: { claseColor: '--creative-use-peach', llenos: 1 },
    2: { claseColor: '--semantic-success', llenos: 2 },
    3: { claseColor: '--semantic-success', llenos: 3 },
    4: { claseColor: '--semantic-success', llenos: 4 },
    5: { claseColor: '--creative-use-peach', llenos: 1 },
    6: { claseColor: '--semantic-success', llenos: 2 },
    7: { claseColor: '--semantic-success', llenos: 3 },
    8: { claseColor: '--semantic-success', llenos: 4 },
    PENDIENTE: { claseColor: '--general-contrasts-80', llenos: 0 },
  };

  claseColorActual = '--general-contrasts-80';
  barrasLlenas = 0;
  arrBarras: number[] = [1, 2, 3, 4];

  ngOnInit(): void {
    this.actualizarConfiguracion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id_grado_logro']) {
      this.actualizarConfiguracion();
    }
  }

  ngOnDestroy(): void {
    this.barrasLlenas = 0;
    this.claseColorActual = '--general-contrasts-80';
  }

  protected actualizarConfiguracion(): void {
    // Si llega un valor vacío o nulo, lo tratamos como PENDIENTE (0 barras)
    const idBuscar =
      this.id_grado_logro === null ||
      this.id_grado_logro === undefined ||
      this.id_grado_logro === ''
        ? 'PENDIENTE'
        : this.id_grado_logro;

    const config = this.configLogros[idBuscar];

    if (config) {
      this.claseColorActual = config.claseColor;
      this.barrasLlenas = config.llenos;
    } else {
      // Forzamos reseteo si el ID no es válido
      this.claseColorActual = '--general-contrasts-80';
      this.barrasLlenas = 0;
    }
  }

  public fillIcon(index: number): boolean {
    return index <= this.barrasLlenas;
  }

  protected getClickButton(event: MouseEvent): void {
    console.info('getClickButton container');
  }

  protected getClickBookmark(event: MouseEvent): void {
    console.info('getClickButton bookmark');
  }

  homeCardActions: IBmbActionHeader[] = [
    {
      icon: 'language_spanish',
      iconActiveToggle: 'language_us',
      alt: 'Language',
      action: (event) => {
        console.info('Edit action clicked', event);
      },
    },
    {
      icon: 'edit',
      alt: 'Edit',
      action: (event) => {
        console.info('Edit action clicked', event);
      },
    },
    {
      icon: 'delete',
      alt: 'Delete',
      action: (event) => {
        console.info('Delete action clicked', event);
      },
    },
    {
      icon: 'info',
      alt: 'Info',
      action: (event) => {
        console.info('Info action clicked', event);
      },
    },
  ];
}
