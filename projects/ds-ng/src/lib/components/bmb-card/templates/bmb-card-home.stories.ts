import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbListGroupComponent } from '../../bmb-list-group/bmb-list-group.component';
import { BmbListGroupItemComponent } from '../../bmb-list-group/bmb-list-group-item/bmb-list-group-item.component';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Home',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCheckboxComponent,
        BmbIconComponent,
        BmbListGroupComponent,
        BmbListGroupItemComponent,
      ],
    }),
  ],
};
export default meta;

const item = (id: string, checked: boolean) => `
  <bmb-list-group-item id="${id}" [personalizedTemplate]="true">
    <div class="bmb-card-template__home-row">
      <bmb-checkbox ariaLabel="Select file" [checked]="${checked}" />
      <div class="bmb-card-template__home-file">
        <bmb-icon icon="image" [size]="24" alt="Document image" />
        <div class="bmb-card-template__home-file-copy">
          <h4>Nombre_Archivo.doc</h4>
          <p>Descripción del documento agregado</p>
        </div>
        <bmb-icon icon="file_open" [size]="24" alt="Open file" />
      </div>
    </div>
  </bmb-list-group-item>`;

const template = (mobile = false) => `
  <div class="bmb-card-template bmb-card-template--home${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="xl" margin="none">
      <div class="bmb-card-template__home-surface">
        <h3>Title</h3>
        <p class="bmb-card-template__home-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim</p>
        <hr />
        <div class="bmb-card-template__home-scroll">
          <bmb-list-group padding="none" margin="none">
            ${item('home-file-1', true)}
            ${item('home-file-2', false)}
            ${item('home-file-3', true)}
          </bmb-list-group>
        </div>
      </div>
    </bmb-card>
  </div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(true), true);
