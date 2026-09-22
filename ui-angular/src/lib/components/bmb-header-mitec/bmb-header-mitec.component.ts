import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import type { IBmbActionHeader } from '../../_shared/types/components/navigation-bar';
import type { IBmbActionHeaderLinks } from '../../_shared/types/components/header-mitec';
import { getHeaderMitecActions } from '../../_shared/logic/components/header-mitec';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbMitecLogoAnimationComponent } from '../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';
import { TranslatePipe } from '../../pipes/translations';

export type { IBmbActionHeaderLinks } from '../../_shared/types/components/header-mitec';

@Component({
  selector: 'bmb-header-mitec',
  standalone: true,
  imports: [
    BmbMitecLogoAnimationComponent,
    BmbNavigationBarComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent implements OnChanges {
  headerLabel = input<string>();
  actionHeaderLinks = input<IBmbActionHeaderLinks>();

  _actionHeaders: IBmbActionHeader[] = getHeaderMitecActions();

  ngOnChanges(): void {
    this._actionHeaders = getHeaderMitecActions(this.actionHeaderLinks());
  }
}
