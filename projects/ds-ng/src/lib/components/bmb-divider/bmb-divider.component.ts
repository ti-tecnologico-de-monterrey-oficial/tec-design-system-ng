import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bmb-divider',
  styleUrl: './bmb-divider.component.scss',
  templateUrl: './bmb-divider.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDividerComponent {
  @Input() size: string = '';
  @Input() styles: string = '';
  @Input() appearance: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['bmb_divider'];

    if (this.appearance) {
      classes.push('bmb_divider-' + this.appearance);
    }

    if (this.size) {
      classes.push('bmb_divider-' + this.size);
    }

    if (this.styles) {
      classes.push('bmb_divider-' + this.styles);
    }

    return classes;
  }
}
