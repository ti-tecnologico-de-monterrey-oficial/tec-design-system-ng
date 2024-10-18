import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  model,
  TemplateRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BmbThemeComponent,
  BmbBadgeComponent,
  BmbButtonDirective,
  BmbToastComponent,
  BmbContainerComponent,
  BmbContainerButtonComponent,
  BmbHeaderMobileComponent,
  BmbHomeSectionComponent,
  BmbInteractiveIconComponent,
  BmbUserImageComponent,
  BmbDividerComponent,
  BmbDotPaginatorComponent,
  BmbLoaderComponent,
  BmbSwitchComponent,
  BmbLegendComponent,
  BmbValueCounterComponent,
  BmbInputComponent,
  BmbStatCounterComponent,
  BmbUserSummaryComponent,
  BmbSidebarComponent,
  BmbFabComponent,
  BmbTabsComponent,
  BmbProgressCircleComponent,
  BmbCheckboxComponent,
  BmbCalendarComponent,
  BmbTopBarComponent,
  BmbTopBarItemComponent,
  BmbRadialComponent,
  BmbTotpComponent,
  BmbSearchInputComponent,
  BmbLayoutItemDirective,
  BmbLayoutDirective,
  BmbCardComponent,
  BmbTablesComponent,
  BmbModalComponent,
  BmbFrequentAppsSelectorComponent,
  BmbMediaCardComponent,
  BmbButtonGroupDirective,
  BmbDatepickerComponent,
  BmbCardHeaderComponent,
  BmbCardFooterComponent,
  BmbInputPhoneNumberComponent,
  BmbStudentActivitySelectorComponent,
  BmbTabStudenActivityComponent,
  BmbTimestreamComponent,
  BmbHomeCardComponent,
  BmbCardContentComponent,
  BmbChatBarComponent,
  IBotType,
  BmbLoginOnboardingComponent,
  IBmbLoginOnboarding,
  IBmbUserInfo,
  BmbWebTemplatesComponent,
  BmbDropdownComponent,
  BmbGradesComponent,
  BmbExternalLinkComponent,
  BmbHeaderSectionComponent,
  BmbMobileTemplatesComponent,
  BmbPushNotificationComponent,
  BmbNotificationService,
  BmbHomeCardChatComponent,
  IBmbTab,
  BmbIconComponent,
  BmbCalendarService,
  // IBmbEventType,
  IBmbApp,
  BmbAccountStatementComponent,
  IBmbButtonAction,
  IBmbMobileTemplateName,
  BmbStepProgressBarComponent,
  IBmbMobileTemplateButton,
  BmbDateRangeComponent,
  IBmbActionHeader,
  BmbFocusElementComponent,
  BmbGradeValueComponent,
  BmbTooltipComponent,
  BmbFormValidationComponent,
  BmbTimestreamCardComponent,
  ITimelineEvent,
} from '../../projects/ds-ng/src/public-api';
import { BmbCardButtonComponent } from '../../projects/ds-ng/src/lib/components/bmb-card-button/bmb-card-button.component';

export interface Target {
  target: string;
  index: number;
}

import names from './names.json';
import { ModalDataConfig } from '../../projects/ds-ng/src/lib/components/bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';
// import timelineEvents from './timelineEvents.json';
import {} from '../../projects/ds-ng/src/lib/components/bmb-home-card-chat/bmb-home-card-chat.component';
// import { DateTime } from 'luxon';
import { IBmbGrades } from '../../projects/ds-ng/src/lib/components/bmb-grades/types';
import { BmbBottomNavigationBarComponent } from '../../projects/ds-ng/src/lib/components/bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';
import { IBmbDataTopBar } from '../../projects/ds-ng/src/lib/components/bmb-breadcrumb/bmb-breadcrumb.component';
import {
  BmbEvaluationRubricComponent,
  IBmbCommentEvalRubric,
  IBmbEvalRubricButtons,
  IBmbEvaluationRubric,
} from '../../projects/ds-ng/src/lib/components/bmb-evaluation-rubric/bmb-evaluation-rubric.component';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    BmbThemeComponent,
    BmbBadgeComponent,
    BmbButtonDirective,
    BmbToastComponent,
    BmbContainerComponent,
    BmbContainerButtonComponent,
    BmbHeaderMobileComponent,
    BmbHomeSectionComponent,
    BmbInteractiveIconComponent,
    BmbUserImageComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbLoaderComponent,
    BmbSwitchComponent,
    BmbLegendComponent,
    BmbValueCounterComponent,
    BmbInputComponent,
    BmbStatCounterComponent,
    BmbUserSummaryComponent,
    BmbSidebarComponent,
    BmbFabComponent,
    BmbTabsComponent,
    BmbProgressCircleComponent,
    BmbCheckboxComponent,
    BmbCalendarComponent,
    BmbTopBarComponent,
    BmbTopBarItemComponent,
    BmbRadialComponent,
    BmbTotpComponent,
    BmbSearchInputComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbCardComponent,
    BmbIconComponent,
    BmbTablesComponent,
    BmbModalComponent,
    BmbFrequentAppsSelectorComponent,
    BmbMediaCardComponent,
    BmbButtonGroupDirective,
    BmbDatepickerComponent,
    BmbCardHeaderComponent,
    BmbCardFooterComponent,
    BmbCardContentComponent,
    BmbInputPhoneNumberComponent,
    BmbStudentActivitySelectorComponent,
    BmbTabStudenActivityComponent,
    BmbTimestreamComponent,
    BmbHomeCardComponent,
    BmbHomeCardChatComponent,
    BmbChatBarComponent,
    BmbLoginOnboardingComponent,
    BmbPushNotificationComponent,
    BmbAccountStatementComponent,
    BmbWebTemplatesComponent,
    BmbDropdownComponent,
    BmbGradesComponent,
    BmbExternalLinkComponent,
    BmbBottomNavigationBarComponent,
    BmbHeaderSectionComponent,
    BmbMobileTemplatesComponent,
    BmbStepProgressBarComponent,
    BmbFocusElementComponent,
    BmbDateRangeComponent,
    BmbGradeValueComponent,
    BmbEvaluationRubricComponent,
    BmbTooltipComponent,
    BmbCardButtonComponent,
    BmbFormValidationComponent,
    BmbTimestreamCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
    private notificationSignal: BmbNotificationService,
    private calendarEventsSignal: BmbCalendarService,
  ) {}

  title1 = 'Sample Card Title';
  body = 'This is the body content of the card.';
  badges = [{ text: 'Badge 1' }, { text: 'Badge 2' }];
  icons = ['settings', 'home'];
  icon = 'info';
  hasIcon = true;
  hasMenu = true;
  isAddContent = true;
  myTabs: IBmbTab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

  @ViewChild('buttonContent') actionsTemplate!: TemplateRef<unknown>;

  activeTabId: number | null =
    this.myTabs.find((tab: IBmbTab) => tab.isActive)?.id ?? null;

  handleTabSelected(tab: IBmbTab): void {
    this.activeTabId = tab.id;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  title = 'tec-design-system-ng';
  boolUserSummary = true;
  value = 'tec-design';

  dataModal: ModalDataConfig = {
    title: 'Modal Title',
    subtitle: 'Modal Subtitle',
    // content:
    //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.',
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
    size: 'small',
    type: 'alert',
    alertStyle: 'error',
    primaryBtnLabel: 'Action',
    secondaryBtnLabel: 'Cancel',
    hidePrimaryButton: false,
    // scrollable: true,
    // primaryAction: () => {
    //   console.log('primaryAction');
    // },
    // secondaryAction: () => {
    //   console.log('secondaryAction');
    // },
  };

  isCalendarLoading = false;

  sidebarElements: {
    id: number;
    icon: string;
    title: string;
    link: string;
  }[][] = [
    [
      { id: 1, icon: 'assignment_add', title: 'Elegir documentos', link: '#' },
      { id: 2, icon: 'task', title: 'Agregar firmantes', link: '#' },
      { id: 3, icon: 'note_alt', title: 'Crear envelope', link: '#' },
      {
        id: 4,
        icon: 'checklist_rtl',
        title: 'Estado de archivos',
        link: '/home',
      },
    ],
    [
      {
        id: 5,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: '/my-page',
      },
    ],
  ];
  i = 0;

  userInformation = {
    image:
      'https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15-1024x768.jpg',
    name: 'Juan Pedro Sánchez Miranda',
    role: 'Role de usuario',
  };

  openModal() {
    this.matDialog.open(BmbModalComponent, { data: this.dataModal });
  }

  @ViewChild(BmbToastComponent)
  private toastComponent!: BmbToastComponent;
  onButtonClick() {
    this.toastComponent.openToast();
  }

  handleDot(index: number): void {
    console.log('Index clicked:', index);
  }

  handleIconLeftClick() {
    console.log('Icono izquierdo clickeado');
  }

  handleIconRightClick() {
    console.log('Icono derecho clickeado');
  }

  handleIconRight2Click() {
    console.log('Icono derecho 2 clickeado');
  }

  myActiveDotIndex: number = 0;
  myTotalDots: number = 5;
  myTargets: Target[] = [
    { target: '#item1', index: 0 },
    { target: '#item2', index: 1 },
  ];

  handleDotPress(index: number): void {
    console.log('Dot pressed:', index);
    this.myActiveDotIndex = index;
  }

  handleCheckboxChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log('Checkbox checked state:', element.checked);
    console.log('Checkbox value:', element.value);
  }

  handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
    console.log('Is it checked?', element.checked);
  }

  plus() {
    this.i++;
  }

  decrement() {
    if (this.i === 0) {
      return;
    }
    this.i--;
  }

  save(event: number) {
    this.i = event;
  }

  onProfileClick() {
    this.boolUserSummary = !this.boolUserSummary;
  }

  correctCodes: { [key: string]: string } = {
    first: 'Hj93h9',
    second: 'A1B2',
  };

  errors: { [key: string]: { codeError: boolean; errorMessage: string } } = {};

  verifyCode(receivedCode: string, instanceId: string) {
    if (receivedCode === '') {
      this.errors[instanceId] = {
        codeError: true,
        errorMessage: 'Please fill all fields correctly',
      };
      console.log('Entered for empty code');
      return;
    }

    const correctCode = this.correctCodes[instanceId];
    if (!correctCode) {
      this.errors[instanceId] = { codeError: false, errorMessage: '' };
      return;
    }

    this.errors[instanceId] = this.errors[instanceId] || {
      codeError: false,
      errorMessage: '',
    };

    if (receivedCode !== correctCode) {
      this.errors[instanceId].codeError = true;
      this.errors[instanceId].errorMessage = 'Invalid Code. Please try again.';
      console.log('Entered for invalid code');
    } else {
      this.errors[instanceId].codeError = false;
      this.errors[instanceId].errorMessage = '';
      console.log('Entered for correct code');
      alert('The code is correct, proceed with the action');
    }
  }

  isSearchIputLoading = false;
  serverSideFilteredData: string[] = [];
  searchInputResult = '';

  async fetchNames(name: string): Promise<void> {
    console.log(name);
    try {
      this.isSearchIputLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } finally {
      this.serverSideFilteredData = [
        'Carlee Bengochea',
        'Reynard Howgate',
        'Pearce Jore',
        'Giacopo Mellings',
        'Clyve Nerval',
        'Pauletta Pavelka',
        'Midge Girardot',
      ];
      this.isSearchIputLoading = false;
      this.cdr.detectChanges();
    }
  }

  handleSearchValue(name: string) {
    this.searchInputResult = name;
  }

  handleLogOff(event: Event) {
    console.log(event);
  }

  topBarLang: string = 'es';

  handleLangChange(lang: string): void {
    this.topBarLang = lang;
  }

  namesList = names;

  handleButtonPrimary() {
    console.log('Button primary on error loader');
  }

  handleButtonSecondary() {
    console.log('Button secondary on error loader');
  }

  onSelect(name: string) {
    window.alert(name.toString());
  }

  // Table
  data = [
    {
      document: 'Contrato profresor cátedra Biología marina CCM.pdf',
      id: '0890',
      folio: '0010',
      sign: 'Iniciado',
      clave: 'Iniciado',
      un: 'Iniciado',
      calificacion: 'Iniciado',
      curso: 'Iniciado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Matemáticas I',
      id: '3468',
      folio: '0011',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Expresión verbal en el ámbito profesional',
      id: '4579',
      folio: '0012',
      sign: 'En proceso',
      clave: 'En proceso',
      un: 'En proceso',
      calificacion: 'En proceso',
      curso: 'En proceso',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Diseño de estructuras de concreto',
      id: '2356',
      folio: '0013',
      sign: 'En proceso',
      clave: 'En proceso',
      un: 'En proceso',
      calificacion: 'En proceso',
      curso: 'En proceso',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Planeación de microempresas para el desarrollo social',
      id: '5789',
      folio: '0014',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Administración de obras',
      id: '2345',
      folio: '0015',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
  ];
  columns = [
    {
      def: 'document',
      label: 'Nombre del Documento',
      dataKey: 'document',
    },
    { def: 'id', label: 'Id', dataKey: 'id' },
    { def: 'folio', label: 'Folio de Docs', dataKey: 'folio' },
    { def: 'sign', label: 'Estado de firma', dataKey: 'sign' },
    { def: 'clave', label: 'Clave', dataKey: 'clave' },
    { def: 'un', label: 'Un', dataKey: 'un' },
    {
      def: 'calificacion',
      label: 'Calificación',
      dataKey: 'calificacion',
    },
    { def: 'curso', label: 'Curso ó Req', dataKey: 'curso' },
    { def: 'column1', label: 'Column Header', dataKey: 'column1' },
    { def: 'column2', label: 'Column Header', dataKey: 'column2' },
    { def: 'column3', label: 'Column Header', dataKey: 'column3' },
  ];
  config = {
    isSelectable: true,
    isExpandible: true,
    isPaginable: true,
    showActions: true,
  };
  select(event: string) {
    window.alert(event);
  }
  clickButton(event: Event) {
    window.alert(event);
  }

  // dataModal: ModalDataConfig = {
  //   title: 'Modal Title',
  //   subtitle: 'Modal Subtitle',
  //   content:
  //     'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus. ',
  //   size: 'small',
  //   type: 'alert',
  //   alertStyle: 'error',
  //   primaryBtnLabel: 'Action',
  //   secondaryBtnLabel: 'Cancel',
  //   hidePrimaryButton: false,
  //   scrollable: true,
  // };

  //Frequent apps
  apps: IBmbApp[] = [
    {
      icon: 'home',
      title: 'Inicio',
      link: '/home',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: '/my-page',
      appearance: 'yellow',
    },
    {
      icon: 'settings',
      title: 'Calendario escolar',
      link: 'https://configuración.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: 'settings',
      title: 'Configuración',
      link: 'https://configuración.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Inicio',
      link: '/home',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: '/my-page',
      appearance: 'yellow',
    },
    {
      icon: 'settings',
      title: 'Calendario escolar',
      link: 'https://configuración.com',
      target: '_blank',
      appearance: 'yellow',
    },
    {
      icon: 'settings',
      title: 'Configuración',
      link: 'https://configuración.com',
      target: '_blank',
      appearance: 'yellow',
    },
  ];

  toggleButtonState = false;
  pickerDate: string | undefined = undefined;
  currentDate: Date = new Date();

  handleButtonState() {
    const newDate = new Date();
    this.pickerDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  timeStreamEvents: ITimelineEvent[] = [
    {
      id: 1,
      start: '2023-02-26',
      end: '2023-02-28',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
      short_description:
        'lacinia nisi venenatis tristique fusce congue diam id ornare',
      type: 'active',
      related_to: ['task3'],
      decision: 'et magnis',
      title: 'Betrayal',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Berrie',
      user_last_name: 'Stolberger',
      user_email: 'bstolberger0@si.edu',
      tags: ['non', 'mattis'],
      icon: 'task_alt',
    },
    {
      id: 2,
      start: '2023-01-01',
      end: '2023-01-01',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description:
        'vestibulum aliquet ultrices erat tortor sollicitudin mi',
      type: 'done',
      related_to: ['task1'],
      decision: 'ac',
      title: 'Omen, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Corabella',
      user_last_name: 'Blazewski',
      user_email: 'cblazewski1@github.io',
      tags: ['penatibus', 'et', 'magnis', 'dis', 'parturient'],
      icon: 'editor_choice',
    },
    {
      id: 3,
      start: '2023-12-29',
      end: '2023-12-31',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description:
        'quis orci nullam molestie nibh in lectus pellentesque',
      type: 'active',
      related_to: ['task3'],
      decision: 'proin leo odio',
      title: 'Piranhaconda',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Tim',
      user_last_name: 'Frontczak',
      user_email: 'tfrontczak2@icio.us',
      tags: ['auctor', 'sed', 'tristique', 'in'],
      icon: 'done_outline',
    },
    {
      id: 4,
      start: '2025-01-13',
      end: '2025-01-16',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'sodales scelerisque mauris',
      type: 'active',
      related_to: ['task4'],
      decision: 'diam',
      title: 'Ploy',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ryan',
      user_last_name: 'Bendix',
      user_email: 'rbendix3@gmpg.org',
      tags: ['vivamus'],
      icon: 'done_outline',
    },
    {
      id: 5,
      start: '2024-08-09',
      end: '2024-08-10',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      short_description: 'amet turpis elementum',
      type: 'done',
      related_to: ['task1'],
      decision: 'velit',
      title: 'Samurai Assassin (Samurai)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Flory',
      user_last_name: 'Haton',
      user_email: 'fhaton4@bbb.org',
      tags: ['nullam', 'varius', 'nulla', 'facilisi'],
      icon: 'change_circle',
    },
    {
      id: 6,
      start: '2023-01-23',
      end: '2023-01-23',
      description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      short_description: 'nulla sed accumsan felis ut at dolor quis odio',
      type: 'done',
      related_to: ['task4'],
      decision: 'augue a suscipit',
      title: 'They Have Escaped (He ovat paenneet)',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Kimball',
      user_last_name: 'Abbati',
      user_email: 'kabbati5@soup.io',
      tags: ['sed', 'accumsan', 'felis', 'ut', 'at'],
      icon: 'task_alt',
    },
    {
      id: 7,
      start: '2026-10-25',
      end: '2026-10-27',
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
      short_description: 'donec vitae nisi nam ultrices libero non mattis',
      type: 'done',
      related_to: ['task2'],
      decision: 'maecenas pulvinar lobortis',
      title: '12th & Delaware',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Ricky',
      user_last_name: 'Kimmel',
      user_email: 'rkimmel6@barnesandnoble.com',
      tags: ['quam'],
      icon: 'change_circle',
    },
    {
      id: 8,
      start: '2023-12-17',
      end: '2023-12-17',
      description:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      short_description: 'gravida sem praesent id massa id nisl',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'eget congue eget',
      title: 'Terminator 2: Judgment Day',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Cloris',
      user_last_name: 'Traher',
      user_email: 'ctraher7@list-manage.com',
      tags: ['id', 'nulla', 'ultrices', 'aliquet'],
      icon: 'task_alt',
    },
    {
      id: 9,
      start: '2025-02-09',
      end: '2025-02-12',
      description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
      short_description:
        'metus vitae ipsum aliquam non mauris morbi non lectus',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'enim sit',
      title: 'Strings',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Deena',
      user_last_name: 'Ivanovic',
      user_email: 'divanovic8@marriott.com',
      tags: ['in', 'felis', 'eu', 'sapien', 'cursus'],
      icon: 'task_alt',
    },
    {
      id: 10,
      start: '2024-12-07',
      end: '2024-12-07',
      description:
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
      short_description:
        'ante ipsum primis in faucibus orci luctus et ultrices posuere',
      type: 'pending',
      related_to: ['task1'],
      decision: 'libero convallis',
      title: 'Jimmy Neutron: Boy Genius',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ulysses',
      user_last_name: 'Sutherden',
      user_email: 'usutherden9@statcounter.com',
      tags: ['erat', 'volutpat'],
      icon: 'task_alt',
    },
    {
      id: 11,
      start: '2024-11-25',
      end: '2024-11-25',
      description:
        'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
      short_description: 'blandit ultrices enim lorem ipsum',
      type: 'done',
      related_to: ['task4'],
      decision: 'turpis a pede',
      title: 'Hatchet',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Lilli',
      user_last_name: 'Onyon',
      user_email: 'lonyona@cbsnews.com',
      tags: ['eu'],
      icon: 'done_outline',
    },
    {
      id: 12,
      start: '2025-06-15',
      end: '2025-06-18',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description: 'sapien non mi integer',
      type: 'pending',
      related_to: ['task3'],
      decision: 'quam pharetra magna',
      title: 'Hangmen Also Die',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Ellette',
      user_last_name: 'Anthoney',
      user_email: 'eanthoneyb@twitpic.com',
      tags: ['velit', 'nec', 'nisi'],
      icon: 'done_outline',
    },
    {
      id: 13,
      start: '2022-11-08',
      end: '2022-11-09',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
      short_description: 'mauris laoreet ut rhoncus aliquet pulvinar',
      type: 'pending',
      related_to: ['task2'],
      decision: 'eu sapien cursus',
      title: 'Vanquished, The (I vinti)',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Thorin',
      user_last_name: 'Bowne',
      user_email: 'tbownec@wunderground.com',
      tags: ['vivamus'],
      icon: 'change_circle',
    },
    {
      id: 14,
      start: '2024-08-05',
      end: '2024-08-08',
      description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
      short_description: 'donec diam neque vestibulum eget vulputate',
      type: 'pending',
      related_to: ['task1'],
      decision: 'luctus',
      title: 'Imitation of Life',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Jerry',
      user_last_name: 'Spencook',
      user_email: 'jspencookd@dagondesign.com',
      tags: ['rhoncus', 'sed', 'vestibulum', 'sit', 'amet'],
      icon: 'task_alt',
    },
    {
      id: 15,
      start: '2024-08-29',
      end: '2024-09-01',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description:
        'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum',
      type: 'active',
      related_to: ['task2'],
      decision: 'aenean sit amet',
      title: 'Howards End',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Ab',
      user_last_name: 'Durn',
      user_email: 'adurne@slashdot.org',
      tags: ['habitasse', 'platea', 'dictumst'],
      icon: 'keep',
    },
    {
      id: 16,
      start: '2024-05-27',
      end: '2024-05-30',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      short_description: 'diam nam tristique tortor',
      type: 'pending',
      related_to: ['task4'],
      decision: 'quisque ut',
      title: 'Over Your Dead Body',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Isaak',
      user_last_name: 'McAvinchey',
      user_email: 'imcavincheyf@cargocollective.com',
      tags: ['eu', 'est', 'congue', 'elementum'],
      icon: 'keep',
    },
    {
      id: 17,
      start: '2023-08-01',
      end: '2023-08-01',
      description:
        'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
      short_description: 'vestibulum eget vulputate ut ultrices',
      type: 'active',
      related_to: ['task2'],
      decision: 'sit amet turpis',
      title: 'The Punisher: Dirty Laundry',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Jerrilee',
      user_last_name: 'Ryall',
      user_email: 'jryallg@earthlink.net',
      tags: ['eget', 'nunc', 'donec', 'quis'],
      icon: 'task_alt',
    },
    {
      id: 18,
      start: '2026-11-17',
      end: '2026-11-17',
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description: 'sed nisl nunc rhoncus dui vel',
      type: 'pending',
      related_to: ['task3'],
      decision: 'sit amet',
      title: 'Storm in Summer, A',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Gamaliel',
      user_last_name: 'McLeish',
      user_email: 'gmcleishh@ucsd.edu',
      tags: ['vestibulum', 'quam', 'sapien', 'varius'],
      icon: 'done_outline',
    },
    {
      id: 19,
      start: '2023-11-06',
      end: '2023-11-06',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      short_description: 'justo sit amet sapien dignissim vestibulum',
      type: 'under_review',
      related_to: ['task4'],
      decision: 'quam fringilla',
      title: 'Hurricane Streets',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Lenci',
      user_last_name: 'Willsmore',
      user_email: 'lwillsmorei@yellowpages.com',
      tags: ['et', 'ultrices'],
      icon: 'editor_choice',
    },
    {
      id: 20,
      start: '2023-01-05',
      end: '2023-01-07',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      short_description: 'mi in porttitor pede',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'ipsum',
      title: 'Late August, Early September (Fin août, début septembre)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Corbie',
      user_last_name: 'Sparling',
      user_email: 'csparlingj@businessweek.com',
      tags: ['nulla'],
      icon: 'editor_choice',
    },
    {
      id: 21,
      start: '2023-07-02',
      end: '2023-07-04',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
      short_description: 'at feugiat non pretium',
      type: 'pending',
      related_to: ['task1'],
      decision: 'libero nam',
      title: 'Town Called Panic, A (Panique au village)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Dyana',
      user_last_name: 'MacDermott',
      user_email: 'dmacdermottk@netscape.com',
      tags: ['ut', 'nulla', 'sed', 'accumsan', 'felis'],
      icon: 'done_outline',
    },
    {
      id: 22,
      start: '2024-09-03',
      end: '2024-09-05',
      description:
        'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
      short_description:
        'bibendum morbi non quam nec dui luctus rutrum nulla tellus',
      type: 'active',
      related_to: ['task3'],
      decision: 'risus',
      title: 'Bait',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Junina',
      user_last_name: 'Treanor',
      user_email: 'jtreanorl@walmart.com',
      tags: ['ac', 'consequat'],
      icon: 'change_circle',
    },
    {
      id: 23,
      start: '2026-05-24',
      end: '2026-05-26',
      description:
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      short_description: 'rhoncus aliquam lacus morbi quis tortor id nulla',
      type: 'active',
      related_to: ['task4'],
      decision: 'pede morbi',
      title: 'Bettie Page Reveals All',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Pietrek',
      user_last_name: 'Cockayne',
      user_email: 'pcockaynem@businesswire.com',
      tags: ['diam'],
      icon: 'keep',
    },
    {
      id: 24,
      start: '2023-06-19',
      end: '2023-06-19',
      description:
        'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
      short_description:
        'orci luctus et ultrices posuere cubilia curae nulla dapibus',
      type: 'done',
      related_to: ['task4'],
      decision: 'parturient',
      title: 'Wanderlust',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Bee',
      user_last_name: 'Jeffcock',
      user_email: 'bjeffcockn@forbes.com',
      tags: ['tristique'],
      icon: 'done_outline',
    },
    {
      id: 25,
      start: '2024-10-15',
      end: '2024-10-18',
      description:
        'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      short_description: 'ligula vehicula consequat',
      type: 'done',
      related_to: ['task2'],
      decision: 'leo',
      title: 'Love and Pigeons',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Kathy',
      user_last_name: 'MacAnelley',
      user_email: 'kmacanelleyo@tmall.com',
      tags: ['volutpat', 'in', 'congue', 'etiam'],
      icon: 'change_circle',
    },
    {
      id: 26,
      start: '2025-07-24',
      end: '2025-07-24',
      description:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      short_description: 'eu sapien cursus vestibulum proin eu mi',
      type: 'pending',
      related_to: ['task2'],
      decision: 'quis turpis',
      title: "This Ain't California",
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Kermie',
      user_last_name: 'Benezet',
      user_email: 'kbenezetp@apache.org',
      tags: ['aenean', 'lectus', 'pellentesque', 'eget', 'nunc'],
      icon: 'task_alt',
    },
    {
      id: 27,
      start: '2024-09-20',
      end: '2024-09-23',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      short_description:
        'aliquam augue quam sollicitudin vitae consectetuer eget rutrum at',
      type: 'pending',
      related_to: ['task4'],
      decision: 'sed nisl nunc',
      title: 'Simon Says',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Tomlin',
      user_last_name: 'Aleksic',
      user_email: 'taleksicq@omniture.com',
      tags: ['lacinia', 'nisi', 'venenatis'],
      icon: 'editor_choice',
    },
    {
      id: 28,
      start: '2023-10-15',
      end: '2023-10-15',
      description:
        'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description: 'nulla tellus in sagittis dui vel nisl duis ac',
      type: 'under_review',
      related_to: ['task2'],
      decision: 'magna',
      title: 'Z Channel: A Magnificent Obsession',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Carilyn',
      user_last_name: 'Scroggins',
      user_email: 'cscrogginsr@cafepress.com',
      tags: ['felis', 'eu', 'sapien', 'cursus', 'vestibulum'],
      icon: 'editor_choice',
    },
    {
      id: 29,
      start: '2022-09-21',
      end: '2022-09-24',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description: 'accumsan tellus nisi eu orci mauris lacinia sapien',
      type: 'pending',
      related_to: ['task3'],
      decision: 'felis fusce posuere',
      title: 'Return, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Pippy',
      user_last_name: 'Robiou',
      user_email: 'probious@prweb.com',
      tags: ['rhoncus'],
      icon: 'editor_choice',
    },
    {
      id: 30,
      start: '2026-05-04',
      end: '2026-05-06',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      short_description:
        'etiam pretium iaculis justo in hac habitasse platea dictumst',
      type: 'pending',
      related_to: ['task2'],
      decision: 'convallis',
      title: 'Of Mice and Men',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Rhona',
      user_last_name: 'McGowing',
      user_email: 'rmcgowingt@yandex.ru',
      tags: ['gravida'],
      icon: 'done_outline',
    },
    {
      id: 31,
      start: '2026-09-10',
      end: '2026-09-13',
      description:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      short_description:
        'at velit vivamus vel nulla eget eros elementum pellentesque',
      type: 'pending',
      related_to: ['task3'],
      decision: 'leo odio porttitor',
      title: 'Love and Other Catastrophes',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Ellette',
      user_last_name: 'Chaudrelle',
      user_email: 'echaudrelleu@wunderground.com',
      tags: ['sapien', 'dignissim', 'vestibulum', 'vestibulum'],
      icon: 'done_outline',
    },
    {
      id: 32,
      start: '2023-07-19',
      end: '2023-07-22',
      description:
        'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
      short_description: 'eu massa donec dapibus duis at velit eu est',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'lorem ipsum dolor',
      title: 'Professor Beware',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Terri',
      user_last_name: 'Gutman',
      user_email: 'tgutmanv@tinyurl.com',
      tags: ['orci', 'eget'],
      icon: 'done_outline',
    },
    {
      id: 33,
      start: '2024-12-15',
      end: '2024-12-18',
      description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
      short_description: 'metus sapien ut nunc vestibulum ante ipsum primis in',
      type: 'active',
      related_to: ['task1'],
      decision: 'vulputate ut ultrices',
      title: 'Story of Marie and Julien, The (Histoire de Marie et Julien)',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Rafa',
      user_last_name: 'Aleveque',
      user_email: 'ralevequew@sfgate.com',
      tags: ['est', 'risus', 'auctor', 'sed', 'tristique'],
      icon: 'editor_choice',
    },
    {
      id: 34,
      start: '2022-05-01',
      end: '2022-05-01',
      description:
        'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
      short_description:
        'magna vulputate luctus cum sociis natoque penatibus et magnis',
      type: 'pending',
      related_to: ['task1'],
      decision: 'praesent lectus vestibulum',
      title: 'Land That Time Forgot, The',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ewart',
      user_last_name: 'Blondell',
      user_email: 'eblondellx@omniture.com',
      tags: ['curabitur', 'in'],
      icon: 'change_circle',
    },
    {
      id: 35,
      start: '2022-02-03',
      end: '2022-02-05',
      description:
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
      short_description: 'in quis justo maecenas rhoncus aliquam',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'sem duis',
      title: 'Rich, Young and Pretty',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Marnia',
      user_last_name: 'Klejin',
      user_email: 'mklejiny@columbia.edu',
      tags: ['cubilia'],
      icon: 'done_outline',
    },
    {
      id: 36,
      start: '2026-05-20',
      end: '2026-05-21',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      short_description: 'aenean lectus pellentesque eget',
      type: 'done',
      related_to: ['task1'],
      decision: 'nisi',
      title: 'Princess and the Warrior, The (Krieger und die Kaiserin, Der)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Aleta',
      user_last_name: 'Gainor',
      user_email: 'againorz@intel.com',
      tags: ['in', 'felis'],
      icon: 'editor_choice',
    },
    {
      id: 37,
      start: '2025-12-12',
      end: '2025-12-12',
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
      short_description:
        'ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'ac consequat',
      title: 'Tempest, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Tracy',
      user_last_name: 'Bransom',
      user_email: 'tbransom10@guardian.co.uk',
      tags: ['rhoncus'],
      icon: 'keep',
    },
    {
      id: 38,
      start: '2023-09-30',
      end: '2023-09-30',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      short_description:
        'justo aliquam quis turpis eget elit sodales scelerisque',
      type: 'done',
      related_to: ['task1'],
      decision: 'eget orci vehicula',
      title: 'Across the Sea of Time',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Olympia',
      user_last_name: 'Yann',
      user_email: 'oyann11@mapy.cz',
      tags: ['diam'],
      icon: 'keep',
    },
    {
      id: 39,
      start: '2023-04-29',
      end: '2023-05-02',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description: 'nulla ac enim in',
      type: 'done',
      related_to: ['task1'],
      decision: 'sed lacus morbi',
      title: 'Monsters vs. Aliens',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Analiese',
      user_last_name: 'Slevin',
      user_email: 'aslevin12@rambler.ru',
      tags: ['et'],
      icon: 'task_alt',
    },
    {
      id: 40,
      start: '2022-12-07',
      end: '2022-12-10',
      description:
        'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
      short_description: 'turpis nec euismod scelerisque',
      type: 'active',
      related_to: ['task3'],
      decision: 'proin interdum',
      title: 'Darkest Night',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Latrina',
      user_last_name: 'Giraudoux',
      user_email: 'lgiraudoux13@bravesites.com',
      tags: ['sociis', 'natoque', 'penatibus', 'et'],
      icon: 'editor_choice',
    },
    {
      id: 41,
      start: '2022-07-18',
      end: '2022-07-19',
      description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      short_description: 'quis orci nullam molestie nibh',
      type: 'under_review',
      related_to: ['task2'],
      decision: 'amet',
      title: 'S.O.S. Coast Guard',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Nikos',
      user_last_name: 'Diego',
      user_email: 'ndiego14@alexa.com',
      tags: ['tortor', 'quis', 'turpis', 'sed'],
      icon: 'keep',
    },
    {
      id: 42,
      start: '2022-10-07',
      end: '2022-10-07',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      short_description: 'massa quis augue luctus tincidunt',
      type: 'active',
      related_to: ['task3'],
      decision: 'lectus',
      title: '5 Broken Cameras',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Blithe',
      user_last_name: 'Seldner',
      user_email: 'bseldner15@illinois.edu',
      tags: ['morbi'],
      icon: 'change_circle',
    },
    {
      id: 43,
      start: '2023-03-02',
      end: '2023-03-04',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description: 'eleifend donec ut dolor morbi vel lectus',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'sem duis',
      title: 'Electra Glide in Blue',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Teddie',
      user_last_name: 'Tottie',
      user_email: 'ttottie16@moonfruit.com',
      tags: ['hendrerit', 'at', 'vulputate', 'vitae', 'nisl'],
      icon: 'task_alt',
    },
    {
      id: 44,
      start: '2023-07-05',
      end: '2023-07-07',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      short_description: 'non lectus aliquam sit amet diam',
      type: 'pending',
      related_to: ['task1'],
      decision: 'diam',
      title: 'Freeze Me',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Florrie',
      user_last_name: 'Queyos',
      user_email: 'fqueyos17@delicious.com',
      tags: ['massa', 'tempor', 'convallis'],
      icon: 'keep',
    },
    {
      id: 45,
      start: '2022-03-11',
      end: '2022-03-14',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
      short_description:
        'leo maecenas pulvinar lobortis est phasellus sit amet erat',
      type: 'pending',
      related_to: ['task1'],
      decision: 'etiam',
      title: "Hail Mary ('Je vous salue, Marie')",
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Antone',
      user_last_name: 'Wilden',
      user_email: 'awilden18@squidoo.com',
      tags: ['ullamcorper', 'augue'],
      icon: 'keep',
    },
    {
      id: 46,
      start: '2023-10-23',
      end: '2023-10-26',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      short_description: 'dictumst morbi vestibulum velit id pretium iaculis',
      type: 'under_review',
      related_to: ['task4'],
      decision: 'tellus semper interdum',
      title: 'Bandits',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Adara',
      user_last_name: 'Mattecot',
      user_email: 'amattecot19@merriam-webster.com',
      tags: ['pharetra', 'magna', 'vestibulum'],
      icon: 'task_alt',
    },
    {
      id: 47,
      start: '2023-09-23',
      end: '2023-09-24',
      description:
        'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
      short_description:
        'orci vehicula condimentum curabitur in libero ut massa volutpat convallis',
      type: 'active',
      related_to: ['task1'],
      decision: 'in',
      title: 'Catching Hell',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Frasquito',
      user_last_name: 'Barratt',
      user_email: 'fbarratt1a@quantcast.com',
      tags: ['diam', 'neque'],
      icon: 'change_circle',
    },
    {
      id: 48,
      start: '2024-11-30',
      end: '2024-12-01',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      short_description: 'in blandit ultrices enim lorem ipsum dolor sit',
      type: 'done',
      related_to: ['task3'],
      decision: 'nullam molestie nibh',
      title: 'Passing Strange',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Davidson',
      user_last_name: 'McGilvary',
      user_email: 'dmcgilvary1b@multiply.com',
      tags: ['ac', 'enim', 'in', 'tempor', 'turpis'],
      icon: 'done_outline',
    },
    {
      id: 49,
      start: '2023-10-02',
      end: '2023-10-02',
      description:
        'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      short_description:
        'ultrices aliquet maecenas leo odio condimentum id luctus',
      type: 'active',
      related_to: ['task2'],
      decision: 'et ultrices posuere',
      title: 'Scenes from the Class Struggle in Beverly Hills',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Lorens',
      user_last_name: 'Oxenbury',
      user_email: 'loxenbury1c@reference.com',
      tags: ['consequat', 'varius', 'integer', 'ac', 'leo'],
      icon: 'task_alt',
    },
    {
      id: 50,
      start: '2025-10-18',
      end: '2025-10-20',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      short_description: 'rutrum neque aenean auctor gravida',
      type: 'pending',
      related_to: ['task3'],
      decision: 'semper',
      title: 'Das Lied in mir',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Alexina',
      user_last_name: 'Flinn',
      user_email: 'aflinn1d@sina.com.cn',
      tags: ['interdum', 'mauris', 'ullamcorper', 'purus', 'sit'],
      icon: 'editor_choice',
    },
    {
      id: 51,
      start: '2024-01-19',
      end: '2024-01-22',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description:
        'praesent blandit nam nulla integer pede justo lacinia',
      type: 'done',
      related_to: ['task1'],
      decision: 'pellentesque quisque',
      title: 'Light at the Edge of the World, The',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Sarah',
      user_last_name: 'Shillington',
      user_email: 'sshillington1e@goodreads.com',
      tags: ['orci', 'luctus', 'et'],
      icon: 'task_alt',
    },
    {
      id: 52,
      start: '2025-02-05',
      end: '2025-02-08',
      description:
        'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      short_description:
        'leo pellentesque ultrices mattis odio donec vitae nisi nam',
      type: 'under_review',
      related_to: ['task1'],
      decision: 'habitasse',
      title: 'Go for Zucker! (Alles auf Zucker!)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Dusty',
      user_last_name: 'Allicock',
      user_email: 'dallicock1f@mapy.cz',
      tags: ['morbi', 'non', 'quam', 'nec'],
      icon: 'done_outline',
    },
    {
      id: 53,
      start: '2022-12-10',
      end: '2022-12-11',
      description:
        'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
      short_description: 'eu felis fusce posuere felis sed lacus morbi',
      type: 'pending',
      related_to: ['task4'],
      decision: 'amet eleifend',
      title: 'Long, Long Trailer, The',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Carlyn',
      user_last_name: 'Blaase',
      user_email: 'cblaase1g@360.cn',
      tags: ['suspendisse'],
      icon: 'editor_choice',
    },
    {
      id: 54,
      start: '2022-12-04',
      end: '2022-12-04',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description: 'vel nisl duis ac',
      type: 'under_review',
      related_to: ['task4'],
      decision: 'libero nam',
      title: 'Visitor, The (Muukalainen)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Vittorio',
      user_last_name: 'Morgan',
      user_email: 'vmorgan1h@princeton.edu',
      tags: ['vivamus', 'vestibulum', 'sagittis'],
      icon: 'editor_choice',
    },
    {
      id: 55,
      start: '2022-01-13',
      end: '2022-01-14',
      description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      short_description:
        'praesent blandit lacinia erat vestibulum sed magna at',
      type: 'pending',
      related_to: ['task4'],
      decision: 'diam id ornare',
      title: 'Paradise',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Casper',
      user_last_name: 'Darco',
      user_email: 'cdarco1i@purevolume.com',
      tags: ['mauris', 'laoreet', 'ut', 'rhoncus'],
      icon: 'keep',
    },
    {
      id: 56,
      start: '2024-12-12',
      end: '2024-12-13',
      description:
        'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      short_description: 'etiam justo etiam pretium',
      type: 'pending',
      related_to: ['task1'],
      decision: 'tincidunt',
      title: 'Jack and Diane',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Linn',
      user_last_name: 'Salasar',
      user_email: 'lsalasar1j@wordpress.org',
      tags: ['amet', 'eros'],
      icon: 'keep',
    },
    {
      id: 57,
      start: '2024-12-29',
      end: '2024-12-30',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      short_description:
        'scelerisque quam turpis adipiscing lorem vitae mattis nibh',
      type: 'active',
      related_to: ['task3'],
      decision: 'ultrices enim lorem',
      title: 'Misérables, Les',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Bonnee',
      user_last_name: 'Hudd',
      user_email: 'bhudd1k@java.com',
      tags: ['eget', 'orci', 'vehicula', 'condimentum', 'curabitur'],
      icon: 'done_outline',
    },
    {
      id: 58,
      start: '2022-02-18',
      end: '2022-02-18',
      description:
        'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      short_description:
        'sit amet diam in magna bibendum imperdiet nullam orci pede',
      type: 'done',
      related_to: ['task4'],
      decision: 'in ante',
      title: "18 Years Old and Rising (J'aime regarder les filles)",
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Rube',
      user_last_name: 'Gaydon',
      user_email: 'rgaydon1l@marketwatch.com',
      tags: ['felis', 'sed', 'interdum', 'venenatis'],
      icon: 'task_alt',
    },
    {
      id: 59,
      start: '2026-07-04',
      end: '2026-07-04',
      description:
        'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      short_description: 'nulla neque libero convallis eget',
      type: 'under_review',
      related_to: ['task1'],
      decision: 'cubilia',
      title: 'Dirty Story',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Lowell',
      user_last_name: 'Tissiman',
      user_email: 'ltissiman1m@liveinternet.ru',
      tags: ['convallis', 'nulla', 'neque'],
      icon: 'change_circle',
    },
    {
      id: 60,
      start: '2023-02-14',
      end: '2023-02-16',
      description:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      short_description: 'ac leo pellentesque ultrices mattis odio donec vitae',
      type: 'done',
      related_to: ['task1'],
      decision: 'suscipit',
      title: 'Dirty Dozen, The: The Fatal Mission',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Andriette',
      user_last_name: 'Emberson',
      user_email: 'aemberson1n@vkontakte.ru',
      tags: ['aliquam'],
      icon: 'change_circle',
    },
    {
      id: 61,
      start: '2026-07-01',
      end: '2026-07-02',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      short_description: 'eleifend luctus ultricies eu nibh quisque id justo',
      type: 'done',
      related_to: ['task2'],
      decision: 'sapien',
      title: "It's All Gone Pete Tong",
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Dora',
      user_last_name: 'Leades',
      user_email: 'dleades1o@usda.gov',
      tags: ['vestibulum', 'velit', 'id', 'pretium', 'iaculis'],
      icon: 'keep',
    },
    {
      id: 62,
      start: '2025-05-16',
      end: '2025-05-16',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      short_description:
        'ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
      type: 'pending',
      related_to: ['task2'],
      decision: 'cubilia curae mauris',
      title: 'Annie Oakley',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Stanleigh',
      user_last_name: 'Brocklesby',
      user_email: 'sbrocklesby1p@barnesandnoble.com',
      tags: ['nec', 'euismod', 'scelerisque', 'quam', 'turpis'],
      icon: 'editor_choice',
    },
    {
      id: 63,
      start: '2022-10-03',
      end: '2022-10-05',
      description:
        'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      short_description: 'platea dictumst etiam faucibus cursus urna',
      type: 'done',
      related_to: ['task3'],
      decision: 'ultrices',
      title: 'Poison Ivy',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Cally',
      user_last_name: 'Whybrow',
      user_email: 'cwhybrow1q@issuu.com',
      tags: ['libero', 'nullam', 'sit', 'amet', 'turpis'],
      icon: 'keep',
    },
    {
      id: 64,
      start: '2023-04-09',
      end: '2023-04-09',
      description:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      short_description:
        'praesent blandit nam nulla integer pede justo lacinia',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'in sapien',
      title: 'Bandslam',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Leia',
      user_last_name: 'Edgson',
      user_email: 'ledgson1r@canalblog.com',
      tags: ['in', 'congue', 'etiam'],
      icon: 'keep',
    },
    {
      id: 65,
      start: '2023-04-14',
      end: '2023-04-15',
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
      short_description: 'etiam vel augue vestibulum rutrum',
      type: 'pending',
      related_to: ['task3'],
      decision: 'tempus',
      title: 'Hippie Masala - Forever in India',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Thaddus',
      user_last_name: 'Bathurst',
      user_email: 'tbathurst1s@trellian.com',
      tags: ['sapien', 'quis', 'libero', 'nullam', 'sit'],
      icon: 'task_alt',
    },
    {
      id: 66,
      start: '2022-04-19',
      end: '2022-04-21',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      short_description: 'vestibulum sed magna at nunc commodo',
      type: 'active',
      related_to: ['task4'],
      decision: 'ultrices enim',
      title: 'Canvas',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Lutero',
      user_last_name: 'Neno',
      user_email: 'lneno1t@youtube.com',
      tags: ['habitasse'],
      icon: 'task_alt',
    },
    {
      id: 67,
      start: '2025-05-15',
      end: '2025-05-16',
      description:
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      short_description:
        'orci luctus et ultrices posuere cubilia curae nulla dapibus dolor',
      type: 'done',
      related_to: ['task4'],
      decision: 'morbi odio',
      title: "What's the Worst That Could Happen?",
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Alexio',
      user_last_name: 'Abeles',
      user_email: 'aabeles1u@clickbank.net',
      tags: ['cursus', 'id', 'turpis', 'integer', 'aliquet'],
      icon: 'keep',
    },
    {
      id: 68,
      start: '2023-11-02',
      end: '2023-11-02',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'at nulla suspendisse potenti cras in',
      type: 'done',
      related_to: ['task3'],
      decision: 'iaculis',
      title: 'Batman',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Sylas',
      user_last_name: 'Proffer',
      user_email: 'sproffer1v@drupal.org',
      tags: ['sed', 'interdum', 'venenatis', 'turpis', 'enim'],
      icon: 'done_outline',
    },
    {
      id: 69,
      start: '2025-07-27',
      end: '2025-07-30',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description: 'neque vestibulum eget vulputate ut',
      type: 'done',
      related_to: ['task3'],
      decision: 'nam',
      title: 'Cheerleader Camp',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Halette',
      user_last_name: 'Smeeth',
      user_email: 'hsmeeth1w@washington.edu',
      tags: ['nisl'],
      icon: 'keep',
    },
    {
      id: 70,
      start: '2024-01-15',
      end: '2024-01-17',
      description:
        'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
      short_description: 'varius ut blandit non interdum in',
      type: 'pending',
      related_to: ['task2'],
      decision: 'rutrum nulla',
      title: 'Hoffman',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Christine',
      user_last_name: 'Dunguy',
      user_email: 'cdunguy1x@mapquest.com',
      tags: ['sapien', 'cursus'],
      icon: 'done_outline',
    },
    {
      id: 71,
      start: '2023-11-03',
      end: '2023-11-04',
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
      short_description: 'ultrices posuere cubilia curae mauris viverra',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'id luctus nec',
      title: 'Ladder 49',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Bambie',
      user_last_name: 'Keam',
      user_email: 'bkeam1y@nhs.uk',
      tags: ['vitae', 'quam', 'suspendisse', 'potenti'],
      icon: 'editor_choice',
    },
    {
      id: 72,
      start: '2024-09-04',
      end: '2024-09-06',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'est lacinia nisi',
      type: 'pending',
      related_to: ['task4'],
      decision: 'id consequat',
      title: 'My Wrongs 8245-8249 and 117',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Graehme',
      user_last_name: 'McEwen',
      user_email: 'gmcewen1z@tinyurl.com',
      tags: ['pede'],
      icon: 'editor_choice',
    },
    {
      id: 73,
      start: '2025-04-03',
      end: '2025-04-05',
      description:
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      short_description: 'phasellus id sapien in sapien iaculis',
      type: 'active',
      related_to: ['task3'],
      decision: 'dolor vel est',
      title: 'Elsa & Fred',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Saw',
      user_last_name: 'Poznan',
      user_email: 'spoznan20@utexas.edu',
      tags: ['sem'],
      icon: 'task_alt',
    },
    {
      id: 74,
      start: '2025-04-22',
      end: '2025-04-24',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      short_description: 'placerat ante nulla justo aliquam quis turpis',
      type: 'done',
      related_to: ['task1'],
      decision: 'in porttitor pede',
      title: 'Direct Contact',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Skye',
      user_last_name: 'Colliss',
      user_email: 'scolliss21@unicef.org',
      tags: ['fusce', 'lacus', 'purus', 'aliquet'],
      icon: 'editor_choice',
    },
    {
      id: 75,
      start: '2023-01-22',
      end: '2023-01-23',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      short_description: 'erat eros viverra eget congue eget semper rutrum',
      type: 'pending',
      related_to: ['task1'],
      decision: 'pharetra',
      title: 'Career',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Kata',
      user_last_name: 'Swanwick',
      user_email: 'kswanwick22@fotki.com',
      tags: ['at', 'turpis', 'donec'],
      icon: 'done_outline',
    },
    {
      id: 76,
      start: '2026-08-11',
      end: '2026-08-11',
      description:
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      short_description: 'hac habitasse platea dictumst',
      type: 'pending',
      related_to: ['task3'],
      decision: 'sem',
      title: 'After Five in the Jungle (Nach Fünf im Urwald)',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Harri',
      user_last_name: 'Caldayrou',
      user_email: 'hcaldayrou23@latimes.com',
      tags: ['amet', 'erat', 'nulla'],
      icon: 'keep',
    },
    {
      id: 77,
      start: '2023-01-10',
      end: '2023-01-11',
      description:
        'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      short_description: 'tempus vivamus in felis',
      type: 'under_review',
      related_to: ['task1'],
      decision: 'massa',
      title: 'Sayonara',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Jobyna',
      user_last_name: 'Prayer',
      user_email: 'jprayer24@gravatar.com',
      tags: ['lacus', 'at', 'turpis', 'donec'],
      icon: 'task_alt',
    },
    {
      id: 78,
      start: '2023-08-13',
      end: '2023-08-14',
      description:
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
      short_description: 'diam vitae quam suspendisse potenti nullam',
      type: 'under_review',
      related_to: ['task4'],
      decision: 'congue',
      title: 'Stars Look Down, The',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Hali',
      user_last_name: 'Le Sarr',
      user_email: 'hlesarr25@freewebs.com',
      tags: ['ultrices', 'posuere', 'cubilia', 'curae', 'duis'],
      icon: 'task_alt',
    },
    {
      id: 79,
      start: '2026-11-02',
      end: '2026-11-04',
      description:
        'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      short_description: 'nonummy maecenas tincidunt lacus at',
      type: 'done',
      related_to: ['task3'],
      decision: 'blandit',
      title: 'Glee: The 3D Concert Movie',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Alexi',
      user_last_name: 'Laffling',
      user_email: 'alaffling26@typepad.com',
      tags: ['iaculis', 'diam', 'erat', 'fermentum'],
      icon: 'done_outline',
    },
    {
      id: 80,
      start: '2025-01-02',
      end: '2025-01-04',
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
      short_description: 'leo maecenas pulvinar lobortis est',
      type: 'pending',
      related_to: ['task1'],
      decision: 'cursus vestibulum',
      title: 'Immigrants (L.A. Dolce Vita)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Lauree',
      user_last_name: 'Murfin',
      user_email: 'lmurfin27@imgur.com',
      tags: ['nec', 'euismod', 'scelerisque', 'quam', 'turpis'],
      icon: 'change_circle',
    },
    {
      id: 81,
      start: '2023-12-01',
      end: '2023-12-03',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
      short_description: 'porttitor id consequat in',
      type: 'done',
      related_to: ['task4'],
      decision: 'orci',
      title: 'Cops',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Giana',
      user_last_name: 'George',
      user_email: 'ggeorge28@ebay.co.uk',
      tags: ['lacus', 'at'],
      icon: 'done_outline',
    },
    {
      id: 82,
      start: '2026-09-26',
      end: '2026-09-28',
      description:
        'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      short_description: 'potenti in eleifend quam a odio in',
      type: 'active',
      related_to: ['task3'],
      decision: 'volutpat',
      title: 'Return of the Living Dead: Necropolis',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Suzanne',
      user_last_name: 'Quartley',
      user_email: 'squartley29@imgur.com',
      tags: ['nulla'],
      icon: 'editor_choice',
    },
    {
      id: 83,
      start: '2022-08-29',
      end: '2022-08-29',
      description:
        'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
      short_description: 'convallis nulla neque libero convallis eget eleifend',
      type: 'under_review',
      related_to: ['task2'],
      decision: 'quam pharetra magna',
      title: 'Major and the Minor, The',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Kilian',
      user_last_name: 'Arundel',
      user_email: 'karundel2a@china.com.cn',
      tags: ['vestibulum'],
      icon: 'keep',
    },
    {
      id: 84,
      start: '2023-04-13',
      end: '2023-04-13',
      description:
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
      short_description:
        'eget eleifend luctus ultricies eu nibh quisque id justo',
      type: 'under_review',
      related_to: ['task2'],
      decision: 'orci vehicula',
      title: 'Night Porter, The (Portiere di notte, Il)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Mindy',
      user_last_name: 'Whale',
      user_email: 'mwhale2b@squidoo.com',
      tags: ['eu'],
      icon: 'keep',
    },
    {
      id: 85,
      start: '2022-01-12',
      end: '2022-01-13',
      description:
        'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      short_description: 'venenatis non sodales sed',
      type: 'pending',
      related_to: ['task4'],
      decision: 'vestibulum ante ipsum',
      title: 'Houdini',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Hesther',
      user_last_name: 'De Mars',
      user_email: 'hdemars2c@nps.gov',
      tags: ['venenatis', 'tristique'],
      icon: 'done_outline',
    },
    {
      id: 86,
      start: '2024-09-14',
      end: '2024-09-17',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description:
        'congue vivamus metus arcu adipiscing molestie hendrerit at',
      type: 'pending',
      related_to: ['task3'],
      decision: 'lobortis',
      title: 'Teenage',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Francis',
      user_last_name: 'Daggett',
      user_email: 'fdaggett2d@wiley.com',
      tags: ['velit', 'nec', 'nisi', 'vulputate'],
      icon: 'keep',
    },
    {
      id: 87,
      start: '2023-02-12',
      end: '2023-02-13',
      description:
        'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
      short_description: 'nulla sed accumsan felis ut at dolor',
      type: 'under_review',
      related_to: ['task3'],
      decision: 'sapien non mi',
      title: 'Goods: Live Hard, Sell Hard, The',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Orv',
      user_last_name: 'Brecon',
      user_email: 'obrecon2e@yolasite.com',
      tags: ['curabitur', 'convallis', 'duis', 'consequat'],
      icon: 'editor_choice',
    },
    {
      id: 88,
      start: '2024-03-08',
      end: '2024-03-11',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      short_description: 'felis fusce posuere felis sed',
      type: 'done',
      related_to: ['task1'],
      decision: 'libero nullam',
      title: 'Black Moon Rising',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Claire',
      user_last_name: 'Rowlson',
      user_email: 'crowlson2f@icio.us',
      tags: ['in', 'hac', 'habitasse'],
      icon: 'change_circle',
    },
    {
      id: 89,
      start: '2026-07-29',
      end: '2026-07-31',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      short_description: 'suspendisse potenti cras in',
      type: 'active',
      related_to: ['task3'],
      decision: 'in',
      title: 'Crazy on the Outside',
      image: 'http://dummyimage.com/1000x1000.png/dddddd/000000',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ruggiero',
      user_last_name: 'Filipponi',
      user_email: 'rfilipponi2g@google.com',
      tags: ['magna', 'at', 'nunc'],
      icon: 'change_circle',
    },
    {
      id: 90,
      start: '2023-02-19',
      end: '2023-02-21',
      description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
      short_description: 'non interdum in ante vestibulum ante',
      type: 'active',
      related_to: ['task4'],
      decision: 'justo aliquam quis',
      title: 'Dark Island',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Vaclav',
      user_last_name: 'Barstock',
      user_email: 'vbarstock2h@google.de',
      tags: ['et', 'ultrices', 'posuere', 'cubilia'],
      icon: 'keep',
    },
    {
      id: 91,
      start: '2023-05-11',
      end: '2023-05-13',
      description:
        'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
      short_description: 'tempus sit amet sem fusce',
      type: 'done',
      related_to: ['task3'],
      decision: 'in congue',
      title: 'American Revolutionary: The Evolution of Grace Lee Boggs',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Athena',
      user_last_name: 'Mirfin',
      user_email: 'amirfin2i@vimeo.com',
      tags: ['magna'],
      icon: 'task_alt',
    },
    {
      id: 92,
      start: '2023-02-04',
      end: '2023-02-04',
      description:
        'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
      short_description: 'ut erat curabitur gravida nisi',
      type: 'pending',
      related_to: ['task1'],
      decision: 'nam dui proin',
      title: 'Nine to Five (a.k.a. 9 to 5)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Bettye',
      user_last_name: 'Neate',
      user_email: 'bneate2j@yolasite.com',
      tags: ['quis', 'orci', 'nullam', 'molestie'],
      icon: 'change_circle',
    },
    {
      id: 93,
      start: '2026-03-26',
      end: '2026-03-27',
      description:
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
      short_description: 'neque vestibulum eget',
      type: 'done',
      related_to: ['task2'],
      decision: 'blandit nam nulla',
      title: 'The Winslow Boy',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Jody',
      user_last_name: 'Absolon',
      user_email: 'jabsolon2k@tumblr.com',
      tags: ['commodo', 'placerat', 'praesent'],
      icon: 'done_outline',
    },
    {
      id: 94,
      start: '2024-01-01',
      end: '2024-01-03',
      description:
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
      short_description: 'orci mauris lacinia sapien quis libero nullam',
      type: 'done',
      related_to: ['task2'],
      decision: 'convallis duis consequat',
      title: 'Inspector Bellamy (Bellamy)',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Cathrin',
      user_last_name: 'Ringrose',
      user_email: 'cringrose2l@hud.gov',
      tags: ['pellentesque', 'at', 'nulla', 'suspendisse', 'potenti'],
      icon: 'task_alt',
    },
    {
      id: 95,
      start: '2025-02-27',
      end: '2025-03-01',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      short_description: 'nec sem duis',
      type: 'pending',
      related_to: ['task4'],
      decision: 'dapibus dolor',
      title:
        'Babylon 5: The Legend of the Rangers: To Live and Die in Starlight',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Nerty',
      user_last_name: 'Maudlen',
      user_email: 'nmaudlen2m@technorati.com',
      tags: ['dui'],
      icon: 'editor_choice',
    },
    {
      id: 96,
      start: '2025-08-15',
      end: '2025-08-15',
      description:
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      short_description: 'interdum mauris ullamcorper purus sit amet',
      type: 'active',
      related_to: ['task1'],
      decision: 'congue',
      title: 'Steamboy (Suchîmubôi)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Colin',
      user_last_name: 'Szymanski',
      user_email: 'cszymanski2n@ycombinator.com',
      tags: ['et', 'magnis', 'dis'],
      icon: 'task_alt',
    },
    {
      id: 97,
      start: '2026-02-25',
      end: '2026-02-25',
      description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      short_description: 'nisl duis ac nibh fusce lacus',
      type: 'active',
      related_to: ['task2'],
      decision: 'ante vivamus',
      title: 'Soup to Nuts',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Vale',
      user_last_name: 'Hopkynson',
      user_email: 'vhopkynson2o@miitbeian.gov.cn',
      tags: ['ante', 'ipsum'],
      icon: 'done_outline',
    },
    {
      id: 98,
      start: '2026-04-23',
      end: '2026-04-23',
      description:
        'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
      short_description:
        'eget tincidunt eget tempus vel pede morbi porttitor lorem id',
      type: 'pending',
      related_to: ['task4'],
      decision: 'ante',
      title: 'Inescapable',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Gerta',
      user_last_name: 'Guirardin',
      user_email: 'gguirardin2p@github.io',
      tags: ['congue', 'eget', 'semper', 'rutrum', 'nulla'],
      icon: 'change_circle',
    },
    {
      id: 99,
      start: '2024-06-20',
      end: '2024-06-20',
      description:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      short_description: 'dolor vel est donec',
      type: 'pending',
      related_to: ['task4'],
      decision: 'adipiscing molestie hendrerit',
      title: 'Just Like Us',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/cc0000/ffffff',
      user_first_name: 'Lin',
      user_last_name: 'Keasy',
      user_email: 'lkeasy2q@fotki.com',
      tags: ['eros', 'suspendisse', 'accumsan'],
      icon: 'editor_choice',
    },
    {
      id: 100,
      start: '2025-07-12',
      end: '2025-07-14',
      description:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      short_description:
        'vivamus vestibulum sagittis sapien cum sociis natoque penatibus',
      type: 'done',
      related_to: ['task1'],
      decision: 'eu interdum eu',
      title: 'Armageddon',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Kissiah',
      user_last_name: 'Veasey',
      user_email: 'kveasey2r@biglobe.ne.jp',
      tags: ['tellus', 'in', 'sagittis'],
      icon: 'change_circle',
    },
  ];

  chatBarValue = '';
  handleChatBarChange(value: string) {
    this.chatBarValue = value;
  }

  isLoading = model<boolean>();
  currentBot = model<IBotType>();

  handleIsLoadingChange(): void {
    setTimeout(() => {
      this.isLoading.update((value) => !value);
    }, 1000);
  }

  handleCurrentBotChange(): void {}

  handleSendMessage(message: string): void {
    console.log('handleSendMessage', message);
  }

  // addEvent() {
  //   const title = timelineEvents[Math.floor(Math.random() * 5)].title;
  //   const content = timelineEvents[Math.floor(Math.random() * 5)].description;
  //   const date = DateTime.now();
  //   const start = date.toISO();
  //   const end = date.plus({ hours: 1 }).toISO();
  //   const eventTypes: IBmbEventType[] = ['academic', 'life', 'events'];
  //   const modalTitle = timelineEvents[Math.floor(Math.random() * 5)].related_to;
  //   const status = 'En progreso';

  //   this.calendarEventsSignal.addevent({
  //     title,
  //     detail: content,
  //     start,
  //     end,
  //     type: eventTypes[Math.floor(Math.random() * 2)],
  //     modalTitle,
  //     status,
  //   });

  //   this.notificationSignal.addNotification({
  //     title: 'Event added succesfully',
  //     subTitle: title,
  //     icon: 'info',
  //     type: 'info',
  //     appName: 'TEC',
  //     isFullColor: false,
  //   });
  // }

  getNotifications() {
    return this.notificationSignal.getNotificationList();
  }

  handleLoading() {
    this.calendarEventsSignal.setIsLoading(
      !this.calendarEventsSignal.getIsLoading(),
    );
  }

  auth(data: unknown): boolean {
    data;
    return true;
  }

  toTPCode(data: unknown): boolean {
    return data === '123456';
  }

  biometricData(): boolean {
    return true;
  }

  activate(): boolean {
    return true;
  }

  getUserInfo(data: unknown): IBmbUserInfo {
    data;
    return {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture: '../assets/images/placeholders/user-icon-test.svg',
    };
  }

  init(): void {
    console.log('init');
  }

  handleRequest(event: IBmbLoginOnboarding): void {
    const { data, action, callback } = event;

    switch (action) {
      case 'auth':
        setTimeout(() => {
          callback(this.auth(data));
        }, 1000);
        break;
      case 'toTP':
        callback(this.toTPCode(data));
        break;
      case 'biometric':
        callback(this.biometricData());
        break;
      case 'activate':
        callback(this.activate());
        break;
      case 'getUserInfo':
        callback(this.getUserInfo(data));
        break;
      case 'init':
        setTimeout(() => {
          callback(this.init());
        }, 1000);
        break;
      default:
        console.log('Invalid action');
    }
  }

  logSelection(name: string, event: unknown): void {
    console.log('logSelection', name, '-', event);
  }

  getDataTopBar(): IBmbDataTopBar[] {
    return [
      { text: 'Breadcrumb 1', link: '/' },
      { text: 'Breadcrumb 2', link: '/emprendedor' },
      { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
    ];
  }

  getGrades(): IBmbGrades[] {
    return [
      {
        title: 'Calificaciones 2022',
        subtitle: 'Semestrales 2022',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Calificaciones 2023',
        subtitle: 'Semestrales 2023',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y  2023',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1  2023',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z  2023 ',
              subtitle: 'Z materias acreditadas  2023',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2  2023',
                  subtitle: 'TC-100000  2023',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2  2023',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3  2023',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }

  closeGrades(): void {
    alert('Close grades');
  }

  isFullScreen = false;

  handleButtonSelection() {
    this.isFullScreen = !this.isFullScreen;
  }

  currentTemplate: IBmbMobileTemplateName = 'single-header';

  onTemplateChange(template: IBmbMobileTemplateName) {
    this.currentTemplate = template;
  }

  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'north_east',
      action: () => {},
    },
  ];

  actionHeadersB: IBmbActionHeader[] = [
    {
      icon: 'fit_screen',
      iconActiveToggle: 'close_fullscreen',
      isToggleActive: false,
      action: () => {},
    },
    {
      icon: 'tune',
      action: () => {},
    },
  ];

  actionHeadersToggle: IBmbActionHeader[] = [
    {
      icon: 'fit_screen',
      iconActiveToggle: 'close_fullscreen',
      isToggleActive: false,
      action: () => {},
    },
  ];

  handleHeaderR(event: unknown) {
    console.log(event);
    alert('Right event');
  }

  handleHeaderL(event: unknown) {
    console.log(event);
    alert('Left event');
  }

  footerActions: IBmbButtonAction[] = [
    {
      title: 'Button A',
      action: () => {
        alert('Action 1');
      },
      icon: 'home',
    },
    {
      title: 'Button B',
      action: () => {
        alert('Action 1');
      },
      type: 'primary',
    },
  ];

  buttonList: IBmbMobileTemplateButton[] = [
    {
      title: 'Title 1',
      target: '_blank',
      link: 'google.com',
      subtitle: 'Subtitle',
      iconLeft: 'home',
    },
    {
      title: 'Title 2',
      link: 'google.com',
      iconLeft: 'home',
    },
  ];

  evaluationRubricList: IBmbEvaluationRubric[] = [
    {
      criterion: 'Criterio Primero',
      tooltip: 'Criterio Primero tooltip',
    },
    {
      criterion: 'Criterio Segundo',
      tooltip: 'Criterio Segundo tooltip',
    },
    {
      criterion: 'Tercer Criterio',
      tooltip: 'Tercer Criterio tooltip',
    },
    {
      criterion: 'Cuarto Criterio',
      tooltip: 'Cuarto Criterio tooltip',
    },
  ];

  commentEvalRubric: IBmbCommentEvalRubric = {
    label: 'Observaciones (Optional)',
    placeHolder: 'Ingresa los puntos a mejorar del skill.',
    tooltip: 'Tool tip',
    showMaxTextLength: false,
  };

  evalRubricButtons: IBmbEvalRubricButtons = {
    rightLabel: 'Aprobar Skill',
    rightIcon: 'check',
    leftLabel: 'Rechazar Skill',
    leftIcon: 'close',
  };

  onClose(event: unknown) {
    alert('Selection: close' + event);
  }

  footerEvent(event: unknown) {
    alert('Selection: ' + event);
  }

  menuEvent(event: unknown) {
    alert('Selection: ' + event);
  }
}
