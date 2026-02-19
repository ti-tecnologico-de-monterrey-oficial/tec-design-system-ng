import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  IBmbTimelineCustomEvent,
  ITimelineEventType,
} from '../bmb-timestream/types';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

const MOBILE_QUERY = '(max-width: 767px)';

@Component({
  selector: 'bmb-hito-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbIconComponent,
    BmbBadgeComponent,
  ],
  templateUrl: './bmb-hito-card.component.html',
  styleUrl: './bmb-hito-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHitoCardComponent {
  icon = input<string>();
  id = input.required<string | number>();
  short_description = input<string>('');
  type = input.required<ITimelineEventType | IBmbTimelineCustomEvent>();
  sub_content = input<string>();
  enable_bullet = input<boolean>(false);
  is_active = input<boolean>(false);
  isCompact = input<boolean>(false);
  alternative_appearance = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  handleClick = output<string | number>();

  private destroyRef = inject(DestroyRef);
  private mql =
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null;
  private abort = new AbortController();

  readonly isMobile = signal<boolean>(!!this.mql?.matches);

  constructor() {
    this.mql?.addEventListener(
      'change',
      (e) => this.isMobile.set((e as MediaQueryListEvent).matches),
      { signal: this.abort.signal },
    );
    this.destroyRef.onDestroy(() => this.abort.abort());

    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle }
      );
    });
  }

  private t = (s?: string, n = 90) =>
    s ? (s.length > n ? s.slice(0, n).trimEnd() + '…' : s) : '';

  readonly titleDisplayed = computed(() => {
    const title = this.componentTitle() || this.title();
    return this.isMobile() ? this.t(title, 30) : title;
  });

  getClassList(): string[] {
    const classList = ['bmb_hito-card'];
    if (this.enable_bullet()) classList.push('bmb_hito-card-bullet');
    if (this.is_active()) classList.push('bmb_hito-card-active');
    if (this.isCompact()) classList.push('bmb_hito-card-compact');

    return classList;
  }

  handleEventChange() {
    this.handleClick.emit(this.id());
  }

  formatBadgeText(legend: string | IBmbTimelineCustomEvent): string {
    if (typeof legend === 'string') return legend.replace(/_/g, ' ');
    return legend.text.replace(/_/g, ' ');
  }

  getHitoIconClass(): string {
    if (typeof this.type() === 'string') return this.type() as string;
    return (this.type() as IBmbTimelineCustomEvent).type || 'custom';
  }

  appearanceBadge(): IBbmBgAppearance {
    if (typeof this.type() === 'string') {
      switch (this.type()) {
        case 'active':
          return 'strong';
        case 'done':
          return 'success';
        case 'pending':
          return 'normal';
        case 'under_review':
          return 'warning';
        case 'canceled':
          return 'error';
        default:
          return 'strong';
      }
    }
    return (this.type() as IBmbTimelineCustomEvent).type || 'normal';
  }
}
