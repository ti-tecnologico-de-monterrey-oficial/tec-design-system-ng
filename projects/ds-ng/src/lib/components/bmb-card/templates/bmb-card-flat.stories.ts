import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Flat',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbBoxIconComponent,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
};
export default meta;
const template = (mobile = false) =>
  `<div class="bmb-card-template--flat bmb_padding-l${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="m" margin="none">
      <div bmbVerticalLayout margin="none" gapSize="m" justify="center" alignItems="center">
        <bmb-box-icon iconName="crop_16_9" boxSize="small" boxShape="circle" boxColor="black-primary" />
        <div bmbLayoutItem>
          <h3>Title</h3>
          <p class="font-regular-3">Complementary text</p>
        </div>
      </div>
    </bmb-card>
  </div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
