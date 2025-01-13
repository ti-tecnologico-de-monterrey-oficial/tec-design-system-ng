import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { IBbmBgAppearance, IBmbTargetLink } from '../../types';

@Component({
  selector: 'bmb-container-button',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbGradeValueComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBadgeComponent,
  ],
  styleUrl: './bmb-container-button.component.scss',
  templateUrl: './bmb-container-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbContainerButtonComponent {
  title = input<string>('');
  score = input<string>('');
  square = input<boolean>();
  small = input<boolean>();
  target = input<IBmbTargetLink>('_blank');
  link = input<string>('');
  subtitle = input<string>('');
  iconLeft = input<string>('');
  iconRight = input<string>('');
  setButtonTemplate = input<boolean>();
  badgeText = input<string>('');
  badgeAppearance = input<IBbmBgAppearance>('normal');
  state = input<'disabled' | 'error'>();
  alternative = input<boolean>(false);
  onButton = output();

  getScore(): number {
    return Number(this.score());
  }

  getClassList(): string[] {
    const classList = ['bmb_container-button'];
    if (this.square()) {
      classList.push('bmb_container-button-square');
    }

    if (this.small()) {
      classList.push('bmb_container-button-small');
    }

    if (this.state() === 'disabled') {
      classList.push('bmb_container-button-disabled');
    }

    if (this.state() === 'error') {
      classList.push('bmb_container-button-error');
    }

    if (this.alternative()) {
      classList.push('bmb_container-button-alternative');
    }
    return classList;
  }

  handleClick(event: any): void {
    this.onButton.emit(event);
  }
}
