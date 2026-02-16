import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Router } from '@angular/router';
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
  BmbButtonDirective,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import {
  getBasicExampleBlock,
  getLandingGeneralDesc,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  getTECParticularitiesMessage,
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
import * as buttonStory from '../directives/bmb-button/button.stories';

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
    BmbButtonDirective,
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
        [allowSidebarForMobile]="true"
        [lang]="'es'"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="map"
          bgIconAppearance="teal-primary"
          title="Mi caja de ahorro"
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
                <h3 class="font-regular-5 truncate-title">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus.
                </h3>
              </bmb-card-header>
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <div class="truncate-350">
                  <p class="font-regular-4">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                    dolor sit amet consectetur.
                  </p>
                  <p class="font-regular-4">
                    Nisl nibh phasellus condimentum mi faucibus. In quisque
                    justo senectus in sed adipiscing. Arcu neque feugiat aenean
                    nam accumsan justo ut. Pulvinar urna amet proin sit sed
                    tellus ipsum. Lorem ipsum dolor sit amet consectetur. Nisl
                    nibh phasellus condimentum mi faucibus. In quisque justo
                    senectus in sed adipiscing. Arcu neque feugiat aenean nam
                    accumsan justo ut.
                  </p>
                  <p class="font-regular-4">
                    Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                    dolor sit amet consectetur. Nisl nibh phasellus condimentum
                    mi faucibus. In quisque justo senectus in sed adipiscing.
                    Arcu neque feugiat aenean nam accumsan justo ut.
                  </p>
                  <button bmbButton size="large" (click)="goToSavingsBox()">
                    Ir a mi caja de ahorro
                  </button>
                </div>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-regular-5 truncate-title">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus.
                </h3>
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
                      <span class="font-regular-4"> Información general </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat.
                        </p>
                      </div>
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
                      <span class="font-regular-4">Guías</span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
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
                          <span class="font-regular-4"
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
                          <span class="font-regular-4"
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
                      <span class="font-regular-4"
                        >Recursos de desarrollo
                      </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Oferta de desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Oportunidades de crecimiento</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4">mi BiblioTECa</span>
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
                      <span class="font-regular-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </div>
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
                      <span class="font-regular-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </div>
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

  private mq = window.matchMedia('(max-width: 767px)');
  private originals = new Map<HTMLElement, string>();

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.applyTruncate(), 0);
    this.mq.addEventListener('change', () => this.applyTruncate());
  }

  goToSavingsBox(): void {
    this.router.navigate(['/caja-de-ahorro']);
  }

  private applyTruncate() {
    document.querySelectorAll<HTMLElement>('.truncate-350').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = `<p>${
          text.length > 350 ? text.slice(0, 350).trimEnd() + '…' : text
        }</p>`;
      } else {
        el.innerHTML = this.originals.get(el)!;
      }
    });

    document.querySelectorAll<HTMLElement>('.truncate-170').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = `<p>${
          text.length > 170 ? text.slice(0, 170).trimEnd() + '…' : text
        }</p>`;
      } else {
        el.innerHTML = this.originals.get(el)!;
      }
    });

    document.querySelectorAll<HTMLElement>('.truncate-title').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerText);
      if (this.mq.matches) {
        const text = (this.originals.get(el) ?? el.innerText).trim();
        el.innerText =
          text.length > 18 ? text.slice(0, 18).trimEnd() + '…' : text;
      } else {
        el.innerText = this.originals.get(el)!;
      }
    });
  }

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
  title:
    'Particularities/mitec web/Landings/Accordion with image/Caja de ahorro',
  component: BmbTopBarComponent,
  tags: ['!autodocs', 'tec'],
  decorators: [
    moduleMetadata({
      imports: [StorybookAccordionTabs, BmbTopBarComponent],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getLandingGeneralDesc('Caja de ahorro')}
${getSpecialSpecifications(
  `
  ${getTECParticularitiesMessage()}<br/>
  ${getTechnicalDocReferences({
    references: [
      { title: topBarStory.default.title! },
      { title: sideBarStory.default.title! },
      { title: homeCardStory.default.title! },
      { title: layoutStory.default.title! },
      { title: layoutItemStory.default.title! },
      { title: cardStory.default.title! },
      { title: accordionStory.default.title! },
      { title: cardHeaderStory.default.title! },
      { title: cardContentStory.default.title! },
      { title: accordionControlStory.default.title! },
      { title: iconStory.default.title! },
      { title: buttonStory.default.title! },
    ],
    isFullScreenDesc: true,
  })}`,
  { showAdditionalBlockquote: true },
)}
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
    BmbButtonDirective,
    BmbAccordionControlDirective,
    BmbIconComponent`,
  '',
  `actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  private mq = window.matchMedia('(max-width: 767px)');
  private originals = new Map<HTMLElement, string>();

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.applyTruncate(), 0);
    this.mq.addEventListener('change', () => this.applyTruncate());
  }

  goToSavingsBox(): void {
    this.router.navigate(['/caja-de-ahorro']);
  }

  private applyTruncate() {
    document.querySelectorAll<HTMLElement>('.truncate-350').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = \`<p>\${text.length > 350 ? text.slice(0, 350).trimEnd() + '…' : text}\</p>\`;
      } else {
        el.innerHTML = this.originals.get(el)!;
      }
    });

    document.querySelectorAll<HTMLElement>('.truncate-170').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = \`<p>\${text.length > 170 ? text.slice(0, 170).trimEnd() + '…' : text}\</p>\`;
      } else {
        el.innerHTML = this.originals.get(el)!;
      }
    });

    document.querySelectorAll<HTMLElement>('.truncate-title').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerText);
      if (this.mq.matches) {
        const text = (this.originals.get(el) ?? el.innerText).trim();
        el.innerText =
          text.length > 18 ? text.slice(0, 18).trimEnd() + '…' : text;
      } else {
        el.innerText = this.originals.get(el)!;
      }
    });
  }

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
          role: 'Alumno'
        }"
        [showHelpButton]="true"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [allowSidebarForMobile]="true"
        [lang]="'es'"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="map"
          bgIconAppearance="teal-primary"
          title="Mi caja de ahorro"
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
                <h3 class="font-regular-5 truncate-title">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus.
                </h3>
              </bmb-card-header>
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <div class="truncate-350">
                  <p class="font-regular-4">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                    dolor sit amet consectetur.
                  </p>
                  <p class="font-regular-4">
                    Nisl nibh phasellus condimentum mi faucibus. In quisque
                    justo senectus in sed adipiscing. Arcu neque feugiat aenean
                    nam accumsan justo ut. Pulvinar urna amet proin sit sed
                    tellus ipsum. Lorem ipsum dolor sit amet consectetur. Nisl
                    nibh phasellus condimentum mi faucibus. In quisque justo
                    senectus in sed adipiscing. Arcu neque feugiat aenean nam
                    accumsan justo ut.
                  </p>
                  <p class="font-regular-4">
                    Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                    dolor sit amet consectetur. Nisl nibh phasellus condimentum
                    mi faucibus. In quisque justo senectus in sed adipiscing.
                    Arcu neque feugiat aenean nam accumsan justo ut.
                  </p>
                  <button bmbButton size="large" (click)="goToSavingsBox()">
                    Ir a mi caja de ahorro
                  </button>
                </div>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
              <bmb-card-header padding="m">
                <h3 class="font-regular-5 truncate-title">
                  Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                  condimentum mi faucibus.
                </h3>
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
                      <span class="font-regular-4"> Información general </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat.
                        </p>
                      </div>
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
                      <span class="font-regular-4">Guías</span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
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
                          <span class="font-regular-4"
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
                          <span class="font-regular-4"
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
                      <span class="font-regular-4">Recursos de desarrollo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Oferta de desarrollo</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Oportunidades de crecimiento</span
                          >
                          <bmb-icon icon="arrow_forward" [size]="20" />
                        </a>
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4">mi BiblioTECa</span>
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
                      <span class="font-regular-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </div>
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
                      <span class="font-regular-4">FAQ's </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="truncate-170">
                        <p class="font-regular-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </div>
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
