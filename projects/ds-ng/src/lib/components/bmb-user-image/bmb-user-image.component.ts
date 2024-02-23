import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-user-image',
  templateUrl: './bmb-user-image.component.html',
  styleUrls: ['../../../assets/styles/components/_userImage.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserImageComponent {
  @Input() size: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';

  getClasses(): string[] {
    const classes: string[] = ['user__image'];

    if (this.size) {
      classes.push('user__image--' + this.size);
    }

    return classes;
  }
}
