import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../bmb-card/bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { TranslatePipe } from '../../../pipes/translations';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-timestream-error',
  standalone: true,
  imports: [BmbCardComponent, BmbCardContentComponent, BmbIconComponent, TranslatePipe],
  templateUrl: './bmb-timestream-error.component.html',
  styleUrl: './bmb-timestream-error.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamErrorComponent {}
