import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  input,
  output,
  inject,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { getSelectClassName } from '@shared/logic/components/select';
import { BmbSelectItemComponent } from './bmb-select-item/bmb-select-item.component';

@Component({
  selector: 'bmb-select',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-select.component.html',
  styleUrl: './bmb-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSelectComponent implements AfterViewInit {
  value = input<unknown>(null);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onValueChange = output<string>();

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const eventTarget = event.target;

    if (eventTarget instanceof Node && this.childNodes?.contains(eventTarget)) {
      const targetElement = event.target as HTMLElement;
      const value = targetElement
        .closest('bmb-select-item')
        ?.getAttribute('value');
      if (value) {
        this.onValueChange.emit(value);
      }
      this.isExpanded = !this.isExpanded;
    } else {
      this.isExpanded = false;
    }
  }

  customTemplate = false;

  ngAfterViewInit(): void {
    this.childNodes = this.elementRef.nativeElement;
  }

  showPlaceholder(): void {
    this.customTemplate = true;
  }

  isExpanded = false;

  getClassName(): string {
    return getSelectClassName(this.isExpanded);
  }

  private childNodes: HTMLElement | null = null;
}
