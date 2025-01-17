import {
  ChangeDetectionStrategy,
  Component,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from 'ds-ng';

@Component({
  selector: 'bmb-bookmark',
  standalone: true,
  imports: [BmbButtonDirective, CommonModule, BmbIconComponent],
  templateUrl: './bmb-bookmark.component.html',
  styleUrl: './bmb-bookmark.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBookmarkComponent {
  isActive = model<boolean>(false);

  handleClick() {
    this.isActive.set(!this.isActive());
  }

  getClassList() {
    const classList = ['bmb_bookmark'];
    if (this.isActive()) classList.push('bmb_bookmark-active');
    return classList;
  }
}
