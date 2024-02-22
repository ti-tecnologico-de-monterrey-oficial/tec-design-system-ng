import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  title = 'tec-design-system-ng';

  value = 'tec-design';

  handleDot(index: number): void {
    console.log('Index clicked:', index);
  }
}
