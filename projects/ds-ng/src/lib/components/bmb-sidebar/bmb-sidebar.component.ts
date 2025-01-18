import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostListener,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarElement } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbIconComponent,
    BmbCheckExternalLinkButtonComponent,
  ],
  templateUrl: './bmb-sidebar.component.html',
  styleUrls: ['./bmb-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent {
  elements = input<SidebarElement[][]>([]);
  title = input<string>('Navigation');

  currentUrl: string = '';
  isOpen: boolean = false;
  selectedElement: SidebarElement | null = null;
  isActive: boolean = false;

  @HostListener('window:focusin', ['$event'])
  onFocusIn() {
    this.checkIfFocusInsideSidebar();
  }

  @HostListener('window:focusout', ['$event'])
  onFocusOut() {
    this.checkIfFocusInsideSidebar();
  }

  getLink(link: string, hasChildren: boolean): string {
    if (!hasChildren) return link;
    return '';
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  toggleChildren(element: SidebarElement) {
    if (this.selectedElement === element) {
      this.selectedElement = null;
      return;
    }

    this.selectedElement = element;
  }

  closeSideBar() {
    this.selectedElement = null;
  }

  checkIfFocusInsideSidebar() {
    const sidebar = document.querySelector('.bmb_sidebar-desktop');
    const activeElement = document.activeElement;
    this.isActive =
      (sidebar && activeElement && sidebar.contains(activeElement)) || false;
  }
}
