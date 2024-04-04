import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

@Component({
  selector: 'bmb-home-section',
  standalone: true,
  imports: [CommonModule, BmbContainerComponent, BmbIconComponent],
  styleUrl: './bmb-home-section.component.scss',
  templateUrl: './bmb-home-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHomeSectionComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() target: string = '';
  @Input() link: string = '';

  constructor() {}
}
