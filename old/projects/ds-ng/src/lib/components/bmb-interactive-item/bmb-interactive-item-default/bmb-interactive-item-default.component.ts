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
import { TranslatePipe } from '../../../pipes/translations';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-interactive-item-default',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbTitleComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
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
