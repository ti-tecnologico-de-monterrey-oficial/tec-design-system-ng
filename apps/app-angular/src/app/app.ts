import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';
import { ButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ui-angular';

@Component({
  imports: [NxWelcome, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'app-angular';
}
