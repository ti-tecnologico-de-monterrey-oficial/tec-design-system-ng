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
};
export default meta;

// Mirrors generic-card.component.scss; primary uses accent colors by default.
const styles = `
bmb-card[data-home-card] {
  display: block;
  width: 611px;
  max-width: 100%;
}
bmb-card[data-home-card] > .bmb_card {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 452px;
  padding: var(--6, 24px);
  flex-direction: column;
  align-items: stretch;
  gap: var(--4, 16px);
  border-radius: var(--4, 16px);
  border: 1px solid var(--General-Contrasts-Container-Outline, #373f55);
  background: var(--Containers-Main, #313649);
  color: var(--general-contrasts-100, #f6f7f9);
}
bmb-card[data-home-card] > .bmb_card > bmb-card-content {
  width: 100%;
  min-height: 0;
}
bmb-card[data-home-card] .bmb_card-content > [bmbVerticalLayout] {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--3, 12px);
  align-self: stretch;
}
bmb-card[data-home-card] bmb-title {
  align-self: stretch;
}
bmb-card[data-home-card] .bmb_title-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--4, 16px);
}
bmb-card[data-home-card] .bmb_title-wrapper-title,
bmb-card[data-home-card] .bmb_title-wrapper-subtitle {
  margin: 0;
  text-align: left;
  color: var(--general-contrasts-100, #f6f7f9);
}
bmb-card[data-home-card] bmb-divider {
  display: block;
  width: 100%;
}
bmb-card[data-home-card] .bmb_container-button-wrapper > .bmb_check-external-link-button > .bmb_check-external-link-button-element {
  box-sizing: border-box;
  width: 100%;
  padding: var(--4, 16px) var(--6, 24px);
  border-radius: var(--4, 16px);
  border: 1px solid var(--General-Contrasts-Container-Outline, #535d7a);
  background: var(--Containers-Secondary, #3d4561);
  color: var(--general-contrasts-100, #f6f7f9);
}
bmb-card[data-home-card] .bmb_container-button-title {
  font-size: 1rem;
  font-weight: 500;
}
bmb-card[data-home-card] .bmb_container-button-subtitle {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 400;
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

const template = `<bmb-card data-home-card type="primary" borderRadius="m" margin="none">
  <bmb-card-content padding="none">
    <div bmbVerticalLayout margin="none" gapSize="m" alignItems="stretch">
      <bmb-title
        componentTitle="Title"
        titleSize="5"
        titleFontWeight="400"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim"
        subtitleSize="3"
        subtitleFontWeight="400"
      />
      <bmb-divider [removeMargin]="false" />
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
