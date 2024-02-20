import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from './directives/button.directive';
import { DsNgComponent } from './ds-ng.component';
import { BmbIconComponent } from './components/bmb-icon/bmb-icon.component';
import { BmbAlertComponent } from './components/bmb-alert/bmb-alert.component';
import { BmbThemeComponent } from './components/bmb-theme/bmb-theme.component';
import { BmbBadgeComponent } from './components/bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from './components/bmb-divider/bmb-divider.component';
import { BmbUserImageComponent } from './components/bmb-user-image/bmb-user-image.component';
import { BmbAppButtonComponent } from './components/bmb-app-button/bmb-app-button.component';
import { BmbTextInputComponent } from './components/bmb-text-input/bmb-text-input.component';
import { BmbIconTextInputComponent } from './components/bmb-icon-text-input/bmb-icon-text-input.component';
import { BmbDotPaginatorComponent } from './components/bmb-dot-paginator/bmb-dot-paginator.component';

@NgModule({
  declarations: [
    DsNgComponent,
    BmbIconComponent,
    BmbThemeComponent,
    BmbAlertComponent,
    BmbBadgeComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbTextInputComponent,
    BmbUserImageComponent,
    BmbAppButtonComponent,
    BmbDotPaginatorComponent,
    BmbIconTextInputComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DsNgComponent,
    BmbIconComponent,
    BmbBadgeComponent,
    BmbAlertComponent,
    BmbThemeComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbUserImageComponent,
    BmbTextInputComponent,
    BmbAppButtonComponent,
    BmbDotPaginatorComponent,
    BmbIconTextInputComponent,
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
