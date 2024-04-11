import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-focus-element',
  styleUrl: './bmb-focus-element.component.scss',
  templateUrl: './bmb-focus-element.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbFocusElementComponent {
  @Input() icon: string = '';
  @Input() number: number = 0;
  @Input() title: string = '';
}
