import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginComponent } from '../bmb-login/bmb-login.component';

@Component({
  selector: 'bmb-home-mitec',
  standalone: true,
  imports: [BmbLoginComponent],
  templateUrl: './bmb-home-mitec.component.html',
  styleUrl: './bmb-home-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeMitecComponent {}
