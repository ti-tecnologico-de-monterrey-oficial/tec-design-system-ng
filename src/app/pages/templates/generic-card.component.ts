import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbBadgeComponent,
  BmbBoxIconComponent,
  BmbButtonDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCheckboxComponent,
  BmbIconComponent,
  BmbImageComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTooltipComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from '../../../../projects/ds-ng/src/public-api';
import { BmbTitleComponent } from '../../../../projects/ds-ng/src/lib/components/bmb-title/bmb-title.component';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [
    BmbBadgeComponent,
    BmbBoxIconComponent,
    BmbButtonDirective,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbCheckboxComponent,
    BmbIconComponent,
    BmbImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTitleComponent,
    BmbTooltipComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCard {
  readonly informativeImage =
    'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

  handleButtonClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
