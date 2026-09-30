import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbGradeValueComponent } from '../../bmb-grade-value/bmb-grade-value.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getGeneralDescription,
  getSpecialSpecifications,
  getStoryLink,
  getTypescriptExampleTextBlock,
  RELEVANT_TITLE,
  getTechnicalDocReferences,
} from '@docs/utils/utils';

import * as bmbContainerButtonBaseStory from '../../bmb-container-button/bmb-container-button.stories';
import * as bmbGradeValueStory from '../../bmb-grade-value/bmb-grade-value.stories';
import * as bmbBadgeStory from '../../bmb-badge/bmb-badge.stories';
import * as bmbLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-layout.stories';
import * as bmbVerticalLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';

import * as iconStory from '../../bmb-icon/bmb-icon.stories';
import * as boxIconStory from '../../bmb-box-icon/bmb-box-icon.stories';
import * as userImageStory from '../../bmb-user-image/bmb-user-images.stories';
import * as imageStory from '../../bmb-image/bmb-image.stories';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Informative Grade',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbContainerButtonBaseComponent,
        BmbGradeValueComponent,
        BmbBadgeComponent,
        BmbLayoutDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription('The Container Button component is used to take advantage of its built-in states, behaviors, and features. The Desktop and Mobile stories provide separate compositions and copyable HTML.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`
  ${getTechnicalDocReferences({
    references: [
      { title: bmbContainerButtonBaseStory.default.title! },
      { title: bmbGradeValueStory.default.title! },
      { title: bmbBadgeStory.default.title! },
      { title: bmbLayoutDirectiveStory.default.title! },
      { title: bmbVerticalLayoutDirectiveStory.default.title! },
    ],
  })},

${getAlertBlockquote(
    `
    Configuration - Elements allowed on the left side of the template.
    Please use only the components included in the following list on the left side of the template, in accordance with the established guidelines.
    >
    - ${getStoryLink({ title: iconStory.default.title! })}
    - ${getStoryLink({ title: boxIconStory.default.title! })}
    - ${getStoryLink({ title: userImageStory.default.title! })}
    - ${getStoryLink({ title: imageStory.default.title! })}
    `,
    {
      title: RELEVANT_TITLE.configuration.replace(
        '<br/>',
        ' - Switching languages<br/>',
      ),
      blockquoteType: BlockquoteType.important,
      isRelevantTitle: true,
      isHeader: true,
    },
  )}

`)}
${getTypescriptExampleTextBlock(
  'BmbContainerButtonBaseComponent, BmbGradeValueComponent, BmbBadgeComponent, BmbLayoutDirective, BmbVerticalLayoutDirective',
  '',
  '',
  '',
  "import { BreakpointObserver } from '@angular/cdk/layout';\nimport { inject } from '@angular/core';\nimport { map } from 'rxjs';",
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
    <bmb-grade-value
      type="main-grade"
      appearanceContrast="default"
      score="Cu"
    />
  </ng-template>

  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="m" justify="center" alignItems="start">
      <span class="font-regular-5">
        Op. de humanidades y bellas a. (INGL)
      </span>
      <span class="font-regular-3">Crédito: 1</span>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbVerticalLayout gapSize="none" alignItems="end">
      <bmb-badge
        appearance="semantic-brand"
        text="Cursando"
        [container]="false"
      />
      <span class="font-regular-3">Semana: 5</span>
    </div>
  </ng-template>
</bmb-container-button-base>`;
const mobileTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="stretch">
      <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
        <bmb-grade-value type="main-grade" appearanceContrast="default" score="Cu" />
        <bmb-badge appearance="creative-use-strong" text="Cursando" [container]="false" />
      </div>
      <div bmbVerticalLayout gapSize="m" alignItems="start">
        <span class="font-regular-5">Op. de humanidades y bellas a. (INGL)</span>
      </div>
      <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
        <span class="font-regular-3">Crédito: 1</span>
        <span class="font-regular-3">Semana: 5</span>
      </div>
    </div>
  </ng-template>
</bmb-container-button-base>`;

export const Desktop: Story = {
  render: () => ({ template: desktopTemplate }),
  parameters: { docs: { source: { code: desktopTemplate, language: 'html' } } },
};

export const Mobile: Story = {
  render: () => ({ template: mobileTemplate }),
  globals: { viewport: { value: 'small', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      previewWidth: '375px',
      story: { inline: false, height: '280px' },
      source: { code: mobileTemplate, language: 'html' },
    },
  },
};
