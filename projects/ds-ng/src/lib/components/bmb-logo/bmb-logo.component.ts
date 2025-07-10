import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IBmbTargetLink } from '../../types';

@Component({
  selector: 'bmb-logo',
  styleUrl: './bmb-logo.component.scss',
  templateUrl: './bmb-logo.component.html',
  standalone: true,
  imports: [CommonModule, BmbCheckExternalLinkButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbLogoComponent {
  size = input<string>('');
  image = input<string>('');
  altImage = input<string>('');
  link = input<string>('');
  target = input<IBmbTargetLink>('_self');
  buttonName = input<string>('logo_button');

  buttonPress = output<MouseEvent>();
  buttonClick = output<MouseEvent>();
  buttonKeyPress = output<KeyboardEvent>();

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

  getClasses(): string[] {
    const classes: string[] = ['bmb_logo'];

    if (this.size) {
      classes.push('bmb_logo-' + this.size());
    }

    return classes;
  }
}
