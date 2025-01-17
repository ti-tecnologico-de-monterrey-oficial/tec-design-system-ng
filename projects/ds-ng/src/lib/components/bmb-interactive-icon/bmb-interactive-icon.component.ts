import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IBmbTargetLink } from '../../types';

export type IBmbInteractiveIconAppearance =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'none';

export type IBmbInteractiveIconType = 'regular' | 'button' | 'app_drawer';

@Component({
  selector: 'bmb-interactive-icon',
  styleUrl: './bmb-interactive-icon.component.scss',
  templateUrl: './bmb-interactive-icon.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInteractiveIconComponent {
  appearance = input<IBmbInteractiveIconAppearance>('red');
  title = input<string>();
  description = input<string>('');
  label = input<string>('');
  icon = input<string>('face');
  dotNotification = input<number>();
  horizontal = input<boolean>(false);
  target = input<IBmbTargetLink>();
  link = input<string>();
  layout = input<IBmbInteractiveIconType>('regular');
  setButtonTemplate = input<boolean>(false);

  buttonClick = output<void>();

  getClasses(): string[] {
    const principalClassName: string = 'bmb_interactive_icon';
    const classes: string[] = [
      principalClassName,
      `${principalClassName}-${this.layout()}`,
    ];

    if (this.horizontal()) classes.push(`${principalClassName}-horizontal`);

    if (this.appearance())
      classes.push(`bmb_interactive_icon-${this.appearance()}`);

    return classes;
  }

  handleClick(): void {
    this.buttonClick.emit();
  }
}
