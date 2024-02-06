import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

/** Error when invalid control is dirty, touched, or submitted. */

export class AppComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  title = 'tec-design-system-ng';

  value='tec-design'

  handleDot(index: number): void {
    console.log('Index clicked:', index);
  }
}
