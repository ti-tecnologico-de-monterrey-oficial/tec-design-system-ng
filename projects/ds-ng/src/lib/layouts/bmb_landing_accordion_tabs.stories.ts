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
          role: 'Alumno',
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
              { id: 3, title: 'Additional Tab Label', isActive: false },
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
                    <h3 class="font-medium-5">Características y proceso</h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <p class="font-regular-4">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum. Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <p class="font-regular-4">
                      Nisl nibh phasellus condimentum mi faucibus. In quisque
                      justo senectus in sed adipiscing. Arcu neque feugiat
                      aenean nam accumsan justo ut. Pulvinar urna amet proin sit
                      sed tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      Nisl nibh phasellus condimentum mi faucibus. In quisque
                      justo senectus in sed adipiscing. Arcu neque feugiat
                      aenean nam accumsan justo ut.
                    </p>
                    <p class="font-regular-4">
                      Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                      dolor sit amet consectetur. Nisl nibh phasellus
                      condimentum mi faucibus. In quisque justo senectus in sed
                      adipiscing. Arcu neque feugiat aenean nam accumsan justo
                      ut.
                    </p>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-medium-5">Proceso</h3>
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
                          <span class="font-medium-4">
                            Paso 1 - Descarga y llena el formato
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
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
                          <span class="font-medium-4"
                            >Paso 2 - Crea la solicitud y adjunta la
                            documentación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
                          <button
                            class="bmb_template-accordion-cta"
                            type="button"
                            (click)="openModalTemplate($event)"
                          >
                            <span class="font-medium-4"
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
                                  <span class="font-medium-4">
                                    Paso 1 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 2 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 3 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 4 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                          <span class="font-medium-4"
                            >Paso 3 - Confirmación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
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
                          <span class="font-medium-4"
                            >Paso 4 - Notificación y cierres
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
                        </ng-template>
                      </bmb-accordion>
                    </section>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none">
                <div bmbLayoutItem>
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                </div>
              </section>
            }

            @case (3) {
              <section bmbLayout margin="none">
                <div bmbLayoutItem>
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
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
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
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
${getSpecialSpecifications(`### ${TECHNICAL_DOC_TITLE}
>
${TECHNICAL_DOC_REFERENCES}
- [${topBarStory.default.title}](/docs/${getFormatName(topBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${sideBarStory.default.title}](/docs/${getFormatName(sideBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${homeCardStory.default.title}](/docs/${getFormatName(homeCardStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${layoutStory.default.title}](/docs/${getFormatName(layoutStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${layoutItemStory.default.title}](/docs/${getFormatName(layoutItemStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardStory.default.title}](/docs/${getFormatName(cardStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${tabsStory.default.title}](/docs/${getFormatName(tabsStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${accordionStory.default.title}](/docs/${getFormatName(accordionStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardHeaderStory.default.title}](/docs/${getFormatName(cardHeaderStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${cardContentStory.default.title}](/docs/${getFormatName(cardContentStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${accordionControlStory.default.title}](/docs/${getFormatName(accordionControlStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${iconStory.default.title}](/docs/${getFormatName(iconStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${toastStory.default.title}](/docs/${getFormatName(toastStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
>
${FULLSCREEN_DESC}
`)}
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
          role: 'Alumno',
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
              { id: 3, title: 'Additional Tab Label', isActive: false },
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
                    <h3 class="font-medium-5">Características y proceso</h3>
                  </bmb-card-header>
                  <bmb-card-content>
                    <p class="font-regular-4">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum. Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <p class="font-regular-4">
                      Nisl nibh phasellus condimentum mi faucibus. In quisque
                      justo senectus in sed adipiscing. Arcu neque feugiat
                      aenean nam accumsan justo ut. Pulvinar urna amet proin sit
                      sed tellus ipsum. Lorem ipsum dolor sit amet consectetur.
                      Nisl nibh phasellus condimentum mi faucibus. In quisque
                      justo senectus in sed adipiscing. Arcu neque feugiat
                      aenean nam accumsan justo ut.
                    </p>
                    <p class="font-regular-4">
                      Pulvinar urna amet proin sit sed tellus ipsum. Lorem ipsum
                      dolor sit amet consectetur. Nisl nibh phasellus
                      condimentum mi faucibus. In quisque justo senectus in sed
                      adipiscing. Arcu neque feugiat aenean nam accumsan justo
                      ut.
                    </p>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none" bmbLayoutItem [colSm]="6" [colLg]="6">
                  <bmb-card-header padding="m">
                    <h3 class="font-medium-5">Proceso</h3>
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
                          <span class="font-medium-4">
                            Paso 1 - Descarga y llena el formato
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
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
                          <span class="font-medium-4"
                            >Paso 2 - Crea la solicitud y adjunta la
                            documentación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
                          <button
                            class="bmb_template-accordion-cta"
                            type="button"
                            (click)="openModalTemplate($event)"
                          >
                            <span class="font-medium-4"
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
                                  <span class="font-medium-4">
                                    Paso 1 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 2 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 3 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                                  <span class="font-medium-4">
                                    Paso 4 - Descarga y llena el formato
                                  </span>
                                </ng-template>
                                <ng-template #bmbAccordionContent>
                                  <p class="font-regular-4">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Ut justo ante, mattis nec
                                    libero a, malesuada pellentesque sem.
                                    Aliquam erat volutpat. Nulla ut consequat
                                    turpis, id efficitur velit. Fusce vitae
                                    dolor leo. Praesent diam justo, consectetur
                                    in blandit ut, tincidunt vitae enim. Nulla
                                    eleifend, leo at finibus volutpat, nulla
                                    metus eleifend lacus, ullamcorper dictum
                                    augue diam id erat.
                                  </p>
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
                          <span class="font-medium-4"
                            >Paso 3 - Confirmación
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
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
                          <span class="font-medium-4"
                            >Paso 4 - Notificación y cierres
                          </span>
                        </ng-template>
                        <ng-template #bmbAccordionContent>
                          <p class="font-regular-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut justo ante, mattis nec libero a, malesuada
                            pellentesque sem. Aliquam erat volutpat. Nulla ut
                            consequat turpis, id efficitur velit. Fusce vitae
                            dolor leo. Praesent diam justo, consectetur in
                            blandit ut, tincidunt vitae enim. Nulla eleifend,
                            leo at finibus volutpat, nulla metus eleifend lacus,
                            ullamcorper dictum augue diam id erat.
                          </p>
                        </ng-template>
                      </bmb-accordion>
                    </section>
                  </bmb-card-content>
                </bmb-card>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none">
                <div bmbLayoutItem>
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                </div>
              </section>
            }

            @case (3) {
              <section bmbLayout margin="none">
                <div bmbLayoutItem>
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
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
