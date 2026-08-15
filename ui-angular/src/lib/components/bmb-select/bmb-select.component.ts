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
import { BmbIconComponent } from '../old/bmb-icon/bmb-icon.component';
import { getSelectClassName } from '../../../../../shared/logic/components/select';
import { BmbSelectItemComponent } from './bmb-select-item/bmb-select-item.component';

@Component({
  selector: 'bmb-select',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbSelectItemComponent],
  templateUrl: './bmb-select.component.html',
  styleUrl: './bmb-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSelectComponent implements AfterViewInit {
  value = input<unknown>(null);

  onValueChange = output<string>();

  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.childNodes?.contains(event.target)) {
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

  ngAfterViewInit() {
    this.childNodes = this.elementRef.nativeElement;
  }

  showPlaceholder() {
    this.customTemplate = true;
  }

  isExpanded = false;

  getClassName(): string {
    return getSelectClassName(this.isExpanded);
  }

  private childNodes: any = null;
}
