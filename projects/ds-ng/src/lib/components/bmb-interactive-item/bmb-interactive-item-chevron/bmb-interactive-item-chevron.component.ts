import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';

@Component({
  selector: 'bmb-interactive-item-chevron',
  standalone: true,
  imports: [
    BmbIconComponent,
    BmbTitleComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-interactive-item-chevron.component.html',
  styleUrl: './bmb-interactive-item-chevron.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveItemChevronComponent {
  itemTitle = input.required<string>();
  itemSubtitle = input.required<string>();
  isDisabled = input<boolean>(false);

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}
