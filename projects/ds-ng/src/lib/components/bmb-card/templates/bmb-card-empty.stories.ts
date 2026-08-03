import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Empty',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbCardComponent, BmbIconComponent, BmbButtonDirective],
    }),
  ],
};
export default meta;

const template = (mobile = false) => `
  <div class="bmb-card-template bmb-card-template--empty${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="xl" margin="none" boxShadowStyle="box-shadow-3">
      <div class="bmb-card-template__empty-header">Title</div>
      <div class="bmb-card-template__empty-body">
        <div class="bmb-card-template__empty-summary">
          <span>Lorem ipsum</span>
          <span>0 / <small>10</small></span>
        </div>
        <div class="bmb-card-template__empty-content">
          <bmb-icon class="bmb-card-template__empty-icon" icon="thumb_up" [size]="80" alt="Empty state" />
          <h3>Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit,</p>
          <button bmbButton appearance="primary">Button</button>
        </div>
      </div>
    </bmb-card>
  </div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
