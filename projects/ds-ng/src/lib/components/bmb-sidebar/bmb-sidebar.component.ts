import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarElement } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [BmbIconComponent, CommonModule, RouterModule],
  templateUrl: './bmb-sidebar.component.html',
  styleUrls: ['./bmb-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent implements OnInit {
  @Input() elements: SidebarElement[][] = [];
  @Input() title: string = 'Navigation';

  currentUrl: string = '';
  isOpen: boolean = false;
  selectedElement: SidebarElement | null = null;
  hoveredElement: SidebarElement | null = null;
  isActive: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  ngOnInit() {}

  @HostListener('window:focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    this.checkIfFocusInsideSidebar();
  }

  @HostListener('window:focusout', ['$event'])
  onFocusOut(event: FocusEvent) {
    this.checkIfFocusInsideSidebar();
  }

  isExternalLink(link: string): boolean {
    return (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#')
    );
  }

  setExternalLinkActive(link: string) {
    if (!this.isExternalLink(link)) {
      this.currentUrl = link;
    }
  }

  isLinkActive(link: string): boolean {
    return this.currentUrl === link;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(document.body, 'bmb_sidebar-body-hide');
    } else {
      this.renderer.removeClass(document.body, 'bmb_sidebar-body-hide');
    }
  }

  toggleChildren(element: SidebarElement) {
    if (this.selectedElement === element) {
      this.selectedElement = null;
    } else {
      this.selectedElement = element;
    }
  }

  openChildren(element: SidebarElement) {
    this.hoveredElement = element;
  }

  closeChildren(element: SidebarElement) {
    if (this.hoveredElement === element) {
      this.hoveredElement = null;
    }
  }

  handleKeydown(event: KeyboardEvent, element: any): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleChildren(element);
      this.isActive = true; // Activa el sidebar
    }
  }

  checkIfFocusInsideSidebar() {
    const sidebar = document.querySelector('.bmb_sidebar-desktop');
    const activeElement = document.activeElement;
    if (sidebar && activeElement && sidebar.contains(activeElement)) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
}
