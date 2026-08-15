import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BmbCardButtonComponent } from 'ui-angular';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [BmbCardButtonComponent],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButton {}
