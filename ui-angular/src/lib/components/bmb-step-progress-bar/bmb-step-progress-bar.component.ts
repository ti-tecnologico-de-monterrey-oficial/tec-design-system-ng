import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  output,
  model,
  input,
  inject,
  DestroyRef,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbSelectorDirective } from '../../directives/old/bmb-selector/bmb-selector.directive';
import {
  getActiveStepProgressNumber,
  getStepProgressIndexes,
  getStepProgressNumber,
  STEP_PROGRESS_BAR_MOBILE_TABLET_QUERY,
  truncateStepProgressLabel,
} from '../../_shared/logic/components/step-progress-bar';
import type {
  BmbStepProgressBarSize,
  BmbStepProgressBarType,
} from '../../_shared/types/components/step-progress-bar';

@Component({
  selector: 'bmb-step-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbSelectorDirective,
    BmbFocusElementComponent,
  ],
  templateUrl: './bmb-step-progress-bar.component.html',
  styleUrl: './bmb-step-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStepProgressBarComponent implements OnInit {
  activeStep = model<number>(0);
  totalSteps = input<number>(0);
  size = input<BmbStepProgressBarSize>('normal');
  freeze = input<boolean>(false);
  type = input<BmbStepProgressBarType>('vertical');
  labelSteps = input<string[]>([]);
  labelComplete = input<string>();
  labelIncomplete = input<string>();
  stepTemplates = input<TemplateRef<any>[]>([]);

  onStepPress = output<number>();
  onStepPanelPress = output<number>();

  private destroyRef = inject(DestroyRef);
  private translateService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );
  private mql =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(STEP_PROGRESS_BAR_MOBILE_TABLET_QUERY)
      : null;
  private abort = new AbortController();

  readonly isMobileOrTablet = signal<boolean>(!!this.mql?.matches);

  constructor() {
    this.mql?.addEventListener(
      'change',
      (e) => this.isMobileOrTablet.set((e as MediaQueryListEvent).matches),
      { signal: this.abort.signal },
    );
    this.destroyRef.onDestroy(() => this.abort.abort());
  }

  ngOnInit(): void {
    if (this.type() === 'step-panel') this.activeStep.set(0);
  }

  readonly maxChars = computed(() => (this.isMobileOrTablet() ? 70 : 90));

  readonly labelStepsTruncated = computed(() =>
    (this.labelSteps() || []).map((text) =>
      truncateStepProgressLabel(text, this.maxChars()),
    ),
  );

  readonly labelCompleteTruncated = computed(() =>
    truncateStepProgressLabel(
      this.labelComplete() ||
        this.translateService.translate('step_progress_bar.label_completed'),
      this.maxChars(),
    ),
  );

  readonly labelIncompleteTruncated = computed(() =>
    truncateStepProgressLabel(
      this.labelIncomplete() ||
        this.translateService.translate('step_progress_bar.label_pending'),
      this.maxChars(),
    ),
  );

  get stepsArray(): number[] {
    return getStepProgressIndexes(this.totalSteps());
  }

  handleStepPressed(index: number): void {
    this.onStepPanelPress.emit(index);
  }

  handleStepClicked(index: number): void {
    this.activeStep.set(index);
    this.onStepPress.emit(index);
  }

  getStepNumber(index: number): number {
    return getStepProgressNumber(index);
  }

  getActiveStepNumber(): number {
    return getActiveStepProgressNumber(this.activeStep());
  }
}
