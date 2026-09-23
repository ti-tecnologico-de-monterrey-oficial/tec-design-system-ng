import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
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
        BmbIconComponent,
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

const template =
  () => `<section aria-label="Home document card" style="width: 100%; max-width: 45rem">
  <bmb-card type="normal" borderRadius="l" margin="none">
    <bmb-card-content padding="l">
      <div
        bmbVerticalLayout
        margin="none"
        gapSize="m"
        alignItems="stretch"
        style="min-height: 29.5rem"
      >
        <bmb-title
          bmbVerticalLayoutItem
          componentTitle="Title"
          titleSize="5"
          titleFontWeight="400"
        />
        <p bmbVerticalLayoutItem style="margin: 0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Fusce volutpat rhoncus
          leo vel pharetra. Donec feugiat enim
        </p>
        <bmb-divider bmbVerticalLayoutItem [removeMargin]="true" />
        <div
          bmbVerticalLayoutItem
          role="group"
          aria-label="Documentos"
          tabindex="0"
          style="max-height: 22rem; overflow-y: auto; overflow-x: hidden"
        >
          <div bmbVerticalLayout margin="none" gapSize="l" alignItems="stretch">
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
                      'Seleccionar documento ' + file + ': Nombre_Archivo.doc'
                    "
                  />
                  <div
                    bmbLayoutItem
                    [isDynamicItem]="true"
                    [colGrow]="1"
                    style="min-width: 0"
                  >
                    <bmb-card
                      type="normal"
                      borderRadius="m"
                      margin="none"
                      borderColor="contrasts-50"
                    >
                      <bmb-card-content
                        padding="l"
                        colorBackground="contrasts-25"
                      >
                        <div
                          bmbLayout
                          margin="none"
                          gapSize="m"
                          alignItems="center"
                          [avoidRowWrap]="true"
                        >
                          <bmb-icon
                            bmbLayoutItem
                            icon="file_present"
                            [size]="24"
                            alt="Documento"
                          />
                          <div
                            bmbLayoutItem
                            [isDynamicItem]="true"
                            [colGrow]="1"
                            style="min-width: 0"
                          >
                            <h3
                              title="Nombre_Archivo.doc"
                              style="
                                margin: 0 0 0.25rem;
                                font-size: 1.25rem;
                                font-weight: 500;
                                line-height: 1.2;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              "
                            >
                              Nombre_Archivo.doc
                            </h3>
                            <p
                              title="Descripción del documento agregado"
                              style="
                                margin: 0;
                                color: var(--general-contrasts-75);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                              "
                            >
                              Descripción del documento agregado
                            </p>
                          </div>
                          <bmb-icon
                            bmbLayoutItem
                            icon="file_open"
                            [size]="24"
                            alt="Abrir archivo"
                          />
                        </div>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </bmb-card-content>
  </bmb-card>
</section>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
