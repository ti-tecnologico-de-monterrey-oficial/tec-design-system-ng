import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-skeleton',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./bmb-skeleton.component.scss'],
  templateUrl: './bmb-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSkeletonComponent {
  @Input() type: string = '';
}
