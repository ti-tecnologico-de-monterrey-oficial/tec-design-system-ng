import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import {
  getTitleContentClassNames,
  getTitleContentStyles,
  hasTitleContentBreadcrumbs,
} from '../../_shared/logic/components/title-content';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { isImage } from '../../_shared/logic/utils';
import type { IBmbDataTopBar } from '../../_shared/types';
import type {
  IBmbFontWeightContent,
  IBmbUserImageSize,
} from '../../_shared/types';
import type { IBmbColor } from '../../_shared/types/colors';
import type { IBotType } from '../../_shared/types/components/chat-bar';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbBoxIconComponent } from '../bmb-box-icon/bmb-box-icon.component';
import { BmbBreadcrumbComponent } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

@Component({
  selector: 'bmb-title-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbBreadcrumbComponent,
    BmbUserImageComponent,
    BmbBotIconComponent,
    BmbBoxIconComponent,
  ],
  templateUrl: './bmb-title-content.component.html',
  styleUrl: './bmb-title-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTitleContentComponent {
  titleSize = input<string>('5');
  titleFontWeight = input<IBmbFontWeightContent>('600');
  subtitle = input<string | undefined>('');
  subtitleSize = input<string>('3');
  subtitleFontWeight = input<IBmbFontWeightContent>('400');
  subtitleIcon = input<string>('');
  subtitleIconSize = input<number>(0);
  isCenterContent = input<boolean>(false);
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  transparentBgC = input<boolean>(false);
  icon = input<string>('');
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();
  isAvatarIcon = input<boolean>(false);
  avatarSize = input<IBmbUserImageSize>('desktop-small');
  forceSquareApp = input<boolean>(false);
  componentTitle = input<string>(); // once title is removed, this should be required

  title = input<string>(); // deprecated

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
  currentBot = model<IBotType>();

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getStyles(): object {
    return getTitleContentStyles(
      this.icon(),
      this.transparentBgC(),
      this.forceSquareApp(),
      this.bgIconAppearance(),
    );
  }

  getClassNames(mainName: string, size: string, fontWeight: string): string[] {
    return getTitleContentClassNames(
      mainName,
      size,
      fontWeight,
      this.isCenterContent(),
    );
  }

  showBreadcrumbs(): boolean {
    return hasTitleContentBreadcrumbs(this.dataLocalNav());
  }
}
