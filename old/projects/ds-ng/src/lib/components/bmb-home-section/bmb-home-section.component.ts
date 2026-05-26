import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

@Component({
  selector: 'bmb-home-section',
  standalone: true,
  imports: [CommonModule, BmbContainerComponent, BmbIconComponent],
  styleUrl: './bmb-home-section.component.scss',
  templateUrl: './bmb-home-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHomeSectionComponent {
  icon = input<string>('');
  target = input<string>('');
  link = input<string>('');
  componentTitle = input<string>();

  title = input<string>(); // deprecated

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
}
