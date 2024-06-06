import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
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

  currentUrl: string = '';
  isOpen: boolean = false;

  constructor(private router: Router) {
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
  }
}
