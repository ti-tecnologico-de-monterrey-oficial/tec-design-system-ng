import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbCardButtonComponent,
  BmbCardButtonAction,
  BmbCardButtonAlert,
  BmbCardButtonEmpty,
  BmbCardButtonFlat,
  BmbCardButtonHome,
  BmbCardButtonInformativeComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [
    BmbCardButtonComponent,
    BmbCardButtonAction,
    BmbCardButtonAlert,
    BmbCardButtonEmpty,
    BmbCardButtonFlat,
    BmbCardButtonHome,
    BmbCardButtonInformativeComponent,
  ],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButton {
  readonly informativeImage =
    'https://studio-assets.supernova.io/design-systems/74407/a2f82e86-1d59-4c28-8212-6e724b560249.png';
}
