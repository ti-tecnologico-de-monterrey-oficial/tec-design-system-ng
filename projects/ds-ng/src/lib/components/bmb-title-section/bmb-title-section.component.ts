import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-title-section',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-title-section.component.scss',
  templateUrl: './bmb-title-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTitleSectionComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() target: string = '';
  @Input() link: string = '';
}
