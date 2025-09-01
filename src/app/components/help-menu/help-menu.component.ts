import { Component } from '@angular/core';
import {
  BmbActionMenuComponent,
  BmbItemComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-help-menu',
  standalone: true,
  imports: [BmbActionMenuComponent, BmbItemComponent],
  templateUrl: './help-menu.component.html',
  styleUrl: './help-menu.component.scss',
})
export class HelpMenuComponent {}
