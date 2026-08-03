import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
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
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;
const template = (mobile = false) =>
  `<div class="bmb-card-template bmb-card-template--flat${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="m" margin="none">
      <div bmbVerticalLayout margin="none" gapSize="m" justify="center" alignItems="center">
        <bmb-box-icon bmbVerticalLayoutItem iconName="crop_16_9" boxSize="small" boxShape="circle" boxColor="black-primary" />
        <div bmbVerticalLayoutItem>
          <h3>${mobile ? '1. ' : ''}Title</h3>
          <p>Complementary text${mobile ? '+' : ''}</p>
        </div>
      </div>
    </bmb-card>
  </div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
