import {
  BmbProgressCircleOptionsInterface,
  BmbProgressCircleSize,
} from './bmb-progress-circle.interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { TranslatePipe } from '../../pipes/translations';

import {
  buildProgressCircleOptions,
  drawProgressCircle,
  getFillPathStatus,
  shouldShowProgressPath,
  shouldShowValueLabel,
  getDisplayIcon,
  getContainerClasses,
} from '../../_core/logic/components/progress-circle/progress-circle';

import {
  SvgConfig,
} from '../../_core/logic/components/progress-circle/types';

@Component({
  selector: 'bmb-progress-circle',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, TranslatePipe],
  templateUrl: './bmb-progress-circle.component.html',
  styleUrl: './bmb-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressCircleComponent
  implements OnInit, OnChanges
{
  valueLabel = input<string>();
  percent = input<number>(0);
  showValueLabel = input<boolean>(false);
  componentTitle = input<string | string[]>('');
  showTitle = input<boolean>(false);
  showBackground = input<boolean>(true);
  showRestBackground = input<boolean>(false);
  fillPathStatus = input<
    'gray' | 'success' | 'error' | 'warning'
  >('success');
  fullFillPathStatus = input<boolean>(false);
  size = input<BmbProgressCircleSize>('default');
  icon = input<string>('');
  showOperationState = input<boolean>(false);
  emptyState = input<boolean>(false);

  title = input<string | string[]>(''); // deprecated

  validTitle = computed(
    () => this.componentTitle() || this.title(),
  );

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

  svg: SvgConfig | null = null;
  private _lastPercent = 0;

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
      percent: this.percent() ?? 0,
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
    return getContainerClasses({
      emptyState: this.emptyState(),
      showOperationState: this.showOperationState(),
      fillPathStatus: this.fillPathStatus(),
    });
  }
}