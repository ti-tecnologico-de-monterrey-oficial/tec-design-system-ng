import {
  Component,
  input,
  output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Meta,
  StoryFn,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSidebarComponent,
  BmbTabsComponent,
  BmbTopBarComponent,
  BmbCardComponent,
  IBmbTab,
  IBmbActionHeader,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbAccordionComponent,
  BmbAccordionControlDirective,
  BmbIconComponent,
  BmbToastComponent,
  BmbNativeModalService,
  BmbButtonDirective,
} from '../../public-api';

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
import * as tabsStory from '../components/bmb-tabs/bmb-tabs.component.stories';
import * as accordionStory from '../components/bmb-accordion/bmb-accordion.stories';
import * as cardHeaderStory from '../components/bmb-card/bmb-card.stories';
import * as cardContentStory from '../components/bmb-card/bmb-card.stories';
import * as accordionControlStory from '../directives/bmb-accordion/bmb-accordion-control.stories';
import * as iconStory from '../components/bmb-icon/bmb-icon.stories';
import * as toastStory from '../components/bmb-toast/bmb-toast.stories';
import * as buttonStory from '../directives/bmb-button/button.stories';
import { Router } from '@angular/router';

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
    BmbTabsComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbAccordionComponent,
    BmbAccordionControlDirective,
    BmbIconComponent,
    BmbToastComponent,
    BmbButtonDirective,
  ],
  selector: 'storybook-hackathon',
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
        appPowered="Powered by Bamboo Design"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="code"
          bgIconAppearance="green-primary"
          title="Hackathon"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              { id: 1, title: 'Información', isActive: true },
              { id: 2, title: 'Inscripciones', isActive: false }
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          @switch (selectedTab) {
            @case (1) {
              <section
                bmbLayout
                margin="none"
                class="bmb_template-accordion-sections"
              >
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div class="bmb_template-height">
                    <bmb-card margin="none" bmbLayoutItem>
                      <bmb-card-content>
                        <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                          <img
                            width="100%"
                            alt="gatito"
                            src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                          />
                        </figure>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">
                            Bienvenidos innovadores
                          </h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div
                    style="display: flex; flex-direction: column; gap: 1rem;"
                  >
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">
                            Transforma al Tec con tu solución
                          </h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Desafíos disponibles</h3>
                        </bmb-card-header>
                        <div class="bmb_template-accordion-links padding-s">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">SGMM</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">TECservices</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">mitec</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">Inscripciones</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                        </div>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Etapas</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
              </section>
            }
            @case (2) {
              <section
                bmbLayout
                margin="none"
                class="bmb_template-accordion-sections"
              >
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div
                    style="display: flex; flex-direction: column; gap: 1rem;"
                  >
                    <bmb-card margin="none" bmbLayoutItem>
                      <bmb-card-content>
                        <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                          <img
                            width="100%"
                            alt="gatito"
                            src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                          />
                        </figure>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Desafío</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus.
                        </p>
                        <button
                          bmbButton
                          size="large"
                          (click)="goToSavingsBox()"
                        >
                          Participar
                        </button>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Contacto de apoyo</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div class="bmb_template-height">
                    <bmb-card margin="none" style="height: 100%;">
                      <bmb-card-header padding="m">
                        <h3 class="font-regular-5 truncate-title">Acerca de</h3>
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
                              <span class="font-regular-4"> Contexto </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
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
                              <span class="font-regular-4">Reto </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
                              </div>
                              <button
                                class="bmb_template-accordion-cta"
                                type="button"
                                (click)="openModalTemplate($event)"
                              >
                                <span class="font-regular-4"
                                  >Bajas de unidades de formación</span
                                >
                                <bmb-icon icon="arrow_forward" [size]="20" />
                              </button>
                              <ng-template #modalTemplate>
                                <bmb-toast
                                  [appearance]="'warning'"
                                  [isClosable]="true"
                                  [title]="
                                    'Importante: Antes de dar de baja, asegúrate de tener el formato correcto.'
                                  "
                                  [id]="'1'"
                                  (onClose)="onCloseToast($event)"
                                ></bmb-toast>
                                <section
                                  bmbAccordionControl
                                  class="bmb_template-accordion-modal"
                                >
                                  <bmb-accordion
                                    [accordionId]="2.1"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 1 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.2"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 2 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.3"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 3 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.4"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 4 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                </section>
                              </ng-template>
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
                              <span class="font-regular-4">Objetivos </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
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
                              <span class="font-regular-4">Indicadores </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
                              </div>
                            </ng-template>
                          </bmb-accordion>
                        </section>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
              </section>
            }
          }
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
class StorybookHackathon {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(
    private nativeModalService: BmbNativeModalService,
    private router: Router,
  ) {}

  modalId = input<string | undefined>(undefined);
  closeModalClicked = output();

  myModalId = signal<string | null>(null);

  private mq = window.matchMedia('(max-width: 767px)');
  private originals = new Map<HTMLElement, string>();

  ngOnInit() {
    setTimeout(() => this.applyTruncate(), 0);
    this.mq.addEventListener('change', () => this.applyTruncate());
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

  handleReject(): void {
    // Add your rejection logic here
  }

  handleAccept(): void {
    // Add your acceptance logic here
  }

  goToSavingsBox(): void {
    this.router.navigate(['/caja-de-ahorro']);
  }

  openModalTemplate() {
    const id = this.nativeModalService.openModal({
      title: 'My Modal',
      content: this.modalTemplate,
      size: 'medium',
      modalId: this.modalId(),
      actions: [
        {
          buttonName: 'accept',
          appearance: 'primary',
          label: 'Aceptar',
          action: () => this.handleAccept.bind(this)(),
        },
      ],
      closeModalClicked: (event: unknown) => {
        console.log(event);
        this.closeModalClicked.emit();
        this.myModalId.set(null);
      },
    });
    this.myModalId.set(id);
  }

  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  selectedTab = 1;

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
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

  onCloseToast(event: any) {
    console.log('Toast closed', event);
  }
}

export default {
  title: 'Particularities/mitec web/Landings/Student service/Hackathon',
  component: BmbTopBarComponent,
  tags: ['!autodocs', 'tec'],
  decorators: [
    moduleMetadata({
      imports: [StorybookHackathon, BmbTopBarComponent],
    }),
    applicationConfig({
      providers: [BmbNativeModalService],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getLandingGeneralDesc('Hackathon')}
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
      { title: tabsStory.default.title! },
      { title: accordionStory.default.title! },
      { title: cardHeaderStory.default.title! },
      { title: cardContentStory.default.title! },
      { title: accordionControlStory.default.title! },
      { title: iconStory.default.title! },
      { title: toastStory.default.title! },
      { title: buttonStory.default.title! },
    ],
    isFullScreenDesc: true,
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbCardComponent,
    BmbTabsComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbAccordionComponent,
    BmbAccordionControlDirective,
    BmbIconComponent,
    BmbToastComponent,
    BmbButtonDirective,`,
  '',
  `@ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(
    private nativeModalService: BmbNativeModalService,
    private router: Router,
  ) {}

  modalId = input<string | undefined>(undefined);
  closeModalClicked = output();

  myModalId = signal<string | null>(null);

  private mq = window.matchMedia('(max-width: 767px)');
  private originals = new Map<HTMLElement, string>();

  ngOnInit() {
    setTimeout(() => this.applyTruncate(), 0);
    this.mq.addEventListener('change', () => this.applyTruncate());
  }

  private applyTruncate() {
    document.querySelectorAll<HTMLElement>('.truncate-350').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = \`<p>\${
          text.length > 350 ? text.slice(0, 350).trimEnd() + '…' : text
        }\</p>\`;
      } else {
        el.innerHTML = this.originals.get(el)!;
      }
    });

    document.querySelectorAll<HTMLElement>('.truncate-170').forEach((el) => {
      if (!this.originals.has(el)) this.originals.set(el, el.innerHTML);
      if (this.mq.matches) {
        const text = el.innerText.trim().replace(/\s+/g, ' ');
        el.innerHTML = \`<p>\${
          text.length > 170 ? text.slice(0, 170).trimEnd() + '…' : text
        }\</p>\`;
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

  handleReject(): void {
    // Add your rejection logic here
  }

  handleAccept(): void {
    // Add your acceptance logic here
  }

  goToSavingsBox(): void {
    this.router.navigate(['/caja-de-ahorro']);
  }

  openModalTemplate() {
    const id = this.nativeModalService.openModal({
      title: 'My Modal',
      content: this.modalTemplate,
      size: 'medium',
      modalId: this.modalId(),
      actions: [
        {
          buttonName: 'accept',
          appearance: 'primary',
          label: 'Aceptar',
          action: () => this.handleAccept.bind(this)(),
        },
      ],
      closeModalClicked: (event: unknown) => {
        console.log(event);
        this.closeModalClicked.emit();
        this.myModalId.set(null);
      },
    });
    this.myModalId.set(id);
  }

  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'info',
      alt: 'Editar',
      action: () => console.log('Info'),
    },
  ];

  selectedTab = 1;

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
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

  onCloseToast(event: any) {
    console.log('Toast closed', event);
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
        appPowered="Powered by Bamboo Design"
        (helpButtonClick)="helpButtonClick($event)"
        (userProfileClick)="userProfileClick($event)"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="code"
          bgIconAppearance="green-primary"
          title="Hackathon"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              { id: 1, title: 'Información', isActive: true },
              { id: 2, title: 'Inscripciones', isActive: false }
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          @switch (selectedTab) {
            @case (1) {
              <section
                bmbLayout
                margin="none"
                class="bmb_template-accordion-sections"
              >
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div class="bmb_template-height">
                    <bmb-card margin="none" bmbLayoutItem>
                      <bmb-card-content>
                        <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                          <img
                            width="100%"
                            alt="gatito"
                            src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                          />
                        </figure>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Bienvenidos innovadores</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div
                    style="display: flex; flex-direction: column; gap: 1rem;"
                  >
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">
                            Transforma al Tec con tu solución
                          </h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Desafíos disponibles</h3>
                        </bmb-card-header>
                        <div class="bmb_template-accordion-links padding-s">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">SGMM</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">TECservices</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">mitec</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4">Inscripciones</span>
                            <bmb-icon icon="arrow_forward" [size]="20" />
                          </a>
                        </div>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Etapas</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus. In quisque justo
                          senectus in sed adipiscing. Arcu neque feugiat aenean
                          nam accumsan justo ut. Pulvinar urna amet proin sit
                          sed tellus ipsum. Lorem ipsum dolor sit amet
                          consectetur. Nisl nibh phasellus condimentum mi
                          faucibus. In quisque justo senectus in sed adipiscing.
                          Arcu neque feugiat aenean nam accumsan justo ut.
                          Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                          ipsum dolor sit amet consectetur. Nisl nibh phasellus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
              </section>
            }
            @case (2) {
              <section
                bmbLayout
                margin="none"
                class="bmb_template-accordion-sections"
              >
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div
                    style="display: flex; flex-direction: column; gap: 1rem;"
                  >
                    <bmb-card margin="none" bmbLayoutItem>
                      <bmb-card-content>
                        <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                          <img
                            width="100%"
                            alt="gatito"
                            src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                          />
                        </figure>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Desafío</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus.
                        </p>
                        <button
                          bmbButton
                          size="large"
                          (click)="goToSavingsBox()"
                        >
                          Participar
                        </button>
                      </bmb-card-content>
                    </bmb-card>
                    <bmb-card margin="none">
                      <bmb-card-content>
                        <bmb-card-header padding="m">
                          <h3 class="font-regular-5">Contacto de apoyo</h3>
                        </bmb-card-header>
                        <p class="font-regular-4 padding-s">
                          Lorem ipsum dolor sit amet consectetur. Nisl nibh
                          phasellus condimentum mi faucibus.
                        </p>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
                <div bmbLayoutItem [colSm]="6" [colLg]="6">
                  <div class="bmb_template-height">
                    <bmb-card margin="none" style="height: 100%;">
                      <bmb-card-header padding="m">
                        <h3 class="font-regular-5 truncate-title">Acerca de</h3>
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
                              <span class="font-regular-4"> Contexto </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
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
                              <span class="font-regular-4">Reto </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
                              </div>
                              <button
                                class="bmb_template-accordion-cta"
                                type="button"
                                (click)="openModalTemplate($event)"
                              >
                                <span class="font-regular-4"
                                  >Bajas de unidades de formación</span
                                >
                                <bmb-icon icon="arrow_forward" [size]="20" />
                              </button>
                              <ng-template #modalTemplate>
                                <bmb-toast
                                  [appearance]="'warning'"
                                  [isClosable]="true"
                                  [title]="
                                    'Importante: Antes de dar de baja, asegúrate de tener el formato correcto.'
                                  "
                                  [id]="'1'"
                                  (onClose)="onCloseToast($event)"
                                ></bmb-toast>
                                <section
                                  bmbAccordionControl
                                  class="bmb_template-accordion-modal"
                                >
                                  <bmb-accordion
                                    [accordionId]="2.1"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 1 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.2"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 2 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.3"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 3 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                  <bmb-accordion
                                    [accordionId]="2.4"
                                    appearanceContrast="primary"
                                    borderRadius="m"
                                    margin="m"
                                    paddingHeader="m"
                                    paddingContent="m"
                                    [hideToggle]="false"
                                    icon="keyboard_arrow_down"
                                  >
                                    <ng-template #bmbAccordionHeader>
                                      <span class="font-regular-4">
                                        Paso 4 - Descarga y llena el formato
                                      </span>
                                    </ng-template>
                                    <ng-template #bmbAccordionContent>
                                      <div class="truncate-170">
                                        <p class="font-regular-4">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit. Ut justo
                                          ante, mattis nec libero a, malesuada
                                          pellentesque sem. Aliquam erat
                                          volutpat. Nulla ut consequat turpis,
                                          id efficitur velit. Fusce vitae dolor
                                          leo. Praesent diam justo, consectetur
                                          in blandit ut, tincidunt vitae enim.
                                          Nulla eleifend, leo at finibus
                                          volutpat, nulla metus eleifend lacus,
                                          ullamcorper dictum augue diam id erat.
                                        </p>
                                      </div>
                                    </ng-template>
                                  </bmb-accordion>
                                </section>
                              </ng-template>
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
                              <span class="font-regular-4">Objetivos </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
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
                              <span class="font-regular-4">Indicadores </span>
                            </ng-template>
                            <ng-template #bmbAccordionContent>
                              <div class="truncate-170">
                                <p class="font-regular-4">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Ut justo ante, mattis nec
                                  libero a, malesuada pellentesque sem. Aliquam
                                  erat volutpat. Nulla ut consequat turpis, id
                                  efficitur velit. Fusce vitae dolor leo.
                                  Praesent diam justo, consectetur in blandit
                                  ut, tincidunt vitae enim. Nulla eleifend, leo
                                  at finibus volutpat, nulla metus eleifend
                                  lacus, ullamcorper dictum augue diam id erat.
                                </p>
                              </div>
                            </ng-template>
                          </bmb-accordion>
                        </section>
                      </bmb-card-content>
                    </bmb-card>
                  </div>
                </div>
              </section>
            }
          }
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
      },
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-hackathon />
    `,
  };
};
