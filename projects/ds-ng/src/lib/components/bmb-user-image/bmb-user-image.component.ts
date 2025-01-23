import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink, IBmbUserImageSize } from '../../types';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';

@Component({
  selector: 'bmb-user-image',
  styleUrl: './bmb-user-image.component.scss',
  templateUrl: './bmb-user-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BmbCheckExternalLinkButtonComponent],
  encapsulation: ViewEncapsulation.None,
})
export class BmbUserImageComponent {
  size = input<IBmbUserImageSize>();
  image = input<string>('');
  altImage = input<string>('');
  link = input<string>('');
  target = input<IBmbTargetLink>();
  bordered = input<boolean>(false);

  getClasses(
    principalClassName: string,
    size: string,
    isBordered: boolean,
  ): string[] {
    const classes: string[] = [principalClassName];

    if (!!size) classes.push(`${principalClassName}-${this.size()}`);

    if (isBordered) classes.push(`${principalClassName}-bordered`);

    return classes;
  }
}
