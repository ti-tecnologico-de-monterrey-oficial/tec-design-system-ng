import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbGradeValueComponent } from '../../bmb-grade-value/bmb-grade-value.component';

@Component({
  selector: 'bmb-container-button-grade',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbGradeValueComponent,
    BmbTitleComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-container-button-grade.component.html',
  styleUrl: './bmb-container-button-grade.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonGradeComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  score = input.required<number | string>();
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
