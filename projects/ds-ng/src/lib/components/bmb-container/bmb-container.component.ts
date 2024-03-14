import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-container',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './bmb-container.component.scss',
  templateUrl: './bmb-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbContainerComponent {
  @Input() appearance: string = '';

  constructor() {}

  getClasses(): string[] {
    const classes: string[] = ['bmb_container'];

    if (this.appearance) {
      classes.push('bmb_container-' + this.appearance);
    }

    return classes;
  }
}
