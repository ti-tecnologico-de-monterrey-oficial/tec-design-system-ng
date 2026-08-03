import { Meta, moduleMetadata } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbListGroupComponent } from '../../bmb-list-group/bmb-list-group.component';
import { BmbListGroupItemComponent } from '../../bmb-list-group/bmb-list-group-item/bmb-list-group-item.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
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
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const item = (id: string, checked: boolean) => `
  <bmb-list-group-item id="${id}" [personalizedTemplate]="true">
    <div bmbLayout margin="none" gapSize="l" alignItems="center" [avoidRowWrap]="true">
      <bmb-checkbox bmbLayoutItem ariaLabel="Select file" [checked]="${checked}" />
      <div bmbLayout bmbLayoutItem class="bmb-card-template__home-file" margin="none" gapSize="l" alignItems="center" [avoidRowWrap]="true" [colGrow]="1" [isDynamicItem]="true">
        <bmb-icon bmbLayoutItem icon="image" [size]="24" alt="Document image" />
        <div bmbVerticalLayout bmbLayoutItem margin="none" gapSize="none" [colGrow]="1" [isDynamicItem]="true">
          <h4>Nombre_Archivo.doc</h4>
          <p>Descripción del documento agregado</p>
        </div>
        <bmb-icon bmbLayoutItem icon="file_open" [size]="24" alt="Open file" />
      </div>
    </div>
  </bmb-list-group-item>`;

const template = (mobile = false) => `
  <div class="bmb-card-template bmb-card-template--home${mobile ? ' bmb-card-template--mobile' : ''}">
    <bmb-card type="normal" borderRadius="xl" margin="none">
      <div bmbVerticalLayout class="bmb_padding-7" layoutHeight="32.25rem" margin="none" gapSize="none">
        <h3 bmbVerticalLayoutItem>Title</h3>
        <p bmbVerticalLayoutItem>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim</p>
        <hr bmbVerticalLayoutItem />
        <div bmbVerticalLayoutItem [rowGrow]="1">
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
