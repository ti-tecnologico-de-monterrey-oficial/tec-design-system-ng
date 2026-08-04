import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Informative',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbBadgeComponent,
        BmbButtonDirective,
        BmbCardComponent,
        BmbCardContentComponent,
        BmbImageComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbTitleComponent,
        BmbTooltipComponent,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const image =
  'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

const template = () => `<bmb-card type="normal" borderRadius="l" margin="none">
  <bmb-card-content padding="l">
    <div bmbLayout margin="none" gapSize="xl" alignItems="stretch" [flow]="{ m: 'row', l: 'reverse', xl: 'reverse' }">
      <bmb-image bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="5" src="${image}" alt="Edificio de Rectoría del Tecnológico de Monterrey" ratio="16 / 9" borderRadius="m" objectFit="cover" [minHeight]="{ s: '14rem', l: '18rem' }" />
      <div bmbVerticalLayout bmbLayoutItem [colSm]="4" [colLg]="6" [colXl]="7" margin="none" gapSize="m" justify="spaceBetween" alignItems="stretch">
        <div bmbLayout bmbVerticalLayoutItem margin="none" gapSize="s" alignItems="center" [avoidRowWrap]="true">
          <bmb-tooltip bmbLayoutItem icon="info" text="Additional information" componentTitle="Information" [size]="20" />
          <bmb-badge bmbLayoutItem text="Badge" appearance="creative-violet" />
        </div>
        <bmb-title bmbVerticalLayoutItem componentTitle="Title" titleSize="10" titleFontWeight="700" subtitle="Complementary text" subtitleSize="6" subtitleFontWeight="400" />
        <hr bmbVerticalLayoutItem />
        <p bmbVerticalLayoutItem>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim pharetra ipsum euismod, sed maximus justo pharetra.</p>
        <div bmbLayout bmbVerticalLayoutItem margin="none" gapSize="l" alignItems="center">
          <button bmbButton bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3" appearance="secondary-outlined" size="large">Button</button>
          <button bmbButton bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4" appearance="secondary-outlined" size="large">Secondary button</button>
        </div>
      </div>
    </div>
  </bmb-card-content>
</bmb-card>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
