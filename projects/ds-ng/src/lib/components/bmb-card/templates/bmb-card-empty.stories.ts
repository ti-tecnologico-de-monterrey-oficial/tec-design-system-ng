import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Empty',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbIconComponent,
        BmbButtonDirective,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const template = (mobile = false) => `
  <div class="bmb-card-template bmb-card-template--empty${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="xl" margin="none" boxShadowStyle="box-shadow-3">
      <div bmbVerticalLayout layoutHeight="48rem" margin="none" gapSize="none">
        <div bmbLayoutItem bmbLayout margin="none" alignItems="center">Title</div>
        <div bmbVerticalLayoutItem bmbVerticalLayout class="bmb_padding-7" margin="none" gapSize="none" [rowGrow]="1" [disableScroll]="true">
          <div bmbLayoutItem bmbLayout margin="none" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
            <span bmbLayoutItem>Lorem ipsum</span>
            <span bmbLayoutItem>0 / <small>10</small></span>
          </div>
          <div bmbVerticalLayoutItem bmbVerticalLayout class="bmb-card-template__empty-content" margin="none" gapSize="none" justify="center" alignItems="center" [rowGrow]="1" [disableScroll]="true">
            <bmb-icon bmbLayoutItem icon="thumb_up" [size]="80" alt="Empty state" />
            <h3 bmbLayoutItem>Title</h3>
            <p bmbLayoutItem>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit,</p>
            <button bmbButton bmbLayoutItem appearance="primary">Button</button>
          </div>
        </div>
      </div>
    </bmb-card>
  </div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
