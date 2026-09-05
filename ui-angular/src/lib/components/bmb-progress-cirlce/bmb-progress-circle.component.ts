import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  buildProgressCircleOptions,
  drawProgressCircle,
  getProgressCircleContainerClasses,
  getDisplayIcon,
  getFillPathStatus,
  isProgressCircleFullColored,
  polarToCartesian as calculateProgressCircleCoordinates,
  shouldShowProgressPath,
  shouldShowValueLabel,
} from '../../_shared/logic/components/progress-circle';
import type {
  BmbProgressCircleOptionsInterface,
  BmbProgressCirclePathStatus,
  BmbProgressCircleSize,
  SvgConfig,
} from '../../_shared/types/components/progress-circle';
import { TranslatePipe } from '../../pipes/translations';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-progress-circle',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, TranslatePipe],
  templateUrl: './bmb-progress-circle.component.html',
  styleUrl: './bmb-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressCircleComponent implements OnChanges, OnInit {
  valueLabel = input<string>();
  percent = input<number>(0);
  showValueLabel = input<boolean>(false);
  componentTitle = input<string | string[]>('');
  showTitle = input<boolean>(false);
  showBackground = input<boolean>(true);
  showRestBackground = input<boolean>(false);
  fillPathStatus = input<BmbProgressCirclePathStatus>('success');
  fullFillPathStatus = input<boolean>(false);
  size = input<BmbProgressCircleSize>('default');
  icon = input<string>('');
  showOperationState = input<boolean>(false);
  emptyState = input<boolean>(false);

  /** @deprecated Use componentTitle instead. */
  title = input<string | string[]>('');

  validTitle = computed(() => this.componentTitle() || this.title());
  options = computed<BmbProgressCircleOptionsInterface>(() =>
    buildProgressCircleOptions({
      percent: this.percent() ?? 0,
      showTitle: this.showTitle() ?? false,
      showValueLabel: this.showValueLabel() ?? false,
      valueLabel: this.valueLabel() ?? '',
      title: this.validTitle() ?? '',
      showBackground: this.showBackground() ?? true,
      size: this.size() ?? 'default',
    }),
  );

  _lastPercent = 0;
  svg: SvgConfig | null = null;

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  render(): void {
    this.draw(this.options().percent);
    this._lastPercent = this.options().percent;
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ): { x: number; y: number } {
    return calculateProgressCircleCoordinates(
      centerX,
      centerY,
      radius,
      angleInDegrees,
    );
  }

  draw(percent: number): void {
    this.svg = drawProgressCircle({
      options: this.options(),
      percent,
      title: this.validTitle(),
      valueLabel: this.valueLabel(),
    });
  }

  isTitleString(): boolean {
    return typeof this.validTitle() === 'string';
  }

  getFillPathStatus(): string {
    return getFillPathStatus(this.fillPathStatus());
  }

  isFullColored(): boolean {
    return isProgressCircleFullColored(
      this.fullFillPathStatus(),
      this.fillPathStatus(),
    );
  }

  shouldShowProgressPath(): boolean {
    return shouldShowProgressPath({
      emptyState: this.emptyState(),
      percent: this.percent(),
      fullFillPathStatus: this.fullFillPathStatus(),
      fillPathStatus: this.fillPathStatus(),
    });
  }

  shouldShowValueLabel(): boolean {
    return shouldShowValueLabel({
      showOperationState: this.showOperationState(),
      fillPathStatus: this.fillPathStatus(),
      showValueLabel: this.options().showValueLabel,
      fullFillPathStatus: this.fullFillPathStatus(),
    });
  }

  displayIcon = computed(() =>
    getDisplayIcon({
      fullFillPathStatus: this.fullFillPathStatus(),
      fillPathStatus: this.fillPathStatus(),
      icon: this.icon(),
    }),
  );

  getContainerClasses(): string[] {
    return getProgressCircleContainerClasses({
      emptyState: this.emptyState(),
      showOperationState: this.showOperationState(),
      fillPathStatus: this.fillPathStatus(),
    });
  }
}
