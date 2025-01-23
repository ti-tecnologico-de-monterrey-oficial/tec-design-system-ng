import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';

export type IBmbContentLayoutSummary = 'column' | 'row';

@Component({
  selector: 'bmb-user-summary-content',
  standalone: true,
  imports: [CommonModule, BmbUserImageComponent],
  templateUrl: './bmb-user-summary-content.component.html',
  styleUrl: './bmb-user-summary-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserSummaryContentComponent {
  isProfile = input<boolean>(false);
  name = input<string>('');
  userId = input<string>('');
  image = input<string>('');
  isImageBordered = input<boolean>(true);
  infoCareer = input<string>('');
  email = input<string>('');
  salutation = input<string>('Buenas tardes');
  contentLayout = input<IBmbContentLayoutSummary>('column');

  getClass(mainClassName: string): string {
    return `${mainClassName}-${this.contentLayout()}`;
  }
}
