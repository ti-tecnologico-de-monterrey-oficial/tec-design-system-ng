import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbBottomNavigationBarComponent,
  IBmbFooterEvent,
  IBmbNavigationBarIcons,
} from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';
import { IDropdownItem } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { BmbDropdownMenuContentComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu-content/bmb-dropdown-menu-content.component';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { isExternalLink } from '../../utils/utils';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

export type IBmbMenuEvent = 'link' | 'openNew' | 'info';

@Component({
  selector: 'bmb-external-link',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbDropdownMenuContentComponent,
    BmbBottomNavigationBarComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
  ],
  templateUrl: './bmb-external-link.component.html',
  styleUrl: './bmb-external-link.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbExternalLinkComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  navigationBarIcons = input<IBmbNavigationBarIcons>({
    one: { name: 'arrow_back_ios', label: '' },
    two: { name: 'arrow_forward_ios', label: '' },
    three: { name: 'share', label: '' },
    four: { name: 'refresh', label: '' },
  });

  onClose = output<unknown>();
  menuEvent = output<IBmbMenuEvent>();
  footerEvent = output<IBmbFooterEvent>();

  showMenu: boolean = false;

  getSubtitleIcon(): string {
    return (
      (!!this.subtitle() && isExternalLink(this.subtitle()) && 'lock') || ''
    );
  }

  getMenuItems(): IDropdownItem[] {
    return [
      {
        icon: 'link',
        text: 'Copiar enlace',
        action: () => this.onMenuOptionClick('link'),
      },
      {
        icon: 'open_in_new',
        text: 'Abrir en navegador',
        action: () => this.onMenuOptionClick('openNew'),
      },
      {
        icon: 'info',
        text: 'Más información',
        action: () => this.onMenuOptionClick('info'),
      },
    ];
  }

  handleClose(event: any): void {
    this.onClose.emit(event);
  }

  handleOpenMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onMenuOptionClick(event: IBmbMenuEvent): void {
    this.menuEvent.emit(event);
  }

  onFooterOptionClick(event: IBmbFooterEvent): void {
    this.footerEvent.emit(event);
  }
}
