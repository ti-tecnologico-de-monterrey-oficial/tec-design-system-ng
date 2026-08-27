import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../old/bmb-box-icon/bmb-box-icon.component';
import { BmbTitleComponent } from '../../old/bmb-title/bmb-title.component';
import { BmbButtonDirective } from '../../../directives/old/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Actions',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbBoxIconComponent,
        BmbTitleComponent,
        BmbButtonDirective,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const template =
  () => `<div bmbLayout margin="none" gapSize="m" alignItems="stretch">
  <div bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3"><bmb-card type="normal" borderRadius="m" margin="none"><bmb-card-content padding="l">
    <div bmbLayout margin="none" gapSize="m" justify="center" alignItems="center">
      <div bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12"><div bmbLayout margin="none" gapSize="none" justify="center" alignItems="center"><bmb-box-icon iconName="home" boxSize="regular" boxShape="circle" boxColor="black-primary" /></div></div>
      <bmb-title bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12" componentTitle="Title" titleSize="5" titleFontWeight="500" subtitle="Text content" subtitleSize="4" subtitleFontWeight="400" [isCenterContent]="true" />
      <div bmbLayoutItem [colSm]="2" [colLg]="12" [colXl]="12"><button bmbButton appearance="secondary-outlined" size="large">Button</button></div>
    </div>
  </bmb-card-content></bmb-card></div>
</div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
