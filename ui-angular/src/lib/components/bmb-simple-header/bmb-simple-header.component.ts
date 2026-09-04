import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import {
  getSimpleHeaderIconColor,
  getSimpleHeaderTitle,
} from '../../_shared/logic/components/simple-header';

@Component({
  selector: 'bmb-simple-header',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective, BmbActionIconComponent],
  templateUrl: './bmb-simple-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSimpleHeaderComponent {
  icon = input<string>('');
  iconAlternativeColor = input<boolean>(false);
  componentTitle = input<string>();

  /** @deprecated Use componentTitle instead. */
  title = input<string>();

  readonly displayTitle = computed(() =>
    getSimpleHeaderTitle(this.componentTitle(), this.title()),
  );
  readonly iconColor = computed(() =>
    getSimpleHeaderIconColor(this.iconAlternativeColor()),
  );

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onIconClick = output<MouseEvent | any>();

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

  handleClick(event: MouseEvent | any): void {
    this.onIconClick.emit(event);
  }
}
