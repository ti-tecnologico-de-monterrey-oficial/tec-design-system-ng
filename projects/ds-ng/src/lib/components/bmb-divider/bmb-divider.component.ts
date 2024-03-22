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
  @Input() type: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['bmb_divider'];

    if (this.type) {
      classes.push('bmb_divider-' + this.type);
    }

    return classes;
  }
}
