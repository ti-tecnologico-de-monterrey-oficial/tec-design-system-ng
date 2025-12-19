import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  model,
  computed,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';
import { IBmbActionHeader } from '../../../types';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';
import { CommonModule } from '@angular/common';
import { BmbProjectionContentService } from '../../../services/projection/projection.service';
import { BmbActionMenuComponent } from '../../bmb-action-menu/bmb-action-menu.component';
import { IChatBarActions } from '../../bmb-chat-bar/types';
import { BmbItemComponent } from '../../bmb-item/bmb-item.component';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
    BmbNavigationBarComponent,
    BmbActionMenuComponent,
    BmbItemComponent,
  ],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  @ViewChild('chatBarActionsTemplate') chatBarTemplate!: TemplateRef<unknown>;

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
  isExpanded = model<boolean>(false);
  useAutoExpand = input<boolean>(true); //Internal
  isChat = input<boolean>(false); //Internal
  onClose = output();
  onBack = output();
  onExpandClick = output();
  actionsList = input<IChatBarActions[]>([]);

  actionHeaderList = computed<IBmbActionHeader[]>(() => {
    if (this.showRightButton()) {
      const webIcon: string = this.isExpanded()
        ? 'zoom_in_map'
        : 'zoom_out_map';
      const mainIcon: string = this.isMobile() ? 'close' : webIcon;
      return [
        ...this.actionHeaders(),
        {
          icon: mainIcon,
          isToggleActive: false,
          iconActiveToggle: mainIcon,
          action: () => this.handleExpandChange(),
        },
      ];
    }

    return [];
  });

  constructor(
    private readonly contentProjectedModal: BmbProjectionContentService,
  ) {}

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

  handleAddDialog(event: MouseEvent | KeyboardEvent): void {
    const dialogId = 'chatBarActionsDialog';

    if (this.contentProjectedModal.isContentOpen(dialogId)) {
      return;
    }

    this.contentProjectedModal.openContent({
      id: dialogId,
      content: this.chatBarTemplate,
      targetRef: event.target as HTMLElement,
      showBackdrop: false,
    });
  }
}
