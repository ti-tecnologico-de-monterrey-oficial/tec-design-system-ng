import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translations';

export interface IBmbCardNoticeDescription {
  pageOne?: string;
  pageTwo?: string;
}

@Component({
  selector: 'bmb-notice-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbButtonDirective,
    TranslatePipe,
  ],
  templateUrl: './bmb-notice-card.component.html',
  styleUrl: './bmb-notice-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbNoticeCardComponent {
  src = input<string>('');
  title = input<string>('');
  description = input<IBmbCardNoticeDescription>();
  buttonText = input<string>();
  link = input<string>('');
  closeBtnColor = input<'white' | 'black'>('white');

  onClose = output<void>();
  onClickBtn = output<void>();

  activeIndex = 0;

  onDotPress(index: number): void {
    this.activeIndex = index;
  }

  handleClose() {
    this.onClose.emit();
  }

  handleClickBtn() {
    this.onClickBtn.emit();
  }
}
