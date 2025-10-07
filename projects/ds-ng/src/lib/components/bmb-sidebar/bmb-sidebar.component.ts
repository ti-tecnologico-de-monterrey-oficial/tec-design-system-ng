import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostListener,
  input,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarElement } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IPositionButtonMenu } from '../bmb-top-bar/types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

interface IBmbIsButton {
  link?: string;
  isMobile: boolean;
  hasChildren: boolean;
}

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCheckExternalLinkButtonComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent implements OnInit {
  elements = input<SidebarElement[][]>([]);
  title = input<string>('Navigation');
  position = input<IPositionButtonMenu>('left'); //Only for web

  currentUrl: string = '';
  isOpen: boolean = false;
  selectedElement: SidebarElement | null = null;
  isActive: boolean = false;
  hasSubmenu: boolean = false;
  maxChildrenLevel: number = 2;

  @ViewChild('sideNav') sideNav!: ElementRef;

  @HostListener('window:focusin', ['$event'])
  onFocusIn() {
    this.checkIfFocusInsideSidebar();
  }

  @HostListener('window:focusout', ['$event'])
  onFocusOut() {
    this.checkIfFocusInsideSidebar();
  }

  ngOnInit(): void {
    if (this.elements()?.length > 2) {
      console.error(
        'The sidebar component only supports two levels of navigation',
      );
    }

    if (this.elements()[0]?.length > 5) {
      console.error(
        'The sidebar component only supports a maximum of 5 elements in the first level of navigation',
      );
    }

    if (this.elements()[1] && this.elements()[1]?.length > 3) {
      console.error(
        'The sidebar component only supports a maximum of 3 elements in the second level of navigation',
      );
    }

    this.hasSubmenu = this.elements()?.some((element) =>
      element?.some((el) => el.children),
    );
  }

  checkForButton({
    isMobile,
    hasChildren
  }: IBmbIsButton): boolean {
    return isMobile && hasChildren;
  }

  getLink({
    link,
    isMobile,
    hasChildren,
  }: IBmbIsButton): string {
    if (this.checkForButton({ isMobile, hasChildren })) return '';
    return link || '';
  }

  closeSidebar() {
    this.isOpen = false;
    this.clearSelectElement();
  }

  clearSelectElement() {
    this.selectedElement = null;
  }

  toggleChildren(element: SidebarElement) {
    if (this.selectedElement === element) {
      this.clearSelectElement();
      return;
    }

    this.selectedElement = element;

    if (element.children) {
      element.isOpen = !element.isOpen;
    }
  }

  checkIfFocusInsideSidebar() {
    const sidebar = document.querySelector('.bmb_sidebar-desktop');
    const activeElement = document.activeElement;
    this.isActive =
      (sidebar && activeElement && sidebar.contains(activeElement)) || false;
  }

  checkToCloseSidebar(event: any) {
    if (event.link && !event.children) {
      this.closeSidebar();
      this.sideNav.nativeElement.classList.add('bmb_sidebar-desktop-close');

      setTimeout(() => {
        this.sideNav.nativeElement.classList.remove(
          'bmb_sidebar-desktop-close',
        );
        this.sideNav.nativeElement.classList.remove('bmb-active');
      }, 500);
    }
  }
}
