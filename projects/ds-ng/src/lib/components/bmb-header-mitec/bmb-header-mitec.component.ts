import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader } from '../../types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbMitecLogoAnimationComponent } from '../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';

@Component({
  selector: 'bmb-header-mitec',
  standalone: true,
  imports: [BmbMitecLogoAnimationComponent, BmbNavigationBarComponent],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent {
  headerLabel = input<string>('ESTUDIANTES');
  actionHeaders = input<IBmbActionHeader[]>([]);
}
