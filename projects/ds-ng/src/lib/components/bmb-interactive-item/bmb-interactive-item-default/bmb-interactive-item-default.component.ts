import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbContainerButtonBaseComponent } from '../../bmb-container-button/bmb-container-button-base/bmb-container-button-base.component';
import { TranslatePipe } from '../../../pipes/translations';

@Component({
  selector: 'bmb-interactive-item-default',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbIconComponent,
    BmbTitleComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-interactive-item-default.component.html',
  styleUrl: './bmb-interactive-item-default.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveItemDefaultComponent {
  icon = input.required<string>();
  itemTitle = input.required<string>();
  isActive = input<boolean>();

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}
