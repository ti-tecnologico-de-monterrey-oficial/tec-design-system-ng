import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-container-button',
  templateUrl: './bmb-container-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonComponent {
  @Input() title: string = '';
  @Input() grade: string = '';
  @Input() target: string = '';
  @Input() link: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() icon: string = '';
}
