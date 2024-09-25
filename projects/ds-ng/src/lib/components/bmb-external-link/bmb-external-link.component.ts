import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbChevronTitleSelectorComponent } from '../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import {
  BmbBottomNavigationBarComponent,
  IBmbFooterEvent,
} from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';

export type IBmbMenuEvent = 'link' | 'openNew' | 'info';

@Component({
  selector: 'bmb-external-link',
  standalone: true,
  imports: [
    BmbChevronTitleSelectorComponent,
    BmbContainerButtonComponent,
    BmbBottomNavigationBarComponent,
  ],
  templateUrl: './bmb-external-link.component.html',
  styleUrl: './bmb-external-link.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbExternalLinkComponent {
  title = input.required<string>();
  subtitle = input.required<string>();

  onClose = output<unknown>();
  menuEvent = output<IBmbMenuEvent>();
  footerEvent = output<IBmbFooterEvent>();

  showMenu: boolean = false;

  isIconSubtitle(): boolean {
    return /^https/.test(this.subtitle().toLowerCase());
  }

  handleClose(event: any): void {
    this.onClose.emit(event);
  }

  handleOpenMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onMenuOptionClick(event: IBmbMenuEvent): void {
    this.menuEvent.emit(event);
    this.showMenu = false;
  }

  onFooterOptionClick(event: IBmbFooterEvent): void {
    this.footerEvent.emit(event);
  }
}
