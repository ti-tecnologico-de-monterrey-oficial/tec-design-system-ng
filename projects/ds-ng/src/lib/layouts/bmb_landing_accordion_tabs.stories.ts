import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
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
  ModalDataConfig,
  BmbModalComponent,
  BmbIconComponent,
  BmbToastComponent,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import { RELEVANT_TITLE_LEVEL } from '../utils/doc/utils';
import { MatDialog } from '@angular/material/dialog';
import { BmbCheckExternalLinkButtonComponent } from '../components/bmb-check-external-link-button/bmb-check-external-link-button.component';

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
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
    BmbToastComponent,
  ],
  selector: 'storybook-home-mitec-mobile',
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
              <section bmbLayout margin="none">
                <div bmbLayoutItem [colSm]="4" [colLg]="6">
                  <bmb-card margin="none">
                    <bmb-card-header padding="m">
                      <h3 class="font-medium-5">Características y proceso</h3>
                    </bmb-card-header>
                    <bmb-card-content>
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
                    </bmb-card-content>
                  </bmb-card>
                </div>
                <div bmbLayoutItem [colSm]="4" [colLg]="6">
                  <bmb-card margin="none">
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
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
                            </p>
                            <bmb-check-external-link-button
                              (buttonClick)="openModalTemplate($event)"
                            >
                              <span>Bajas de unidades de formación</span>
                              <bmb-icon icon="arrow_forward" [size]="20" />
                            </bmb-check-external-link-button>
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
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
                                      volutpat, nulla metus eleifend lacus,
                                      ullamcorper dictum augue diam id erat.
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
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
                                      volutpat, nulla metus eleifend lacus,
                                      ullamcorper dictum augue diam id erat.
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
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
                                      volutpat, nulla metus eleifend lacus,
                                      ullamcorper dictum augue diam id erat.
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
                                      dolor leo. Praesent diam justo,
                                      consectetur in blandit ut, tincidunt vitae
                                      enim. Nulla eleifend, leo at finibus
                                      volutpat, nulla metus eleifend lacus,
                                      ullamcorper dictum augue diam id erat.
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
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
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
                              elit. Ut justo ante, mattis nec libero a,
                              malesuada pellentesque sem. Aliquam erat volutpat.
                              Nulla ut consequat turpis, id efficitur velit.
                              Fusce vitae dolor leo. Praesent diam justo,
                              consectetur in blandit ut, tincidunt vitae enim.
                              Nulla eleifend, leo at finibus volutpat, nulla
                              metus eleifend lacus, ullamcorper dictum augue
                              diam id erat.
                            </p>
                          </ng-template>
                        </bmb-accordion>
                      </section>
                    </bmb-card-content>
                  </bmb-card>
                </div>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none">
                <div bmbLayoutItem [colSm]="4">
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
                <div bmbLayoutItem [colSm]="4">
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
class StorybookHomeMitecMobile {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private matDialog: MatDialog) {}

  openModalTemplate() {
    const data: ModalDataConfig = {
      title: 'Bajas de unidades de formación',
      size: 'small',
      primaryBtnLabel: 'Aceptar',
      hideSecondaryButton: true,
      content: this.modalTemplate,
      scrollable: true,
    };

    this.matDialog.open(BmbModalComponent, { data });
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
  title: 'Particularities/mitec web/Landings/Accordion Tabs',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookHomeMitecMobile, BmbTopBarComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `${RELEVANT_TITLE_LEVEL[2]}When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.

Below is an example of how you can use the components needed for this organization ingit status
 TypeScript:

\`\`\`typescript
@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTabsComponent,
  ],
  selector: 'storybook-home-mitec-mobile',
  template: '
    <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno',
        }"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [lang]="'es'"
        [assignmentNotification]="['1', '2', '3']"
        [alertNotification]="{
          new: [
            { description: 'Descripcion Corta ', time: '4d 12h' },
            {
              description: 'Descripcion Corta Larga asdasd adasdaw',
              time: '4d 12h',
            },
          ],
          all: [
            { description: 'Descripcion Corta All', time: '4d 12h' },
            { description: 'Descripcion Corta all 1', time: '4d 12h' },
          ],
          seen: [
            { description: 'Descripcion Corta seen 1', time: '4d 12h' },
            { description: 'Descripcion Corta seen 2', time: '4d 12h' },
            { description: 'Descripcion Corta seen 3', time: '4d 12h' },
          ],
        }"
      />
      <main class="bmb_template-single-home-card-main">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="school"
          bgIconAppearance="blue-primary"
          title="Nombre del servicio"
          contentPadding="xl"
        >
          <bmb-image
            src="https://picsum.photos/id/15/1000"
            alt="Alt text"
            ratio="26/9"
            borderRadius="none"
            [enableZoom]="true"
          />
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              { id: 1, title: 'Opción 1', isActive: true },
              { id: 2, title: 'Opción 2', isActive: false },
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          @switch(selectedTab) {
            @case(1) {
              <section bmbLayout margin="none" class="bmb_padding-m">
                <div bmbLayoutItem [colSm]="1">
                  <bmb-image
                    src="https://picsum.photos/id/16/400"
                    alt="Alt text"
                    ratio="1/1"
                    borderRadius="none"
                    [enableZoom]="true"
                  />
                </div>
                <div bmbLayoutItem [colSm]="3">
                  <h1 class="font-medium-8">Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum </h1>
                  <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
                  <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
                </div>
              </section>
            }
            @case(2) {
              <section bmbLayout margin="none" class="bmb_padding-m">
                <div bmbLayoutItem [colSm]="4">
                  <h1 class="font-medium-8">Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum </h1>
                  <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
                  <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
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
  ',
})
class StorybookHomeMitecMobile {
  selectedTab = 1;

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
  }
}
\`\`\`

Below is an example of how you can use the components needed for this organization in HTML:
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
      <storybook-home-mitec-mobile />
    `,
  };
};
