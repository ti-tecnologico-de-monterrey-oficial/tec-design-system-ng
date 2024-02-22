import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-container',
  templateUrl: './bmb-container.component.html',
  styleUrls: ['../../../assets/styles/components/_container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerComponent {
  @Input() appearance: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['container'];

    if (this.appearance) {
      classes.push('container--' + this.appearance);
    }

    return classes;
  }
}
