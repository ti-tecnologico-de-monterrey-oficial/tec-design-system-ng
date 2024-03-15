import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
@Component({
  selector: 'bmb-container-button',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-container-button.component.scss',
  templateUrl: './bmb-container-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbContainerButtonComponent {
  @Input() title: string = '';
  @Input() score: string = '';
  @Input() square: boolean = false;
  @Input() target: string = '';
  @Input() link: string = '';
  @Input() subtitle: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
}
