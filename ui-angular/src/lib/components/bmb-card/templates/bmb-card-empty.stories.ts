import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
} from '../bmb-card.component';
import { BmbIconComponent } from '../../old/bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../old/bmb-title/bmb-title.component';
import { BmbButtonDirective } from '../../../directives/old/bmb-button/button.directive';
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
        BmbCardContentComponent,
        BmbCardHeaderComponent,
        BmbIconComponent,
        BmbTitleComponent,
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

const template =
  () => `<div bmbLayout margin="none" gapSize="m" alignItems="stretch"><div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
  <bmb-card type="normal" borderRadius="l" margin="none" boxShadowStyle="box-shadow-3">
    <bmb-card-header padding="l">Title</bmb-card-header><bmb-card-content padding="l">
      <div bmbVerticalLayout margin="none" gapSize="l" alignItems="stretch" layoutHeight="36rem">
        <div bmbVerticalLayoutItem><div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true"><span bmbLayoutItem>Lorem ipsum</span><span bmbLayoutItem>0 / 10</span></div></div>
        <div bmbVerticalLayoutItem [rowGrow]="1" [disableScroll]="true"><div bmbVerticalLayout margin="none" gapSize="xl" justify="center" alignItems="center" layoutHeight="100%">
          <bmb-icon bmbVerticalLayoutItem icon="thumb_up" [size]="80" alt="Sin elementos" />
          <bmb-title bmbVerticalLayoutItem componentTitle="Title" titleSize="8" titleFontWeight="700" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit," subtitleSize="4" subtitleFontWeight="400" [isCenterContent]="true" />
          <div bmbVerticalLayoutItem [isFullWidth]="false"><button bmbButton appearance="primary" size="large">Button</button></div>
        </div></div>
      </div>
    </bmb-card-content>
  </bmb-card>
</div></div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
