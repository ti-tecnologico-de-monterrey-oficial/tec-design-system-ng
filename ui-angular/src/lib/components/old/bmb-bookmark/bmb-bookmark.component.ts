import {
  ChangeDetectionStrategy,
  Component,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';

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

  handleClick(event: any) {
    event?.stopPropagation();
    this.isActive.update((value) => !value);
  }
}
