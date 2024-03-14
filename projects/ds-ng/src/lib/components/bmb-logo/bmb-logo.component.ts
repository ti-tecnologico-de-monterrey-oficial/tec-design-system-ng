import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bmb-logo',
  styleUrl: './bmb-logo.component.scss',
  templateUrl: './bmb-logo.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbLogoComponent {
  @Input() size: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() link: string = '';
  @Input() target: string = '';

  getClasses(): string[] {
    const classes: string[] = ['bmb_logo'];

    if (this.size) {
      classes.push('bmb_logo-' + this.size);
    }

    return classes;
  }
}
