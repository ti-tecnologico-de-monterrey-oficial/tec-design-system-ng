import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSidebarComponent,
  BmbTopBarComponent,
  BmbCardComponent,
  IBmbActionHeader,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbAccordionComponent,
  BmbAccordionControlDirective,
  BmbIconComponent,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import {
  FULLSCREEN_DESC,
  getBasicExampleBlock,
  getFormatName,
  getLandingGeneralDesc,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  TECHNICAL_DOC_REFERENCES,
  TECHNICAL_DOC_TITLE,
} from '../utils/doc/utils';

import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as layoutStory from '../directives/bmb-layout/bmb-layout.stories';
import * as layoutItemStory from '../directives/bmb-layout/bmb-layout.stories';
import * as cardStory from '../components/bmb-card/bmb-card.stories';
import * as accordionStory from '../components/bmb-accordion/bmb-accordion.stories';
import * as cardHeaderStory from '../components/bmb-card/bmb-card.stories';
import * as cardContentStory from '../components/bmb-card/bmb-card.stories';
import * as accordionControlStory from '../directives/bmb-accordion/bmb-accordion-control.stories';
import * as iconStory from '../components/bmb-icon/bmb-icon.stories';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbAccordionComponent,
    BmbAccordionControlDirective,
    BmbIconComponent,
  ],
  selector: 'storybook-accordion-image',
  template: `
    <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno'
        }"
        [showHelpButton]="true"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [lang]="'es'"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="map"
          bgIconAppearance="teal-primary"
          title="Mi Plan de Desarrollo"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <section
            bmbLayout
            margin="none"
            class="bmb_template-accordion-sections"
          >
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-medium-5">Descripción</h3>
              </bmb-card-header>
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <p class="font-regular-4">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus. In quisque justo senectus in sed
                  adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                  Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                  dolor sit amet consectetur.
                </p>
                <p class="font-regular-4">
                  Nisl nibh phasellus condimentum mi faucibus. In quisque justo
                  senectus in sed adipiscing. Arcu neque feugiat aenean nam
                  accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                  ipsum. Lorem ipsum dolor sit amet consectetur. Nisl nibh
                  phasellus condimentum mi faucibus. In quisque justo senectus
                  in sed adipiscing. Arcu neque feugiat aenean nam accumsan
                  justo ut.
                </p>
                <p class="font-regular-4">
                  Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                  dolor sit amet consectetur. Nisl nibh phasellus condimentum mi
                  faucibus. In quisque justo senectus in sed adipiscing. Arcu
                  neque feugiat aenean nam accumsan justo ut.
                </p>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-medium-5">Recursos</h3>
              </bmb-card-header>
              <bmb-card-content>
                <section bmbAccordionControl>
                  <bmb-accordion
                    [accordionId]="1"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4"> Información general </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="2"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">Guías</span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para establecer y dar seguimiento a mi Plan de
                            Desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para acompañar a tu equipo en mi Plan de
                            Desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>

                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para reguistrar tu plan en Success
                            Factors</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                      </div>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="3"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">Recursos de desarrollo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Oferta de desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Oportunidades de crecimiento</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4">mi BiblioTECa</span>
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                      </div>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="4"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat. Nulla ut
                        consequat turpis, id efficitur velit. Fusce vitae dolor
                        leo. Praesent diam justo, consectetur in blandit ut,
                        tincidunt vitae enim. Nulla eleifend, leo at finibus
                        volutpat, nulla metus eleifend lacus, ullamcorper dictum
                        augue diam id erat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="5"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat. Nulla ut
                        consequat turpis, id efficitur velit. Fusce vitae dolor
                        leo. Praesent diam justo, consectetur in blandit ut,
                        tincidunt vitae enim. Nulla eleifend, leo at finibus
                        volutpat, nulla metus eleifend lacus, ullamcorper dictum
                        augue diam id erat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                </section>
              </bmb-card-content>
            </bmb-card>
          </section>
        </bmb-home-card>
      </main>
    </div>
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
  `,
})
class StorybookAccordionTabs {
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  handleBack() {
    console.log('Back button clicked');
  }

  helpButtonClick(event: any) {
    console.log('Help button clicked', event);
  }

  userProfileClick(event: any) {
    console.log('User profile clicked', event);
  }
}

export default {
  title: 'Particularities/mitec web/Landings/Accordion with image',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookAccordionTabs, BmbTopBarComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getLandingGeneralDesc('Accordion with image')}
${getSpecialSpecifications(`### ${TECHNICAL_DOC_TITLE}
>
${TECHNICAL_DOC_REFERENCES}
- [${topBarStory.default.title}](/docs/${getFormatName(topBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${sideBarStory.default.title}](/docs/${getFormatName(sideBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${homeCardStory.default.title}](/docs/${getFormatName(homeCardStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${layoutStory.default.title}](/docs/${getFormatName(layoutStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${layoutItemStory.default.title}](/docs/${getFormatName(layoutItemStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardStory.default.title}](/docs/${getFormatName(cardStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${accordionStory.default.title}](/docs/${getFormatName(accordionStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardHeaderStory.default.title}](/docs/${getFormatName(cardHeaderStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardContentStory.default.title}](/docs/${getFormatName(cardContentStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${accordionControlStory.default.title}](/docs/${getFormatName(accordionControlStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${iconStory.default.title}](/docs/${getFormatName(iconStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
>
${FULLSCREEN_DESC}
`)}
${getBasicExampleBlock(
  ` BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbAccordionComponent,
    BmbAccordionControlDirective, BmbIconComponent`,
  '',
  `actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  handleBack() {
    console.log('Back button clicked');
  }

  helpButtonClick(event: any) {
    console.log('Help button clicked', event);
  }

  userProfileClick(event: any) {
    console.log('User profile clicked', event);
  }`,
)}
\`\`\`html
        <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno',
        }"
        [showHelpButton]="true"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [lang]="'es'"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="map"
          bgIconAppearance="teal-primary"
          title="Mi Plan de Desarrollo"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <section
            bmbLayout
            margin="none"
            class="bmb_template-accordion-sections"
          >
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-medium-5">Descripción</h3>
              </bmb-card-header>
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <p class="font-regular-4">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus. In quisque justo senectus in sed
                  adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                  Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                  dolor sit amet consectetur.
                </p>
                <p class="font-regular-4">
                  Nisl nibh phasellus condimentum mi faucibus. In quisque justo
                  senectus in sed adipiscing. Arcu neque feugiat aenean nam
                  accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                  ipsum. Lorem ipsum dolor sit amet consectetur. Nisl nibh
                  phasellus condimentum mi faucibus. In quisque justo senectus
                  in sed adipiscing. Arcu neque feugiat aenean nam accumsan
                  justo ut.
                </p>
                <p class="font-regular-4">
                  Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                  dolor sit amet consectetur. Nisl nibh phasellus condimentum mi
                  faucibus. In quisque justo senectus in sed adipiscing. Arcu
                  neque feugiat aenean nam accumsan justo ut.
                </p>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-medium-5">Recursos</h3>
              </bmb-card-header>
              <bmb-card-content>
                <section bmbAccordionControl>
                  <bmb-accordion
                    [accordionId]="1"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4"> Información general </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="2"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">Guías</span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para establecer y dar seguimiento a mi Plan de
                            Desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para acompañar a tu equipo en mi Plan de
                            Desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>

                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Guía para reguistrar tu plan en Success
                            Factors</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                      </div>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="3"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">Recursos de desarrollo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Oferta de desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4"
                            >Oportunidades de crecimiento</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-medium-4">mi BiblioTECa</span>
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                      </div>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="4"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat. Nulla ut
                        consequat turpis, id efficitur velit. Fusce vitae dolor
                        leo. Praesent diam justo, consectetur in blandit ut,
                        tincidunt vitae enim. Nulla eleifend, leo at finibus
                        volutpat, nulla metus eleifend lacus, ullamcorper dictum
                        augue diam id erat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                  <bmb-accordion
                    [accordionId]="5"
                    appearanceContrast="primary"
                    borderRadius="m"
                    margin="m"
                    paddingHeader="m"
                    paddingContent="m"
                    [hideToggle]="false"
                    icon="keyboard_arrow_down"
                  >
                    <ng-template #bmbAccordionHeader>
                      <span class="font-medium-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut justo ante, mattis nec libero a, malesuada
                        pellentesque sem. Aliquam erat volutpat. Nulla ut
                        consequat turpis, id efficitur velit. Fusce vitae dolor
                        leo. Praesent diam justo, consectetur in blandit ut,
                        tincidunt vitae enim. Nulla eleifend, leo at finibus
                        volutpat, nulla metus eleifend lacus, ullamcorper dictum
                        augue diam id erat.
                      </p>
                    </ng-template>
                  </bmb-accordion>
                </section>
              </bmb-card-content>
            </bmb-card>
          </section>
        </bmb-home-card>
      </main>
    </div>
    <bmb-sidebar
      [elements]="[
        [
          {
            id: 2,
            icon: 'task',
            title: 'Agregar firmantes',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      ]"
      [title]="'Navegacion para mobiles'"
    ></bmb-sidebar>
`,
      },
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-accordion-image />
    `,
  };
};
