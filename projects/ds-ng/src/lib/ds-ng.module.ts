import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from './directives/button.directive';
import { DsNgComponent } from './ds-ng.component';

import { BmbIconComponent } from './components/bmb-icon/bmb-icon.component';
import { BmbLogoComponent } from './components/bmb-logo/bmb-logo.component';
import { BmbContainerComponent } from './components/bmb-container/bmb-container.component';
import { BmbBadgeComponent } from './components/bmb-badge/bmb-badge.component';
import { BmbContainerButtonComponent } from './components/bmb-container-button/bmb-container-button.component';
import { BmbFabComponent } from './components/bmb-fab/bmb-fab.component';
import { BmbHeaderMobileComponent } from './components/bmb-header-mobile/bmb-header-mobile.component';
import { BmbTagComponent } from './components/bmb-tags/bmb-tags.component';
import { BmbTitleSectionComponent } from './components/bmb-title-section/bmb-title-section.component';
import { BmbUserImageComponent } from './components/bmb-user-image/bmb-user-image.component';
import { BmbInteractiveIconComponent } from './components/bmb-interactive-icon/bmb-interactive-icon.component';

@NgModule({
  declarations: [
    BmbButtonDirective,
    DsNgComponent,
    BmbIconComponent,
    BmbLogoComponent,
    BmbContainerComponent,
    BmbBadgeComponent,
    BmbContainerButtonComponent,
    BmbFabComponent,
    BmbHeaderMobileComponent,
    BmbTagComponent,
    BmbTitleSectionComponent,
    BmbUserImageComponent,
    BmbInteractiveIconComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    BmbButtonDirective,
    DsNgComponent,
    BmbIconComponent,
    BmbLogoComponent,
    BmbContainerComponent,
    BmbBadgeComponent,
    BmbContainerButtonComponent,
    BmbFabComponent,
    BmbHeaderMobileComponent,
    BmbTagComponent,
    BmbTitleSectionComponent,
    BmbUserImageComponent,
    BmbInteractiveIconComponent,
  ],
})
export class DsNgModule {}
