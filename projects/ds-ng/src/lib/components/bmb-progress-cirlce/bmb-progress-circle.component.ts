import { BmbProgressCircleOptionsInterface } from './bmb-progress-circle.interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type BmbProgressCirclePathStatus =
  | 'gray'
  | 'success'
  | 'error'
  | 'warning';

// Add this interface at the top of your file or in a suitable place
interface SvgConfig {
  viewBox: string;
  height: number | string;
  width: number | string;
  backgroundCircle: {
    cx: number;
    cy: number;
    r: number;
  };
  circle: {
    cx: number;
    cy: number;
    r: number;
    strokeWidth: number;
  };
  path: {
    d: string;
    strokeWidth: number;
    fill: string;
    strokeLinecap: string;
  };
}

@Component({
  selector: 'bmb-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-progress-circle.component.html',
  styleUrl: './bmb-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressCircleComponent implements OnChanges {
  valueLabel = input<string>();
  percent = input<number>(0);
  showValueLabel = input<boolean>(false);
  title = input<string | string[]>('');
  showTitle = input<boolean>(false);
  showBackground = input<boolean>(true);
  showRestBackground = input<boolean>(false);
  fillPathStatus = input<BmbProgressCirclePathStatus>('success');
  fullFillPathStatus = input<boolean>(false);

  options = computed<BmbProgressCircleOptionsInterface>(() => {
    const opts: BmbProgressCircleOptionsInterface = {
      responsive: true,
      backgroundPadding: -9,
      radius: 100,
      space: -5,
      outerStrokeWidth: 5,
      outerStrokeLinecap: 'round',
      innerStrokeWidth: 5,
      percent: this.percent() ?? 0,
      showTitle: this.showTitle() ?? false,
      showValueLabel: this.showValueLabel() ?? false,
      valueLabel: this.valueLabel() ?? '',
      title: this.title() ?? '',
      showBackground: this.showBackground() ?? true,
    };
    return opts;
  });

  _lastPercent: number = 0;
  svg: SvgConfig | null = null;

  ngOnInit() {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  render() {
    this.draw(this.options().percent);
    this._lastPercent = this.options().percent;
  }

  isTitleString(): boolean {
    return typeof this.title() === 'string';
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) {
    let angleInRadius = (angleInDegrees * Math.PI) / 180;
    let x = centerX + Math.sin(angleInRadius) * radius;
    let y = centerY - Math.cos(angleInRadius) * radius;
    return { x: x, y: y };
  }

  draw(percent: number) {
    percent = Math.abs(percent);
    let circlePercent = percent > 100 ? 100 : percent;
    let boxSize =
      this.options().radius * 2 + this.options().outerStrokeWidth * 2;
    let centre = { x: boxSize / 2, y: boxSize / 2 };
    let startPoint = { x: centre.x, y: centre.y - this.options().radius };
    let endPoint = this.polarToCartesian(
      centre.x,
      centre.y,
      this.options().radius,
      (360 * circlePercent) / 100,
    );
    let largeArcFlag: any, sweepFlag: any;
    if (circlePercent > 50) {
      [largeArcFlag, sweepFlag] = [1, 0];
    } else {
      [largeArcFlag, sweepFlag] = [0, 0];
    }
    let titlePercent = this.options().percent;
    let titleTextPercent = titlePercent;
    let title = {
      x: centre.x,
      y: centre.y,
      textAnchor: 'middle',
      texts: new Array<any>(),
      tspans: new Array<any>(),
    };
    if (this.title() === '') {
      title.texts.push(titleTextPercent);
    } else {
      if (this.title() instanceof Array) {
        title.texts = [...this.title()];
      } else {
        title.texts.push(this.title().toString());
      }
    }
    let valueLabel = {
      x: centre.x,
      y: centre.y,
      textAnchor: 'middle',
      texts: new Array<any>(),
      tspans: new Array<any>(),
    };
    if (this.valueLabel() === undefined) {
      valueLabel.texts.push(`0`);
    } else {
      valueLabel.texts.push(this.valueLabel());
    }
    let rowCount = 0,
      rowNum = 1;
    this.options().showTitle && (rowCount += title.texts.length);
    this.options().showValueLabel && (rowCount += valueLabel.texts.length);
    if (this.options().showTitle) {
      for (let span of title.texts) {
        title.tspans.push({
          span: span,
          dy: this.getRelativeY(rowNum, rowCount),
        });
        rowNum++;
      }
    }
    if (this.options().showValueLabel) {
      for (let span of valueLabel.texts) {
        valueLabel.tspans.push({
          span: span,
          dy: this.getRelativeY(rowNum, rowCount),
        });
        rowNum++;
      }
    }
    this.svg = {
      viewBox: `0 0 ${boxSize} ${boxSize}`,
      width: this.options().responsive ? '100%' : boxSize,
      height: this.options().responsive ? '100%' : boxSize,
      backgroundCircle: {
        cx: centre.x,
        cy: centre.y,
        r:
          this.options().radius +
          this.options().outerStrokeWidth / 2 +
          this.options().backgroundPadding,
      },
      path: {
        d: `
          M ${startPoint.x} ${startPoint.y}
          A ${this.options().radius} ${this.options().radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}
        `,
        strokeWidth: this.options().outerStrokeWidth,
        strokeLinecap: this.options().outerStrokeLinecap,
        fill: 'none',
      },
      circle: {
        cx: centre.x,
        cy: centre.y,
        r:
          this.options().radius -
          this.options().space -
          this.options().outerStrokeWidth / 2 -
          this.options().innerStrokeWidth / 2,
        strokeWidth: this.options().innerStrokeWidth,
      },
    };
  }

  private getRelativeY(rowNum: number, rowCount: number): string {
    let initialOffset = -0.18,
      offset = 1.2;
    return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
  }

  getFillPathStatus(): string {
    return `bmb_progress-circle-fill-${this.fillPathStatus()}`;
  }

  isFullColored(): boolean {
    const status = this.fillPathStatus();
    return (
      this.fullFillPathStatus() &&
      ['success', 'error', 'warning'].includes(status)
    );
  }

  shouldShowProgressPath(): boolean {
    return !!this.percent() && !this.isFullColored();
  }

  shouldShowValueLabel(): boolean {
    return this.options().showValueLabel && !this.isFullColored();
  }
}
