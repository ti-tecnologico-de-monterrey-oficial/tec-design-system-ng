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
import { TranslatePipe } from '../../pipes/translations';
import {
  buildProgressCircleOptions,
  drawProgressCircle,
  getContainerClasses,
  getDisplayIcon,
  getFillPathStatus,
  shouldShowProgressPath,
  shouldShowValueLabel,
} from '../../_shared/logic/components/progress-circle';
import type {
  BmbProgressCircleOptionsInterface,
  BmbProgressCirclePathStatus,
  BmbProgressCircleSize,
  SvgConfig,
} from '../../_shared/types';
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
  title = input<string | string[]>(''); // deprecated

  readonly validTitle = computed(() => this.componentTitle() || this.title());
  readonly options = computed<BmbProgressCircleOptionsInterface>(() =>
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
  readonly displayIcon = computed(() =>
    getDisplayIcon({
      fullFillPathStatus: this.fullFillPathStatus(),
      fillPathStatus: this.fillPathStatus(),
      icon: this.icon(),
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
    this.svg = drawProgressCircle({
      options: this.options(),
      percent: this.options().percent,
      title: this.validTitle(),
      valueLabel: this.valueLabel(),
    });
    this._lastPercent = this.options().percent;
  }

  isTitleString(): boolean {
    return typeof this.validTitle() === 'string';
  }

  getFillPathStatus(): string {
    return getFillPathStatus(this.fillPathStatus());
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

  getContainerClasses(): string[] {
    return getContainerClasses({
      emptyState: this.emptyState(),
      showOperationState: this.showOperationState(),
      fillPathStatus: this.fillPathStatus(),
    });
  }
}
