import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BmbCardButtonComponent } from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [BmbCardButtonComponent],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButton {}
