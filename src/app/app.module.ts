import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DsNgComponent } from '../../projects/ds-ng/src/public-api';
import { BmbUserImageComponent } from '../../projects/ds-ng/src/lib/components/bmb-user-image/bmb-user-image.component';
@NgModule({
  declarations: [AppComponent, BmbUserImageComponent],
  imports: [BrowserModule, AppRoutingModule, DsNgComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
