import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-logo',
  templateUrl: './bmb-logo.component.html',
  styleUrls: ['../../../assets/styles/components/_logo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLogoComponent {
  @Input() size: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';

  getClasses(): string[] {
    const classes: string[] = ['logo'];

    if (this.size) {
      classes.push('logo--' + this.size);
    }

    return classes;
  }
}
