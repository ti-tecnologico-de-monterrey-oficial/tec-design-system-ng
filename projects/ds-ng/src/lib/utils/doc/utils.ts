import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks';
import { getListingOnOneLine } from '../utils';

interface IBmbVariableDesc {
  element: string;
  name: string;
}
export type IBmbStoryType =
  | 'element'
  | 'component'
  | 'organism'
  | 'directive'
  | 'service';
export interface IBmbOnEvent {
  name?: string;
  handleExample?: string;
  propertyValue?: string;
  type?: string;
  event_type?: string;
}
export type IBmbOnEventType = 'change' | 'keyDown' | 'other';

export const RELEVANT_TITLE_LEVEL: string[] = [
  `⚠️**Warning**<br/>`,
  `‼️**Important**<br/>`,
  `✳️**Note**<br/>`,
  `⚙️**Configuration**<br/>`,
  `⭐**Example**<br/>`,
];
/*
\r\n
<br/>


*/
export const RelevantTitle = {
  warning: '⚠️**Warning**<br/>',
  important: '‼️**Important**<br/>',
  note: '✳️**Note**<br/>',
  configuration: '⚙️**Configuration**<br/>',
  example: '⭐**Example**<br/>',
};

export const DESIGN_SYSTEM_TITLE: string = '***Bamboo***';
export const TECHNICAL_DOC_TITLE: string = `${DESIGN_SYSTEM_TITLE} ***- Technical documentation***`;
export const TECHNICAL_DOC_REFERENCES: string = `Please remember to refer to the ${TECHNICAL_DOC_TITLE} for more details:`;
export const STORIES_TITLE: string = 'Variant templates';
export const TITLE_OF_CONTROLS: string = 'Properties / Events';
export const TOC_TITLE: string = 'On this page';
export const DESCRIPTION_TITLE: string = 'Description';
export const SPECIAL_SPECIFICATIONS_TITLE: string =
  'Considerations / Restrictions';
export const SANDBOX_TITLE: string = 'Sandbox';
export const SPACING_DESCRIPTION: string =
  'Spacing is used to give space to components and their sections.';
export const TYPOGRAPHY_DESCRIPTION: string =
  'Typography refers to the design or selection of letter forms that are arranged in typo of blocks to create written content that is legible, readable, and visually appealing.<br/>';
export const FONT_FAMILY_DESCRIPTION: string = `Explore the typographic scale with ${DESIGN_SYSTEM_TITLE} **Popping** font family`;
export const FULLSCREEN_DESC: string = `${RELEVANT_TITLE_LEVEL[2]}
When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.`;

export const TOC_OBJ = {
  title: TOC_TITLE,
  headingSelector: 'h2, h3',
};

export const getPageStructureForFoundationStories = () => {
  return [Title({}), Description({}), Primary({}), Controls({})];
};

export const getPageStructureForTemplateStories = () => {
  return [Title({}), Description({}), Primary({})];
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

export const getLandingGeneralDesc = (name: string) =>
  `${getGeneralDescription(`Template containing the ${DESIGN_SYSTEM_TITLE} elements to be used to implement the **Landing - ${name}**.`, 'https://bamboo.tec.mx/latest/particularities/mitec-web/landings-fCESn8dl-fCESn8dl')}`;

export const getStandaloneGeneralDesc = (name: string) =>
  `${getGeneralDescription(`Template containing the ${DESIGN_SYSTEM_TITLE} elements to implement the structure of the **Stand alone sites - ${name}**.`, 'https://bamboo.tec.mx/latest/templates/sitios-stand-alone/descripcion-general-lwpZfyMh')}`;

const getProperName = (name: string): string =>
  name.replace(name.slice(0, 1), name.slice(0, 1).toLocaleUpperCase());

export const getFormatName = (
  name: string,
  separator: string | RegExp = '',
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

export const getModelDescription = (
  propertyName: string,
): string => `This is a model signal, so it is possible to use it as:
    [(${propertyName})]="${propertyName}"`;

export const getOnEvent = (
  name: string,
  paramName: string,
  type: string = 'MouseEvent',
  isHandle: boolean = false,
  additionalBlock: string = '',
): IBmbOnEvent => {
  const handleName: string = isHandle ? `handle${paramName}` : paramName;
  const _type: string = type === 'void' ? '' : `event: ${type}`;
  const onEvent: IBmbOnEvent = {
    name,
    type,
    event_type: _type,
    handleExample: `
  ${handleName}(${_type}) {${additionalBlock}
    //Add your code
  }`,
    propertyValue: `${handleName}(${_type === '' ? '' : '$event'})`,
  };

  return onEvent;
};

export const getStoryTitle = (fullTitle: string): string =>
  getFormatName(
    fullTitle!,
    fullTitle?.substring(0, fullTitle?.lastIndexOf('/') + 1),
    '',
  );

export const getStoryLink = ({
  title,
  showFullLinkName,
}: {
  title: string;
  showFullLinkName?: boolean;
}): string => {
  if (showFullLinkName)
    return `[${title}](/docs/${getFormatName(title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)`;
  return `[${getStoryTitle(title!)}](/docs/${getFormatName(title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)`;
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

export const getEmptyStateMessage = (
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
###${getSubStoryIdentifier(isSubStory, subStoryChart)}${RELEVANT_TITLE_LEVEL[1]}
Remember to use the \`empty state\` for the cases that apply to this. Related documentation is available [here](https://bamboo.tec.mx/latest/guia-ux-writing/mensajes-del-producto/empty-states-OQYyq6h8-OQYyq6h8).
`;

export const getGridGeneratorLink = (): string =>
  `### Grid generator
[Grid generator](/docs/dev-tools-grid-generator--documentation) is a tool that can be used to generate custom grids.`;

export const getAuxiliaryDescription = (
  principal: string,
  auxiliary: string,
): string =>
  `The ***${auxiliary}*** is the auxiliary to add the contents in an appropriate manner, facilitating customization. Use it whenever you use ***${principal}***.<br/><br/>`;

export const getArchitectureSection = (
  architectureBlock: string,
  isSubStory: boolean = false,
  bmbNameLink: string = '',
  documentationLink: string = '',
  subStoryChart: string = '-',
): string => `
## ${getSubStoryIdentifier(isSubStory, subStoryChart)}DOM Architecture
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
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
##${isLevel3 ? '#' : ''} ${getSubStoryIdentifier(isSubStory, subStoryChart)}${typeExampleName} example ${additionalTitle}
Below is a *${typeExampleName}* example with the basic code to use this component ${additionalText}:`;

const getTypescriptExampleBlock = (
  inputName: string,
  additionalAngularCommonImportName: string = '',
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  importComments: string = '',
  additionalBlock: string = '',
  replaceChar: string = '',
): string =>
  `
\`\`\`typescript
__import { CommonModule${additionalAngularCommonImportName} } from '@angular/common';
__import { Component, ChangeDetectionStrategy } from '@angular/core';${
    !!additionalImportName && !!additionalImportFrom
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
  additionalAngularCommonImportName: string = '',
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  importComments: string = '',
  additionalTitle: string = '',
  isLevel3: boolean = false,
  additionalText: string = '',
  additionalBlock: string = '',
  replaceChar: string = '',
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string =>
  `
__${getDescribeTypeTextBlock('TypeScript', additionalTitle, isLevel3, additionalText, isSubStory, subStoryChart)}
__${getTypescriptExampleBlock(inputName, additionalAngularCommonImportName, additionalImportName, additionalImportFrom, importComments, additionalBlock, replaceChar)}
__`.replaceAll('__', replaceChar);

export const getReactiveFormTitle = (
  bmbInputName: string,
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
##${getSubStoryIdentifier(isSubStory, subStoryChart)}Reactive form example
>This example demonstrates how to use **${bmbInputName}** within an Angular reactive form, ensuring validation and handling the field and its value correctly.
>`;

export const getFormExampleBlock = (
  bmbInputName: string,
  inputName: string,
  additionalBlock: string = '',
  inputExample: string,
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
${getReactiveFormTitle(bmbInputName, isSubStory, subStoryChart)}
>
><br/>
>${getTypescriptExampleTextBlock(
  `BmbButtonDirective, ${bmbInputName}`,
  '',
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
  isSubStory,
)}
>${getHTMLFormExampleTextBlock(inputExample, isSubStory)}

`;

export const getHTMLFormExampleTextBlock = (
  inputExample: string,
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `>
>${getDescribeTypeTextBlock('HTML', 'for reactive form', true, 'in a reactive form', isSubStory, subStoryChart)}
>\`\`\`html
><form [formGroup]="userForm" (ngSubmit)="onSubmit()">
>  ${inputExample}
>  <button bmbButton appearance="primary" type="submit">Submit</button>
></form>
>\`\`\`
`;

export const getSubStoryIdentifier = (
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => (isSubStory ? subStoryChart : '');

export const getGeneralDocDescription = (generalDocLink: string): string =>
  `Please remember to refer to the [Bamboo - General documentation](${generalDocLink}) for more details about it.`;

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
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
<br/>
## ${getSubStoryIdentifier(isSubStory, subStoryChart)}${DESCRIPTION_TITLE}
>${content}
>
${!!generalDocLink ? `>${getGeneralDocDescription(generalDocLink)}` : '>'}

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

export const getSpecialSpecifications = (
  content: string,
  isSubStory: boolean = false,
  subStoryChart: string = '-',
): string => `
## ${getSubStoryIdentifier(isSubStory, subStoryChart)}${SPECIAL_SPECIFICATIONS_TITLE}
>${content}
<br/>
`;

export const getBasicExampleBlock = (
  inputName: string,
  importComments: string = '',
  additionalBlock: string = '',
  isSubStory: boolean = false,
  additionalAngularCommonImportName: string = '',
  additionalImportName: string = '',
  additionalImportFrom: string = '',
  subStoryChart: string = '-',
): string => `
${getTypescriptExampleTextBlock(inputName, additionalAngularCommonImportName, additionalImportName, additionalImportFrom, importComments, '', false, '', additionalBlock, '', isSubStory, subStoryChart)}
${getDescribeTypeTextBlock('HTML', '', false, '', isSubStory, subStoryChart)}
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
    The child element has access to the ${list} of the parent element's size through the ${variableDescription.replaceAll('`', '')}.
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
      '`--bmb_[__]-{[__]}`',
    );
    const definitionClass: string = definition.replaceAll('--', '');
    const _definition: string = getListingOnOneLine(
      varList as string[],
      '`--bmb_[__]-4`',
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
### ${RELEVANT_TITLE_LEVEL[1]}
Please refer to the [Variables documentation](/docs/foundations-variables--documentation&globals=#dom-architecture) for details on how to implement ${element} in CSS, where it is detailed that these can be implemented through variables.<br/><br/><br/>`
  }
>
>${
    isWarning
      ? `
### ${RELEVANT_TITLE_LEVEL[0]}
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

export const getAlertCenterServiceDocumentation = (): string =>
  getSpecialSpecifications(`
  > ###Configuration
  > Add the \`BmbAlertCenterService\` to your App providers:
  >
  > \`\`\`javascript
  providers: [
    provideRouter(routes),
    importProvidersFrom([BmbAlertCenterService, ...]),
  ],
  > \`\`\`
  >
  > ---
  >
  > ###Alert center service methods
  >
  > ####Alerts
  >
  > #####Set notifications
  >
  > \`\`\`typescript
  setAlerts(alerts: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method sets the alerts to be displayed in the alert center replacing any existing alerts.
  >
  > #####Update notifications
  >
  > \`\`\`typescript
  updateAlerts(alertList: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method updates the existing alerts with the provided list. If an alert with the same ID exists, it will be updated; otherwise, it will remain unchanged.
  >
  > #####Add notifications
  >
  > \`\`\`typescript
  addAlerts(alerts: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method adds new alerts to the existing list of alerts without replacing them.
  >
  > #####Get notifications
  >
  > \`\`\`typescript
  getAlerts(): IBmbDataAlert[];
  > \`\`\`
  >
  > This method retrieves the current list of alerts.
  >
  > ---
  >
  > ####Advertisements
  >
  > #####Set advertisements
  >
  > \`\`\`typescript
  setAdvertisements(ads: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method sets the advertisements to be displayed in the alert center replacing any existing advertisements.
  >
  > #####Update advertisements
  >
  > \`\`\`typescript
  updateAdvertisements(adList: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method updates the existing advertisements with the provided list. If an advertisement with the same ID exists, it will be updated; otherwise, it will remain unchanged.
  >
  > #####Add advertisements
  >
  > \`\`\`typescript
  addAdvertisements(ads: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method adds new advertisements to the existing list of advertisements without replacing them.
  >
  > #####Get advertisements
  >
  > \`\`\`typescript
  getAdvertisements(): IBmbDataAdvertisement[];
  > \`\`\`
  >
  > This method retrieves the current list of advertisements.
  >
  > ---
  >
  > ####Loading state
  >
  > #####Set loading state
  >
  > \`\`\`typescript
  setLoadingState(loading: boolean = false);
  > \`\`\`
  >
  > This method sets the loading state.
  >
  > #####Get loading state
  >
  > \`\`\`typescript
  getLoadingState(): boolean;
  > \`\`\`
  >
  > This method retrieves the current loading state.
  > ### Scroll
  If you want the component to handle the scroll, you should wrap it in a container with a defined height.
  >
  > \`\`\`html
  <div style="height: 100dvh;">
   <bmb-alert-center ... />
  </div>
  > \`\`\`
`);

export const getProviderBlockExample = (bambooProviderName: string) =>
  `providers: [
  provideRouter(routes),
  importProvidersFrom([${bambooProviderName}, //Add other providers...]),
]`;

export const getProviderExample = (bambooProviderName: string) =>
  `Add the ***${bambooProviderName}*** to your App providers:
\`\`\`typescript
 ${getProviderBlockExample(bambooProviderName)}
\`\`\`
`;

export const getProviderTypescriptExample = (
  bambooProviderName: string,
  additionalDetail: string = '',
) => `
###${RELEVANT_TITLE_LEVEL[3]}
>
>${additionalDetail}
>
App provider example:
\`\`\`typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ${bambooProviderName} } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
// Import other routes
>
export const appConfig: ApplicationConfig = {
 ${getProviderBlockExample(bambooProviderName)}
};
\`\`\`
>
`;

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

getOnClickParam(
    getOnEvent('', ''),
    ``,
  )

getOnEventParam(
      getOnEvent('', '','void'),
      '',
      'other'
    ),

controls: { exclude: ['', ''] },
controls: {
        exclude: [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
      },

tags: ['!autodocs'],
*/
