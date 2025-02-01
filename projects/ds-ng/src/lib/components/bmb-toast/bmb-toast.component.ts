import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type BmbToastAppearance =
  | 'neutral'
  | 'primary'
  | 'warning'
  | 'error'
  | 'event'
  | 'successful'
  | 'reminder'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';

@Component({
  standalone: true,
  selector: 'bmb-toast',
  styleUrl: './bmb-toast.component.scss',
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbToastComponent {
  appearance = input<BmbToastAppearance>('neutral');
  isClosable = input<boolean>(false);
  title = input<string>('');
  description = input<string>();
  position = input<string>('top');
  id = input<string | number>('');

  onClose = output<void>();

  getClasses(): string[] {
    const classes: string[] = ['bmb_toast'];

    if (this.appearance()) {
      classes.push('bmb_toast-' + this.appearance());
    }

    if (this.position) {
      classes.push('bmb_toast-' + this.position);
    }

    return classes;
  }

  getIcon(): string {
    const icons: { [key: string]: string } = {
      neutral: 'info',
      warning: 'warning',
      error: 'error',
      event: 'notification_important',
      reminder: 'info',
      successful: 'check_circle',
      primary: 'info',
    };

    if (icons[this.appearance()]) return icons[this.appearance()];

    return 'info';
  }

  handleClose(): void {
    this.onClose.emit();
  }
}
