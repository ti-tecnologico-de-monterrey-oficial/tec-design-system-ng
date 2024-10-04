import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  model,
  TemplateRef,
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
  IBmbEventType,
  IBmbApp,
  BmbAccountStatementComponent,
  IBmbButtonAction,
  IBmbMobileTemplateName,
  BmbStepProgressBarComponent,
  IBmbMobileTemplateButton,
  BmbDateRangeComponent,
  IBmbActionHeader,
  BmbFocusElementComponent,
  ITimelineEvent,
} from '../../projects/ds-ng/src/public-api';

export interface Target {
  target: string;
  index: number;
}

import names from './names.json';
import { ModalDataConfig } from '../../projects/ds-ng/src/lib/components/bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';
import timelineEvents from './timelineEvents.json';
import {} from '../../projects/ds-ng/src/lib/components/bmb-home-card-chat/bmb-home-card-chat.component';
import { DateTime } from 'luxon';
import { IBmbGrades } from '../../projects/ds-ng/src/lib/components/bmb-grades/types';
import { BmbBottomNavigationBarComponent } from '../../projects/ds-ng/src/lib/components/bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class AppComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
    private notificationSignal: BmbNotificationService,
    private calendarEventsSignal: BmbCalendarService,
  ) {}

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

  timelineEvents = timelineEvents;

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

  addEvent() {
    const title = timelineEvents[Math.floor(Math.random() * 5)].title;
    const content = timelineEvents[Math.floor(Math.random() * 5)].description;
    const date = DateTime.now();
    const start = date.toISO();
    const end = date.plus({ hours: 1 }).toISO();
    const eventTypes: IBmbEventType[] = ['academic', 'life', 'events'];
    const modalTitle = timelineEvents[Math.floor(Math.random() * 5)].related_to;
    const status = 'En progreso';

    this.calendarEventsSignal.addevent({
      title,
      detail: content,
      start,
      end,
      type: eventTypes[Math.floor(Math.random() * 2)],
      modalTitle,
      status,
    });

    this.notificationSignal.addNotification({
      title: 'Event added succesfully',
      subTitle: title,
      icon: 'info',
      type: 'info',
      appName: 'TEC',
      isFullColor: false,
    });
  }

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

  timestreamEvents: ITimelineEvent[] = [
    {
      id: 1,
      start: '24/04/2024',
      end: '28/04/2024',
      title: 'Wirey Spindell',
      image: 'http://dummyimage.com/241x100.png/ff4444/ffffff',
      short_description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 2,
      start: '24/05/2022',
      end: '27/05/2022',
      title: 'Superman/Batman: Apocalypse',
      image: 'http://dummyimage.com/145x100.png/cc0000/ffffff',
      short_description:
        'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
      description:
        'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 3,
      start: '19/11/2024',
      end: '19/11/2024',
      title: 'Arc',
      image: 'http://dummyimage.com/238x100.png/dddddd/000000',
      short_description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      description:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 4,
      start: '18/09/2020',
      end: '22/09/2020',
      title: 'Talcum Powder',
      image: 'http://dummyimage.com/122x100.png/cc0000/ffffff',
      short_description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 5,
      start: '18/03/2022',
      end: '19/03/2022',
      title: 'Ted',
      image: 'http://dummyimage.com/213x100.png/5fa2dd/ffffff',
      short_description:
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
      description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 6,
      start: '16/01/2024',
      end: '21/01/2024',
      title: 'Smart People',
      image: 'http://dummyimage.com/134x100.png/ff4444/ffffff',
      short_description:
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 7,
      start: '27/12/2024',
      end: '30/12/2024',
      title: 'Bulli: Cooking in Progress, El',
      image: 'http://dummyimage.com/128x100.png/ff4444/ffffff',
      short_description:
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 8,
      start: '24/05/2022',
      end: '27/05/2022',
      title: 'B.T.K.',
      image: 'http://dummyimage.com/108x100.png/ff4444/ffffff',
      short_description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      description:
        'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 9,
      start: '26/04/2021',
      end: '26/04/2021',
      title: "It's Good to Be Alive",
      image: 'http://dummyimage.com/247x100.png/cc0000/ffffff',
      short_description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 11,
      start: '03/05/2021',
      end: '08/05/2021',
      title: 'Eat',
      image: 'http://dummyimage.com/211x100.png/ff4444/ffffff',
      short_description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      description:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 12,
      start: '26/06/2024',
      end: '27/06/2024',
      title: 'Dreams That Money Can Buy',
      image: 'http://dummyimage.com/175x100.png/5fa2dd/ffffff',
      short_description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      description:
        'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 13,
      start: '30/11/2022',
      end: '04/12/2022',
      title: 'Forever, Darling',
      image: 'http://dummyimage.com/189x100.png/ff4444/ffffff',
      short_description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 14,
      start: '05/12/2020',
      end: '10/12/2020',
      title: 'RV',
      image: 'http://dummyimage.com/121x100.png/dddddd/000000',
      short_description:
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      description:
        'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 15,
      start: '09/10/2024',
      end: '12/10/2024',
      title: 'Ruggles of Red Gap',
      image: 'http://dummyimage.com/139x100.png/5fa2dd/ffffff',
      short_description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      description:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
      related_to: ['test'],
    },
    {
      id: 16,
      start: '07/08/2022',
      end: '08/08/2022',
      title: 'Male and Female',
      image: 'http://dummyimage.com/126x100.png/dddddd/000000',
      short_description:
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 18,
      start: '28/01/2020',
      end: '02/02/2020',
      title: 'Tales That Witness Madness',
      image: 'http://dummyimage.com/125x100.png/ff4444/ffffff',
      short_description:
        'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 19,
      start: '15/03/2024',
      end: '17/03/2024',
      title: 'Gypsy 83',
      image: 'http://dummyimage.com/249x100.png/5fa2dd/ffffff',
      short_description:
        'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      description:
        'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 20,
      start: '15/09/2021',
      end: '18/09/2021',
      title: 'Streaks, The (Pregi)',
      image: 'http://dummyimage.com/207x100.png/cc0000/ffffff',
      short_description:
        'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 21,
      start: '24/09/2024',
      end: '25/09/2024',
      title: 'Kippur',
      image: 'http://dummyimage.com/104x100.png/dddddd/000000',
      short_description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 22,
      start: '14/02/2023',
      end: '19/02/2023',
      title: 'Tarzan and His Mate',
      image: 'http://dummyimage.com/219x100.png/dddddd/000000',
      short_description:
        'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 23,
      start: '03/11/2020',
      end: '08/11/2020',
      title: 'Cure, The',
      image: 'http://dummyimage.com/244x100.png/cc0000/ffffff',
      short_description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      description:
        'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 24,
      start: '13/12/2020',
      end: '15/12/2020',
      title: 'Barefoot Contessa, The',
      image: 'http://dummyimage.com/204x100.png/ff4444/ffffff',
      short_description:
        'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
      description:
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 25,
      start: '28/08/2020',
      end: '28/08/2020',
      title: 'Mother Night',
      image: 'http://dummyimage.com/248x100.png/ff4444/ffffff',
      short_description:
        'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      description:
        'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 26,
      start: '09/08/2021',
      end: '12/08/2021',
      title: 'Lonely Villa, The',
      image: 'http://dummyimage.com/138x100.png/cc0000/ffffff',
      short_description:
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 27,
      start: '03/05/2021',
      end: '03/05/2021',
      title: 'Keep Your Distance',
      image: 'http://dummyimage.com/225x100.png/5fa2dd/ffffff',
      short_description:
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 28,
      start: '22/06/2022',
      end: '23/06/2022',
      title: 'Supervixens',
      image: 'http://dummyimage.com/115x100.png/dddddd/000000',
      short_description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 29,
      start: '16/03/2023',
      end: '17/03/2023',
      title: 'Pirate, The',
      image: 'http://dummyimage.com/126x100.png/5fa2dd/ffffff',
      short_description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      description:
        'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 30,
      start: '25/03/2020',
      end: '26/03/2020',
      title: 'Fados',
      image: 'http://dummyimage.com/186x100.png/5fa2dd/ffffff',
      short_description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
      description:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 31,
      start: '29/10/2020',
      end: '02/11/2020',
      title: 'Smashed',
      image: 'http://dummyimage.com/160x100.png/ff4444/ffffff',
      short_description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 32,
      start: '02/04/2020',
      end: '03/04/2020',
      title: 'Boy in Blue, The',
      image: 'http://dummyimage.com/231x100.png/5fa2dd/ffffff',
      short_description:
        'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 33,
      start: '17/09/2024',
      end: '21/09/2024',
      title: 'La Bande du drugstore',
      image: 'http://dummyimage.com/194x100.png/dddddd/000000',
      short_description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
      description:
        'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 34,
      start: '26/07/2021',
      end: '28/07/2021',
      title: 'Hollow Triumph (a.k.a. The Scar)',
      image: 'http://dummyimage.com/122x100.png/cc0000/ffffff',
      short_description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
      description:
        'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 35,
      start: '17/09/2023',
      end: '21/09/2023',
      title: 'Character (Karakter)',
      image: 'http://dummyimage.com/243x100.png/cc0000/ffffff',
      short_description:
        'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
      description:
        'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 36,
      start: '11/10/2021',
      end: '11/10/2021',
      title: 'My Left Eye Sees Ghosts (Ngo joh aan gin diy gwai)',
      image: 'http://dummyimage.com/218x100.png/dddddd/000000',
      short_description:
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
      description:
        'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 37,
      start: '05/04/2021',
      end: '06/04/2021',
      title: 'Deep Crimson (Profundo carmesí)',
      image: 'http://dummyimage.com/108x100.png/cc0000/ffffff',
      short_description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 38,
      start: '22/01/2023',
      end: '27/01/2023',
      title: 'Tom & Viv',
      image: 'http://dummyimage.com/177x100.png/dddddd/000000',
      short_description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 39,
      start: '29/05/2020',
      end: '03/06/2020',
      title: 'The Party',
      image: 'http://dummyimage.com/157x100.png/cc0000/ffffff',
      short_description:
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
      description:
        'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 40,
      start: '06/09/2023',
      end: '11/09/2023',
      title: 'Fallen Idol, The',
      image: 'http://dummyimage.com/207x100.png/cc0000/ffffff',
      short_description:
        'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
      description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 41,
      start: '25/08/2021',
      end: '26/08/2021',
      title: 'Arrested Development Documentary Project, The',
      image: 'http://dummyimage.com/178x100.png/cc0000/ffffff',
      short_description: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 42,
      start: '28/01/2021',
      end: '29/01/2021',
      title: 'Kindred, The',
      image: 'http://dummyimage.com/153x100.png/cc0000/ffffff',
      short_description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      description:
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 43,
      start: '21/12/2020',
      end: '22/12/2020',
      title: 'Django the Bastard (Strangers Gundown, The) (Django il bastardo)',
      image: 'http://dummyimage.com/234x100.png/ff4444/ffffff',
      short_description:
        'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 44,
      start: '26/06/2021',
      end: '27/06/2021',
      title: 'Lord of the Flies',
      image: 'http://dummyimage.com/128x100.png/ff4444/ffffff',
      short_description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
      description:
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 45,
      start: '25/07/2022',
      end: '29/07/2022',
      title: 'Frankie Starlight',
      image: 'http://dummyimage.com/177x100.png/ff4444/ffffff',
      short_description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
      description:
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 46,
      start: '29/01/2022',
      end: '02/02/2022',
      title: 'Monkey Business',
      image: 'http://dummyimage.com/185x100.png/ff4444/ffffff',
      short_description:
        'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      type: 'under_review',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 47,
      start: '22/05/2020',
      end: '25/05/2020',
      title: 'My Big Fat Greek Wedding',
      image: 'http://dummyimage.com/177x100.png/5fa2dd/ffffff',
      short_description:
        'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 48,
      start: '16/03/2023',
      end: '18/03/2023',
      title: 'Santa Clause, The',
      image: 'http://dummyimage.com/233x100.png/5fa2dd/ffffff',
      short_description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
      type: 'active',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 49,
      start: '28/02/2021',
      end: '03/03/2021',
      title: 'Electric Dragon 80.000 V',
      image: 'http://dummyimage.com/129x100.png/cc0000/ffffff',
      short_description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
      type: 'done',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 50,
      start: '01/05/2024',
      end: '01/05/2024',
      title: 'My One and Only',
      image: 'http://dummyimage.com/140x100.png/ff4444/ffffff',
      short_description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
      description:
        'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      type: 'pending',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 51,
      start: '18/01/2022',
      end: '20/01/2022',
      title: 'Some Came Running',
      image: 'http://dummyimage.com/110x100.png/cc0000/ffffff',
      short_description:
        'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      type: 'done',
      icon: 'app_badging',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 52,
      start: '19/09/2022',
      end: '20/09/2022',
      title: 'Journey for Margaret',
      image: 'http://dummyimage.com/189x100.png/dddddd/000000',
      short_description:
        'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      description:
        'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      type: 'pending',
      icon: 'app_badging',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 53,
      start: '16/05/2023',
      end: '20/05/2023',
      title: 'Swing Time',
      image: 'http://dummyimage.com/103x100.png/ff4444/ffffff',
      short_description:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
      description:
        'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
      type: 'done',
      icon: 'app_badging',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 54,
      start: '29/04/2020',
      end: '03/05/2020',
      title: 'By the Light of the Silvery Moon',
      image: 'http://dummyimage.com/118x100.png/dddddd/000000',
      short_description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
      type: 'under_review',
      icon: 'app_badging',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
    {
      id: 1000,
      start: '20/02/2023',
      end: '22/02/2023',
      title: 'Black Pond',
      image: 'http://dummyimage.com/192x100.png/cc0000/ffffff',
      short_description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
      type: 'under_review',
      icon: 'app_badging',
      user_first_name: 'Sioux',
      user_last_name: 'Cadwallader',
      user_email: 'scadwallader0@chron.com',
      picture_profile:
        'https://robohash.org/illumanimidolore.png?size=50x50&set=set1',
    },
  ];

  timestreamNav = [
    {
      text: 'Borem ipsum dolor sit amet 1',
      link: '/',
    },
    {
      text: 'Borem ipsum dolor sit amet 2',
      link: '/emprendedor',
    },
    {
      text: 'Borem ipsum dolor sit amet 3',
      link: '/emprendedor/vivencia',
    },
    {
      text: 'Borem ipsum dolor sit amet 4',
      link: '/emprendedor/vivencia',
    },
    {
      text: 'Borem ipsum dolor sit amet 5',
      link: '/emprendedor/vivencia',
    },
    {
      text: 'Borem ipsum dolor sit amet 6',
      link: '/emprendedor/vivencia',
    },
  ];
}
