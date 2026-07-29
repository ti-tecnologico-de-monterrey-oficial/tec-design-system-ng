import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbCardButtonAction,
  BmbCardButtonAlert,
  BmbCardButtonFlat,
  BmbCardButtonHome,
  BmbCardButtonInformativeComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-test-card-button',
  standalone: true,
  imports: [
    BmbCardButtonAction,
    BmbCardButtonAlert,
    BmbCardButtonFlat,
    BmbCardButtonHome,
    BmbCardButtonInformativeComponent,
  ],
  templateUrl: './test-card-button.component.html',
  styleUrl: './test-card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardButtonComponent {
  readonly informativeImage = 'https://studio-assets.supernova.io/design-systems/74407/a2f82e86-1d59-4c28-8212-6e724b560249.png';
}
