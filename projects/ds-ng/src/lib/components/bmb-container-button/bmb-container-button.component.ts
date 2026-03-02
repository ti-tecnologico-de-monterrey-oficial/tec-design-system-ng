import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  model,
  signal,
  computed,
  inject,
  DestroyRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { IBbmBgAppearance, IBmbTargetLink, IDropdownItem } from '../../types';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbBookmarkComponent } from '../bmb-bookmark/bmb-bookmark.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

const MOBILE_TABLET_QUERY = '(max-width: 992px)';
@Component({
  selector: 'bmb-container-button',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbUserImageComponent,
    BmbIconComponent,
    BmbGradeValueComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBadgeComponent,
    BmbActionIconComponent,
    BmbBookmarkComponent,
    BmbDropdownMenuComponent,
  ],
  styleUrl: './bmb-container-button.component.scss',
  templateUrl: './bmb-container-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbContainerButtonComponent {
  componentTitle = input<string>();
  score = input<string>('');
  square = input<boolean>();
  small = input<boolean>();
  target = input<IBmbTargetLink>('_blank');
  link = input<string>('');
  subtitle = input<string>('');
  iconLeft = input<string>('');
  isUserImage = input<boolean>(false);
  iconRight = input<string>('');
  badgeText = input<string>('');
  badgeAppearance = input<IBbmBgAppearance>('normal');
  state = input<'disabled' | 'error'>();
  alternative = input<boolean>(false);
  enableSecondaryAction = input<boolean>(false);
  enableBookmark = input<boolean>(false);
  isBookmarkActive = model<boolean>(false);
  dropdownMenuItems = input<IDropdownItem[]>([]);

  title = input<string>(); // deprecated

  onButton = output<MouseEvent>();
  secondaryAction = output<MouseEvent>();

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

    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  getClassList(): string[] {
    const classList = ['bmb_container-button'];
    if (this.square()) {
      classList.push('bmb_container-button-square');
    }

    if (this.square() && this.small() && !this.iconLeft()) {
      classList.push('bmb_container-button-square-no-icon');
    }

    if (this.small()) {
      classList.push('bmb_container-button-small');
    }

    if (this.state() === 'disabled') {
      classList.push('bmb_container-button-disabled');
    }

    if (this.state() === 'error') {
      classList.push('bmb_container-button-error');
    }

    if (this.alternative()) {
      classList.push('bmb_container-button-alternative');
    }
    return classList;
  }

  handleClick(event: any): void {
    this.onButton.emit(event);
  }

  handleSecondaryClick(event: any): void {
    this.secondaryAction.emit(event);
  }
}
