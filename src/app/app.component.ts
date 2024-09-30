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
  IBmbHeaderAction,
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
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellat veniam necessitatibus.',
    size: 'small',
    type: 'alert',
    alertStyle: 'error',
    primaryBtnLabel: 'Action',
    secondaryBtnLabel: 'Cancel',
    hidePrimaryButton: false,
    scrollable: false,
    primaryAction: () => {
      console.log('primaryAction');
    },
    secondaryAction: () => {
      console.log('secondaryAction');
    },
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

  isFullScreen = false;

  handleButtonSelection() {
    this.isFullScreen = !this.isFullScreen;
  }

  currentTemplate: IBmbMobileTemplateName = 'single-header';

  onTemplateChange(template: IBmbMobileTemplateName) {
    this.currentTemplate = template;
  }

  headerActions: IBmbHeaderAction[] = [
    {
      icon: 'north_east',
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
      start: '24/09/2024',
      end: '28/09/2024',
      title: 'Wirey Spindell',
      image: 'http://dummyimage.com/241x100.png/ff4444/ffffff',
      short_description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'avance_academico',
      instances:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    },
    {
      id: 1,
      start: '27/09/2024',
      end: '27/09/2024',
      title: 'test',
      image: 'http://dummyimage.com/241x100.png/ff4444/ffffff',
      short_description:
        'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
      description:
        'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      type: 'avance_academico',
      instances:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
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
