import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-badge',
  templateUrl: './bmb-badge.component.html',
  styleUrls: ['../../../assets/styles/components/_badge.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBadgeComponent {
  @Input() type: string = '';
  @Input() text: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['badge'];

    if (this.type) {
      classes.push('badge-' + this.type);
    }

    return classes;
  }
}
