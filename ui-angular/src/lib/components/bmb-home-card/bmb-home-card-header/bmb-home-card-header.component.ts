/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  model,
  effect,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
  signal,
  computed,
} from '@angular/core';

import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../_shared/types/colors';
import { IBmbActionHeader } from '../../../_shared/types/utils';
import { IBotType } from '../../bmb-chat-bar/types';

import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';
import { BmbActionMenuComponent } from '../../bmb-action-menu/bmb-action-menu.component';
import { BmbItemActionsComponent } from '../../bmb-item/bmb-item-actions/bmb-item-actions.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';

import { logDeprecatedInput } from '../../../_shared/logic/logDeprecatedInput';
import { buildMaxElementsErrorMessage } from '../../../_shared/logic/utils';
import { TranslatePipe } from '../../../pipes/translations';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../../services/old/projection/projection.service';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
    BmbActionMenuComponent,
    BmbItemActionsComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    TranslatePipe,
  ],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent implements OnInit {
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
  currentBot = model<IBotType>();
  componentTitle = input<string>(); // once title is removed, this should be required
  showOneHeaderAction = input<boolean>(false);

  title = input<string>(); // deprecated

  onClose = output();
  onBack = output();
  onExpandClick = output();

  @ViewChild('actionMenu') actionMenu!: TemplateRef<unknown>;

  GENERAL_ACTIONS_LIMIT = 2;
  AI_CHAT_CARD_PARTICULARITY_LIMIT = 1;
  actionsLimit = computed(() =>
    this.showOneHeaderAction()
      ? this.AI_CHAT_CARD_PARTICULARITY_LIMIT
      : this.GENERAL_ACTIONS_LIMIT,
  );
  MAX_ACTIONS = 8;
  isGreaterThanLimit = false;
  idActionMenu = signal<string>('');
  private readonly contentProjected: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  ngOnInit(): void {
    this.isGreaterThanLimit = this.actionHeaders().length > this.actionsLimit();

    if (this.actionHeaders().length > this.MAX_ACTIONS) {
      throw new Error(buildMaxElementsErrorMessage(this.MAX_ACTIONS));
    }
  }

  protected getHeaderAction(index: number): IBmbActionHeader {
    return this.actionHeaders()[index];
  }

  protected getIconName(): string {
    return (!this.isMobile() && this.icon()) || '';
  }

  protected getDataLocalNav(): IBmbDataTopBar[] {
    if (this.isMobile()) return [];
    return this.dataLocalNav();
  }

  protected handleBack(): void {
    this.onBack.emit();
  }

  protected handleExpandChange(): void {
    this.onExpandClick.emit();
  }

  protected handleCloseChange(): void {
    this.onClose.emit();
    this.contentProjected.closeContent(this.idActionMenu());
  }

  protected handleHeaderActionClick(
    event: MouseEvent,
    headerAction: IBmbActionHeader,
  ): void {
    if (headerAction.action) {
      headerAction.action(event, headerAction);
    }
  }

  protected handleOpenActionMenu(event: MouseEvent | KeyboardEvent): void {
    if (!event.target) return;
    const data: IBmbProjectionContent = {
      content: this.actionMenu,
      targetRef: event.target as HTMLElement,
    };

    this.idActionMenu.set(this.contentProjected.openContent(data));
  }

  protected handleCloseActionMenu(
    event: MouseEvent,
    headerAction: IBmbActionHeader,
  ): void {
    if (headerAction.action) {
      headerAction.action(event, headerAction);
    }

    this.contentProjected.closeContent(this.idActionMenu());
  }
}
