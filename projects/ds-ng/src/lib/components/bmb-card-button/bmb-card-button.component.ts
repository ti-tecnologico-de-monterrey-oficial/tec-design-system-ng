import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { IDropdownItem } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { IBmbActivityTags } from '../bmb-tags/bmb-tags.component';

export interface ICardButton {
  title: string;
  body?: string;
  badge?: { text: string; appearance: IBbmBgAppearance };
  tag?: { text: string; appearance: IBmbActivityTags };
  icon?: string;
  leftContentIcon?: string;
  leftContentImage?: { src: string; alt: string };
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
    BmbTagComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardButtonComponent {
  isFullInteractive = input<boolean>(true);
  title = input<string>('');
  body = input<string>('');
  badge = input<{ text: string; appearance: IBbmBgAppearance }>();
  tag = input<{ text: string; appearance: IBmbActivityTags }>();
  icon = input<string>('');
  leftContentIcon = input<string>('');
  leftContentImage = input<{ src: string; alt: string }>();
  leftContent = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);
  iconTemplate: TemplateRef<any> | null = null;
  isTemplate = input<boolean>(false);

  onAddContentClick = output<any>();
  onTitleClick = output<any>();

  handleTitleClick(event: any): void {
    this.onTitleClick.emit(event);
  }

  handleAddContent(event: any): void {
    this.onAddContentClick.emit(event);
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
