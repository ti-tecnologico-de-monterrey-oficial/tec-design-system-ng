import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbMitecLogoAnimationComponent } from 'ui-angular';

@Component({
  selector: 'app-mitec-logo-animation-page',
  imports: [BmbMitecLogoAnimationComponent],
  templateUrl: './mitec-logo-animation-page.html',
  styleUrl: './mitec-logo-animation-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitecLogoAnimationPage {
  readonly label = signal('ESTUDIANTES');
  readonly width = signal(300);

  setLabel(value: string): void {
    this.label.set(value);
  }
  setWidth(value: number): void {
    this.width.set(value);
  }
}
