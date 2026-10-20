import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  contentChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { isABotIcon } from '../../_shared/logic/botIcon';

import {
  IBmbBadgeInfo,
  IBmbImageInfo,
  IBmbLinkConfiguration,
  IDropdownItem,
} from '../../_shared/types';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  shouldEmitCardButtonAddContent,
  truncateCardButtonText,
} from '../../_shared/logic/components/card-button';


@Component({
  selector: 'bmb-card-button',
  standalone: true,
  templateUrl: './bmb-card-button.component.html',
  styleUrl: './bmb-card-button.component.scss',
  imports: [
    CommonModule,
    BmbBotIconComponent,
    BmbIconComponent,
    FormsModule,
    BmbBadgeComponent,
    BmbDropdownMenuComponent,
    BmbTextLinkComponent,
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardButtonComponent {
  isFullInteractive = input<boolean>(true);
  componentTitle = input<string>('');
  body = input<string>('');
  badge = input<IBmbBadgeInfo>();
  icon = input<string>('');
  leftContentIcon = input<string>('');
  leftContentImage = input<IBmbImageInfo>();
  leftContent = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);
  isTemplate = input<boolean>(false);
  isDisabled = input<boolean>(false);
  textLink = input<IBmbLinkConfiguration>();

  onAddContentClick = output<MouseEvent | KeyboardEvent>();
  onTitleClick = output<MouseEvent | KeyboardEvent>();
  onSmallClick = output<MouseEvent>();

  //Small card
  isSmall = input<boolean>(false);
  botIcon = input<string>('');
  botImage = input<IBmbImageInfo>();
  smallIcon = input<string>('');
  smallTitle = input<string>('');
  smallDescription = input<string>('');

  title = input<string>(); // deprecated

  isFlipped = false;

  customContent = contentChild<TemplateRef<any>>('customContent');

  truncateText(text: string, maxLength: number): string {
    return truncateCardButtonText(text, maxLength);
  }

  handleSmallClick(event: MouseEvent): void {
    this.isFlipped = !this.isFlipped;
    this.onSmallClick.emit(event);
  }

  handleTitleClick(event: MouseEvent | KeyboardEvent): void {
    this.onTitleClick.emit(event);
  }

  handleAddContent(event: MouseEvent | KeyboardEvent): void {
    if (
      shouldEmitCardButtonAddContent(
        this.isFullInteractive(),
        this.leftContent(),
        this.leftContentIcon(),
        this.leftContentImage(),
        this.textLink(),
      )
    )
      this.onAddContentClick.emit(event);
  }

  isABotTemplate(icon: string): boolean {
    return isABotIcon(icon);
  }
}
