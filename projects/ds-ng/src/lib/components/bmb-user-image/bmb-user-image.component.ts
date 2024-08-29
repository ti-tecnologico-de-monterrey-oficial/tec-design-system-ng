import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isExternalLink } from '../../utils/utils';

@Component({
  selector: 'bmb-user-image',
  styleUrl: './bmb-user-image.component.scss',
  templateUrl: './bmb-user-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule],
  encapsulation: ViewEncapsulation.None,
})
export class BmbUserImageComponent {
  @Input() size: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() link: string = '';
  @Input() target: string = '';
  @Input() bordered: boolean = false;

  currentUrl: string = '';

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

  getClasses(): string[] {
    const classes: string[] = ['bmb_user_image'];

    if (this.size) {
      classes.push('bmb_user_image-' + this.size);
    }

    if (this.bordered) {
      classes.push('bmb_user_image-bordered');
    }

    return classes;
  }

  isExternalLink(link: string): boolean {
    return isExternalLink(link);
  }
}
