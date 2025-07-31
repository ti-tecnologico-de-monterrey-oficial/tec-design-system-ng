import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks';
import { getListingOnOneLine } from '../utils';

export const DESIGN_SYSTEM_TITLE = '***Bamboo***';
export const STORIES_TITLE = 'Variant templates';
export const TITLE_OF_CONTROLS = 'Properties / Events';
const TOC_TITLE = 'On this page';
export const DESCRIPTION_TITLE = 'Description';
export const SPECIAL_SPECIFICATIONS_TITLE = 'Considerations / Restrictions';
export const SANDBOX_TITLE = 'Sandbox';
export const SPACING_DESCRIPTION =
  'Spacing is used to give space to components and their sections.';
export const TYPOGRAPHY_DESCRIPTION =
  'Typography refers to the design or selection of letter forms that are arranged in typo of blocks to create written content that is legible, readable, and visually appealing.<br/>';
export const FONT_FAMILY_DESCRIPTION = `Explore the typographic scale with ${DESIGN_SYSTEM_TITLE} **Popping** font family`;

interface IBmbVariableDesc {
  element: string;
  name: string;
}
export const TOC_OBJ = {
  title: TOC_TITLE,
  headingSelector: 'h2, h3',
};
export type IBmbStoryType = 'element' | 'component' | 'organism' | 'directive';
export interface IBmbOnEvent {
  name?: string;
  handleExample?: string;
  propertyValue?: string;
  type?: string;
  event_type?: string;
}
export type IBmbOnEventType = 'change' | 'keyDown' | 'other';

export const getPageStructureForFoundationStories = () => {
  return [Title({}), Description({}), Primary({}), Controls({})];
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

const getProperName = (name: string) =>
  name.replace(name.slice(0, 1), name.slice(0, 1).toLocaleUpperCase());

export const getFormatName = (
  name: string,
  separator: string = '',
  replace: string = '',
): string => {
  const _name: string = getProperName(name);

  if (!!separator && replace === '') {
    return name
      .split(separator)
      .map((element) => getProperName(element))
      .toString()
      .replaceAll(',', '');
  }

  return !!separator && !!replace
    ? _name.replaceAll(separator, replace)
    : _name;
};

export const getOnEvent = (
  name: string,
  paramName: string,
  type: string = 'MouseEvent',
  isHandle: boolean = false,
  additionalBlock: string = '',
): IBmbOnEvent => {
  const handleName: string = isHandle ? `handle${paramName}` : paramName;
  const _type: string = `event: ${type}`;
  const onEvent: IBmbOnEvent = {
    name,
    type,
    event_type: _type,
    handleExample: `
  ${handleName}(${_type}) {${additionalBlock}
    //Add your code
  }
  `,
    propertyValue: `${handleName}($event)`,
  };

  return onEvent;
};

export const getAccordionDetail = (title: string, content: string) => `
<section className="bmb_doc-accordion--container">
  <details className="bmb_doc-accordion--item">
    <summary>${title}</summary>
    <div className="bmb_doc-accordion--content">${content}</div>
  </details>
</section>
`;

export const generateLabel = (inputName: string): string =>
  getFormatName(inputName, '_', ' ');

export const getEmptyStateMessage = () => `
###Important:
Remember to use the \`empty state\` for the cases that apply to this. Related documentation is available [here](https://bamboo.tec.mx/latest/guia-ux-writing/mensajes-del-producto/empty-states-OQYyq6h8-OQYyq6h8).
`;

export const getGridGeneratorLink = () =>
  `### Grid generator
[Grid generator](/docs/dev-tools-grid-generator--documentation) is a tool that can be used to generate custom grids.`;

export const getAuxiliaryDescription = (
  principal: string,
  auxiliary: string,
): string =>
  `The ***${auxiliary}*** is the auxiliary to add the contents in an appropriate manner, facilitating customization. Use it whenever you use ***${principal}***.<br/><br/>`;

export const getArchitectureSection = (
  architectureBlock: string,
  bmbNameLink: string = '',
  documentationLink: string = '',
): string => `
## DOM Architecture
Represents the structure of the component.
\`\`\`html
${architectureBlock}
\`\`\`${bmbNameLink && bmbNameLink ? getDOMArchitectureLink(bmbNameLink, documentationLink) : ''}
`;

export const getCheckboxOrRadialArchitecture = (type: string): string => `
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
): string => `
##${isLevel3 ? '#' : ''} ${typeExampleName} example ${additionalTitle}
Below is a *${typeExampleName}* example with the basic code to use this component ${additionalText}:`;

const getTypescriptExampleBlock = (
  inputName: string,
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  importComments: string = '',
  additionalBlock: string = '',
  replaceChar: string = '',
): string =>
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
): string =>
  `
__${getDescribeTypeTextBlock('TypeScript', additionalTitle, isLevel3, additionalText)}
__${getTypescriptExampleBlock(inputName, additionalImportName, additionalImportFrom, importComments, additionalBlock, replaceChar)}
__`.replaceAll('__', replaceChar);

export const getReactiveFormTitle = (bmbInputName: string): string => `
##Reactive form example
>This example demonstrates how to use **${bmbInputName}** within an Angular reactive form, ensuring validation and handling the field and its value correctly.
>`;

export const getFormExampleBlock = (
  bmbInputName: string,
  inputName: string,
  additionalBlock: string = '',
  inputExample: string,
): string => `
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
  `  userForm: FormGroup = new FormGroup({
      ${inputName}: new FormControl(),
  });
  >  //Add your code
  >${additionalBlock}
  >   onSubmit() {
  >     if (this.userForm.valid) {
  >       //Add your code
  >       return;
  >     }
  >     this.userForm.markAllAsTouched();
  >     this.updateErrorState();
  >   }
  >
  >   updateErrorState() {
  >     Object.keys(this.userForm.controls).forEach((field) = {
  >       const control = this.getFormControl(field);
  >       if (control instanceof FormControl) {
  >         control.markAsTouched();
  >         control.updateValueAndValidity();
  >       }
  >     });
  >   }
  >
  >   getFormControl(name: string): FormControl {
  >     return this.userForm.get(name) as FormControl;
  >   }`,
  '>',
)}
>${getHTMLFormExampleTextBlock(inputExample)}

`;

export const getHTMLFormExampleTextBlock = (inputExample: string): string => `>
>${getDescribeTypeTextBlock('HTML', 'for reactive form', true, 'in a reactive form')}
>\`\`\`html
><form [formGroup]="userForm" (ngSubmit)="onSubmit()">
>  ${inputExample}
>  <button bmbButton appearance="primary" type="submit">Submit</button>
></form>
>\`\`\`
`;

export const getGeneralComponentDescription = (
  name: string,
  type: IBmbStoryType = 'component',
  additional: string = '',
  alternativeDescription: string = '',
): string =>
  `\`bmb${type === 'directive' ? '' : '-'}${name}\` is a ${DESIGN_SYSTEM_TITLE} ${additional} ${type} ${alternativeDescription || 'that allows'}`;

export const getGeneralDescription = (
  content: string,
  generalDocLink: string = '',
): string => `
<br/>
## ${DESCRIPTION_TITLE}
>${content}
>
${!!generalDocLink ? `>Please remember to refer to the [Bamboo - General documentation](${generalDocLink}) for more details about it.` : '>'}

<br/>
`;

export const getDOMArchitectureLink = (
  bmbNameLink: string = '',
  documentationLink: string = '',
): string => `
[bmb-${bmbNameLink} - DOM Architecture](/docs/${documentationLink}--documentation&globals=#dom-architecture)

<br/>
`;

export const getFieldDescription = (
  componentName: string,
  additionalDescription: string,
  generalDocLink: string,
): string => `
${getGeneralDescription(
  `
>\`bmb-${componentName}\` is a customizable ${DESIGN_SYSTEM_TITLE} input component that allows users to ${additionalDescription}
>
>This component includes validations, error messages, and support for tooltips to provide additional information.
>
>Support for error handling when errors occur:
>- The field border color changes to red.
>- Support text is displayed with the error message (default or assigned).`,
  generalDocLink,
)}
`;

export const getSpecialSpecifications = (content: string): string => `
## ${SPECIAL_SPECIFICATIONS_TITLE}
>${content}
<br/>
`;

export const getBasicExampleBlock = (
  inputName: string,
  importComments: string = '',
  additionalBlock: string = '',
): string => `
${getTypescriptExampleTextBlock(inputName, '', '', importComments, '', false, '', additionalBlock)}
${getDescribeTypeTextBlock('HTML')}
`;

export const getFoundationDescriptions = (
  element: string,
  additionalDescription: string = '',
): string =>
  `${additionalDescription || ''} ${DESIGN_SYSTEM_TITLE} provides a collection of ${element} variables designed to enhance the aesthetic and functional appeal of your projects.`;

export const getHelpDescriptionForGeneratingVariables = (
  element: string,
  isControl: boolean = false,
): string =>
  `${isControl ? `This is the collection of *${element}* that can be used.<br/><br/>` : ''}
Please use this ${isControl ? 'help' : 'interactive tool'} to generate the *${element}* variables to use.`;

export const getTypographyDetail = (
  isCompleteDetail: boolean = true,
): string => `
>### Font Family:
${
  isCompleteDetail
    ? `>
>${FONT_FAMILY_DESCRIPTION}, ranging from thin to bold variations, and a comprehensive scale of sizes to ensure flexibility and clarity in your design. ${DESIGN_SYSTEM_TITLE} encapsulates each font family and size into specific CSS classes to streamline the application across your projects.
>
>Here's how you can use them:
>`
    : '>'
}
>
- **Poppins-Thin**: \`.font-thin\`
- **Poppins-Light**: \`.font-light\`
- **Poppins-Regular**: \`.font-regular\`
- **Poppins-Medium**: \`.font-medium\`
- **Poppins-Semibold**: \`.font-semibold\`
- **Poppins-Bold**: \`.font-bold\`
>
><br/>
${
  isCompleteDetail
    ? `>### Font Sizes
>We provide a scale of sizes from 1 to 12, where each number corresponds to a specific size. To apply a font size, append the size number to the font family class. For example, \`.font-medium-4\` applies the medium family and the 4th size in our scale.
>
To use the medium family of Poppins with the 4th size, your HTML element should look like this: \`<div class="font-medium-4">Your text here</div>\`
>
><br/>
>`
    : '>'
}
>
### Sizes reference:
- **Size 1**: 10px
- **Size 2**: 11px
- **Size 3**: 12px
- **Size 4**: 14px
- **Size 4_5**: 15px
- **Size 5**: 16px
- **Size 6**: 18px
- **Size 7**: 20px
- **Size 8**: 22px
- **Size 9**: 24px
- **Size 10**: 26px
- **Size 11**: 36px
- **Size 12**: 48px
>
${
  isCompleteDetail
    ? `><br/>
>###Reminder:
Please remember to replace \`font-medium-4\` with the appropriate class based on the family and size you intend to use. The flexibility of these classes allows for a consistent typographic hierarchy and visual coherence across your digital experiences.
><br/><br/><br/>`
    : '><br/>'
}`;

export const getVariableDetail = (
  element: string,
  classes: string,
  list: string,
  definitionClass: string,
  size: string,
  style: string = '',
  isInherit: boolean = false,
  variableDescription: string = '',
  stylesVar: string = '',
): string => {
  const _style: string = `${!!style ? `style="${style}" ` : ''}`;
  const _description: string = `Content with ${list}${isInherit ? ' class names' : ''} applied using CSS variables.`;
  return `
>The ${!!classes ? 'class' : 'CSS variable'} name is defined as ${definitionClass} where ${size} are the ${element} size${isInherit ? `, and also set ${variableDescription} for the child elements` : ''}.
>
\`\`\`html
<div ${_style}${classes ? `class="${classes}"` : ''}>
    ${_description}
</div>
\`\`\`
${
  isInherit
    ? `>
\`\`\`html
<div ${_style}class="${classes}">
  <div style="${stylesVar}">
    The child element has access to the ${list} of the parent element's size through the ${variableDescription.replaceAll('\`', '')}.
  </div>
</div>
\`\`\`
>`
    : '>'
}`;
};

const getSubList = (
  list: string[] | IBmbVariableDesc[],
  elementName: string,
  template: string = '',
): string[] => {
  const result =
    typeof list[0] === 'string'
      ? !!template
        ? list.map((element) => template.replaceAll('[__]', element as string))
        : list
      : list.map((element) => {
          const _element = element as IBmbVariableDesc;
          if (elementName === 'element') {
            return !!template
              ? template.replaceAll('[__]', _element.element)
              : _element.element;
          } else if (elementName === 'name') {
            return !!template
              ? template.replaceAll('[__]', _element.name)
              : _element.name;
          } else {
            throw new Error(`Invalid elementName: ${elementName}`);
          }
        });

  return (result as string[]) || [];
};

const getMergeList = (
  list: string[],
  definition: string,
  splitChar: string,
): string => {
  const styles: string[] = definition.split(splitChar);
  const mergeList = list.map((element: string, index: number) =>
    element.concat(': var(--'.concat(styles[index]?.trim()).concat(');')),
  );

  return mergeList.toString().replaceAll(',', ' ');
};

export const getVariableAndClassesSizes = (element: string): string => `
### Values:
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
>
><br/>`;

export const getSandboxConsiderationsDocumentation = (
  element: string,
  introductionContent: string = '',
  content: string = '',
  isWarning: boolean = false,
  implementationDetails: string[] | IBmbVariableDesc[] = [],
  style: string = '',
  isClassNameVar: boolean = false,
  isInherit: boolean = false,
  isOmitImportant: boolean = false,
): string => {
  let _implementationDetails: string = '';

  if (!!implementationDetails.length) {
    const splitChar: string = '|||';
    const patternToReplaceOneLine: RegExp = /(and )|(\, )/g;
    const elementList: string[] = getSubList(implementationDetails, 'element');
    const varList: string[] = getSubList(implementationDetails, 'name');
    const definition: string = getListingOnOneLine(
      elementList as string[],
      '\`--bmb_[__]-{[__]}\`',
    );
    const definitionClass: string = definition.replaceAll('--', '');
    const _definition: string = getListingOnOneLine(
      varList as string[],
      '\`--bmb_[__]-4\`',
    );
    const definitionVar: string = _definition.replaceAll('_', '-');
    const size: string = getListingOnOneLine(elementList as string[], '{[__]}');
    const variableDescription: string = `the ${definitionVar.replaceAll('-4', '')} variable${(varList as string[]).length > 1 ? 's' : ''}`;
    const list: string = getListingOnOneLine(elementList as string[]);
    const _classes: string[] = getSubList(
      implementationDetails,
      'element',
      'bmb_[__]-4',
    );
    const classes: string = _classes.toLocaleString().replaceAll(',', ' ');
    const variableInheritStyles: string = `${style
      .concat(!!style ? ' ' : '')
      .concat(
        getMergeList(
          varList,
          definitionVar
            .replace(patternToReplaceOneLine, splitChar)
            .replace(/\`|(--)|(-4)/g, ''),
          splitChar,
        ),
      )}`;
    const variableStyles: string = `${style
      .concat(!!style ? ' ' : '')
      .concat(
        getMergeList(
          varList,
          classes.replaceAll('_', '-').replaceAll(' ', splitChar),
          splitChar,
        ),
      )}`;

    _implementationDetails = `
>
### Class Name
>${getVariableDetail(element, classes, list, definitionClass, size, style, isInherit, variableDescription, variableInheritStyles)}
><br/>
### CSS Variable
>${getVariableDetail(element, '', list, definition.replaceAll('_', '-'), size, variableStyles)}
><br/>
    `;
  }
  return `
>
${introductionContent}
>
>${
    !!implementationDetails.length
      ? `The ${element} is defined in the CSS variables and can be used in the application by using ${isClassNameVar ? 'the class name or ' : ''}the CSS variable name.
><br/><br/><br/>`
      : ''
  }
>${
    isOmitImportant
      ? ''
      : `
### Important:
Please refer to the [Variables documentation](/docs/foundations-variables--documentation&globals=#dom-architecture) for details on how to implement ${element} in CSS, where it is detailed that these can be implemented through variables.<br/><br/><br/>`
  }
>
>${
    isWarning
      ? `
### Warning:
You should be careful when using ${element}, as they can affect ${DESIGN_SYSTEM_TITLE} components. Some components may override this attribute, so check the component's documentation before applying the ${element} class.
<br/><br/><br/>`
      : ''
  }
>
>${_implementationDetails}
>${content}
>### ${SANDBOX_TITLE}
>${getHelpDescriptionForGeneratingVariables(element)}:
`;
};

/*
Checklist:
ON THIS PAGE (optional, TABLE OF CONTENTS) [Done, is in preview, if not so add parameters: { docs: { toc: TOC_OBJ...]
-Tabs (optional) [Create MDX]
-Name [Done, is is .stories]
-Description [Add ${getGeneralDescription('')}  to parameters: { docs: { description: { component: ``...]
  General documentation [is in getGeneralDescription]
  getGeneralComponentDescription('') General documentation helper
-DOM Architecture (optional) [Add ${getArchitectureSection(``)}  to parameters: { docs: { description: { component: ``...]
-Considerations / Restrictions (optional) [Add ${getSpecialSpecifications(` ### []:`)} to parameters: { docs: { description: { component: ``...]
-Reactive form example (optional) [Add ${getFormExampleBlock('', '', '', '')} to parameters: { docs: { description: { component: ``...]
  TypeScript example for reactive form [is in getFormExampleBlock]
  HTML example for reactive form [is in getFormExampleBlock]
-TypeScript example [Add ${getBasicExampleBlock('')} to parameters: { docs: { description: { component: ``...]
-HTML example [is in getBasicExampleBlock]
-PROPERTIES AND EVENTS [Done, is in preview]
  PROPERTIES [Clear in parameters: { controls: { exclude: ['']}, ...]
  EVENTS [Clear in parameters: { controls: { exclude: [''] ...]
-VARIANT TEMPLATES (optional) [Done, is in preview or in GeneralTemplate.mdx]
*/

/*
${getGeneralDescription(`${getGeneralComponentDescription('')} `, '')}
${getBasicExampleBlock('')}


controls: { exclude: ['', ''] },
*/
