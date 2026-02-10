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
              { id: 1, title: 'Fechas Importantes', isActive: true },
              { id: 2, title: 'Caracteristicas y requisitos', isActive: false },
              { id: 3, title: 'Additional Tab Label', isActive: false }
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
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">Proceso</h3>
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
                          <span class="font-regular-4">
                            Paso 1 - Descarga y llena el formato
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                          <span class="font-regular-4"
                            >Paso 2 - Crea la solicitud y adjunta la
                            documentación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                          <span class="font-regular-4"
                            >Paso 3 - Confirmación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                          <span class="font-regular-4"
                            >Paso 4 - Notificación y cierres
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
                            </p>
                          </div>
                        </ng-template>
                      </bmb-accordion>
                    </section>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none">
                <bmb-card margin="none" bmbLayoutItem [colSm]="12" [colLg]="12">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }

            @case (3) {
              <section bmbLayout margin="none">
                <bmb-card margin="none" bmbLayoutItem [colSm]="12" [colLg]="12">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
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
  title: 'Particularities/mitec web/Landings/Accordion tab',
  component: BmbTopBarComponent,
  tags: ['tec'],
  decorators: [
    moduleMetadata({
      imports: [StorybookAccordionTabs, BmbTopBarComponent],
      providers: [],
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
${getLandingGeneralDesc('Accordion tab')}
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
    BmbToastComponent`,
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
              { id: 1, title: 'Fechas Importantes', isActive: true },
              { id: 2, title: 'Caracteristicas y requisitos', isActive: false },
              { id: 3, title: 'Additional Tab Label', isActive: false }
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
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">Proceso</h3>
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
                          <span class="font-regular-4">
                            Paso 1 - Descarga y llena el formato
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                          <span class="font-regular-4"
                            >Paso 2 - Crea la solicitud y adjunta la
                            documentación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Ut justo ante, mattis nec
                                      libero a, malesuada pellentesque sem.
                                      Aliquam erat volutpat. Nulla ut consequat
                                      turpis, id efficitur velit. Fusce vitae
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
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
                          <span class="font-regular-4"
                            >Paso 3 - Confirmación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                          <span class="font-regular-4"
                            >Paso 4 - Notificación y cierres
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <div class="truncate-170">
                            <p class="font-regular-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
                            </p>
                          </div>
                        </ng-template>
                      </bmb-accordion>
                    </section>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none">
                <bmb-card margin="none" bmbLayoutItem [colSm]="12" [colLg]="12">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }

            @case (3) {
              <section bmbLayout margin="none">
                <bmb-card margin="none" bmbLayoutItem [colSm]="12" [colLg]="12">
                  <bmb-card-header padding="m">
                    <h3 class="font-regular-5 truncate-title">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <div class="truncate-350">
                      <p class="font-regular-4">
                        Lorem ipsum dolor sit amet consectetur. Nisl nibh
                        phasellus condimentum mi faucibus. In quisque justo
                        senectus in sed adipiscing. Arcu neque feugiat aenean
                        nam accumsan justo ut. Pulvinar urna amet proin sit sed
                        tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <p class="font-regular-4">
                        Nisl nibh phasellus condimentum mi faucibus. In quisque
                        justo senectus in sed adipiscing. Arcu neque feugiat
                        aenean nam accumsan justo ut. Pulvinar urna amet proin
                        sit sed tellus ipsum. Lorem ipsum dolor sit amet
                        consectetur. Nisl nibh phasellus condimentum mi
                        faucibus. In quisque justo senectus in sed adipiscing.
                        Arcu neque feugiat aenean nam accumsan justo ut.
                      </p>
                      <p class="font-regular-4">
                        Pulvinar urna amet proin sit sed tellus ipsum. Lorem
                        ipsum dolor sit amet consectetur. Nisl nibh phasellus
                        condimentum mi faucibus. In quisque justo senectus in
                        sed adipiscing. Arcu neque feugiat aenean nam accumsan
                        justo ut.
                      </p>
                    </div>
                  </bmb-card-content>
                </bmb-card>
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
      <storybook-accordion-tabs />
    `,
  };
};
