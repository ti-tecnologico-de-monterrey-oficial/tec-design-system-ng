import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent, BmbCardContentComponent, BmbCardHeaderComponent } from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = { title: 'Components/Containers/Generic card/Empty', component: BmbCardComponent, tags: ['!autodocs'], decorators: [moduleMetadata({ imports: [BmbCardComponent, BmbCardHeaderComponent, BmbCardContentComponent, BmbBoxIconComponent, BmbButtonDirective, BmbLayoutDirective, BmbLayoutItemDirective, BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective] })] };
export default meta;
const template = (mobile = false) => `<div class="bmb-card-template bmb-card-template--empty${mobile ? ' bmb-card-template--mobile' : ''}"><bmb-card type="normal" borderRadius="xl" margin="none" boxShadowStyle="box-shadow-3"><div bmbVerticalLayout layoutHeight="566px" margin="none" gapSize="none"><bmb-card-header bmbVerticalLayoutItem padding="none"><h3 class="bmb-card-template__header">Title</h3></bmb-card-header><bmb-card-content bmbVerticalLayoutItem [rowGrow]="1" [disableScroll]="true" padding="none"><div class="bmb-card-template__summary" bmbLayout margin="none" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true"><span bmbLayoutItem>Lorem ipsum</span><span bmbLayoutItem>0 / 10</span></div><div class="bmb-card-template__surface" bmbVerticalLayout margin="none" gapSize="l" justify="center" alignItems="center"><bmb-box-icon bmbVerticalLayoutItem iconName="thumb_up" boxShape="circle" boxSize="regular" boxColor="transparent" /><h3 bmbVerticalLayoutItem>Title</h3><p bmbVerticalLayoutItem>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit.</p><button bmbButton bmbVerticalLayoutItem appearance="primary">Button</button></div></bmb-card-content></div></bmb-card></div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
