import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Informative',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbBadgeComponent,
        BmbImageComponent,
        BmbTooltipComponent,
        BmbButtonDirective,
      ],
    }),
  ],
};
export default meta;

const image =
  'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';
const content = () => `<div class="bmb-card-template__content">
      <div class="bmb-card-template__labels"><bmb-tooltip icon="info" text="Additional information" componentTitle="Information" [size]="20" /><bmb-badge text="Badge" appearance="creative-violet" /></div>
      <h3>Title</h3>
      <p class="bmb-card-template__complementary">Complementary text</p>
      <hr />
      <p class="bmb-card-template__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim pharetra ipsum euismod, sed maximus justo pharetra.</p>
      <div class="bmb-card-template__actions"><button bmbButton appearance="secondary-outlined">Button</button><button bmbButton appearance="secondary-outlined">Secondary button</button></div>
    </div>`;
const picture = () =>
  `<bmb-image class="bmb-card-template__image" src="${image}" alt="Edificio de Rectoría del Tecnológico de Monterrey" borderRadius="none" objectFit="cover" />`;
const template = (
  mobile = false,
) => `<div class="bmb-card-template bmb-card-template--informative${mobile ? ' bmb-card-template--mobile' : ''}">
  <bmb-card type="normal" borderRadius="${mobile ? 'l' : 'm'}" margin="none">
    <div class="bmb-card-template__surface">${content()}${picture()}</div>
  </bmb-card>
</div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
