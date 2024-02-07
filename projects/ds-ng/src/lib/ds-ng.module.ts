import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from './directives/button.directive';
import { DsNgComponent } from './ds-ng.component';
import { BmbUserImageComponent } from './components/bmb-user-image/bmb-user-image.component';
import { BmbAppButtonComponent } from './components/bmb-app-button/bmb-app-button.component';
import { BmbBadgeComponent } from './components/bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from './components/bmb-divider/bmb-divider.component';
import { BmbDotPaginatorComponent } from './components/bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbIconComponent } from './components/bmb-icon/bmb-icon.component';

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
  ],
  imports: [CommonModule, FormsModule, MatButtonToggleModule],
  exports: [
    BmbButtonDirective,
    DsNgComponent,
    BmbUserImageComponent,
    BmbAppButtonComponent,
    BmbBadgeComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbIconComponent,
  ],
})
export class DsNgModule {}
