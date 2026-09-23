import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbContainerButtonComponent } from '../../bmb-container-button/bmb-container-button.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Templates/Generic card/Home',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbCheckboxComponent,
        BmbDividerComponent,
        BmbContainerButtonComponent,
        BmbTitleComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const template = () => `<section
  aria-label="Home document card"
  bmbLayout
  margin="none"
  gapSize="none"
  alignItems="start"
>
  <div bmbLayoutItem [colSm]="4" [colLg]="8" [colXl]="6">
    <bmb-card type="normal" borderRadius="l" margin="none"
      ><bmb-card-content padding="l">
        <div>
          <div
            bmbVerticalLayout
            margin="none"
            gapSize="m"
            alignItems="stretch"
            layoutHeight="30rem"
          >
            <bmb-title
              bmbVerticalLayoutItem
              componentTitle="Title"
              titleSize="5"
              titleFontWeight="400"
            />
            <bmb-title
              bmbVerticalLayoutItem
              componentTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus leo vel pharetra. Donec feugiat enim"
              titleSize="4"
              titleFontWeight="400"
            />
            <bmb-divider bmbVerticalLayoutItem [removeMargin]="true" />
            <div
              bmbVerticalLayoutItem
              [rowGrow]="1"
              role="group"
              aria-label="Documentos"
              tabindex="0"
            >
              <div
                bmbVerticalLayout
                margin="none"
                gapSize="l"
                alignItems="stretch"
              >
                @for (file of [1, 2, 3]; track file) {
                  <div bmbVerticalLayoutItem>
                    <div
                      bmbLayout
                      margin="none"
                      gapSize="m"
                      alignItems="center"
                      [avoidRowWrap]="true"
                    >
                      <bmb-checkbox
                        bmbLayoutItem
                        [checked]="file !== 2"
                        [ariaLabel]="
                          'Seleccionar documento ' +
                          file +
                          ': Nombre_Archivo.doc'
                        "
                      />
                      <bmb-container-button
                        bmbLayoutItem
                        [colSm]="3"
                        [colLg]="11"
                        [colXl]="11"
                        componentTitle="Nombre_Archivo.doc"
                        subtitle="Descripción del documento agregado"
                        iconLeft="file_present"
                        iconRight="file_open"
                      />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div> </bmb-card-content
    ></bmb-card>
  </div>
</section>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
