import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Props } from './bmb-user-image.interface';

@Component({
  selector: 'bmb-user-image',
  templateUrl: './bmb-user-image.component.html',
  styleUrls: ['../../../assets/styles/components/_userImage.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserImageComponent {
  @Input() size: string = '';
  @Input() image: string = '';

  constructor() {}

  getClasses(): Props {
    let classes: Props = {
      'user-image': true,
    };

    if (this.size) {
      classes[this.size] = true;
    }

    return classes;
  }
}
