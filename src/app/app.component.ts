import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
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
} from '../../projects/ds-ng/src/public-api';

import {
  IBmbTab,
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  BmbIconComponent,
} from '../../projects/ds-ng/src/public-api';

export interface Target {
  target: string;
  index: number;
}

import names from './names.json';
import { ModalDataConfig } from '../../projects/ds-ng/src/lib/components/bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';

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
    BmbInputPhoneNumberComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private matDialog: MatDialog,
  ) {}

  myTabs: IBmbTab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

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
  };

  isCalendarLoading = false;
  calendarEvents: IBmbCalendarEvent[] = [
    {
      title: 'Test',
      detail: 'Detail test',
      start: '2024-05-23T15:00:00.715Z',
      end: '2024-05-23T15:30:00.715Z',
    },
    {
      title: 'Test jnsf dkjn jasn kljnsd kljfna klsdj nfklajsndfk lajndksf',
      detail: 'Dkjaskdjjhasbdfjhasbdjkhfbjkahsdbf',
      start: '2024-05-24T15:00:00.715Z',
      end: '2024-05-24T16:00:00.715Z',
    },
  ];

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
    this.matDialog.open(BmbModalComponent, { data: this.data });
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

  async fetchData(event: IBmbCalendarEventClick): Promise<void> {
    console.log(event);
    try {
      this.isCalendarLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } finally {
      this.calendarEvents = [
        {
          title: 'Test',
          detail: 'Detail test',
          start: '2024-05-23T15:00:00.715Z',
          end: '2024-05-23T15:30:00.715Z',
        },
        {
          title: 'Test jnsf dkjn jasn kljnsd kljfna klsdj nfklajsndfk lajndksf',
          detail: 'Dkjaskdjjhasbdfjhasbdjkhfbjkahsdbf',
          start: '2024-05-24T15:00:00.715Z',
          end: '2024-05-24T16:00:00.715Z',
        },
        {
          title: 'Test',
          detail: 'Detail test',
          start: '2024-05-25T22:56:44.715Z',
          end: '2024-05-25T23:56:44.715Z',
        },
      ];
      this.isCalendarLoading = false;
      this.cdr.detectChanges();
    }
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

  //Frequent apps
  apps = [
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
}
