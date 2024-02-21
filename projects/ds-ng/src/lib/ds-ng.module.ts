import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from './directives/button.directive';
import { DsNgComponent } from './ds-ng.component';
import { BmbLogoComponent } from './components/bmb-logo/bmb-logo.component';
import { BmbIconComponent } from './components/bmb-icon/bmb-icon.component';
import { BmbAlertComponent } from './components/bmb-alert/bmb-alert.component';
import { BmbThemeComponent } from './components/bmb-theme/bmb-theme.component';
import { BmbBadgeComponent } from './components/bmb-badge/bmb-badge.component';
import { BmbInputComponent } from './components/bmb-input/bmb-input.component';
import { BmbDividerComponent } from './components/bmb-divider/bmb-divider.component';
import { BmbContainerComponent } from './components/bmb-container/bmb-container.component';
import { BmbUserImageComponent } from './components/bmb-user-image/bmb-user-image.component';
import { BmbTextInputComponent } from './components/bmb-text-input/bmb-text-input.component';
import { BmbHeaderMobileComponent } from './components/bmb-header-mobile/bmb-header-mobile.component';
import { BmbIconTextInputComponent } from './components/bmb-icon-text-input/bmb-icon-text-input.component';
import { BmbDotPaginatorComponent } from './components/bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbInteractiveIconComponent } from './components/bmb-interactive-icon/bmb-interactive-icon.component';
import { BmbFabComponent } from './components/bmb-fab/bmb-fab.component';

@NgModule({
  declarations: [
    DsNgComponent,
    BmbLogoComponent,
    BmbIconComponent,
    BmbThemeComponent,
    BmbAlertComponent,
    BmbBadgeComponent,
    BmbInputComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbContainerComponent,
    BmbTextInputComponent,
    BmbUserImageComponent,
    BmbHeaderMobileComponent,
    BmbDotPaginatorComponent,
    BmbIconTextInputComponent,
    BmbInteractiveIconComponent,
    BmbFabComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DsNgComponent,
    BmbLogoComponent,
    BmbIconComponent,
    BmbBadgeComponent,
    BmbAlertComponent,
    BmbThemeComponent,
    BmbInputComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbUserImageComponent,
    BmbContainerComponent,
    BmbTextInputComponent,
    BmbHeaderMobileComponent,
    BmbDotPaginatorComponent,
    BmbIconTextInputComponent,
    BmbInteractiveIconComponent,
    BmbFabComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DsNgModule {
  constructor(private injector: Injector) {}

  ngDoBootsrap() {
    const customInputWrapper = createCustomElement(BmbIconTextInputComponent, {
      injector: this.injector,
    });
    customElements.define('bmb-input-wrapper', customInputWrapper);
  }
}
