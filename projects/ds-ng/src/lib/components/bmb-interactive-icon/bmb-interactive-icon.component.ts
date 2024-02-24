import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'bmb-interactive-icon',
  templateUrl: './bmb-interactive-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveIconComponent implements AfterViewInit {
  @Input() appearance: string = '';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() grouped: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.grouped) {
      const parentElement = this.el.nativeElement.parentElement;

      let wrapperDiv = parentElement.querySelector(
        '.interactive__icon--grouped'
      );
      if (!wrapperDiv) {
        wrapperDiv = this.renderer.createElement('div');
        this.renderer.addClass(wrapperDiv, 'interactive__icon--grouped');
        this.renderer.insertBefore(parentElement, wrapperDiv, null);
      }

      this.renderer.appendChild(wrapperDiv, this.el.nativeElement);
    }
  }

  getClasses(): string[] {
    const classes: string[] = ['interactive__icon'];

    if (this.appearance) {
      classes.push('interactive__icon--' + this.appearance);
    }

    return classes;
  }
}
