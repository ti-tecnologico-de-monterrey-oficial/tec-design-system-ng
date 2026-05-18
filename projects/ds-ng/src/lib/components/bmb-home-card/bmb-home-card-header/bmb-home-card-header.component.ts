import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  model,
  computed,
  effect,
} from '@angular/core';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';
import { IBmbActionHeader } from '../../../types';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';
import { CommonModule } from '@angular/common';
import { IBotType } from '../../bmb-chat-bar/types';
import { logDeprecatedInput } from '../../../utils/logDeprecatedInput';
import { TranslatePipe } from '../../../pipes/translations';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
    BmbNavigationBarComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  iconSize = input<number>();
  bgIconAppearance = input<IBmbColor>();
  actionHeaders = input<IBmbActionHeader[]>([]);
  isMobile = input<boolean>();
  showRightButton = input<boolean>(true);
  isExpanded = model<boolean>(false);
  currentBot = model<IBotType>();
  componentTitle = input<string>(); // once title is removed, this should be required

  title = input<string>(); // deprecated

  onClose = output();
  onBack = output();
  onExpandClick = output();

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

  actionHeaderList = computed<IBmbActionHeader[]>(() => {
    if (this.showRightButton()) {
      const webIcon: string = this.isExpanded()
        ? 'zoom_in_map'
        : 'zoom_out_map';
      const mainIcon: string = this.isMobile() ? 'close' : webIcon;
      return [
        ...this.actionHeaders(),
        {
          icon: mainIcon,
          isToggleActive: false,
          iconActiveToggle: mainIcon,
          action: () => this.handleExpandChange(),
        },
      ];
    }

    return [];
  });

  getIconName(): string {
    return (!this.isMobile() && this.icon()) || '';
  }

  getDataLocalNav(): IBmbDataTopBar[] {
    if (this.isMobile()) return [];
    return this.dataLocalNav();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleExpandChange(): void {
    if (this.isMobile()) {
      this.onClose.emit();
    } else {
      this.onExpandClick.emit();
    }
  }
}
