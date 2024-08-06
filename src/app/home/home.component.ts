import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BmbInputPhoneNumberComponent,
  BmbButtonDirective,
  BmbInputComponent,
  BmbWheelMenuComponent,
  BmbInnerHeaderComponent,
  BmbTabsComponent,
} from '../../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';

interface App {
  appearance: string;
  title: string;
  icon: string;
  target: string;
  link: string;
}

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbInputPhoneNumberComponent,
    CommonModule,
    BmbButtonDirective,
    BmbInputComponent,
    BmbWheelMenuComponent,
    BmbTabsComponent,
    BmbInnerHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userForm: FormGroup;
  isPhoneDisabled = false;
  showErrors: { [key: string]: boolean } = {};
  navItems = [
    { title: 'Mas usados', id: 0, isActive: true },
    { title: 'Recomendados', id: 1, isActive: false },
    { title: 'Contextuales', id: 2, isActive: false },
  ];
  data = [
    'Carlee Bengochea',
    'Reynard Howgate',
    'Pearce Jore',
    'Giacopo Mellings',
    'Clyve Nerval',
    'Pauletta Pavelka',
    'Midge Girardot',
  ];
  isLoading = false;
  apps: { [key: number]: App[] } = {
    0: [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 4',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 5',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 6',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 7',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    1: [
      {
        appearance: 'red',
        title: 'App 8',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 9',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 10',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 11',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 12',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 13',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 14',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    2: [
      {
        appearance: 'red',
        title: 'App 15',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 16',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 17',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 18',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 19',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'red',
        title: 'App 20',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 21',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.userForm = this.fb.group({
      phone: new FormControl(
        { value: null, disabled: this.isPhoneDisabled },
        Validators.required,
      ),
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
      this.updateErrorState();
      this.cdr.markForCheck();
    }
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  get phoneControl(): FormControl {
    return this.userForm.get('phone') as FormControl;
  }

  get nameControl(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  handleValueChange(event: string): void {
    console.log('Search value changed:', event);
  }
}
