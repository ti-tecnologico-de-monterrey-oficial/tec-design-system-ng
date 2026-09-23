import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BmbTitleComponent } from '../../../../../ui-angular/src/lib/components/bmb-title/bmb-title.component';
import {
  BmbProgressCircleComponent,
  BmbBadgeComponent,
  BmbCheckboxComponent,
  BmbContainerButtonComponent,
  BmbBoxIconComponent,
  BmbButtonDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
  BmbDividerComponent,
  BmbFocusElementComponent,
  BmbIconComponent,
  BmbImageComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTooltipComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from 'ui-angular';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [
    BmbProgressCircleComponent,
    BmbBadgeComponent,
    BmbCheckboxComponent,
    BmbContainerButtonComponent,
    BmbBoxIconComponent,
    BmbButtonDirective,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbCardHeaderComponent,
    BmbDividerComponent,
    BmbFocusElementComponent,
    BmbIconComponent,
    BmbImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTooltipComponent,
    BmbTitleComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCard {
  readonly isItemListMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(width < 1001px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  readonly informativeItems = [
    { id: 1, stackedMobileActions: true, showSubtitle: true, showComplement: true },
    { id: 2, stackedMobileActions: true, showSubtitle: true, showComplement: true },
    { id: 3, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 4, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 5, stackedMobileActions: false, showSubtitle: true, showComplement: true },
    { id: 6, stackedMobileActions: false, showSubtitle: false, showComplement: false },
  ];

  readonly informativeImage =
    'https://studio-assets.supernova.io/design-systems/74407/a2f82e86-1d59-4c28-8212-6e724b560249.png';

  handleButtonClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
