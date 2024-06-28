import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../directives/utils/clickoutside.directive';

@Component({
  selector: 'bmb-calendar-template-select',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective, ClickOutsideDirective],
  templateUrl: './bmb-calendar-template-select.component.html',
  styleUrl: './bmb-calendar-template-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateSelectComponent {
  @Input() options: string[] = [];
  @Input() value: string = '';

  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();

  isMenuExpanded = false;
  childNodes: any = null;

  handleClick(value: string) {
    this.onValueChange.emit(value);
    this.isMenuExpanded = false;
  }

  enableDropDown() {
    this.isMenuExpanded = true;
  }

  isOptionSelected(item: string) {
    if (this.value === item)
      return 'bmb-calendar-template-select-menu-selected';

    return '';
  }

  clickOutside(): void {
    this.isMenuExpanded = false;
  }
}
