import { Component, input, output } from '@angular/core';
import { BmbActionMenuComponent, BmbItemComponent } from 'ui-angular';

@Component({
  selector: 'app-help-menu',
  standalone: true,
  imports: [BmbActionMenuComponent, BmbItemComponent],
  templateUrl: './help-menu.component.html',
  styleUrl: './help-menu.component.scss',
})
export class HelpMenuComponent {
  title = input<string>('');
  subtitle = input<string>('');

  helpClicked = output<string>();
}
