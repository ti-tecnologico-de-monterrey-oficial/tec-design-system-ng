import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/old/bmb-layout/bmb-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Flat',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbBoxIconComponent,
        BmbTitleComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const template =
  () => `<div bmbLayout margin="none" gapSize="m" alignItems="stretch">
  <div bmbLayoutItem [colSm]="4" [colLg]="2" [colXl]="2">
    <bmb-card type="normal" borderRadius="m" margin="none"><bmb-card-content padding="l">
      <div bmbLayout margin="none" gapSize="m" justify="center" alignItems="center">
        <div bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12"><div bmbLayout margin="none" gapSize="none" justify="center" alignItems="center">
          <bmb-box-icon iconName="crop_16_9" boxSize="regular" boxShape="circle" boxColor="black-primary" />
        </div></div>
        <bmb-title bmbLayoutItem [colSm]="3" [colLg]="12" [colXl]="12" componentTitle="Title" titleSize="5" titleFontWeight="500" subtitle="Complementary text" subtitleSize="4" subtitleFontWeight="400" [isCenterContent]="true" />
      </div>
    </bmb-card-content></bmb-card>
  </div>
</div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
