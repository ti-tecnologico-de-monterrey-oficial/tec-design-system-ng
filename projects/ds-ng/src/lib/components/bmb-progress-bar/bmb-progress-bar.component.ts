import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, OnChanges } from '@angular/core';

@Component({
  selector: 'bmb-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-progress-bar.component.html',
  styleUrl: './bmb-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressBarComponent implements OnChanges {

  @Input() progress: number = 0;

  ngOnChanges(){
    this.verifyPercentage()
  }

  verifyPercentage(): void {
    if(this.progress < 0 ){
      this.progress = 0
    }

    if(this.progress > 100 ){
      this.progress = 100
    }
  }
}
