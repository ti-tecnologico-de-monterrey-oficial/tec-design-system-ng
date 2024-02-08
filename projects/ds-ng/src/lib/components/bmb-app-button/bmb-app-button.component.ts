import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-app-button',
  templateUrl: './bmb-app-button.component.html',
  styleUrls: ['../../../assets/styles/components/_appButton.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAppButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() image: string = '';

  constructor() {}
}
