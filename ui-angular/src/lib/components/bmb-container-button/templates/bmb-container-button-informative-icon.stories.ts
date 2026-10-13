import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '@docs/utils/utils';

import * as bmbBoxIconStory from '../../bmb-box-icon/bmb-box-icon.stories';
import * as bmbContainerButtonBaseStory from '../../bmb-container-button/bmb-container-button.stories';
import * as bmbLayoutItemStory from '../../../directives/bmb-layout/bmb-layout-item.stories';
import * as bmbLayoutStory from '../../../directives/bmb-layout/bmb-layout.stories';
import * as bmbSimpleTextStory from '../../bmb-simple-text/bmb-simple-text.stories';
import * as bmbTitleStory from '../../bmb-title/bmp-title.stories';
import * as bmbVerticalLayoutStory from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Informative Icon',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbBoxIconComponent,
        BmbContainerButtonBaseComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbSimpleTextComponent,
        BmbTitleComponent,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription('The Informative Icon template combines a Bamboo box icon, supporting text, and a value inside a Container Button.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`
${getTechnicalDocReferences({
  references: [
    { title: bmbContainerButtonBaseStory.default.title! },
    { title: bmbBoxIconStory.default.title! },
    { title: bmbTitleStory.default.title! },
    { title: bmbSimpleTextStory.default.title! },
    { title: bmbLayoutStory.default.title! },
    { title: bmbLayoutItemStory.default.title! },
    { title: bmbVerticalLayoutStory.default.title! },
  ],
})}
`)}`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<BmbContainerButtonBaseComponent>;

const desktopTemplate = `<div bmbLayout margin="none" gapSize="none" alignItems="stretch">
  <div bmbLayoutItem [colSm]="4" [colLg]="2">
    <bmb-container-button-base>
      <ng-template #bmbContainerMain>
        <div bmbVerticalLayout gapSize="m" alignItems="stretch">
          <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
            <bmb-box-icon iconName="send" boxSize="small" boxShape="square" boxColor="black-primary" />
            <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-100'">50</bmb-simple-text>
          </div>
          <div bmbVerticalLayout gapSize="1" alignItems="stretch">
            <bmb-title componentTitle="Title" titleSize="4" titleFontWeight="500" [isCenterContent]="false" />
            <div bmbVerticalLayout gapSize="none" alignItems="start">
              <bmb-title componentTitle="" subtitle="Subtitle" subtitleSize="1" subtitleFontWeight="400" [isCenterContent]="false" />
              <bmb-title componentTitle="" subtitle="Complimentary" subtitleSize="1" subtitleFontWeight="400" [isCenterContent]="false" />
            </div>
          </div>
        </div>
      </ng-template>
    </bmb-container-button-base>
  </div>
</div>`;

const mobileTemplate = desktopTemplate.replace('[colSm]="4"', '[colSm]="2"');

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
      story: { inline: false, height: '240px' },
      source: { code: mobileTemplate, language: 'html' },
    },
  },
};

