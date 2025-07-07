const getValue = (key: string, value: undefined): any =>
  (typeof value === 'function' && `${key}($event)`) ||
  (typeof value === 'object' && `${JSON.stringify(value)}`) ||
  `${value}`;

const getKeyFormat = (key: string, value: string): string =>
  (typeof value === 'function' && `(${key})`) || `[${key}]`;

export const attributes = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key]) => key !== 'test_text')
    .map(
      ([key, value]) =>
        (typeof value !== 'string' &&
          `${getKeyFormat(key, value)}='${getValue(key, value)}'`) ||
        `${key}="${value}"`,
    )
    .join(' ');

export const attributesText = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key]) => key === 'test_text')
    .map(([_, value]) => `${value}`)
    .join(' ');

export const getEmptyStateMessage = () => `
<br>
##Important:
Remember to use the \`empty state\` for the cases that apply to this. Related documentation is available [here](https://bamboo.tec.mx/latest/guia-ux-writing/mensajes-del-producto/empty-states-OQYyq6h8-OQYyq6h8).

<br>
`;

export const getInputArchitecture = () => `
<br>
## DOM Architecture
\`\`\`html
<section class="bmb_field" <!-- conditional class bmb_field-disabled --> >

  <section class="bmb_field-wrapper">
    <!-- if label is defined -->
    <label class="bmb_field-label" for="input">{ label }</label>
    <input { configuration } />
  </section>

  <!-- if helper message is defined -->
  <p class="bmb_field-helper">{ helperMessage }</p>

  <!-- if error message is defined -->
  <p class="bmb_field-error">{ errorMessage }</p>
</section>

\`\`\`
`;

export const getDescribeTypeTextBlock = (
  typeExampleName: string,
  additionalText: string = '',
) => `
### ${typeExampleName} example
Below is an example of how you can use this component in ${additionalText || typeExampleName}:
`;

export const getTypescriptExampleTextBlock = (
  inputName: string,
  additionalBlock: string = '',
  additionalText: string = '',
  importComments: string = '',
) => `
${getDescribeTypeTextBlock('TypeScript', additionalText)}
\`\`\`typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ${inputName} } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
${importComments}
@Component({
  selector: 'app-component',
  standalone: true,
  imports: [ ${inputName} ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  //Add your code
  ${additionalBlock}
}
\`\`\`
`;

export const getTypescriptFormExampleTextBlock = (inputName: string) => `
${getDescribeTypeTextBlock('TypeScript')}
\`\`\`typescript
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BmbButtonDirective, ${inputName} } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';


@Component({
  selector: 'app',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    ${inputName},
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  onSubmit() {
    if (this.userForm.valid) {
      //Add your code
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }
}
\`\`\`
`;

export const getHTMLFormExampleTextBlock = (inputExample: string) => `
${getDescribeTypeTextBlock('Form', 'an HTML form')}
\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  ${inputExample}
  <button bmbButton appearance="primary" type="submit">Submit</button>
</form>
\`\`\`
`;

export const getGeneralComponentDescription = (
  componentName: string,
  additionalDescription: string,
) => `
<br>
### Description
>\`${componentName}\` is a customizable **Bamboo** input component that allows users to ${additionalDescription}
>
>This component includes validations, error messages, and support for tooltips to provide additional information.
<br>
`;
