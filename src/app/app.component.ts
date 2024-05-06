import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
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
} from '../../projects/ds-ng/src/public-api';

import {
  IBmbTab,
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
} from '../../projects/ds-ng/src/public-api';
export interface Target {
  target: string;
  index: number;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {}

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

  isCalendarLoading = false;
  calendarEvents: IBmbCalendarEvent[] = [
    {
      title: 'Test',
      detail: 'Detail test',
      start: '2024-04-23T15:00:00.715Z',
      end: '2024-04-23T15:30:00.715Z',
    },
    {
      title: 'Test jnsf dkjn jasn kljnsd kljfna klsdj nfklajsndfk lajndksf',
      detail: 'Dkjaskdjjhasbdfjhasbdjkhfbjkahsdbf',
      start: '2024-04-24T15:00:00.715Z',
      end: '2024-04-24T16:00:00.715Z',
    },
  ];

  sidebarElements = [
    {
      icon: 'apps',
      title: 'Titulo 1',
      link: '#',
    },
    {
      icon: 'apps',
      title: 'Titulo 2',
      link: '#',
    },
    {
      icon: 'apps',
      title: 'Titulo 3',
      link: '#',
    },
    {
      icon: 'apps',
      title: 'Titulo 4',
      link: '#',
    },
    {
      icon: 'apps',
      title: 'Titulo 5',
      link: '#',
    },
  ];

  i = 0;

  userInformation = {
    image:
      'https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15-1024x768.jpg',
    name: 'Juan Pedro Sánchez Miranda',
    role: 'Role de usuario',
  };

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
          start: '2024-04-23T15:00:00.715Z',
          end: '2024-04-23T15:30:00.715Z',
        },
        {
          title: 'Test jnsf dkjn jasn kljnsd kljfna klsdj nfklajsndfk lajndksf',
          detail: 'Dkjaskdjjhasbdfjhasbdjkhfbjkahsdbf',
          start: '2024-04-24T15:00:00.715Z',
          end: '2024-04-24T16:00:00.715Z',
        },
        {
          title: 'Test',
          detail: 'Detail test',
          start: '2024-04-25T22:56:44.715Z',
          end: '2024-04-25T23:56:44.715Z',
        },
      ];
      this.isCalendarLoading = false;
      this.cdr.detectChanges();
    }
  }

  handleLogOff(event: Event) {
    console.log(event);
  }

  topBarLang: string = 'es';

  handleLangChange(lang: string): void {
    this.topBarLang = lang;
  }
}
