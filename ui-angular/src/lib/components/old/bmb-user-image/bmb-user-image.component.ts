import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink, IBmbUserImageSize } from '@shared/types';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { handleImageNotFoundError } from '../../../_shared/logic/utils';

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

  buttonPress = output<MouseEvent>();
  buttonClick = output<MouseEvent>();
  buttonKeyPress = output<KeyboardEvent>();
  imageNotFoundError = output<void>();

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

  handlePress(event: MouseEvent): void {
    this.buttonPress.emit(event);
    event.stopPropagation();
  }

  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
    event.stopPropagation();
  }

  handleKeyPress(event: KeyboardEvent): void {
    this.buttonKeyPress.emit(event);
  }

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }
}
