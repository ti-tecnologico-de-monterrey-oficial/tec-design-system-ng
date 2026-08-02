import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Actions',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbCardComponent, BmbBoxIconComponent, BmbButtonDirective],
    }),
  ],
};
export default meta;
const template = (mobile = false) =>
  `<div class="bmb-card-template bmb-card-template--actions${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="m" margin="none">
      <div class="bmb-card-template__surface">
        <bmb-box-icon class="bmb-card-template__icon" iconName="home" boxSize="small" boxShape="circle" boxColor="black-primary" />
        <div class="bmb-card-template__copy">
          <h3>Title</h3>
          <p>Text<br />content</p>
        </div>
        <button bmbButton appearance="secondary-outlined">Button</button>
      </div>
    </bmb-card>
  </div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
