import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { BmbToastAppearance } from '../../_shared/types/components/toast';
import {
  getToastClasses,
  getToastIcon,
} from '../../_shared/logic/components/toast';

export type { BmbToastAppearance };

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
  description = input<string>();
  id = input<string | number>('');
  componentTitle = input<string>();

  title = input<string>(); // deprecated
  position = input<string>('top'); // deprecated

  onClose = output<MouseEvent>();

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  getClasses(): string[] {
    return getToastClasses(this.appearance());
  }

  getIcon(): string {
    return getToastIcon(this.appearance());
  }

  handleClose(event: MouseEvent): void {
    this.onClose.emit(event);
  }
}
