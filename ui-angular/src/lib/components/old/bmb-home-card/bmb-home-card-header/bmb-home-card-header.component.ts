/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  model,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../../_shared/types/colors';
import {
  IBmbActionHeader,
  IDropdownItem,
} from '../../../../_shared/types/utils';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbContainerComponent } from '../../../bmb-container/bmb-container.component';
import { BmbLayoutDirective } from '../../../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/old/bmb-layout/bmb-layout-item.directive';

import { CommonModule } from '@angular/common';
import { IBotType } from '../../bmb-chat-bar/types';
import { logDeprecatedInput } from '../../../../_shared/logic/logDeprecatedInput';
import { TranslatePipe } from '../../../../pipes/translations';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbDropdownContentComponent } from '../../utils/bmb-dropdown-content/bmb-dropdown-content.component';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
    BmbDropdownContentComponent,
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

  title = input<string>(); // deprecated

  onClose = output();
  onBack = output();
  onExpandClick = output();

  actionLimit = 3;
  isGreaterThanLimit = false;

  ngOnInit(): void {
    this.isGreaterThanLimit = !!this.actionHeaders().length;
  }

  private translationsService: BmbTranslationsService = inject(
    BmbTranslationsService,
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

  headerActionsList = computed<IBmbActionHeader[]>(() => {
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
          iconActiveToggle: this.isMobile() ? '' : mainIcon,
          alt: this.isMobile()
            ? this.translationsService.translate('home_card.close')
            : this.isExpanded()
              ? this.translationsService.translate('home_card.collapse')
              : this.translationsService.translate('home_card.expand'),
          action: () => this.handleExpandChange(),
        },
      ];
    }

    return [];
  });

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

  handleHeaderActionClick(
    event: MouseEvent,
    headerAction: IBmbActionHeader,
  ): void {
    if (headerAction.action) {
      headerAction.action(event, headerAction);
    }
  }

  handleActionItemClick(item: IDropdownItem): void {
    console.info('handleActionItemClick', item);
    //     headerAction.action(new MouseEvent(),  {
    //  icon: string;
    //  alt?: string;
    //  tooltipText?: string;
    //  iconSize?: number;
    //  iconActiveToggle?: string;
    //  isToggleActive?: boolean;
    //  isAccentColor?: boolean;
    //  link?: string;});
  }
}
