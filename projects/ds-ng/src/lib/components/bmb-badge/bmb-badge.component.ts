import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

@Component({
  selector: 'bmb-badge',
  styleUrl: './bmb-badge.component.scss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBadgeComponent implements AfterViewInit {
  appearance = input<IBbmBgAppearance>('normal');
  text = input<string>('');
  grouped = input<boolean>(false);
  rounded = input<boolean>(true);
  isFillBadge = input<boolean>(true);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    if (this.grouped()) {
      const parentElement = this.el.nativeElement.parentElement;

      let wrapperDiv = parentElement.querySelector('.bmb_badge-grouped');
      if (!wrapperDiv) {
        wrapperDiv = this.renderer.createElement('div');
        this.renderer.addClass(wrapperDiv, 'bmb_badge-grouped');
        this.renderer.insertBefore(parentElement, wrapperDiv, null);
      }

      this.renderer.appendChild(wrapperDiv, this.el.nativeElement);
    }
  }

  getClasses(): string[] {
    const classes: string[] = [
      'bmb_badge',
      'bmb_badge-rounded',
      `bmb_badge-${this.appearance()}`,
    ];

    if (this.isFillBadge()) classes.push('bmb_badge-filled');
    else classes.push('bmb_badge-transparent');

    return classes;
  }
}
