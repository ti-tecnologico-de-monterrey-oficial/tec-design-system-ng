import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, AfterViewInit, OnChanges } from '@angular/core';
import {MatProgressBarModule, MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'bmb-progress-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBar, MatProgressBarModule],
  templateUrl: './bmb-progress-bar.component.html',
  styleUrl: './bmb-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressBarComponent implements AfterViewInit, OnChanges {

  @Input() progress: number = 0;
  constructor() { }

  ngAfterViewInit(): void {
  }

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
