import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bmb-mitec-logo-animation',
  standalone: true,
  imports: [],
  templateUrl: './bmb-mitec-logo-animation.component.html',
  styleUrl: './bmb-mitec-logo-animation.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMitecLogoAnimationComponent {
  label = input<string>('ESTUDIANTES');
}
