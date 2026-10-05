import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  getTypescriptExampleTextBlock,
  RELEVANT_TITLE,
  TOC_OBJ,
} from '@docs/utils/utils';

import * as bmbContainerButtonBaseStory from '../../bmb-container-button/bmb-container-button.stories';
import * as bmbCheckboxStory from '../../bmb-checkbox/bmb-checkbox.stories';
import * as bmbUserImageStory from '../../bmb-user-image/bmb-user-images.stories';
import * as bmbSimpleTextStory from '../../bmb-simple-text/bmb-simple-text.stories';
import * as bmbLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-layout.stories';
import * as bmbVerticalLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Informative User Image',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCheckboxComponent,
        BmbContainerButtonBaseComponent,
        BmbLayoutDirective,
        BmbSimpleTextComponent,
        BmbUserImageComponent,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      toc: TOC_OBJ,
      description: {
        component: `
${getGeneralDescription('The **Informative User Image** template combines a checkbox, user image, title, and subtitle inside a responsive Container Button.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`
${getTechnicalDocReferences({
  references: [
    { title: bmbContainerButtonBaseStory.default.title ?? 'Components/Buttons/Container button' },
    { title: bmbCheckboxStory.default.title ?? 'Components/Forms/Checkbox' },
    { title: bmbUserImageStory.default.title ?? 'Components/Images/User Image' },
    { title: bmbSimpleTextStory.default.title ?? 'Dev tools/Simple text' },
    { title: bmbLayoutDirectiveStory.default.title ?? 'Foundations/Layouts/Layout' },
    { title: bmbVerticalLayoutDirectiveStory.default.title ?? 'Foundations/Layouts/Vertical layout container' },
  ],
})}
`)}
${getTypescriptExampleTextBlock(
  'BmbContainerButtonBaseComponent, BmbCheckboxComponent, BmbUserImageComponent, BmbSimpleTextComponent, BmbLayoutDirective, BmbVerticalLayoutDirective',
  '',
  '',
  '',
  "import { BreakpointObserver } from '@angular/cdk/layout';\\nimport { inject } from '@angular/core';\\nimport { map } from 'rxjs';",
  'for responsive composition',
  false,
  'with the Desktop and Mobile story markup',
  `readonly isMobile$ = inject(BreakpointObserver)
    .observe('(max-width: 1000px)')
    .pipe(map(({ matches }) => matches));`,
)}
Use \`isMobile$ | async\` in the application template to render the Mobile story markup when true and the Desktop story markup otherwise.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<BmbContainerButtonBaseComponent>;

const desktopTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerLeft>
    <bmb-checkbox
      [checked]="false"
      [indeterminate]="false"
      [disabled]="false"
    />
  </ng-template>

  <ng-template #bmbContainerMain>
    <div bmbLayout margin="none" gapSize="m" justify="start" alignItems="center">
      <bmb-user-image
        size="mobile-small"
        image="https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/logo.png"
      />
      <div bmbVerticalLayout gapSize="none" alignItems="start">
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="bold">Title</bmb-simple-text>
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="light">Subtitle (optional)</bmb-simple-text>
      </div>
    </div>
  </ng-template>
</bmb-container-button-base>`;

const mobileTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="stretch">
      <div bmbLayout margin="none" gapSize="m" justify="start" alignItems="center" [avoidRowWrap]="true">
        <bmb-checkbox
          [checked]="false"
          [indeterminate]="false"
          [disabled]="false"
        />
        <bmb-user-image
          size="mobile-small"
          image="https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/logo.png"
        />
      </div>
      <div bmbVerticalLayout gapSize="none" alignItems="start">
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="bold">Title</bmb-simple-text>
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="light">Subtitle (optional)</bmb-simple-text>
      </div>
    </div>
  </ng-template>
</bmb-container-button-base>`;

export const Desktop: Story = {
  render: () => ({ template: desktopTemplate }),
  parameters: {
    docs: {
      source: { code: desktopTemplate, language: 'html' },
    },
  },
};

export const Mobile: Story = {
  render: () => ({ template: mobileTemplate }),
  globals: { viewport: { value: 'small', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      previewWidth: '375px',
      story: { inline: false, height: '240px' },
      source: { code: mobileTemplate, language: 'html' },
    },
  },
};
