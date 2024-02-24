import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-divider',
  templateUrl: './bmb-divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDividerComponent {
  @Input() size: string = '';
  @Input() styles: string = '';
  @Input() appearance: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['divider'];

    if (this.appearance) {
      classes.push('divider-' + this.appearance);
    }

    if (this.size) {
      classes.push('divider-' + this.size);
    }

    if (this.styles) {
      classes.push('divider-' + this.styles);
    }

    return classes;
  }
}
