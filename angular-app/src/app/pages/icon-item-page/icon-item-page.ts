import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbIconItemComponent } from 'ui-angular';

@Component({
  selector: 'app-icon-item-page',
  imports: [BmbIconItemComponent],
  templateUrl: './icon-item-page.html',
  styleUrl: './icon-item-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconItemPage {
  readonly icons = [
    'person',
    'home',
    'school',
    'email',
    'phone',
    'badge',
    'location_on',
    'calendar_today',
  ];
  readonly icon = signal('person');
  readonly iconSize = signal(24);
  readonly label = signal('Nombre');
  readonly value = signal('Alex Martínez');
  readonly showDivider = signal(true);

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setIconSize(value: number): void {
    this.iconSize.set(value);
  }

  setLabel(value: string): void {
    this.label.set(value);
  }

  setValue(value: string): void {
    this.value.set(value);
  }

  setShowDivider(value: boolean): void {
    this.showDivider.set(value);
  }
}
