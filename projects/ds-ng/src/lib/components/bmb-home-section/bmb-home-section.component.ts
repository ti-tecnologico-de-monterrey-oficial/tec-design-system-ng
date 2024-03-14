import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbTitleSectionComponent } from '../bmb-title-section/bmb-title-section.component';

@Component({
  selector: 'bmb-home-section',
  standalone: true,
  imports: [CommonModule, BmbContainerComponent, BmbTitleSectionComponent],
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
