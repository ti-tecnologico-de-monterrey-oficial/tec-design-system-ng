import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbGradeValueComponent } from '../../bmb-grade-value/bmb-grade-value.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getGeneralDescription,
  getSpecialSpecifications,
  getStoryLink,
  getTechnicalDocReferences,
  getTypescriptExampleTextBlock,
  RELEVANT_TITLE,
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
        BmbSimpleTextComponent,
        BmbLayoutDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription('The **Container Button** component is used to take advantage of its **built-in states**, **behaviors**, and **features**. The Desktop and Mobile stories provide separate compositions and copyable HTML.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`

  ${getAlertBlockquote(
    `Others components allowed on the left side of the template.
> Please use only the components included in the following list on the left side of the template, in accordance with the established guidelines:
>
${[
  { title: iconStory.default.title! },
  { title: boxIconStory.default.title! },
  { title: userImageStory.default.title! },
  { title: imageStory.default.title! },
]
  .map((reference) => `> - ${getStoryLink(reference)}`)
  .join('\n')}`,
    {
      title: RELEVANT_TITLE.configuration,
      blockquoteType: BlockquoteType.important,
      isHeader: true,
    },
  )}
  ${getTechnicalDocReferences({
    references: [
      { title: bmbContainerButtonBaseStory.default.title! },
      { title: bmbGradeValueStory.default.title! },
      { title: bmbBadgeStory.default.title! },
      { title: bmbLayoutDirectiveStory.default.title! },
      { title: bmbVerticalLayoutDirectiveStory.default.title! },
    ],
  })}
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
      <bmb-simple-text [size]="5" [weight]="'regular'" [color]="'general-contrasts-100'">Op. de humanidades y bellas a. (INGL)</bmb-simple-text>
      <bmb-simple-text [size]="3" [weight]="'light'" [color]="'general-contrasts-75'">Crédito: 1</bmb-simple-text>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbVerticalLayout gapSize="none" alignItems="end">
      <bmb-badge
        appearance="semantic-brand"
        text="Cursando"
        [container]="false"
      />
      <bmb-simple-text [size]="3" [weight]="'light'" [color]="'general-contrasts-100'">Semana: 5</bmb-simple-text>
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
        <bmb-simple-text [size]="5" [weight]="'regular'" [color]="'general-contrasts-100'">Op. de humanidades y bellas a. (INGL)</bmb-simple-text>
      </div>
      <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
        <bmb-simple-text [size]="3" [weight]="'light'" [color]="'general-contrasts-75'">Crédito: 1</bmb-simple-text>
        <bmb-simple-text [size]="3" [weight]="'light'" [color]="'general-contrasts-100'">Semana: 5</bmb-simple-text>
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
