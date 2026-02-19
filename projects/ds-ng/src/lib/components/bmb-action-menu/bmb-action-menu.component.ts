import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  TemplateRef,
  ContentChildren,
  QueryList,
  effect,
} from '@angular/core';
import { IBmbColor } from '../../types/colors';
import { CommonModule } from '@angular/common';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

@Component({
  selector: 'bmb-action-menu',
  standalone: true,
  imports: [CommonModule, BmbTitleContentComponent],
  templateUrl: './bmb-action-menu.component.html',
  styleUrl: './bmb-action-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionMenuComponent {
  componentTitle = input<string>(); // once title is removed, this should be required
  subtitle = input<string>();
  icon = input<string>('');
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();
  showHeader = input<boolean>(true);

  title = input<string>(); // deprecated

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle }
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error('The "componentTitle" input is required. Please provide a value for it.');
      }
    });
  }

  @ContentChildren(TemplateRef)
  projectedContent!: QueryList<any>;
}
