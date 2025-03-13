import {
  ChangeDetectionStrategy,
  Component,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';

@Component({
  selector: 'bmb-bookmark',
  standalone: true,
  imports: [CommonModule, BmbNavigationIconComponent],
  templateUrl: './bmb-bookmark.component.html',
  styleUrl: './bmb-bookmark.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBookmarkComponent {
  isActive = model<boolean>(false);

  handleClick(event: any) {
    event?.stopPropagation();
    this.isActive.update((value) => !value);
  }

  getClassList() {
    const classList = ['bmb_bookmark'];
    if (this.isActive()) classList.push('bmb_bookmark-active');
    return classList;
  }
}
