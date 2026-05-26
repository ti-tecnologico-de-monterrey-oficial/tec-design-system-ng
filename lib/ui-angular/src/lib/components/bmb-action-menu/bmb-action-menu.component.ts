import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  TemplateRef,
  effect,
  contentChildren,
} from '@angular/core';
import { IBmbColor } from '../../types/colors';
import { CommonModule } from '@angular/common';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbHomeCardHeaderComponent } from '../bmb-home-card/bmb-home-card-header/bmb-home-card-header.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

@Component({
  selector: 'bmb-action-menu',
  standalone: true,
  imports: [CommonModule, BmbHomeCardHeaderComponent, BmbDividerComponent],
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

  protected genericMenuContent = contentChildren<TemplateRef<any>>(
    TemplateRef<any>,
  );
  protected menuContent = contentChildren<TemplateRef<any>>('actionMenuItem');

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  protected get menuContentList() {
    return this.menuContent().length
      ? this.menuContent()
      : this.genericMenuContent();
  }
}
