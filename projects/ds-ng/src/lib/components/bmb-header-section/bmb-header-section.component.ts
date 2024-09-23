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
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { isImage } from '../../utils/utils';

export interface IBmbHeaderAction {
  icon: string;
  action: () => void;
}

@Component({
  selector: 'bmb-header-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
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
  leftIcon = input<string>('');
  headerActions = input<IBmbHeaderAction[]>([]);
  icon = input<string>('');
  bgIconAppearance = input<IBbmBgAppearance>();
  isHeader = input<boolean>();
  transparentBgC = input<boolean>();

  onClickLeft = output<any>();

  getClasses(): string[] {
    const className = 'bmb_header-section-align_title-icon';
    const classNames = [className];

    if (!!this.bgIconAppearance()) {
      classNames.push(`${className}-${this.bgIconAppearance()}`);
    } else {
      classNames.push(`${className}-none`);
    }

    return classNames;
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  handleClickLeft(event: any): void {
    this.onClickLeft.emit(event);
  }

  handleClickRight(action: IBmbHeaderAction) {
    action.action();
  }
}
