import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-select',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-select.component.html',
  styleUrl: './bmb-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSelectComponent {
  @Input() value: unknown = null;

  @Output() onLangChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.childNodes?.contains(event.target)) {
      const targetElement = event.target as HTMLElement;
      const value = targetElement
        .closest('bmb-select-item')
        ?.getAttribute('value');
      if (value) {
        this.onLangChange.emit(value);
      }
      this.isExpanded = !this.isExpanded;
    } else {
      this.isExpanded = false;
    }
  }

  customTemplate = false;

  ngAfterViewInit() {
    this.childNodes = this.elementRef.nativeElement;
  }

  showPlaceholder() {
    this.customTemplate = true;
  }

  isExpanded: boolean = false;

  getClassName(): string {
    if (this.isExpanded) return 'bmb_select-list-open';
    return '';
  }

  private childNodes: any = null;
}
