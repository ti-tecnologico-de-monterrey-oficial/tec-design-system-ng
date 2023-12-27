import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DsNgComponent } from 'ds-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DsNgComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
