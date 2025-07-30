import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbInteractiveIconComponent,
  IBmbInteractiveIconType,
} from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { IBmbApp } from '../../types';

@Component({
  selector: 'bmb-frequent-apps-selector',
  styleUrl: './bmb-frequent-apps-selector.component.scss',
  templateUrl: './bmb-frequent-apps-selector.component.html',
  standalone: true,
  imports: [CommonModule, BmbInteractiveIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbFrequentAppsSelectorComponent {
  title = input<string>('');
  apps = input<IBmbApp[]>([]);
  layout = input<IBmbInteractiveIconType>('regular');

  appClick = output<any>();

  getClassesFAC(): string[] {
    return [
      'bmb_frequent_apps-container',
      `bmb_frequent_apps-container-${this.layout()}`,
    ];
  }

  handleButtonClick(app: IBmbApp): void {
    this.appClick.emit(app.callbackParam || app);
  }
}
