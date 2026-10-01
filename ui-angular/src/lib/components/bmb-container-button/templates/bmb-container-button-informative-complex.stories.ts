import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
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
import * as bmbBadgeStory from '../../bmb-badge/bmb-badge.stories';
import * as bmbDividerStory from '../../bmb-divider/bmb-divider.stories';
import * as bmbSimpleTextStory from '../../bmb-simple-text/bmb-simple-text.stories';
import * as bmbLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-layout.stories';
import * as bmbVerticalLayoutDirectiveStory from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Informative Complex',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbContainerButtonBaseComponent,
        BmbBadgeComponent,
        BmbDividerComponent,
        BmbIconComponent,
        BmbSimpleTextComponent,
        BmbLayoutDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      toc: TOC_OBJ,
      description: {
        component: `
${getGeneralDescription('The template **Informative Complex** template combines a title, supporting text, and badges in a responsive Container Button.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`
${getAlertBlockquote(
  'Use the listed Bamboo elements to build the Informative Complex template. For the desktop version, content must be limited to a maximum of **two lines**, in accordance with the established guidelines. For the responsive version, content must be limited to a maximum of **three lines**, in accordance with the established guidelines.',
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
${getTechnicalDocReferences({
  references: [
    { title: bmbContainerButtonBaseStory.default.title! },
    { title: bmbBadgeStory.default.title! },
    { title: bmbDividerStory.default.title ?? 'Components/Containers/Divider' },
    { title: bmbSimpleTextStory.default.title! },
    { title: bmbLayoutDirectiveStory.default.title! },
    { title: bmbVerticalLayoutDirectiveStory.default.title! },
  ],
})}
`)}
${getTypescriptExampleTextBlock(
  'BmbContainerButtonBaseComponent, BmbBadgeComponent, BmbDividerComponent, BmbIconComponent, BmbSimpleTextComponent, BmbLayoutDirective, BmbVerticalLayoutDirective',
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
Use \`isMobile$ | async\` in the application template to select the Mobile or Desktop markup.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<BmbContainerButtonBaseComponent>;

const containerButtonTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="stretch">
      <div bmbLayout margin="none" justify="start" alignItems="start">
        <bmb-simple-text [size]="5" [weight]="'regular'" [color]="'general-contrasts-100'">Título<br />(2 líneas máx)</bmb-simple-text>
      </div>
      <div bmbLayout margin="none" gapSize="s" justify="start" alignItems="center" [avoidRowWrap]="true">
        <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 1</bmb-simple-text>
        <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
        <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 2</bmb-simple-text>
        <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
        <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 3</bmb-simple-text>
        <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
        <bmb-badge appearance="semantic-brand" text="Badge" [container]="false" />
      </div>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbLayout margin="none" gapSize="s" justify="end" alignItems="center" [avoidRowWrap]="true">
      <bmb-badge appearance="semantic-brand" text="Badge" [container]="false" />
      <bmb-icon icon="chevron_right" [size]="24" alt="Ver detalles" />
    </div>
  </ng-template>
</bmb-container-button-base>`;

const desktopTemplate = containerButtonTemplate;
const mobileTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="stretch">
      <div bmbLayout margin="none" justify="start" alignItems="start">
        <bmb-simple-text [size]="5" [weight]="'regular'" [color]="'general-contrasts-100'">Título<br />(3 líneas máx) -<br />Truncate (...)</bmb-simple-text>
      </div>
      <div bmbVerticalLayout gapSize="s" alignItems="start">
        <div bmbLayout margin="none" gapSize="s" justify="start" alignItems="center" [avoidRowWrap]="true">
          <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 1</bmb-simple-text>
          <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
          <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 2</bmb-simple-text>
          <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
          <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-75'">Texto 3</bmb-simple-text>
          <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
        </div>
        <bmb-badge appearance="semantic-brand" text="Badge" [container]="false" />
      </div>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbLayout margin="none" gapSize="s" justify="end" alignItems="center" [avoidRowWrap]="true">
      <bmb-badge appearance="semantic-brand" text="Badge" [container]="false" />
      <bmb-icon icon="chevron_right" [size]="24" alt="Ver detalles" />
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
