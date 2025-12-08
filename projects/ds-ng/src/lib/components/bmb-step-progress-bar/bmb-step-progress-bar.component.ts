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
import { ɵEmptyOutletComponent } from '@angular/router';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbSelectorDirective } from '../../directives/bmb-selector/bmb-selector.directive';

const MOBILE_TABLET_QUERY = '(max-width: 992px)';

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
    ɵEmptyOutletComponent,
  ],
  templateUrl: './bmb-step-progress-bar.component.html',
  styleUrl: './bmb-step-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStepProgressBarComponent implements OnInit {
  activeStep = model<number>(0);
  totalSteps = input<number>(0);
  size = input<'normal' | 'default' | 'small' | 'medium'>('normal');
  freeze = input<boolean>(false);
  type = input<'horizontal' | 'vertical' | 'step-panel'>('vertical');
  labelSteps = input<string[]>([]);
  labelComplete = input<string>();
  labelIncomplete = input<string>();
  stepTemplates = input<TemplateRef<any>[]>([]);

  onStepPress = output<number>();
  onStepPanelPress = output<number>();

  private destroyRef = inject(DestroyRef);
  private mql =
    typeof window !== 'undefined'
      ? window.matchMedia(MOBILE_TABLET_QUERY)
      : null;
  private abort = new AbortController();

  readonly isMobileOrTablet = signal<boolean>(!!this.mql?.matches);

  constructor(private translateService: BmbTranslationsService) {
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

  private truncate = (s?: string, n = 90) =>
    s ? (s.length > n ? s.slice(0, n).trimEnd() + '…' : s) : '';

  readonly maxChars = computed(() => (this.isMobileOrTablet() ? 70 : 90));

  readonly labelStepsTruncated = computed(() =>
    (this.labelSteps() || []).map((txt) => this.truncate(txt, this.maxChars())),
  );

  readonly labelCompleteTruncated = computed(() =>
    this.truncate(
      this.labelComplete() ||
        this.translateService.translate('step_progress_bar.label_completed'),
      this.maxChars(),
    ),
  );

  readonly labelIncompleteTruncated = computed(() =>
    this.truncate(
      this.labelIncomplete() ||
        this.translateService.translate('step_progress_bar.label_pending'),
      this.maxChars(),
    ),
  );

  get stepsArray(): number[] {
    return new Array(this.totalSteps() || 0).fill(0).map((_, i) => i);
  }

  handleStepPressed(index: number): void {
    this.onStepPanelPress.emit(index);
  }

  handleStepClicked(index: number): void {
    this.activeStep.set(index);
    this.onStepPress.emit(index);
  }

  getStepNumber(index: number): number {
    return index + 1;
  }

  getActiveStepNumber(): number {
    return this.activeStep() + 1;
  }
}
