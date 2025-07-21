import { getListingOnOneLine } from '../utils';

export const STORIES_TITLE = 'Variant templates';
export const TITLE_OF_CONTROLS = 'Properties / Events';
const TOC_TITLE = 'On this page';
export const DESCRIPTION_TITLE = 'Description';
export const SPECIAL_SPECIFICATIONS_TITLE = 'Considerations / Restrictions';
export const SANDBOX_TITLE = 'Sandbox';
export const TOC_OBJ = {
  title: TOC_TITLE,
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
## ${DESCRIPTION_TITLE}
`;

export const getGeneralDescription = (
  content: string,
  generalDocLink: string,
) => `
${getTitleDescription()}
>${content}
>
>Please do not forget to refer to the [Bamboo - General documentation](${generalDocLink}) for more details about it.

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
## ${SPECIAL_SPECIFICATIONS_TITLE}
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

export const getFoundationDescriptions = (element: string) =>
  `This is a collection of ${element} styles that can be used in the application.`;

export const getSandboxConsiderationsDocumentation = (
  element: string,
  content: string = '',
  isWarning: boolean = false,
  implementationDetails: string[] = [],
) => {
  const patternToReplace = /(and )|(\,)/g;
  const definition = getListingOnOneLine(
    implementationDetails,
    '\`bmb_[__]-{[__]}\`',
  );
  const size = getListingOnOneLine(implementationDetails, '{[__]}');
  const style = getListingOnOneLine(
    implementationDetails,
    '[__]: var(--bmb-[__]);',
  ).replace(patternToReplace, '');
  const variableDescription = `the ${getListingOnOneLine(implementationDetails, '\`--bmb-[__]\`')} variable${implementationDetails.length > 1 ? 's' : ''}`;
  const list = getListingOnOneLine(implementationDetails);
  return `
### Important:
Please refer to the [Variables documentation](/docs/foundations-variables--documentation&globals=#dom-architecture) for details on how to implement ${element} in CSS, where it is detailed that these can be implemented through variables.
>${content}
>${
    implementationDetails.length
      ? `The ${element} is defined in the CSS variables and can be used in the application by using the class name or the CSS variable name.
>
><br/>
### Class Name
The class name is defined as ${definition} where ${size} are the ${element} size, and also set ${variableDescription} for the child elements.
>
\`\`\`html
<div class="${getListingOnOneLine(implementationDetails, 'bmb_[__]-m').replace(patternToReplace, '')}">
  <div style="${style}">
    The child element has access to the ${list} of the parent element's size through the ${variableDescription.replaceAll('\`', '')}.
  </div>
</div>
\`\`\`
>
><br/>
### CSS Variable
The CSS variable name is defined as ${definition} where ${size} are the ${element} size.
>
\`\`\`html
<div style="${style}">
  Content with ${list} applied using CSS variables.
</div>
\`\`\`
>
><br/>
### Values
>
The ${element} size are defined on REM units, and can be used in the application by using the class name or the CSS variable name. The ${element} size can be one of the following:
>
- none: 0px
- xxs: ≈2px
- xs: ≈4px
- s: ≈8px
- m: ≈16px
- l: ≈24px
- xl: ≈32px
- xxl: ≈64px
- auto: auto
- 1: ≈4px
- 2: ≈8px
- 3: ≈12px
- 4: ≈16px
- 5: ≈20px
- 6: ≈24px
- 7: ≈28px
- 8: ≈32px
- 9: ≈36px
- 10: ≈40px
>`
      : ''
  }
>${
    isWarning
      ? `
>
><br/>
### Warning:
You should be careful when using ${element}, as they can affect **Bamboo** components. Some components may override this attribute, so check the component's documentation before applying the ${element} class.
  `
      : ''
  }
>
><br/>
>### ${SANDBOX_TITLE}
>Please use this help to generate the ${element} you need:
`;
};

/*
Checklist:
ON THIS PAGE (optional, TABLE OF CONTENTS) [Done, is in preview, if not so add parameters: { docs: { toc: TOC_OBJ...]
-Tabs (optional) [Create MDX]
-Name [Done, is is .stories]
-Description [Add ${getGeneralDescription('')}  to parameters: { docs: { description: { component: ``...]
  General documentation [is in getGeneralDescription]
-DOM Architecture (optional) [Add ${getArchitectureSection(``)}  to parameters: { docs: { description: { component: ``...]
-Considerations / Restrictions (optional) [Add ${getSpecialSpecifications(` ### []:`)} to parameters: { docs: { description: { component: ``...]
-Reactive form example (optional) [Add ${getFormExampleBlock('', '', '', '')} to parameters: { docs: { description: { component: ``...]
  TypeScript example for reactive form [is in getFormExampleBlock]
  HTML example for reactive form [is in getFormExampleBlock]
-TypeScript example [Add ${getBasicExampleBlock('')} to parameters: { docs: { description: { component: ``...]
-HTML example [is in getBasicExampleBlock]
-PROPERTIES AND EVENTS [Done, is in preview]
  PROPERTIES [Clear in parameters: { controls: { exclude: [''] ...]
  EVENTS [Clear in parameters: { controls: { exclude: [''] ...]
-VARIANT TEMPLATES (optional) [Done, is in preview or in GeneralTemplate.mdx]
*/

/*
${getGeneralDescription('', '')}
${getSpecialSpecifications(getSandboxConsiderationsDocumentation('', `
>`))}
*/
