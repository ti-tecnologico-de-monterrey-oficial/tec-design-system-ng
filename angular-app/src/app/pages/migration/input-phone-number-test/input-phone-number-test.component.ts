import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BmbInputPhoneNumberComponent } from 'ui-angular';

@Component({
  selector: 'app-input-phone-number-test-component',
  imports: [ReactiveFormsModule, BmbInputPhoneNumberComponent],
  templateUrl: './input-phone-number-test.component.html',
  styleUrl: './input-phone-number-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneNumberTestComponent implements OnInit, OnDestroy {
  readonly label = signal('Phone');
  readonly helperMessage = signal('Helper message');
  readonly placeholder = signal('');
  readonly defaultCountryCode = signal('mx');
  readonly isRequired = signal(false);
  readonly disabled = signal(false);
  readonly control = new FormControl('');
  readonly lastEvent = signal('Sin interacciones');

  private readonly subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.control.valueChanges.subscribe((value) => {
        this.lastEvent.set(`Valor actual: ${value}`);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}