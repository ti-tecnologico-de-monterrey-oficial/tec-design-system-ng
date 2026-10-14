import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Templates/Generic card/Actions',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbBoxIconComponent,
        BmbTitleComponent,
        BmbButtonDirective,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

// Mirrors generic-card.component.scss; stories pick the viewport explicitly.
const mobileStyles = '';
const desktopStyles = '';

const scoped = (css: string) =>
  css.replaceAll("[aria-labelledby='actions']", ":host ::ng-deep [aria-labelledby='actions']");

const template = (isMobile: boolean) => `
  <div bmbLayout margin="none" gapSize="m" alignItems="stretch">
    <div bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3">
      <bmb-card borderRadius="m" margin="none">
        <bmb-card-content padding="l">
          <div bmbLayout margin="none" gapSize="m" justify="center" alignItems="center">
            <div bmbLayoutItem [isDynamicItem]="${isMobile}" [colLg]="${!isMobile} ? 12 : null">
              <div bmbLayout margin="none" gapSize="none" justify="center" alignItems="center">
                <bmb-box-icon iconName="${isMobile ? 'home' : 'send'}" boxSize="small" boxShape="circle" boxColor="black-primary" />
              </div>
            </div>
            <section bmbLayoutItem [isDynamicItem]="${isMobile}" [colGrow]="${1}" [colLg]="${!isMobile} ? 12 : null">
              <bmb-title
                componentTitle="Text"
                titleSize="5"
                titleFontWeight="500"
                subtitle="Text content"
                subtitleSize="3"
                subtitleFontWeight="400"
                [isCenterContent]="${!isMobile}"
              />
            </section>
            <div bmbLayoutItem [colSm]="2" [colLg]="12" [colXl]="12">
              <button bmbButton appearance="secondary-outlined" size="large" [disabled]="false">Button</button>
            </div>
          </div>
        </bmb-card-content>
      </bmb-card>
    </div>
  </div>`;

export const Desktop = staticCardStory(template(false), false, scoped(desktopStyles));
export const Mobile = staticCardStory(template(true), true, scoped(mobileStyles));
