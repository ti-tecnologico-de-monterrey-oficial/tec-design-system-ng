import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TranslatePipe } from '../../../pipes/translations';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../bmb-card/bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-timestream-error',
  standalone: true,
  imports: [
    BmbCardComponent,
    BmbCardContentComponent,
    BmbIconComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-timestream-error.component.html',
  styleUrl: './bmb-timestream-error.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamErrorComponent {}
