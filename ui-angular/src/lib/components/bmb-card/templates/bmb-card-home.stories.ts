import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbContainerButtonComponent } from '../../bmb-container-button/bmb-container-button.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { staticCardStory } from './bmb-card-template-story.utils';
import { getSpecialSpecifications } from '@docs/utils/utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Templates/Generic card/Home',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCheckboxComponent,
        BmbContainerButtonComponent,
        BmbDividerComponent,
        BmbCardContentComponent,
        BmbTitleComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
        ${getSpecialSpecifications(`
Please insert the next style sheet in your component.<br/><br/>
>
\`\`\`css
bmb-card[data-home-card] .bmb_container-button-wrapper > .bmb_check-external-link-button > .bmb_check-external-link-button-element {
  width: 100%;
}
@media (width < 1001px) {
  bmb-card[data-home-card] {
    width: 100%;
  }
  bmb-card[data-home-card] > .bmb_card > bmb-card-content {
    overflow-y: auto;
  }
  bmb-card[data-home-card] bmb-container-button {
    min-width: 0;
  }
  bmb-card[data-home-card] .bmb_container-button-title {
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }
}\`\`\``)}`
      }
    }
  },
};
export default meta;

// Mirrors generic-card.component.scss; primary uses accent colors by default.
const styles = `
bmb-card[data-home-card] .bmb_container-button-wrapper > .bmb_check-external-link-button > .bmb_check-external-link-button-element {
  width: 100%;
}
@media (width < 1001px) {
  bmb-card[data-home-card] {
    width: 100%;
  }
  bmb-card[data-home-card] > .bmb_card > bmb-card-content {
    overflow-y: auto;
  }
  bmb-card[data-home-card] bmb-container-button {
    min-width: 0;
  }
  bmb-card[data-home-card] .bmb_container-button-title {
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }
}
`.replaceAll('bmb-card[data-home-card]', ':host ::ng-deep bmb-card[data-home-card]');

const template = `<bmb-card data-home-card borderRadius="m" margin="none">
  <bmb-card-content>
    <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch">
      <bmb-title
        componentTitle="Title"
        titleSize="5"
        titleFontWeight="400"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim"
        subtitleSize="3"
        subtitleFontWeight="400"
      />
      <bmb-divider [removeMargin]="true" />
      <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch">
        @for (file of [1, 2, 3]; track file) {
          <div bmbLayout margin="none" gapSize="m" alignItems="center" [avoidRowWrap]="true">
            <bmb-checkbox [checked]="file !== 2" [ariaLabel]="'Seleccionar documento ' + file" />
            <bmb-container-button bmbLayoutItem [isDynamicItem]="true" [colGrow]="1" componentTitle="Nombre_Archivo.doc" subtitle="Descripción del documento agregado" iconLeft="image" iconRight="file_open" alternativeTextRightIcon="Abrir archivo" />
          </div>
        }
      </div>
    </div>
  </bmb-card-content>
</bmb-card>`;

export const Desktop = staticCardStory(template, false, styles);
export const Mobile = staticCardStory(template, true, styles);
