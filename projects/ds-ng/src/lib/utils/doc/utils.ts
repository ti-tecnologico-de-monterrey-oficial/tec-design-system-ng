export const STORIES_TITLE = 'Implementation examples';
export const TITLE_OF_CONTROLS = 'Properties / Events';
export const TITLE_OF_CONTENTS = 'Table of contents';
export const TOC_OBJ = {
  title: 'Table of contents',
  headingSelector: 'h2, h3',
};

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
###Important:
Remember to use the \`empty state\` for the cases that apply to this. Related documentation is available [here](https://bamboo.tec.mx/latest/guia-ux-writing/mensajes-del-producto/empty-states-OQYyq6h8-OQYyq6h8).
`;

export const getArchitectureSection = (
  architectureBlock: string,
  bmbNameLink: string = '',
  documentationLink: string = '',
) => `
## DOM Architecture
Represents the structure of the component.
\`\`\`html
${architectureBlock}
\`\`\`${bmbNameLink && bmbNameLink ? getDOMArchitectureLink(bmbNameLink, documentationLink) : ''}
`;

export const getCheckboxOrRadialArchitecture = (type: string) => `
${getArchitectureSection(`
<section class="bmb_${type}" <!-- conditional class bmb_${type}-before bmb_${type}-after bmb_${type}-required --> >
  <input { input config } />
  <div class="bmb_${type}-box">
    <span class="bmb_${type}-mark"></span>
  </div>

  <!-- if label is defined -->
  <span class="bmb_${type}-label">{{ label }}</span>
</section>
`)}
`;

export const getDescribeTypeTextBlock = (
  typeExampleName: string,
  additionalTitle: string = '',
  isLevel3: boolean = false,
  additionalText: string = '',
) => `
##${isLevel3 ? '#' : ''} ${typeExampleName} example ${additionalTitle}
Below is a *${typeExampleName}* example with the basic code to use this component ${additionalText}:`;

const getTypescriptExampleBlock = (
  inputName: string,
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  importComments: string = '',
  additionalBlock: string = '',
  replaceChar: string = '',
) =>
  `
\`\`\`typescript
__import { CommonModule } from '@angular/common';
__import { Component, ChangeDetectionStrategy } from '@angular/core';${
    additionalImportName
      ? `
__import { ${additionalImportName} } from '${additionalImportFrom}';`
      : ''
  }
__import { ${inputName} } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
__${importComments}
__@Component({
__  selector: 'app-component',
__  standalone: true,
__  imports: [ ${
    additionalImportName
      ? `
    ${inputName
      .concat(', ')
      .concat(additionalImportName)
      .replaceAll(
        ',',
        `,
    `,
      )},
    `
      : inputName
  } ],
__  templateUrl: './app.component.html',
__  styleUrl: './app.component.scss',
__  changeDetection: ChangeDetectionStrategy.OnPush,
__})
__export class AppComponent {
__  ${additionalBlock || '//Add your code'}
__}
\`\`\`
__`.replaceAll('__', replaceChar);

export const getTypescriptExampleTextBlock = (
  inputName: string,
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  importComments: string = '',
  additionalTitle: string = '',
  isLevel3: boolean = false,
  additionalText: string = '',
  additionalBlock: string = '',
  replaceChar: string = '',
) =>
  `
__${getDescribeTypeTextBlock('TypeScript', additionalTitle, isLevel3, additionalText)}
__${getTypescriptExampleBlock(inputName, additionalImportName, additionalImportFrom, importComments, additionalBlock, replaceChar)}
__`.replaceAll('__', replaceChar);

export const getReactiveFormTitle = (bmbInputName: string) => `
##Reactive form example
>This example demonstrates how to use **${bmbInputName}** within an Angular reactive form, ensuring validation and handling the field and its value correctly.
>`;

export const getFormExampleBlock = (
  bmbInputName: string,
  inputName: string,
  additionalBlock: string = '',
  inputExample: string,
) => `
${getReactiveFormTitle(bmbInputName)}
>
><br/>
>${getTypescriptExampleTextBlock(
  `BmbButtonDirective, ${bmbInputName}`,
  'FormControl, FormGroup, ReactiveFormsModule',
  '@angular/forms',
  '',
  'for reactive form',
  true,
  'in a reactive form',
  `userForm: FormGroup = new FormGroup({
    ${inputName}: new FormControl(),
  });
  >
  >${additionalBlock || '//Add your code'}
  >
  >onSubmit() {
  >  if (this.userForm.valid) {
  >    //Add your code
  >    return;
  >  }
  >  this.userForm.markAllAsTouched();
  >  this.updateErrorState();
  >}
  >
  >updateErrorState() {
  >  Object.keys(this.userForm.controls).forEach((field) = {
  >    const control = this.getFormControl(field);
  >    if (control instanceof FormControl) {
  >      control.markAsTouched();
  >      control.updateValueAndValidity();
  >    }
  >  });
  >}
  >
  >getFormControl(name: string): FormControl {
  >  return this.userForm.get(name) as FormControl;
  >}`,
  '>',
)}
>${getHTMLFormExampleTextBlock(inputExample)}

`;

export const getHTMLFormExampleTextBlock = (inputExample: string) => `>
>${getDescribeTypeTextBlock('HTML', 'for reactive form', true, 'in a reactive form')}
>\`\`\`html
><form [formGroup]="userForm" (ngSubmit)="onSubmit()">
>  ${inputExample}
>  <button bmbButton appearance="primary" type="submit">Submit</button>
></form>
>\`\`\`
`;

const getTitleDescription = () => `
<br/>
## Description
`;

export const getGeneralDescription = (
  content: string,
  generalDocLink: string,
) => `
${getTitleDescription()}
>${content}
>
>Please do not forget to refer to the [Bamboo- General documentation](${generalDocLink}) for more details about it.

<br/>
`;

export const getDOMArchitectureLink = (
  bmbNameLink: string = '',
  documentationLink: string = '',
) => `
[bmb-${bmbNameLink} - DOM Architecture](/docs/${documentationLink}--documentation&globals=#dom-architecture)

<br/>
`;

export const getFieldDescription = (
  componentName: string,
  additionalDescription: string,
  generalDocLink: string,
) => `
${getGeneralDescription(
  `
>\`${componentName}\` is a customizable **Bamboo** input component that allows users to ${additionalDescription}
>
>This component includes validations, error messages, and support for tooltips to provide additional information.
>
>Support for error handling when errors occur:
>- The field border color changes to red.
>- Support text is displayed with the error message (default or assigned).`,
  generalDocLink,
)}
`;

export const getSpecialSpecifications = (content: string) => `
##Considerations / Restrictions
>${content}
<br/>
`;

export const getBasicExampleBlock = (
  inputName: string,
  importComments: string = '',
) => `
${getTypescriptExampleTextBlock(inputName, '', '', importComments)}
${getDescribeTypeTextBlock('HTML')}
`;

// ${getGeneralDescription('')} //Description ${getFieldDescription('')}
// ${getArchitectureSection()} //DOM Architecture (optional)
//${getSpecialSpecifications(`
//   ### []:
// `)} //Considerations / Restrictions (optional)
// ${getFormExampleBlock('', '', '', '')} //Reactive form example (optional)
// ${getBasicExampleBlock('')} //TypeScript example
