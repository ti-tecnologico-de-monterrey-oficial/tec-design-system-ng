import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../types';

@Component({
  selector: 'bmb-action-icon',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-action-icon.component.html',
  styleUrl: './bmb-action-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionIconComponent {
  idElement = input<string>();
  icon = input.required<string>();
  alt = input<string>('');
  iconSize = input<number | undefined>();
  toggleIconActive = input<string | undefined>();
  isToggleActive = model<boolean | undefined>(false);
  isAccentColor = model<boolean | undefined>(true);
  dotNotification = input<number>();
  target = input<IBmbTargetLink>();
  link = input<string>();
  disabled = input<boolean>(false);

  buttonPress = output<void>();
  buttonClick = output<void>();

  getIcon(): string {
    if (this.isToggleActive() && !!this.toggleIconActive())
      return this.toggleIconActive()!;
    return this.icon();
  }

  handlePress(): void {
    this.buttonPress.emit();
  }

  handleClick() {
    if (!!this.toggleIconActive()) {
      this.isToggleActive.update((value) => !value);
    }

    this.buttonClick.emit();
  }
}
