import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-container',
  templateUrl: './bmb-container.component.html',
  styleUrls: ['../../../assets/styles/components/_container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerComponent {
  @Input() type: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['container'];

    if (this.type) {
      classes.push('container--' + this.type);
    }

    return classes;
  }
}
