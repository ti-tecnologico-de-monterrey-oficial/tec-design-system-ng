import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import {
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  getTypescriptExampleTextBlock,
} from '@docs/utils/utils';

import * as bmbBoxIconStory from '../../bmb-box-icon/bmb-box-icon.stories';
import * as bmbContainerButtonBaseStory from '../../bmb-container-button/bmb-container-button.stories';
import * as bmbLayoutItemStory from '../../../directives/bmb-layout/bmb-layout-item.stories';
import * as bmbLayoutStory from '../../../directives/bmb-layout/bmb-layout.stories';
import * as bmbSimpleTextStory from '../../bmb-simple-text/bmb-simple-text.stories';
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
    { title: bmbContainerButtonBaseStory.default.title ?? 'Components/Buttons/Container button' },
    { title: bmbBoxIconStory.default.title ?? 'Components/Visual labels/Box icon' },
    { title: bmbSimpleTextStory.default.title ?? 'Dev tools/Simple text' },
    { title: bmbLayoutStory.default.title ?? 'Foundations/Layouts/Layout' },
    { title: bmbLayoutItemStory.default.title ?? 'Foundations/Layouts/Layout item' },
    { title: bmbVerticalLayoutStory.default.title ?? 'Foundations/Layouts/Vertical layout container' },
  ],
})}
`)}
${getTypescriptExampleTextBlock(
  'BmbBoxIconComponent, BmbContainerButtonBaseComponent, BmbLayoutDirective, BmbLayoutItemDirective, BmbSimpleTextComponent, BmbVerticalLayoutDirective',
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

const desktopTemplate = `<div bmbLayout margin="none" gapSize="none" alignItems="stretch">
  <div bmbLayoutItem style="width: 210px; max-width: 100%; flex: 0 1 210px">
    <bmb-container-button-base>
      <ng-template #bmbContainerMain>
        <div bmbVerticalLayout gapSize="m" alignItems="stretch">
          <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
            <bmb-box-icon iconName="send" boxSize="small" boxShape="square" boxColor="black-primary" />
            <bmb-simple-text [size]="3" [weight]="'regular'" [color]="'general-contrasts-100'">50</bmb-simple-text>
          </div>
          <div bmbVerticalLayout gapSize="1" alignItems="stretch" style="text-align: start">
            <bmb-simple-text [size]="4" weight="regular" color="general-contrasts-100">Title</bmb-simple-text>
            <div bmbVerticalLayout gapSize="none" alignItems="start">
              <bmb-simple-text [size]="1" weight="regular" color="general-contrasts-100">Subtitle</bmb-simple-text>
              <bmb-simple-text [size]="1" weight="regular" color="general-contrasts-100">Complimentary</bmb-simple-text>
            </div>
          </div>
        </div>
      </ng-template>
    </bmb-container-button-base>
  </div>
</div>`;

const mobileTemplate = desktopTemplate;

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

