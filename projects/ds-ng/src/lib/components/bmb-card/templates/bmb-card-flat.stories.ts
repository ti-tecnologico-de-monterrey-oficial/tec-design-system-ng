import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Flat',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbCardComponent, BmbBoxIconComponent],
    }),
  ],
};
export default meta;
const template = (mobile = false) =>
  `<div class="bmb-card-template bmb-card-template--flat${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="m" margin="none">
      <div class="bmb-card-template__surface">
        <bmb-box-icon class="bmb-card-template__icon" iconName="crop_16_9" boxSize="small" boxShape="circle" boxColor="black-primary" />
        <div class="bmb-card-template__copy">
          <h3>${mobile ? '1. ' : ''}Title</h3>
          <p>Complementary text${mobile ? '+' : ''}</p>
        </div>
      </div>
    </bmb-card>
  </div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
