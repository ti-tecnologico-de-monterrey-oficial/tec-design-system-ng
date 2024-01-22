import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-divider',
  templateUrl: './bmb-divider.component.html',
  styleUrls: ['../../../assets/styles/components/_divider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDividerComponent {
  @Input() size: string = '';
  @Input() styles: string = '';
  @Input() type: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['divider'];

    if (this.type) {
      classes.push('divider-' + this.type);
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
