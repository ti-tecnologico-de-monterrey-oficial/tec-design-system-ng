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

@Component({
  selector: 'bmb-calendar-template-select',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective],
  templateUrl: './bmb-calendar-template-select.component.html',
  styleUrl: './bmb-calendar-template-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateSelectComponent {
  @Input() options: string[] = [];
  @Input() value: string = '';

  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.childNodes?.contains(event.target)) {
      this.isMenuExpanded = !this.isMenuExpanded;
    } else {
      this.isMenuExpanded = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  isMenuExpanded = false;
  childNodes: any = null;

  handleClick(value: string) {
    this.onValueChange.emit(value);
  }

  ngAfterViewInit() {
    this.childNodes = this.elementRef.nativeElement;
  }

  enableDropDown() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  isOptionSelected(item: string) {
    if (this.value === item)
      return 'bmb-calendar-template-select-menu-selected';

    return '';
  }
}
