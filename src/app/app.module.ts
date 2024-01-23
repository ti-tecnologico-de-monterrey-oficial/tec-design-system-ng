import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DsNgComponent } from '../../projects/ds-ng/src/public-api';
import { BmbIconComponent } from '../../projects/ds-ng/src/lib/components/bmb-icon/bmb-icon.component';
import { BmbThemeComponent } from '../../projects/ds-ng/src/lib/components/bmb-theme/bmb-theme.component';
import { BmbBadgeComponent } from '../../projects/ds-ng/src/lib/components/bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from '../../projects/ds-ng/src/lib/components/bmb-divider/bmb-divider.component';
import { BmbAppButtonComponent } from '../../projects/ds-ng/src/lib/components/bmb-app-button/bmb-app-button.component';
import { BmbUserImageComponent } from '../../projects/ds-ng/src/lib/components/bmb-user-image/bmb-user-image.component';
import { BmbDotPaginatorComponent } from '../../projects/ds-ng/src/lib/components/bmb-dot-paginator/bmb-dot-paginator.component';

// Angular library

import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    BmbIconComponent,
    BmbBadgeComponent,
    BmbThemeComponent,
    BmbDividerComponent,
    BmbAppButtonComponent,
    BmbUserImageComponent,
    BmbDotPaginatorComponent,
  ],
  imports: [
    FormsModule,
    DsNgComponent,
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
