import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-mitec-logo-animation',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './bmb-mitec-logo-animation.component.html',
  styleUrl: './bmb-mitec-logo-animation.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMitecLogoAnimationComponent {
  label = input<string>('ESTUDIANTES');
}
