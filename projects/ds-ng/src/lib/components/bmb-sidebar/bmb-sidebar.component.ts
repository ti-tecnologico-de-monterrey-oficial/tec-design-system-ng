import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostListener,
  input,
  ViewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarElement } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IPositionButtonMenu } from '../bmb-top-bar/types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

interface IBmbIsButton {
  link?: string;
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
    BmbDividerComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent {
  elements = input<SidebarElement[][]>([]);
  title = input<string>('Navigation');
  position = input<IPositionButtonMenu>('left'); //Only for web

  currentUrl: string = '';
  isOpen: boolean = false;
  selectedElement: SidebarElement | null = null;
  isActive: boolean = false;
  hasSubmenu: boolean = false;
  maxChildrenLevel: number = 2;

  error = false;

  @ViewChild('sideNav') sideNav!: ElementRef;

  @HostListener('window:focusin')
  onFocusIn() {
    this.checkIfFocusInsideSidebar();
  }

  @HostListener('window:focusout')
  onFocusOut() {
    this.checkIfFocusInsideSidebar();
  }

  constructor() {
    effect(() => {
      const totalElements = this.elements().reduce(
        (acc, group) => acc + group.length,
        0,
      );

      if (this.elements()?.length > 2) {
        console.error(
          'The sidebar component only supports two levels of navigation',
        );
        this.error = true;
      }

      if (totalElements > 8) {
        console.error(
          'The sidebar component only supports a maximum of 8 elements in the first level of navigation',
        );
        this.error = true;
      }

      this.hasSubmenu = this.elements()?.some((element) =>
        element?.some((el) => el.children),
      );
    });
  }

  checkForButton(hasChildren: boolean): boolean {
    return hasChildren;
  }

  getLink({ link, hasChildren }: IBmbIsButton): string {
    if (this.checkForButton(hasChildren)) return '';
    return link || '';
  }

  closeSidebar() {
    this.isOpen = false;
    this.clearSelectElement();
  }

  clearSelectElement() {
    // this.selectedElement = null;
  }

  toggleChildren(element: SidebarElement) {
    // if (this.selectedElement === element) {
    //   this.clearSelectElement();

    //   return;
    // }

    // this.selectedElement = element;

    // if (element.children) {
    //   element.isOpen = !element.isOpen;
    // }
    const children = document.getElementById(
      'children_'.concat(element.id.toString()),
    );
    children?.classList.add('open');
  }

  checkIfFocusInsideSidebar() {
    const sidebar = document.querySelector('.bmb_sidebar');
    const activeElement = document.activeElement;
    this.isActive =
      (sidebar && activeElement && sidebar.contains(activeElement)) || false;
  }

  checkToCloseSidebar(event: any) {
    if (event.link && !event.children) {
      this.closeSidebar();
      this.sideNav.nativeElement.classList.add('close');
      // document.getElementById(event.id.toString())?.classList.add('open');

      setTimeout(() => {
        this.sideNav.nativeElement.classList.remove('close');
        this.sideNav.nativeElement.classList.remove('active');
      }, 500);
    }
  }
}
