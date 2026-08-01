import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent, BmbCardContentComponent, BmbCardHeaderComponent } from '../bmb-card.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbListGroupComponent } from '../../bmb-list-group/bmb-list-group.component';
import { BmbListGroupItemComponent } from '../../bmb-list-group/bmb-list-group-item/bmb-list-group-item.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = { title: 'Components/Containers/Generic card/Home', component: BmbCardComponent, tags: ['!autodocs'], decorators: [moduleMetadata({ imports: [BmbCardComponent, BmbCardHeaderComponent, BmbCardContentComponent, BmbBadgeComponent, BmbListGroupComponent, BmbListGroupItemComponent, BmbLayoutDirective, BmbLayoutItemDirective, BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective] })] };
export default meta;
const item = (id: string) => `<bmb-list-group-item id="${id}" [personalizedTemplate]="true"><div class="bmb-card-template__list-item" bmbLayout margin="none" gapSize="m" alignItems="center" justify="spaceBetween" [avoidRowWrap]="true"><div bmbLayoutItem [isDynamicItem]="true" [colGrow]="1"><h4>Lorem ipsum dolor sit amet, consectetur</h4><p>&bull; Subtitle</p></div><bmb-badge bmbLayoutItem text="Badge" appearance="blue-light" /></div></bmb-list-group-item>`;
const template = (mobile = false) => `<div class="bmb-card-template bmb-card-template--home${mobile ? ' bmb-card-template--mobile' : ''}"><bmb-card type="normal" borderRadius="xl" margin="none" boxShadowStyle="box-shadow-3"><div bmbVerticalLayout layoutHeight="590px" margin="none" gapSize="none"><bmb-card-header bmbVerticalLayoutItem padding="none"><h3 class="bmb-card-template__header">Title</h3></bmb-card-header><bmb-card-content bmbVerticalLayoutItem [rowGrow]="1" padding="none"><div class="bmb-card-template__scroll" bmbVerticalLayout margin="none" gapSize="m"><div bmbVerticalLayoutItem class="bmb-card-template__summary" bmbLayout margin="none" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true"><span bmbLayoutItem>Lorem ipsum</span><span bmbLayoutItem>0 / 00</span></div><bmb-list-group bmbVerticalLayoutItem margin="m" padding="none">${item('home-1')}${item('home-2')}${item('home-3')}${item('home-4')}</bmb-list-group></div></bmb-card-content></div></bmb-card></div>`;
export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
