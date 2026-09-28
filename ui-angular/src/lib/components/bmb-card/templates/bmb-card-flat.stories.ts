import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Templates/Generic card/Flat',
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

const template = (isMobile: boolean) => `<div bmbLayout margin="none" gapSize="m" alignItems="stretch">
  <div bmbLayoutItem [colSm]="4" [colLg]="2" [colXl]="2">
    <bmb-card type="normal" borderRadius="m" margin="none">
      <bmb-card-content padding="m">
        <div bmbLayout margin="none" gapSize="m" justify="center" alignItems="center">
          <div bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12">
            <div bmbLayout margin="none" gapSize="none" justify="center" alignItems="center">
              <bmb-box-icon iconName="send" boxSize="small" boxShape="circle" boxColor="black-primary" />
            </div>
          </div>
          <bmb-title bmbLayoutItem [colSm]="3" [colLg]="12" [colXl]="12" componentTitle="Text" [isCenterContent]="${!isMobile}" titleSize="5" titleFontWeight="500" subtitle="Complementary text" subtitleSize="1" subtitleFontWeight="400" />
        </div>
      </bmb-card-content>
    </bmb-card>
  </div>
</div>`;

export const Desktop = staticCardStory(template(false));
export const Mobile = staticCardStory(template(true), true);
