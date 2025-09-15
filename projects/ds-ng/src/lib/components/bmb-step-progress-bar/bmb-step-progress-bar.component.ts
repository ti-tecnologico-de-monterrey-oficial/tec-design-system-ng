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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

const MOBILE_TABLET_QUERY = '(max-width: 992px)';

@Component({
  selector: 'bmb-step-progress-bar',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-step-progress-bar.component.html',
  styleUrl: './bmb-step-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStepProgressBarComponent {
  activeStep = model<number>(0);
  totalSteps = input<number>(0);
  size = input<'normal' | 'default' | 'small' | 'medium'>('normal');
  freeze = input<boolean>(false);
  type = input<'horizontal' | 'vertical' | 'step-panel'>('vertical');
  labelSteps = input<string[]>([]);
  labelComplete = input<string>('Completo');
  labelIncomplete = input<string>('Pendiente');
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

  constructor() {
    this.mql?.addEventListener(
      'change',
      (e) => this.isMobileOrTablet.set((e as MediaQueryListEvent).matches),
      { signal: this.abort.signal },
    );
    this.destroyRef.onDestroy(() => this.abort.abort());
  }

  private truncate = (s?: string, n = 90) =>
    s ? (s.length > n ? s.slice(0, n).trimEnd() + '…' : s) : '';

  readonly maxChars = computed(() => (this.isMobileOrTablet() ? 70 : 90));

  readonly labelStepsTruncated = computed(() =>
    (this.labelSteps() || []).map((txt) => this.truncate(txt, this.maxChars())),
  );

  readonly labelCompleteTruncated = computed(() =>
    this.truncate(this.labelComplete(), this.maxChars()),
  );

  readonly labelIncompleteTruncated = computed(() =>
    this.truncate(this.labelIncomplete(), this.maxChars()),
  );

  getStepsArray(): number[] {
    return new Array(this.totalSteps() || 0).fill(0).map((_, i) => i);
  }

  onStepPanelClicked(index: number): void {
    if (!this.freeze()) {
      this.onStepPanelPress.emit(index);
    }
  }

  onStepClicked(index: number): void {
    if (!this.freeze()) {
      this.activeStep.set(index);
      this.onStepPress.emit(index);
    }
  }
}
