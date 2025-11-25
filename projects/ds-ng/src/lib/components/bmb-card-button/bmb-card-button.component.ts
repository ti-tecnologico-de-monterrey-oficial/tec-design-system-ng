import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';

import {
  IBmbBadgeInfo,
  IBmbImageInfo,
  IBmbLinkConfiguration,
  IDropdownItem,
} from '../../types';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';

export interface ICardButton {
  title: string;
  body?: string;
  badge?: { text: string; appearance: IBbmBgAppearance };
  icon?: string;
  leftContentIcon?: string;
  leftContentImage?: IBmbImageInfo;
  leftContent?: boolean;
  hasMenu?: boolean;
  menuItems?: IDropdownItem[];
}

@Component({
  selector: 'bmb-card-button',
  standalone: true,
  templateUrl: './bmb-card-button.component.html',
  styleUrl: './bmb-card-button.component.scss',
  imports: [
    CommonModule,
    BmbIconComponent,
    FormsModule,
    BmbBadgeComponent,
    BmbDropdownMenuComponent,
    BmbTextLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardButtonComponent {
  isFullInteractive = input<boolean>(true);
  title = input<string>('');
  body = input<string>('');
  badge = input<IBmbBadgeInfo>();
  icon = input<string>('');
  leftContentIcon = input<string>('');
  leftContentImage = input<IBmbImageInfo>();
  leftContent = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);
  iconTemplate: TemplateRef<any> | null = null; //Deprecated
  isTemplate = input<boolean>(false);
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

  isFlipped: boolean = false;

  @ContentChild('customContent') customContent!: TemplateRef<any>;

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
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
      (this.isFullInteractive() &&
        this.leftContent() &&
        !this.leftContentIcon() &&
        this.leftContentImage() &&
        !this.textLink()) ||
      !this.isFullInteractive()
    )
      this.onAddContentClick.emit(event);
  }
}
