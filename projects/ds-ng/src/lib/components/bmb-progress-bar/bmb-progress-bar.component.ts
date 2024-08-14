import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbProgressBarVariations =
  | 'info'
  | 'warning'
  | 'error'

export type IBmbTarget =
  | '_blank'
  | '_parent'
  | '_self'
  | '_top'

@Component({
  selector: 'bmb-progress-bar',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-progress-bar.component.html',
  styleUrl: './bmb-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressBarComponent implements OnChanges {

  @Input() type: 'simple' | 'counter' | 'container' = 'simple'
  @Input() totalCount: number = 0;
  @Input() counter: number= 0;
  @Input() title: string = ''
  @Input() appearance: IBmbProgressBarVariations = 'info'
  @Input() textLink: string = '';
  @Input() href: string = '';
  @Input() target: IBmbTarget = '_blank';

  progress: number = 0;


  ngOnChanges() {
    this.verifyPercentage();
  }

  verifyPercentage(): void {
    this.progress = (this.counter/this.totalCount)*100
    if (this.progress < 0) {
      this.progress = 0;
    }

    if (this.progress > 100) {
      this.progress = 100;
    }
  }
}
