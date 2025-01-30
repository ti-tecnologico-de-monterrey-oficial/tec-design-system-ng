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

@Component({
  selector: 'bmb-title-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbBreadcrumbComponent,
  ],
  templateUrl: './bmb-title-content.component.html',
  styleUrl: './bmb-title-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTitleContentComponent {
  title = input.required<string>();
  titleSize = input<string>('5');
  subtitle = input<string | undefined>('');
  subtitleSize = input<string>('4');
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  transparentBgC = input<boolean>(false);
  icon = input<string>('');
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getStyles(): object {
    if (this.isImage(this.icon())) {
      return { 'background-color': 'transparent' };
    }
    if (!!this.bgIconAppearance()) {
      return {
        'background-color': `RGBA(var(--color-${this.bgIconAppearance()}))`,
      };
    }
    return {};
  }

  showBreadcrumbs(): boolean {
    return !!this.dataLocalNav().length;
  }
}
