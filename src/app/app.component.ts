import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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
  BmbTabsComponent,
} from '../../projects/ds-ng/src/public-api';

export interface Target {
  target: string;
  index: number;
}

@Component({
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
    BmbTabsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  myTabs: any = [
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
    { id: 4, title: 'Textuales' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];

  activeTabId: number | null =
    this.myTabs.find((tab: any) => tab.isActive)?.id ?? null;

  handleTabSelected(tab: any): void {
    this.activeTabId = tab.id;
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  title = 'tec-design-system-ng';
  boolUserSummary = true;
  value = 'tec-design';

  i = 0;

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
}
