import { BmbProgressCircleOptionsInterface } from './bmb-progress-circle.interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

export class CircleProgressOptions implements BmbProgressCircleOptionsInterface {
  valueLabel = '$10000';
  showValueLabel = true;
  backgroundPadding = -9;
  percent = 50;
  radius = 100;
  space = -5;
  outerStrokeWidth = 5;
  outerStrokeLinecap = 'round';
  innerStrokeWidth = 5;
  title: string | Array<String> = 'Total a pagar';
  showTitle = true;
  showBackground = true;
  responsive = true;
}

@Component({
  selector: 'bmb-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-progress-circle.component.html',
  styleUrl: './bmb-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: CircleProgressOptions, useValue: CircleProgressOptions }
  ]
})
export class BmbProgressCircleComponent implements OnChanges{

  @Input() valueLabel?: string
  @Input() showValueLabel?: boolean;

  @Input() percent!: number;

  @Input() title?: string | Array<String>;

  @Input() showTitle?: boolean;
  @Input() showBackground?: boolean;


  responsive = true
  svg: any;
  options: CircleProgressOptions = new CircleProgressOptions();
  _lastPercent: number = 0;

  constructor(
    defaultOptions: CircleProgressOptions,
  ) {
      Object.assign(this.options, defaultOptions);
  }
  
  ngOnInit() {
    this.render();
   }

   ngOnChanges(changes: SimpleChanges) {
    this.render();
   }

  render() {
      this.applyOptions();
      this.draw(this.options.percent);
      this._lastPercent = this.options.percent;
    };

   polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
       let angleInRadius = angleInDegrees * Math.PI / 180;
       let x = centerX + Math.sin(angleInRadius) * radius;
       let y = centerY - Math.cos(angleInRadius) * radius;
       return { x: x, y: y };
   };

   draw(percent: number) {
       percent = Math.abs(percent);
       let circlePercent = (percent > 100) ? 100 : percent;
       let boxSize = this.options.radius! * 2 + this.options.outerStrokeWidth * 2;
       let centre = { x: boxSize / 2, y: boxSize / 2 };
       let startPoint = { x: centre.x, y: centre.y - this.options.radius };
       let endPoint = this.polarToCartesian(centre.x, centre.y, this.options.radius, 360 * ((100 - circlePercent)) / 100);
       let largeArcFlag: any, sweepFlag: any;
       if (circlePercent > 50) {
           [largeArcFlag, sweepFlag] = [1, 0];
       } else {
           [largeArcFlag, sweepFlag] = [0, 0];
       }
       let titlePercent = this.options.percent;
       let titleTextPercent = titlePercent
       let title = {
           x: centre.x,
           y: centre.y,
           textAnchor: 'middle',
           texts: new Array<any>(),
           tspans: new Array<any>()
       };
        if (this.title === '' || this.title === undefined) {
            title.texts.push(titleTextPercent);
        } else {
            if (this.title instanceof Array) {
                title.texts = [...this.title]
            } else {
                title.texts.push(this.title.toString());
            }
        }
       let valueLabel = {
           x: centre.x,
           y: centre.y,
           textAnchor: 'middle',
           texts: new Array<any>(),
           tspans: new Array<any>()
       }
       if (this.valueLabel === undefined) {
          valueLabel.texts.push(`0`)
        } else {
          valueLabel.texts.push(this.valueLabel);
        }
       let rowCount = 0, rowNum = 1;
       this.options.showTitle && (rowCount += title.texts.length);
       this.options.showValueLabel && (rowCount += valueLabel.texts.length);
       if (this.options.showTitle) {
           for (let span of title.texts) {
               title.tspans.push({ span: span, dy: this.getRelativeY(rowNum, rowCount) });
               rowNum++;
           }
       }
       if (this.options.showValueLabel) {
           for (let span of valueLabel.texts) {
            valueLabel.tspans.push({ span: span, dy: this.getRelativeY(rowNum, rowCount) })
            rowNum++;
           }
       }
       this.svg = {
           viewBox: `0 0 ${boxSize} ${boxSize}`,
           width: this.options.responsive ? '100%' : boxSize,
           height: this.options.responsive ? '100%' : boxSize,
           backgroundCircle: {
               cx: centre.x,
               cy: centre.y,
               r: this.options.radius + this.options.outerStrokeWidth / 2 + this.options.backgroundPadding,
           },
           path: {
               d: `M ${startPoint.x} ${startPoint.y}
       A ${this.options.radius} ${this.options.radius} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x} ${endPoint.y}`,
               strokeWidth: this.options.outerStrokeWidth,
               strokeLinecap: this.options.outerStrokeLinecap,
               fill: 'none'
           },
           circle: {
               cx: centre.x,
               cy: centre.y,
               r: this.options.radius - this.options.space - this.options.outerStrokeWidth / 2 - this.options.innerStrokeWidth / 2,
               strokeWidth: this.options.innerStrokeWidth,
           },
           title: title,
           valueLabel: valueLabel,
       };
   };

   private applyOptions() {
       this.options.radius = Math.abs(100);
       this.options.space = -5;
       this.options.percent = this.percent!
       this.options.outerStrokeWidth = 5
       this.options.innerStrokeWidth = 5
       this.options.backgroundPadding = -9;
       this.options.showTitle = this.showTitle ? this.showTitle : false
       this.options.showValueLabel = this.showValueLabel ? this.showValueLabel : false
       this.options.responsive = this.responsive!
   };

   private getRelativeY(rowNum: number, rowCount: number): string {
       let initialOffset = -0.18, offset = 1.2;
       return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
   };
}
