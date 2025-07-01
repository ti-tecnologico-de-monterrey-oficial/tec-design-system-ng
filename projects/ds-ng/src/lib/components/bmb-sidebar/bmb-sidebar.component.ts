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
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IPositionButtonMenu } from '../bmb-top-bar/types';

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
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent implements OnInit {
  elements = input<SidebarElement[][]>([]);
  title = input<string>('Navigation');
  position = input<IPositionButtonMenu>('left');

  currentUrl: string = '';
  isOpen: boolean = false;
  selectedElement: SidebarElement | null = null;
  isActive: boolean = false;
  hasSubmenu: boolean = false;

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

    this.hasSubmenu = this.elements().some((element) =>
      element.some((el) => el.children),
    );
  }

  getLink(link: string, hasChildren: boolean): string {
    if (!hasChildren) return link;
    return '';
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.selectedElement = null;
  }

  toggleChildren(element: SidebarElement) {
    if (this.selectedElement === element) {
      this.selectedElement = null;
      return;
    }

    this.selectedElement = element;

    if (element.children) {
      element.isOpen = !element.isOpen;
    }
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

  checkToCloseSidebar(event: any) {
    if (event.link && !event.children) {
      this.toggleSidebar();
      this.sideNav.nativeElement.classList.add('bmb_sidebar-desktop-close');

      setTimeout(() => {
        this.sideNav.nativeElement.classList.remove(
          'bmb_sidebar-desktop-close',
        );
        this.sideNav.nativeElement.classList.remove('bmb-active');
      }, 500);
    }
  }

  getMobileIcon(): string {
    if (this.isOpen) return 'close';
    if (this.position() === 'left') return 'arrow_forward_ios';
    return 'arrow_back_ios_new';
  }
}
