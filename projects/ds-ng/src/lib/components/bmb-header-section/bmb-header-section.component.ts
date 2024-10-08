import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { isImage } from '../../utils/utils';
import {
  BmbBreadcrumbComponent,
  IBmbDataTopBar,
} from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../types/colors';

export interface IBmbActionHeader {
  icon: string;
  iconActiveToggle?: string;
  isToggleActive?: boolean;
  action: () => void;
}

@Component({
  selector: 'bmb-header-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbBreadcrumbComponent,
    BmbInteractiveIconComponent,
  ],
  styleUrl: './bmb-header-section.component.scss',
  templateUrl: './bmb-header-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHeaderSectionComponent {
  title = input<string | undefined>('');
  subtitle = input<string | undefined>('');
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>('');
  actionHeaders = input<IBmbActionHeader[]>([]);
  icon = input<string>('');
  iconSize = input<number>(16);
  bgIconAppearance = input<IBmbColor>();
  transparentBgC = input<boolean>();

  onClickLeft = output<any>();

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

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  showBreadcrumbs(): boolean {
    return !!this.dataLocalNav().length;
  }

  handleClickLeft(event: any): void {
    this.onClickLeft.emit(event);
  }

  handleClickRight(actionHeader: IBmbActionHeader) {
    if (!!actionHeader.iconActiveToggle) {
      actionHeader.isToggleActive = !actionHeader.isToggleActive;
    }

    actionHeader.action();
  }
}
