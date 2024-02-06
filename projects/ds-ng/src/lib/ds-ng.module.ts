import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from './directives/button.directive';
import { DsNgComponent } from './ds-ng.component';
import { BmbUserImageComponent } from './components/bmb-user-image/bmb-user-image.component';
import { BmbAppButtonComponent } from './components/bmb-app-button/bmb-app-button.component';
import { BmbBadgeComponent } from './components/bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from './components/bmb-divider/bmb-divider.component';
import { BmbDotPaginatorComponent } from './components/bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbIconComponent } from './components/bmb-icon/bmb-icon.component';
import { BmbThemeComponent } from './components/bmb-theme/bmb-theme.component';
import { BmbTextInputComponent } from './components/bmb-text-input/bmb-text-input.component';
import { BmbIconTextInputComponent } from './components/bmb-icon-text-input/bmb-icon-text-input.component';

// Angular library

import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    BmbButtonDirective,
    DsNgComponent,
    BmbUserImageComponent,
    BmbAppButtonComponent,
    BmbBadgeComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbIconComponent,
    BmbThemeComponent,
    BmbTextInputComponent,
    BmbIconTextInputComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
  ],
  exports: [
    BmbButtonDirective,
    DsNgComponent,
    BmbUserImageComponent,
    BmbAppButtonComponent,
    BmbBadgeComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbIconComponent,
    BmbThemeComponent,
    BmbTextInputComponent,
    BmbIconTextInputComponent

  ]
})
export class DsNgModule { 
  constructor(private injector: Injector){}

  ngDoBootsrap(){
    const custonElement = createCustomElement(BmbIconTextInputComponent, {injector: this.injector})
    customElements.define('bmb-icon-text-input', custonElement);
  }

}