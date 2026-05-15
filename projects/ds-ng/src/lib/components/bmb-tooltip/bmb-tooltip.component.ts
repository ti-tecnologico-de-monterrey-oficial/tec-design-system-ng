import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbTooltipBaseComponent } from './bmb-tooltip-base/bmb-tooltip-base.component';

export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right'; //Deprecated
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after'; //Deprecated

@Component({
  selector: 'bmb-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbTooltipBaseComponent,
  ],
  templateUrl: './bmb-tooltip.component.html',
  styleUrl: './bmb-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTooltipComponent {
  text = input<string>('');
  icon = input<string>('help');
  size = input<number>();
  isFill = input<boolean>(true);
  componentTitle = input<string>();

  title = input<string>(); // deprecated
  align = input<string>(); // deprecated
  justify = input<string>(); // deprecated

  constructor() {

    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }
}
