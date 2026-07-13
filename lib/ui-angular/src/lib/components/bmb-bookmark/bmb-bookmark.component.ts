import {
  ChangeDetectionStrategy,
  Component,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  stopPropagation,
  toggleBookmark,
} from '../../logic/bookmark/bookmark';

@Component({
  selector: 'bmb-bookmark',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent, TranslatePipe],
  templateUrl: './bmb-bookmark.component.html',
  styleUrl: './bmb-bookmark.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBookmarkComponent {
  isActive = model<boolean>(false);

  handleClick(event?: Event): void {
    stopPropagation(event);
    this.isActive.update(toggleBookmark);
  }
}
