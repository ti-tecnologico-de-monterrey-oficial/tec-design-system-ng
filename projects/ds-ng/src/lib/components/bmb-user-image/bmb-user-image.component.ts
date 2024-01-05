import { Component, Input } from '@angular/core';
import { Props } from './bmb-user-image.interface';

@Component({
  selector: 'bmb-user-image',
  templateUrl: './bmb-user-image.component.html',
  styleUrls: ['./bmb-user-image.component.scss'],
})
export class BmbUserImageComponent {
  @Input() size: string = '';
  @Input() imageSrc: string = '';

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
