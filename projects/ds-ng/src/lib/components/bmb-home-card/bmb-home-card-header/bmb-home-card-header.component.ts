import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  model,
} from '@angular/core';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';
import { IBmbActionHeader } from '../../../types';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
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
  showRightButton = input<boolean>(true);
  isExpanded = model<boolean>(false); //Internal
  useAutoExpand = input<boolean>(true); //Internal

  onClose = output();
  onBack = output();
  onExpandClick = output();

  actionHeaderList: IBmbActionHeader[] = [];

  ngOnInit(): void {
    if (this.showRightButton()) {
      const mainIcon: string = this.isMobile() ? 'close' : 'fit_screen';
      const iconActiveToggle: string = this.isMobile()
        ? ''
        : 'close_fullscreen';
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
  }

  getIconName(): string {
    return (!this.isMobile() && this.icon()) || '';
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
    } else {
      this.onExpandClick.emit();
    }
  }
}
