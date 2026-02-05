import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbBreadcrumbComponent,
  IBmbDataTopBar,
} from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { isImage } from '../../utils/utils';
import { IBmbColor } from '../../types/colors';
import { getRGBColorKeyValue } from '../../utils/utils';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { IBmbUserImageSize } from '../../types';

export type IBmbFontWeightContent =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

@Component({
  selector: 'bmb-title-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbBreadcrumbComponent,
    BmbUserImageComponent,
  ],
  templateUrl: './bmb-title-content.component.html',
  styleUrl: './bmb-title-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTitleContentComponent {
  title = input.required<string>();
  titleSize = input<string>('5');
  titleFontWeight = input<string>('600');
  subtitle = input<string | undefined>('');
  subtitleSize = input<string>('4');
  subtitleFontWeight = input<string>('400');
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

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getStyles(): object {
    if (this.isImage(this.icon()) && this.transparentBgC() && !this.forceSquareApp()) {
      return { 'background-color': 'transparent' };
    }
    if (!!this.bgIconAppearance()) {
      return getRGBColorKeyValue(this.bgIconAppearance() as string);
    }
    return {};
  }

  getClassNames(mainName: string, size: string, fontWeight: string): string[] {
    const classes = [`${mainName}-${size}`, `${mainName}-${fontWeight}`];

    if (this.isCenterContent()) classes.push(`${mainName}-centered`);

    return classes;
  }

  showBreadcrumbs(): boolean {
    return !!this.dataLocalNav().length;
  }
}
