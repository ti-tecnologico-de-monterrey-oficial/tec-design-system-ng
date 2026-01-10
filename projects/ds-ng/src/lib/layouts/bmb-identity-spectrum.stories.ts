import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BmbTopBarComponent } from '../components/bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../components/bmb-sidebar/bmb-sidebar.component';
import { BmbHomeCardComponent } from '../components/bmb-home-card/bmb-home-card.component';
import { BmbTabsComponent } from '../components/bmb-tabs/bmb-tabs.component';
import { BmbUserSummaryContentComponent } from '../components/bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
} from '../components/bmb-card/bmb-card.component';
import { BmbIconItemComponent } from '../components/bmb-icon-item/bmb-icon-item.component';
import { BmbFormValidatorComponent } from '../components/bmb-form-validator/bmb-form-validator.component';
import { BmbInputComponent } from '../components/bmb-input/bmb-input.component';

import { IBmbNativeModal } from '../components/bmb-modal/bmb-modal.interface';
import { BmbNativeModalService } from '../services/modal/native-modal.service';
import { IBmbActionHeader } from '../types';

import { BmbButtonDirective } from '../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbSelectorDirective } from '../directives/bmb-selector/bmb-selector.directive';

import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as tabsStory from '../components/bmb-tabs/bmb-tabs.component.stories';
import * as genericCardStory from '../components/bmb-card/bmb-card.stories';
import * as userSummaryContentStory from '../components/bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.stories';
import * as iconItemStory from '../components/bmb-icon-item/bmb-icon-item.stories';
import * as inputStory from '../components/bmb-input/bmb-input.stories';

import * as nativeModalStory from '../components/bmb-modal/bmb-native-modal.stories';

import * as buttonDirectiveStory from '../directives/bmb-button/button.stories';
import * as layoutDirectiveStory from '../directives/bmb-layout/bmb-layout.stories';
import * as verticalLayoutDirectiveStory from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';
import * as selectorDirectiveStory from '../directives/bmb-selector/bmb-selector.stories';

import {
  BlockquoteType,
  DESIGN_SYSTEM_TITLE,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getStoryTitle,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '../utils/doc/utils';

const HTML_TEMPLATE: string = `
<div class="bmb_organism-identity-spectrum">
  <bmb-top-bar
    [userInformation]="{
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno'
    }"
    [appPowered]="'Powered x Bamboo Design'"
    [lang]="'es'"
    [mitec]="true"
    [alertNotification]="[
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'primary'
          }
        ],
        date: '19/11/2024',
        isRead: false,
        time: '12:00',
        tags: [
          { text: 'tag1', color: 'info' },
          { text: 'tag2', color: 'brand' }
        ],
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false
      },
      {
        id: 1,
        title: 'Alerta 1',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'link',
            href: 'https://www.google.com'
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'secondary-filled'
          }
        ],
        date: '01/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false
      },
      {
        id: 2,
        title: 'Alerta 2',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/25/200'
          }
        ],
        date: '19/11/2024',
        isRead: true,
        time: '15:00',
        type: 'tipo 2',
        isFavorite: false,
        isArchived: true
      },
      {
        id: 3,
        title: 'Alerta 3',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold'
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' }
        ],
        date: '18/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false
      },
      {
        id: 4,
        title: 'Alerta 4',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold'
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' }
        ],
        date: '02/11/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 3',
        isFavorite: false,
        isArchived: false
      },
      {
        id: 4,
        title: 'Alerta 40',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/26/200'
          }
        ],
        date: '02/01/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false
      }
    ]"
  />
  <main class="bmb_organism-identity-spectrum-main">
    <bmb-home-card
      leftIcon="chevron_left"
      icon="account_circle"
      bgIconAppearance="blue-mariner-700"
      title="Mi perfil - Detalle extendido"
      subtitle="Mi perfil - Detalle extendido"
      contentPadding="xl"
      [isExpanded]="true"
      [actionHeaders]="actionHeaders"
    >
      <bmb-tabs
        format="uppercase"
        [tabs]="[
          { id: 1, title: 'Perfil personal', isActive: true },
          { id: 2, title: 'Perfil académico', isActive: false }
        ]"
        [(selectedTabId)]="selectedTab"
      >
        <section
          bmbSelector
          [idSelector]="1"
          [activeSelectorID]="selectedTab"
          bmbLayout
          [isContainerQuery]="true"
          margin="l"
          gapSize="xl"
        >
          <section bmbLayoutItem [colLg]="6">
            <section bmbVerticalLayout gapSize="xl">
                <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                  <bmb-card-content padding="l">
                    <bmb-user-summary-content
                      name="Test Name"
                      userId="AC123123"
                      image="https://picsum.photos/id/64/200/300"
                      [CURP]="'ABCD12345678900'"
                      [additionalInfo]="'20 Años - Mujer (Ella/Ella)'"
                      contentLayout="row"
                      [isImageBordered]="false"
                      [isProfile]="true"
                      bmbLayoutItem
                      margin="none"

                    />
                  </bmb-card-content>
                </bmb-card>
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-card-header margin="m">
                  <h3>Datos de contacto</h3>
                </bmb-card-header>
                <bmb-card-content padding="l">
                  <bmb-icon-item
                    icon="mail"
                    label="Correo personal"
                    value="tecservices@servicios.tec.mx"
                  />
                  <bmb-icon-item
                    label="Teléfono móvil"
                    icon="mobile"
                    value="+52 81 1625 5123 (solo texto)"
                  />
                  <bmb-icon-item
                    label="Teléfono"
                    icon="phone_enabled"
                    value="+52 81 1234 5123"
                  />
                  <bmb-icon-item
                    label="Dirección permanente"
                    icon="location_on"
                    value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
                    [showDivider]="false"
                  />
                </bmb-card-content>
              </bmb-card>
            </section>
          </section>
          <section bmbLayoutItem [colLg]="6">
            <bmb-card borderRadius="m" margin="none" >
              <bmb-card-header margin="m">
                <h3>Personas filiadas</h3>
              </bmb-card-header>
              <bmb-card-content padding="l">
                <bmb-icon-item label="Madre" value="Paloma Reyes Araujo" />
                <bmb-icon-item
                  label="Correo Madre"
                  value="Maria.Araujo@gmail.com"
                />
                <bmb-icon-item label="Padre" value="Arturo Araujo Reyes" />
                <bmb-icon-item label="Correo Padre" value="Okeha67@live.com" />
                <bmb-icon-item
                  label="Patria Potestad"
                  value="Arturo Araujo Reyes"
                />
                <bmb-icon-item
                  label="Responsable de pago"
                  value="Arturo Araujo Reyes"
                />
                <bmb-icon-item label="Hijo/Hija" value="Paloma Reyes Araujo" />
                <bmb-icon-item
                  label="Esposo/Esposa"
                  value="Paloma Reyes Araujo"
                  [showDivider]="false"
                />
              </bmb-card-content>
            </bmb-card>
          </section>
        </section>
        <section
          bmbSelector
          [idSelector]="2"
          [activeSelectorID]="selectedTab"
          bmbLayout
          [isContainerQuery]="true"
          margin="l"
          gapSize="xl"
        >
          <section bmbLayoutItem [colLg]="6">
            <bmb-card borderRadius="m" margin="none">
              <bmb-card-header margin="m">
                <h3>Información académica</h3>
              </bmb-card-header>
              <bmb-card-content padding="l">
                <bmb-icon-item
                  label="Carrera"
                  value="Ingeniero en Tecnologías Computacionales ('99)"
                />
                <bmb-icon-item label="Estatus académico" value="Regular" />
                <bmb-icon-item label="Semestre actual" value="Ago-Dic 2025" />
                <bmb-icon-item label="Campus" value="Monterrey" />
                <bmb-icon-item label="Nivel" value="Profesional" />
                <bmb-icon-item
                  label="Programa"
                  value="Alumno Prog Internacional"
                  [showDivider]="false"
                />
              </bmb-card-content>
            </bmb-card>
          </section>
          <section bmbLayoutItem [colLg]="6">
            <section bmbVerticalLayout gapSize="xl">
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-card-header margin="m">
                  <h3>Acreditaciones</h3>
                </bmb-card-header>
                <bmb-card-content padding="l">
                  <bmb-icon-item
                    label="Unidades del plan acreditadas"
                    value="Unidades del plan acreditadas"
                  />
                  <bmb-icon-item
                    label="Unidades del plan pendientes"
                    value="732"
                  />
                  <bmb-icon-item
                    label="Materias del plan acreditadas"
                    value="006"
                  />
                  <bmb-icon-item
                    label="Materias del plan pendientes"
                    value="075"
                  />
                  <bmb-icon-item
                    label="Semestre acreditado"
                    value="01"
                    [showDivider]="false"
                  />
                </bmb-card-content>
              </bmb-card>
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-card-header margin="m">
                  <h3>Examen de admisión</h3>
                </bmb-card-header>
                <bmb-card-content padding="l">
                  <bmb-icon-item label="Verbal Profesional" value="747.00" />
                  <bmb-icon-item
                    label="Matemático Profesional"
                    value="609.00"
                    [showDivider]="false"
                  />
                </bmb-card-content>
              </bmb-card>
            </section>
          </section>
        </section>
      </bmb-tabs>
    </bmb-home-card>
  </main>
  <bmb-sidebar
    [elements]="[
      [
        {
          id: 1,
          icon: 'home',
          title: 'Home',
          link: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
          target: '_blank'
        }
      ],
      [
        {
          id: 2,
          icon: 'build',
          title: 'Tools',
          link: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
          target: '_blank'
        }
      ]
    ]"
    [title]="'Navegacion para mobiles'"
    [position]="'left'"
  />
  <ng-template #modalTemplate>
    <bmb-form-validator [(formGroup)]="userForm">
      <section bmbVerticalLayout gapSize="m">
        <bmb-input
          inputId="email_id"
          name="email"
          label="Correo personal"
          value="paraujo@gmail.com"
          bmbVerticalLayoutItem
        />
        <bmb-input
          inputId="celphone_id"
          name="celphone"
          label="Teléfono móvil"
          value="8123456789"
          bmbVerticalLayoutItem
        />
        <bmb-input
          inputId="phone_id"
          name="phone"
          label="Teléfono local"
          value="8123456789"
          bmbVerticalLayoutItem
        />
        <section bmbVerticalLayoutItem bmbLayout margin="none" gapSize="m">
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              type="text-area"
              [showMaxTextLength]="false"
              inputId="permanent_address_id"
              name="permanent_address"
              label="Dirección permanente"
              value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
            />
          </section>
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              type="text-area"
              [showMaxTextLength]="false"
              inputId="residential_address_id"
              name="residential_address"
              label="Dirección de residencia"
              value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
            />
          </section>
        </section>

        <section
          bmbVerticalLayoutItem
          bmbLayout
          margin="none"
          gapSize="l"
          justify="end"
          class="bmb_organism-identity-spectrum-form-buttons"
        >
          <button bmbButton appearance="secondary-outlined" type="button">
            Cancelar
          </button>
          <button bmbButton appearance="primary" type="submit">
            Guardar cambios
          </button>
        </section>
      </section>
    </bmb-form-validator>
  </ng-template>
</div>
`;

@Component({
  selector: 'storybook-identity-spectrum',
  standalone: true,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbTabsComponent,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbUserSummaryContentComponent,
    BmbIconItemComponent,
    BmbFormValidatorComponent,
    BmbInputComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbSelectorDirective,
  ],
  template: HTML_TEMPLATE,
})
export class StorybookIdentitySpectrum {
  selectedTab = 1;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'edit',
      alt: 'edit',
      action: () => this.openModal(),
    },
  ];
  userForm: FormGroup = new FormGroup({});

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  openModal(): void {
    const dataModal: IBmbNativeModal = {
      title: 'Editar datos de contacto',
      content: this.modalTemplate,
    };
    this.modalService.openModal(dataModal);
  }

  constructor(private modalService: BmbNativeModalService) {}
}

export default {
  title: 'Organisms/Identity spectrum',
  component: StorybookIdentitySpectrum,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 80rem;">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getGeneralDescription(`<br/>***Identity spectrum*** is a ${DESIGN_SYSTEM_TITLE} organism where profile details are displayed and some of the data can be edited.
<br/><br/>`)}
${getSpecialSpecifications(
  `
  ${getAlertBlockquote(
    `
The content documented in the code blocks can be used as a template or example of the Identity Spectrum implementation,
the developer can add data to the ${getStoryTitle(genericCardStory.default.title!)} as needed, as well as more inputs in the form for editing.
`,
    {
      title: '###'.concat(RELEVANT_TITLE.important),
      blockquoteType: BlockquoteType.important,
    },
  )}
  ${getTechnicalDocReferences({
    references: [
      { title: topBarStory.default.title! },
      { title: sideBarStory.default.title! },
      { title: homeCardStory.default.title! },
      { title: tabsStory.default.title! },
      { title: genericCardStory.default.title! },
      { title: userSummaryContentStory.default.title! },
      { title: iconItemStory.default.title! },
      { title: inputStory.default.title! },
      { title: nativeModalStory.default.title! },
      { title: buttonDirectiveStory.default.title! },
      { title: layoutDirectiveStory.default.title! },
      { title: verticalLayoutDirectiveStory.default.title! },
      { title: selectorDirectiveStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbHomeCardComponent,
  BmbTabsComponent,
  BmbCardComponent,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbUserSummaryContentComponent,
  BmbIconItemComponent,
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbSelectorDirective,
`,
  `import { TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
  `,
  `selectedTab = 1;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'edit',
      alt: 'edit',
      action: () => this.openModal(),
    },
  ];
  userForm: FormGroup = new FormGroup({});

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  openModal(): void {
    const dataModal: IBmbNativeModal = {
      title: 'Editar datos de contacto',
      content: this.modalTemplate,
    };
    this.modalService.openModal(dataModal);
  }

  constructor(private modalService: BmbNativeModalService) {}`,
)}
\`\`\`html
${HTML_TEMPLATE}
\`\`\`
    `,
      },
    },
  },
} as Meta<typeof StorybookIdentitySpectrum>;

type Story = StoryObj<StorybookIdentitySpectrum>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-identity-spectrum />
    `,
  }),
};
