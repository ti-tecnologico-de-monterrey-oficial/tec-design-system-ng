import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbInteractiveIconAppearance =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple';

export type IBmbInteractiveIconType = 'regular' | 'button' | 'app_drawer';

@Component({
  selector: 'bmb-interactive-icon',
  styleUrl: './bmb-interactive-icon.component.scss',
  templateUrl: './bmb-interactive-icon.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInteractiveIconComponent {
  appearance = input<IBmbInteractiveIconAppearance>('red');
  title = input<string>();
  description = input<string>('');
  icon = input<string>('face');
  horizontal = input<boolean>(false);
  target = input<string>();
  link = input<string>();
  layout = input<IBmbInteractiveIconType>('regular');
  setButtonTemplate = input<boolean>(false);

  buttonClick = output<void>();

  getClasses(): string[] {
    const classes: string[] = [
      'bmb_interactive_icon',
      `bmb_interactive_icon-${this.layout()}`,
    ];

    if (this.setButtonTemplate())
      classes.push('bmb_interactive_icon-button-template');

    if (this.appearance())
      classes.push(`bmb_interactive_icon-${this.appearance()}`);

    return classes;
  }

  isExternalLink(link: string | undefined): boolean {
    if (!link) return false;

    return (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#')
    );
  }

  handleClick(): void {
    this.buttonClick.emit();
  }
}
