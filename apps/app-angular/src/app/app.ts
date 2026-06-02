import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ui-angular';

@Component({
  imports: [NxWelcome, BmbBadgeComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'app-angular';
}
