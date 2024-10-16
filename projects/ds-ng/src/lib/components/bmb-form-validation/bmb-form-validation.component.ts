import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';

@Component({
  selector: 'bmb-form-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbInputComponent,
    BmbButtonDirective,
    BmbRadialComponent,
  ],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <bmb-input
        name="name"
        label="Input Label"
        placeholder="Placeholder"
        icon="apps"
        errorMessage="Error message"
        helperMessage="Helper Message"
        [control]="getFormControl('name')"
        [showError]="showErrors['name']"
        [disabled]="true"
        [isRequired]="true"
        appearance="normal"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        name="named"
        label="Input Label"
        placeholder="Placeholder"
        icon="apps"
        errorMessage="Error message"
        helperMessage="Helper Message"
        [control]="getFormControl('named')"
        [showError]="showErrors['named']"
        [disabled]="false"
        [isRequired]="true"
        appearance="normal"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        name="otherName"
        label="Input Label"
        placeholder="Placeholder"
        icon="apps"
        errorMessage="Error message"
        helperMessage="Helper Message"
        [control]="getFormControl('otherName')"
        [showError]="showErrors['otherName']"
        [disabled]="true"
        [isRequired]="true"
        appearance="simple"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        name="comments"
        label="Label textarea"
        type="text-area"
        tooltip="Tooltip text"
        placeholder="Place holder text"
        icon="apps"
        errorMessage="Error message textarea"
        helperMessage="Helper message textarea"
        appearance="normal"
        [disabled]="true"
        [isRequired]="true"
        [control]="getFormControl('comments')"
        [showError]="showErrors['comments']"
        [showMaxTextLength]="true"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        type="radio"
        id="radio1"
        value="CCMD"
        name="contrato"
        label="Contrato profesor cátedra Biología marina CCMD.pdf"
        [checked]="false"
        [isRequired]="true"
        [control]="getFormControl('contrato')"
        [showError]="showErrors['contrato']"
        errorMessage="Error message radio"
        helperMessage="Helper Message radio"
        [disabled]="false"
        (onChange)="handleRadial($event)"
        labelPosition="before"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        type="radio"
        id="radio2"
        value="CCM1"
        name="contrato"
        label="Contrato profesor cátedra Biología marina CCM.pdf"
        [checked]="false"
        [isRequired]="true"
        [control]="getFormControl('contrato')"
        [showError]="showErrors['contrato']"
        errorMessage="Error message radio"
        helperMessage="Helper Message radio"
        [disabled]="false"
        (onChange)="handleRadial($event)"
        (myName)="handleMyName($event)"
      />
      <bmb-input
        type="radio"
        id="radio3"
        value="CCM2"
        name="contratod"
        label="Contrato profesor cátedra Biología marina CCM.pdf"
        [checked]="false"
        [isRequired]="true"
        [control]="getFormControl('contrato')"
        [showError]="showErrors['contrato']"
        errorMessage="Error message radio"
        helperMessage="Helper Message radio"
        [disabled]="true"
        (onChange)="handleRadial($event)"
        (myName)="handleMyName($event)"
      />
      <bmb-radial
        id="radio4"
        value="CCM"
        name="contract"
        label="Contract for teacher CCM.pdf"
        [checked]="false"
        [required]="true"
        [disabled]="false"
        [control]="getFormControl('contract')"
        [showError]="showErrors['contract']"
        errorMessage="Error message"
        helperMessage="Helper message"
        labelPosition="before"
        (change)="handleRadial($event)"
        (myName)="handleMyName($event)"
      />
      <bmb-radial
        id="radio5"
        value="CCB"
        name="contract"
        label="Contrato profesor cátedra Biología CCB.pdf"
        [checked]="false"
        [required]="true"
        [disabled]="false"
        [control]="getFormControl('contract')"
        [showError]="showErrors['contract']"
        errorMessage="Error message"
        helperMessage="Helper message"
        (change)="handleRadial($event)"
        (myName)="handleMyName($event)"
      />
      <button bmbButton appearance="primary" type="submit">Submit</button>
      <!-- <ng-content /> -->
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFormValidationComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    named: new FormControl<string>('', Validators.required),
    otherName: new FormControl<string>('', Validators.required),
    comments: new FormControl<string>('', Validators.required),
    contrato: new FormControl<string>('', Validators.required),
    contract: new FormControl<string>('', Validators.required),
    contratod: new FormControl<string>('', Validators.required),
  });
  userFormTest: FormGroup = new FormGroup({});
  showErrors: { [key: string]: boolean } = {};
  controlTest = model<FormControl>();

  handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
    console.log('Is it checked?', element.checked);
  }

  onSubmit() {
    // if (this.userForm.valid) {
    //   console.log('onSubmit VALID');
    //   return;
    // }
    // this.userForm.markAllAsTouched();
    // this.updateErrorState();
    if (this.userFormTest.valid) {
      console.log('onSubmit VALID');
      return;
    }
    this.userFormTest.markAllAsTouched();
    this.updateErrorState();
  }

  updateErrorState() {
    // Object.keys(this.userForm.controls).forEach((field) => {
    //   const control = this.userForm.get(field);
    //   if (control instanceof FormControl) {
    //     this.showErrors[field] =
    //       control.invalid && (control.touched || control.dirty);
    //   }
    // });
    Object.keys(this.userFormTest.controls).forEach((field) => {
      const control = this.userFormTest.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  handleMyName(name: string) {
    console.log('-----name------', name);
    const list = Object.keys(this.userFormTest);
    if (!list.some((key) => key === name)) {
      this.userFormTest.addControl(
        name,
        new FormControl<string>('', Validators.required),
      );
    }
    console.log('---control----', this.userFormTest.get(name) as FormControl);
  }
}
