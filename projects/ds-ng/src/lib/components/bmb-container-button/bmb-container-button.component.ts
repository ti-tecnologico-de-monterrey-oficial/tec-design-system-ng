import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';

@Component({
  selector: 'bmb-container-button',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbGradeValueComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
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
  target = input<string>('');
  link = input<string>('');
  subtitle = input<string>('');
  iconLeft = input<string>('');
  iconRight = input<string>('');
  setButtonTemplate = input<boolean>();

  onButton = output();

  getScore(): number {
    return Number(this.score());
  }

  getClassList(): string[] {
    const classList = ['bmb_container-button'];
    if (this.square()) {
      classList.push('bmb_container-button-square');
    }

    return classList;
  }

  handleClick(event: any): void {
    this.onButton.emit(event);
  }
}
