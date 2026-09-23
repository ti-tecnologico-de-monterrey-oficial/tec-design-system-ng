import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
} from '../bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Templates/Generic card/Empty',
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
  () => `<section aria-label="Empty card" style="width: 100%; max-width: 24.25rem">
  <bmb-card
    type="transparent"
    borderRadius="l"
    margin="none"
    boxShadowStyle="box-shadow-3"
  >
    <bmb-card-header [padding]="['m', 'l']" colorBackground="contrasts-5">
      <bmb-title componentTitle="Title" titleSize="6" titleFontWeight="500" />
    </bmb-card-header>
    <bmb-card-content padding="l">
      <div
        bmbVerticalLayout
        margin="none"
        gapSize="l"
        alignItems="stretch"
        layoutHeight="32.75rem"
        style="min-height: 32.75rem; flex: none"
      >
        <div bmbVerticalLayoutItem>
          <div
            bmbLayout
            margin="none"
            gapSize="m"
            justify="spaceBetween"
            alignItems="center"
            [avoidRowWrap]="true"
          >
            <span bmbLayoutItem>Lorem ipsum</span
            ><span bmbLayoutItem>0 / <small>10</small></span>
          </div>
        </div>
        <div bmbVerticalLayoutItem [rowGrow]="1" [disableScroll]="true">
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="xl"
            justify="center"
            alignItems="center"
            layoutHeight="100%"
            style="padding-bottom: 3rem"
          >
            <bmb-icon
              bmbVerticalLayoutItem
              [isFullWidth]="false"
              icon="thumb_up"
              [size]="80"
              alt="Sin elementos"
              style="color: var(--general-contrasts-100); opacity: 0.5"
            />
            <bmb-title
              bmbVerticalLayoutItem
              componentTitle="Title"
              titleSize="8"
              titleFontWeight="700"
              [isCenterContent]="true"
            />
            <p
              bmbVerticalLayoutItem
              style="
                margin: 0;
                text-align: center;
                color: var(--general-contrasts-75);
              "
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </p>
            <div bmbVerticalLayoutItem [isFullWidth]="false">
              <button
                bmbButton
                type="button"
                appearance="primary"
                size="small"
                style="padding: 0.5rem 1rem"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </bmb-card-content>
  </bmb-card>
</section>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
