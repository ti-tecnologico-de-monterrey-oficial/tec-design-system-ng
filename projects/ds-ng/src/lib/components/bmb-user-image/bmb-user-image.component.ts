import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bmb-user-image',
  styleUrl: './bmb-user-image.component.scss',
  templateUrl: './bmb-user-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class BmbUserImageComponent {
  @Input() size: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() link: string = '';
  @Input() target: string = '';
  @Input() bordered: boolean = false;

  getClasses(): string[] {
    const classes: string[] = ['bmb_user_image'];

    if (this.size) {
      classes.push('bmb_user_image-' + this.size);
    }

    if (this.bordered) {
      classes.push('bmb_user_image-bordered');
    }

    return classes;
  }
}
