import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbBadgeComponent,
  BmbBoxIconComponent,
  BmbButtonDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
  BmbIconComponent,
  BmbImageComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTooltipComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbTitleContentComponent
} from 'ui-angular';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [
    BmbBadgeComponent,
    BmbBoxIconComponent,
    BmbButtonDirective,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbCardHeaderComponent,
    BmbIconComponent,
    BmbImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTitleContentComponent,
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
