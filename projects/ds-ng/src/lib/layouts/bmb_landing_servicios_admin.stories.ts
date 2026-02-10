import {
  Component,
  computed,
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
  BmbTopBarComponent,
  BmbCardComponent,
  IBmbActionHeader,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbAccordionComponent,
  BmbAccordionControlDirective,
  BmbIconComponent,
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
  selector: 'storybook-accordion-tabs',
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
          icon="newspaper"
          bgIconAppearance="purple-light"
          title="Servicios administrativos"
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
            <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <bmb-card-header padding="s">
                  <h3 class="font-semibold-9 truncate-title">SIE</h3>
                </bmb-card-header>
                <div class="truncate-350">
                  <p class="font-regular-4 padding-s">
                    Acceso al sistema para administradores ejecutivos de venta y
                    trámites de Inversión Educativa TEC
                  </p>
                </div>
                <button
                  bmbButton
                  size="large"
                  type="button"
                  (click)="openModalTemplate($event, 'COE - Finanzas')"
                >
                  Mas información
                </button>
                <ng-template #modalTemplate>
                  <section
                    bmbAccordionControl
                    class="bmb_template-accordion-modal"
                  >
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                  </section>
                </ng-template>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <bmb-card-header padding="s">
                  <h3 class="font-semibold-9 truncate-title">SIE</h3>
                </bmb-card-header>
                <div class="truncate-350">
                  <p class="font-regular-4 padding-s">
                    Acceso al sistema para administradores ejecutivos de venta y
                    trámites de Inversión Educativa TEC
                  </p>
                </div>
                <button
                  bmbButton
                  size="large"
                  type="button"
                  (click)="openModalTemplate($event, 'COE - Finanzas')"
                >
                  Mas información
                </button>
                <ng-template #modalTemplate>
                  <section
                    bmbAccordionControl
                    class="bmb_template-accordion-modal"
                  >
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                  </section>
                </ng-template>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <bmb-card-header padding="s">
                  <h3 class="font-semibold-9 truncate-title">SIE</h3>
                </bmb-card-header>
                <div class="truncate-350">
                  <p class="font-regular-4 padding-s">
                    Acceso al sistema para administradores ejecutivos de venta y
                    trámites de Inversión Educativa TEC
                  </p>
                </div>
                <button
                  bmbButton
                  size="large"
                  type="button"
                  (click)="openModalTemplate($event, 'COE - Finanzas')"
                >
                  Mas información
                </button>
                <ng-template #modalTemplate>
                  <section
                    bmbAccordionControl
                    class="bmb_template-accordion-modal"
                  >
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                  </section>
                </ng-template>
              </bmb-card-content>
            </bmb-card>
            <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
              <bmb-card-content>
                <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                  <img
                    width="100%"
                    alt="gatito"
                    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                  />
                </figure>
                <bmb-card-header padding="s">
                  <h3 class="font-semibold-9 truncate-title">SIE</h3>
                </bmb-card-header>
                <div class="truncate-350">
                  <p class="font-regular-4 padding-s">
                    Acceso al sistema para administradores ejecutivos de venta y
                    trámites de Inversión Educativa TEC
                  </p>
                </div>
                <button
                  bmbButton
                  size="large"
                  type="button"
                  (click)="openModalTemplate($event, 'COE - Finanzas')"
                >
                  Mas información
                </button>
                <ng-template #modalTemplate>
                  <section
                    bmbAccordionControl
                    class="bmb_template-accordion-modal"
                  >
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                        <span class="font-regular-4"> ABC de activo fijo </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <div class="bmb_template-accordion-links">
                          <a
                            class="bmb_template-accordion-cta"
                            href="https://www.youtube.com"
                            target="'_blank'"
                          >
                            <span class="font-regular-4"
                              >Guía para establecer y dar seguimiento a mi Plan
                              de Desarrollo</span
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
                  </section>
                </ng-template>
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
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private nativeModalService: BmbNativeModalService) {}

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

  openModalTemplate(event: Event, title: string) {
    const id = this.nativeModalService.openModal({
      title: title,
      content: this.modalTemplate,
      size: 'medium',
      modalId: this.modalId(),
      actions: [],
      closeModalClicked: (event: unknown) => {
        console.log(event);
        this.closeModalClicked.emit();
        this.myModalId.set(null);
      },
    });
    this.myModalId.set(id);
  }

  isTheModalOpen = computed(() => {
    console.log('Computing isTheModalOpen');
    if (!this.myModalId()) return false;

    return this.nativeModalService.checkIfModalExists(
      this.myModalId() as string,
    );
  });

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
  title:
    'Particularities/mitec web/Landings/Container buttons card/Servicios admin',
  component: BmbTopBarComponent,
  tags: ['!autodocs', 'tec'],
  decorators: [
    moduleMetadata({
      imports: [StorybookAccordionTabs, BmbTopBarComponent],
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
${getLandingGeneralDesc('Servicios admin')}
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
  `
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
    BmbButtonDirective,`,
  '',
  `@ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private nativeModalService: BmbNativeModalService) {}

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

  handleReject(): void {
    // Add your rejection logic here
  }

  handleAccept(): void {
    // Add your acceptance logic here
  }

  openModalTemplate(event: Event, title: string) {
    const id = this.nativeModalService.openModal({
      title: title,
      content: this.modalTemplate,
      size: 'medium',
      modalId: this.modalId(),
      actions: [],
      closeModalClicked: (event: unknown) => {
        console.log(event);
        this.closeModalClicked.emit();
        this.myModalId.set(null);
      },
    });
    this.myModalId.set(id);
  }

  isTheModalOpen = computed(() => {
    console.log('Computing isTheModalOpen');
    if (!this.myModalId()) return false;

    return this.nativeModalService.checkIfModalExists(
      this.myModalId() as string,
    );
  });

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
        icon="newspaper"
        bgIconAppearance="purple-light"
        title="Servicios administrativos"
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
          <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
            <bmb-card-content>
              <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                <img
                  width="100%"
                  alt="gatito"
                  src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                />
              </figure>
              <bmb-card-header padding="s">
                <h3 class="font-semibold-9 truncate-title">SIE</h3>
              </bmb-card-header>
              <div class="truncate-350">
                <p class="font-regular-4 padding-s">
                  Acceso al sistema para administradores ejecutivos de venta y
                  trámites de Inversión Educativa TEC
                </p>
              </div>
              <button
                bmbButton
                size="large"
                type="button"
                (click)="openModalTemplate($event, 'COE - Finanzas')"
              >
                Mas información
              </button>
              <ng-template #modalTemplate>
                <section
                  bmbAccordionControl
                  class="bmb_template-accordion-modal"
                >
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                </section>
              </ng-template>
            </bmb-card-content>
          </bmb-card>
          <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
            <bmb-card-content>
              <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                <img
                  width="100%"
                  alt="gatito"
                  src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                />
              </figure>
              <bmb-card-header padding="s">
                <h3 class="font-semibold-9 truncate-title">SIE</h3>
              </bmb-card-header>
              <div class="truncate-350">
                <p class="font-regular-4 padding-s">
                  Acceso al sistema para administradores ejecutivos de venta y
                  trámites de Inversión Educativa TEC
                </p>
              </div>
              <button
                bmbButton
                size="large"
                type="button"
                (click)="openModalTemplate($event, 'COE - Finanzas')"
              >
                Mas información
              </button>
              <ng-template #modalTemplate>
                <section
                  bmbAccordionControl
                  class="bmb_template-accordion-modal"
                >
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                </section>
              </ng-template>
            </bmb-card-content>
          </bmb-card>
          <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
            <bmb-card-content>
              <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                <img
                  width="100%"
                  alt="gatito"
                  src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                />
              </figure>
              <bmb-card-header padding="s">
                <h3 class="font-semibold-9 truncate-title">SIE</h3>
              </bmb-card-header>
              <div class="truncate-350">
                <p class="font-regular-4 padding-s">
                  Acceso al sistema para administradores ejecutivos de venta y
                  trámites de Inversión Educativa TEC
                </p>
              </div>
              <button
                bmbButton
                size="large"
                type="button"
                (click)="openModalTemplate($event, 'COE - Finanzas')"
              >
                Mas información
              </button>
              <ng-template #modalTemplate>
                <section
                  bmbAccordionControl
                  class="bmb_template-accordion-modal"
                >
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                </section>
              </ng-template>
            </bmb-card-content>
          </bmb-card>
          <bmb-card margin="none" bmbLayoutItem [colSm]="4" [colLg]="4">
            <bmb-card-content>
              <figure [ngStyle]="{ margin: '0 0 24px 0' }">
                <img
                  width="100%"
                  alt="gatito"
                  src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
                />
              </figure>
              <bmb-card-header padding="s">
                <h3 class="font-semibold-9 truncate-title">SIE</h3>
              </bmb-card-header>
              <div class="truncate-350">
                <p class="font-regular-4 padding-s">
                  Acceso al sistema para administradores ejecutivos de venta y
                  trámites de Inversión Educativa TEC
                </p>
              </div>
              <button
                bmbButton
                size="large"
                type="button"
                (click)="openModalTemplate($event, 'COE - Finanzas')"
              >
                Mas información
              </button>
              <ng-template #modalTemplate>
                <section
                  bmbAccordionControl
                  class="bmb_template-accordion-modal"
                >
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                      <span class="font-regular-4"> ABC de activo fijo </span>
                    </ng-template>
                    <ng-template #bmbAccordionContent>
                      <div class="bmb_template-accordion-links">
                        <a
                          class="bmb_template-accordion-cta"
                          href="https://www.youtube.com"
                          target="'_blank'"
                        >
                          <span class="font-regular-4"
                            >Guía para establecer y dar seguimiento a mi Plan
                            de Desarrollo</span
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
                </section>
              </ng-template>
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
      },
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-accordion-tabs />
    `,
  };
};
