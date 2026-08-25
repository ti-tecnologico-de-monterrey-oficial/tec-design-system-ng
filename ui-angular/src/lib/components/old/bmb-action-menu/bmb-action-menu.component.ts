import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  TemplateRef,
  effect,
  contentChildren,
} from '@angular/core';
import { IBmbColor } from '../../../_shared/types/colors';
import { CommonModule } from '@angular/common';
import { logDeprecatedInput } from '../../../_shared/logic/logDeprecatedInput';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';

@Component({
  selector: 'bmb-action-menu',
  standalone: true,
  imports: [
    CommonModule,
    BmbDividerComponent,
    BmbTitleContentComponent,
    BmbContainerComponent,
  ],
  templateUrl: './bmb-action-menu.component.html',
  styleUrl: './bmb-action-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionMenuComponent {
  componentTitle = input<string>(); // once title is removed, this should be required
  icon = input<string>('');
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();
  showHeader = input<boolean>(true);

  title = input<string>(); // deprecated
  subtitle = input<string>(); // deprecated

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
