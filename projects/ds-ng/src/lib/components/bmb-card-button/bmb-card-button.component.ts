import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { IDropdownItem } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import {
  IBmbBadgeInfo,
  IBmbImageInfo,
  IBmbLinkConfiguration,
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
  styleUrls: ['./bmb-card-button.component.scss'],
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
  iconTemplate: TemplateRef<any> | null = null;//Deprecated
  isTemplate = input<boolean>(false);
  textLink = input<IBmbLinkConfiguration>();

  onAddContentClick = output<any>();
  onTitleClick = output<any>();
  onSmallClick = output<void>();

  //Small card
  isSmall = input<boolean>(false);
  botIcon = input<string>('');
  botImage = input<IBmbImageInfo>();
  smallIcon = input<string>('');
  smallTitle = input<string>('');
  smallDescription = input<string>('');

  isFlipped: boolean = false;

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  handleSmallClick(event: any): void {
    this.isFlipped = !this.isFlipped;
    this.onSmallClick.emit(event);
  }

  handleTitleClick(event: any): void {
    this.onTitleClick.emit(event);
  }

  handleAddContent(event: any): void {
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
