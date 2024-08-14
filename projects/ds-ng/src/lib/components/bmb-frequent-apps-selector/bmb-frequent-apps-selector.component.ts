import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { IBmbApp } from '../../types';

@Component({
  selector: 'bmb-frequent-apps-selector',
  styleUrl: './bmb-frequent-apps-selector.component.scss',
  templateUrl: './bmb-frequent-apps-selector.component.html',
  standalone: true,
  imports: [CommonModule, BmbContainerComponent, BmbInteractiveIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbFrequentAppsSelectorComponent {
  @Input() title: string = '';
  @Input() apps: IBmbApp[] = [];
}
