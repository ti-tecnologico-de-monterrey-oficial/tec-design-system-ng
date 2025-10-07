import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';
import {
  getBasicExampleBlock,
  getLandingGeneralDesc,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '../utils/doc/utils';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSidebarComponent,
  BmbTabsComponent,
  BmbTopBarComponent,
  BmbCardComponent,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  IBmbActionHeader,
  IBmbTab,
  BmbImageComponent,
  BmbContainerButtonComponent,
  BmbButtonDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbNativeModalService,
  BmbTextLinkComponent,
  BmbCheckboxComponent,
  BmbDividerComponent,
} from '../../public-api';
import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as layoutStory from '../directives/bmb-layout/bmb-layout.stories';
import * as layoutItemStory from '../directives/bmb-layout/bmb-layout.stories';
import * as cardStory from '../components/bmb-card/bmb-card.stories';
import * as tabsStory from '../components/bmb-tabs/bmb-tabs.component.stories';
import * as accordionStory from '../components/bmb-accordion/bmb-accordion.stories';
import * as cardHeaderStory from '../components/bmb-card/bmb-card.stories';
import * as cardContentStory from '../components/bmb-card/bmb-card.stories';
import * as containerButtonStory from '../components/bmb-container-button/bmb-container-button.stories';
import * as imageStory from '../components/bmb-image/bmb-image.stories';
import * as buttonDirectiveStory from '../directives/bmb-button/button.stories';
import * as verticalLayoutStory from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';
import * as verticalLayoutItemStory from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.stories';
import * as textLinkStory from '../components/bmb-text-link/bmb-text-link.stories';
import * as checkboxStory from '../components/bmb-checkbox/bmb-checkbox.stories';
import * as dividerStory from '../components/bmb-divider/bmb-divider.stories';

@Component({
  standalone: true,
  selector: 'semanas-tec-landing',
  template: `
    <section class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno'
        }"
        appPowered="Powered by Bamboo Design"
        [showHelpButton]="true"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="school"
          bgIconAppearance="mitec-green"
          title="Beca socioeconómica"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              {
                id: 1,
                title: 'Semanas TEC obligatorias (establecidas)',
                isActive: true
              },
              {
                id: 2,
                title: 'Semanas TEC optativas (por elegir)',
                isActive: false
              }
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit ac id, duis
            aliquam integer lobortis venenatis nam elementum volutpat viverra
            fusce, malesuada platea nulla rhoncus eleifend parturient morbi
            nunc. Lorem ipsum dolor sit amet consectetur adipiscing elit ac id,
            duis aliquam integer lobortis venenatis nam elementum volutpat
            viverra fusce, malesuada platea nulla rhoncus eleifend parturient
            morbi nunc.
          </p>
          @switch (selectedTab) {
            @case (1) {
              <section
                bmbLayout
                class="bmb_template-weeks-tec-cards"
                alignItems="stretch"
              >
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
              </section>
            }
            @case (2) {
              <section
                bmbLayout
                class="bmb_template-weeks-tec-cards"
                alignItems="stretch"
              >
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Introducción al servicio social
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Introducción al servicio social
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Tácticas y guías para examen fin de cursos
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input1"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox1"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input2"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox2"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input3"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox3"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
          }
        </bmb-home-card>
      </main>
      <bmb-sidebar
        [elements]="[
          [
            {
              id: 2,
              icon: 'task',
              title: 'Agregar firmantes',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ'
            }
          ]
        ]"
        [title]="'Navegacion para mobiles'"
      ></bmb-sidebar>
    </section>
    <ng-template #modalTemplate>
      <div>
        <p>
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
        </p>
      </div>
    </ng-template>
  `,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTabsComponent,
    BmbCardComponent,
    BmbHomeCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbContainerButtonComponent,
    BmbImageComponent,
    BmbButtonDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbTextLinkComponent,
    BmbCheckboxComponent,
    BmbDividerComponent,
  ],
})
class SemanasTecLandingComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;

  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  selectedTab = 1;

  constructor(private modalService: BmbNativeModalService) {}

  handleBack() {
    console.log('Back button clicked');
  }

  helpButtonClick(event: any) {
    console.log('Help button clicked', event);
  }

  userProfileClick(event: any) {
    console.log('User profile clicked', event);
  }

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
  }

  openModal() {
    this.modalService.openModal({
      title: 'Modal Title',
      content: this.modalTemplate,
    });
  }

  inputChange(event: any) {
    console.log('Checkbox changed', event);
  }
}

export default {
  title: 'Particularities/mitec web/Landings/Semanas Tec',
  component: SemanasTecLandingComponent,
  decorators: [],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getLandingGeneralDesc('Semanas Tec')}
${getSpecialSpecifications(
  getTechnicalDocReferences({
    references: [
      { title: topBarStory.default.title! },
      { title: sideBarStory.default.title! },
      { title: homeCardStory.default.title! },
      { title: layoutStory.default.title! },
      { title: layoutItemStory.default.title! },
      { title: cardStory.default.title! },
      { title: tabsStory.default.title! },
      { title: accordionStory.default.title! },
      { title: cardHeaderStory.default.title! },
      { title: cardContentStory.default.title! },
      { title: imageStory.default.title! },
      { title: buttonDirectiveStory.default.title! },
      { title: verticalLayoutStory.default.title! },
      { title: verticalLayoutItemStory.default.title! },
      { title: textLinkStory.default.title! },
      { title: checkboxStory.default.title! },
      { title: dividerStory.default.title! },
      { title: containerButtonStory.default.title! },
    ],
    isFullScreenDesc: true,
  }),
)}
${getBasicExampleBlock(
  `
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTabsComponent,
    BmbCardComponent,
    BmbHomeCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbContainerButtonComponent,
    BmbImageComponent,
    BmbButtonDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbTextLinkComponent,
    BmbCheckboxComponent,
    BmbDividerComponent,
`,
  '',
  `
@ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;

actionHeaders: IBmbActionHeader[] = [
  {
    icon: 'info',
    alt: 'Editar',
    action: () => console.log('Info'),
  },
];

selectedTab = 1;

constructor(private modalService: BmbNativeModalService) {}

handleBack() {
  console.log('Back button clicked');
}

helpButtonClick(event: any) {
  console.log('Help button clicked', event);
}

userProfileClick(event: any) {
  console.log('User profile clicked', event);
}

handleSelectedTab(tab: IBmbTab) {
  this.selectedTab = tab.id;
}

openModal() {
  this.modalService.openModal({
    title: 'Modal Title',
    content: this.modalTemplate,
  });
}

inputChange(event: any) {
  console.log('Checkbox changed', event);
}
`,
)}
\`\`\`html
    <section class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno'
        }"
        appPowered="Powered by Bamboo Design"
        [showHelpButton]="true"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="school"
          bgIconAppearance="mitec-green"
          title="Beca socioeconómica"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              {
                id: 1,
                title: 'Semanas TEC obligatorias (establecidas)',
                isActive: true
              },
              {
                id: 2,
                title: 'Semanas TEC optativas (por elegir)',
                isActive: false
              }
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit ac id, duis
            aliquam integer lobortis venenatis nam elementum volutpat viverra
            fusce, malesuada platea nulla rhoncus eleifend parturient morbi
            nunc. Lorem ipsum dolor sit amet consectetur adipiscing elit ac id,
            duis aliquam integer lobortis venenatis nam elementum volutpat
            viverra fusce, malesuada platea nulla rhoncus eleifend parturient
            morbi nunc.
          </p>
          @switch (selectedTab) {
            @case (1) {
              <section
                bmbLayout
                class="bmb_template-weeks-tec-cards"
                alignItems="stretch"
              >
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
                <bmb-container-button
                  bmbLayoutItem
                  [colSm]="4"
                  [colLg]="4"
                  title="Tema de App"
                  iconLeft="home"
                  iconRight="chevron_right"
                  (onButton)="onButton($event)"
                  [dropdownMenuItems]="[
                    {
                      icon: 'link',
                      text: 'External Link External Link External Link',
                      url: 'https://example.com'
                    },
                    {
                      icon: 'link',
                      text: 'internal Link',
                      url: 'https://example.com'
                    },
                    { icon: 'delete', text: 'Delete' },
                    { icon: 'settings', text: 'Settings' }
                  ]"
                />
              </section>
            }
            @case (2) {
              <section
                bmbLayout
                class="bmb_template-weeks-tec-cards"
                alignItems="stretch"
              >
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Introducción al servicio social
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Introducción al servicio social
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <h3 bmbVerticalLayoutItem [rowGrow]="1">
                        Tácticas y guías para examen fin de cursos
                      </h3>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input1"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox1"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input2"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox2"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card
                  bmbLayoutItem
                  margin="none"
                  [colSm]="4"
                  [colLg]="4"
                  borderColor="contrasts-50"
                >
                  <bmb-card-content
                    colorBackground="contrasts-25"
                    [setBorderRadius]="true"
                  >
                    <div bmbVerticalLayout>
                      <bmb-image
                        src="https://wallpaperaccess.com/full/266717.jpg"
                        mobileSrc="https://ichef.bbci.co.uk/news/976/cpsprodpb/7357/production/_129272592_6abcd85f-7c63-47ad-9af3-3047f45fbff7.jpg"
                        alt="Imagen de ejemplo"
                        width="100%"
                        ratio="3/1"
                        borderRadius="s"
                        loading="lazy"
                        [enableZoom]="false"
                        [isBlurredBackdrop]="false"
                        bmbVerticalLayoutItem
                      />
                      <section bmbVerticalLayoutItem [rowGrow]="1">
                        <h3>Acompañamiento de bienestar</h3>
                        <p>
                          Este documento constituye el marco general para la
                          legislción académica del Tec de Monterrey
                        </p>
                        <p>
                          <bmb-checkbox
                            name="input3"
                            label="
                              Contrato profesor cátedra Biología marina CCM.pdf
                            "
                            inputId="checkbox3"
                            (change)="inputChange($event)"
                          />
                          <bmb-divider [type]="'dashed'"></bmb-divider>
                        </p>
                      </section>
                      <div
                        bmbVerticalLayoutItem
                        bmbLayout
                        margin="none"
                        justify="center"
                        alignItems="center"
                      >
                        <button
                          (click)="openModal()"
                          bmbLayoutItem
                          bmbButton
                          [isMobile]="true"
                        >
                          Ver oferta
                        </button>
                      </div>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
          }
        </bmb-home-card>
      </main>
      <bmb-sidebar
        [elements]="[
          [
            {
              id: 2,
              icon: 'task',
              title: 'Agregar firmantes',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ'
            }
          ]
        ]"
        [title]="'Navegacion para mobiles'"
      ></bmb-sidebar>
    </section>
    <ng-template #modalTemplate>
      <div>
        <p>
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
          <br />
          <bmb-text-link
            [textLink]="'Test text'"
            [textLinkStyle]="'icon'"
            [target]="'_blank'"
            [icon]="'arrow_forward'"
            [iconPosition]="'right'"
            [link]="'https://www.youtube.com'"
            [disabled]="false"
          ></bmb-text-link>
        </p>
      </div>
    </ng-template>
`,
      },
    },
  },
} as Meta;

export const Default: StoryFn<SemanasTecLandingComponent> = (args) => {
  return {
    props: args,
    template: `
    <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
    <semanas-tec-landing></semanas-tec-landing>
    `,
  };
};
