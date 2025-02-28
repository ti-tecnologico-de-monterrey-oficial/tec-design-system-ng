import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';
import { IBmbActionHeader } from '../../../types';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbNavigationIconComponent } from '../../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbNavigationIconComponent,
    BmbTitleContentComponent,
    BmbNavigationBarComponent,
  ],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  iconSize = input<number>();
  bgIconAppearance = input<IBmbColor>();
  actionHeaders = input<IBmbActionHeader[]>([]);
  isMobile = input<boolean>();

  onClose = output();
  onBack = output();

  isExpanded: boolean = false;
  actionHeaderList: IBmbActionHeader[] = [];
  private originalParent: HTMLElement | null = null;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    const mainIcon: string = this.isMobile() ? 'close' : 'fit_screen';
    const iconActiveToggle: string = this.isMobile() ? '' : 'close_fullscreen';
    this.actionHeaderList = [
      ...this.actionHeaders(),
      {
        icon: mainIcon,
        iconActiveToggle: iconActiveToggle,
        isToggleActive: false,
        action: () => this.handleExpandChange(),
      },
    ];
  }

  getIconName(): string {
    if (!!this.icon() && !this.isMobile()) return this.icon()!;
    return '';
  }

  getDataLocalNav(): IBmbDataTopBar[] {
    if (this.isMobile()) return [];
    return this.dataLocalNav();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleExpandChange(): void {
    if (this.isMobile()) {
      this.onClose.emit();
      return;
    }

    this.isExpanded = !this.isExpanded;

    const homeCardElement = this.elRef.nativeElement.closest('.bmb_home-card');

    if (homeCardElement) {
      const rect = homeCardElement.getBoundingClientRect();
      const screenCenter = window.innerWidth / 2;
      const isLeft = rect.left < screenCenter;

      if (this.isExpanded) {
        if (!this.originalParent) {
          this.originalParent = homeCardElement.closest('bmb-home-card');
        }

        this.renderer.appendChild(document.body, homeCardElement);
        this.renderer.addClass(homeCardElement, 'bmb_home-card-expanded');

        if (isLeft) {
          this.renderer.addClass(homeCardElement, 'expand-left');
          this.renderer.removeClass(homeCardElement, 'expand-right');
        } else {
          this.renderer.addClass(homeCardElement, 'expand-right');
          this.renderer.removeClass(homeCardElement, 'expand-left');
        }
      } else {
        if (this.originalParent) {
          this.renderer.appendChild(this.originalParent, homeCardElement);
        }

        this.renderer.removeClass(homeCardElement, 'bmb_home-card-expanded');
        this.renderer.removeClass(homeCardElement, 'expand-left');
        this.renderer.removeClass(homeCardElement, 'expand-right');
      }
    }
  }
}
