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
const mobileStyles = `
  [aria-labelledby='actions'] .bmb_card {
    --bmb-radius-m: 16px;
    background: var(--Containers-Main, #313649);
    border: 1px solid var(--General-Contrasts-Container-Outline, #373f55);
  }
  [aria-labelledby='actions'] .bmb_card-content {
    box-sizing: border-box;
    min-height: 100px;
    padding: 12px !important;
    display: flex;
    align-items: center;
  }
  [aria-labelledby='actions'] .bmb_card-content > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--3, 12px);
    width: 100%;
    margin: 0;
  }
  [aria-labelledby='actions'] .bmb_card-content > div > * {
    flex: 1 1 0;
    width: auto;
    max-width: 100%;
    min-width: 0;
    padding: 0;
  }
  [aria-labelledby='actions'] .bmb_card-content > div > :first-child {
    flex: 0 0 40px;
  }
  [aria-labelledby='actions'] .bmb_box-icon.small {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 50%;
    background: #000;
  }
  [aria-labelledby='actions'] .bmb_title-wrapper-subtitle {
    max-width: 7ch;
  }
  [aria-labelledby='actions'] button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid var(--general-contrasts-100, #f6f7f9);
    background: transparent;
    font-size: 18px;
  }
`;
const desktopStyles = `
  [aria-labelledby='actions'] .bmb_card {
    --bmb-radius-m: var(--4, 16px);
    box-sizing: border-box;
    display: flex;
    width: 200px;
    height: 240px;
    padding: var(--4, 16px);
    flex-direction: column;
    align-items: center;
    gap: var(--4, 16px);
    border-radius: var(--4, 16px);
    border: 1px solid var(--General-Contrasts-Container-Outline, #373f55);
    background: var(--Containers-Main, #313649);
  }
  [aria-labelledby='actions'] bmb-card-content,
  [aria-labelledby='actions'] .bmb_card-content {
    width: 100%;
    padding: 0 !important;
  }
  [aria-labelledby='actions'] .bmb_card-content > div {
    display: flex;
    margin: 0;
    flex-direction: column;
    align-items: center;
    gap: var(--4, 16px);
  }
  [aria-labelledby='actions'] .bmb_card-content > div > * {
    flex: none;
    width: 100%;
    max-width: 100%;
    padding: 0;
    text-align: center;
  }
  [aria-labelledby='actions'] .bmb_box-icon.small {
    box-sizing: border-box;
    display: inline-flex;
    padding: var(--3, 12px);
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border-radius: var(--10, 40px);
    background: var(--Black-Black-Primary, #000);
  }
  [aria-labelledby='actions'] button {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 40px;
    padding: var(--2, 8px) var(--4, 16px);
    justify-content: center;
    align-items: center;
    gap: var(--3, 12px);
    align-self: stretch;
    border-radius: var(--10, 40px);
    border: 1px solid var(--general-contrasts-100, #f6f7f9);
    box-shadow: 0 0 0 0 var(--gris-charade-500, #617196);
  }
  [aria-labelledby='actions'] .bmb_title-wrapper-title,
  [aria-labelledby='actions'] .bmb_title-wrapper-subtitle {
    text-align: center;
  }
`;

const scoped = (css: string) =>
  css.replaceAll("[aria-labelledby='actions']", ":host ::ng-deep [aria-labelledby='actions']");

const template = (isMobile: boolean) => `<section aria-labelledby="actions">
  <div bmbLayout margin="none" gapSize="m" alignItems="stretch">
    <div bmbLayoutItem [colSm]="4" [colLg]="3" [colXl]="3">
      <bmb-card type="primary" borderRadius="m" margin="none">
        <bmb-card-content padding="l">
          <div bmbLayout margin="none" gapSize="m" justify="center" alignItems="center">
            <div bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12">
              <div bmbLayout margin="none" gapSize="none" justify="center" alignItems="center">
                <bmb-box-icon iconName="${isMobile ? 'home' : 'send'}" boxSize="small" boxShape="circle" boxColor="black-primary" />
              </div>
            </div>
            <bmb-title bmbLayoutItem [colSm]="1" [colLg]="12" [colXl]="12" componentTitle="${isMobile ? 'Title' : 'Text'}" titleSize="5" titleFontWeight="500" subtitle="Text content" subtitleSize="3" subtitleFontWeight="400" />
            <div bmbLayoutItem [colSm]="2" [colLg]="12" [colXl]="12">
              <button bmbButton appearance="secondary-outlined" size="large" [disabled]="false">Button</button>
            </div>
          </div>
        </bmb-card-content>
      </bmb-card>
    </div>
  </div>
</section>`;

export const Desktop = staticCardStory(template(false), false, scoped(desktopStyles));
export const Mobile = staticCardStory(template(true), true, scoped(mobileStyles));
