import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-alert',
  templateUrl: './bmb-alert.component.html',
  styleUrls: ['../../../assets/styles/components/_alert.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertComponent {
  @Input() type: string = '';
  @Input() text: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['alert'];

    if (this.type) {
      classes.push('alert--' + this.type);
    }

    return classes;
  }
}
