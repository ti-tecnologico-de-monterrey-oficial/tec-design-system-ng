import {
  Component,
  input,
  output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
  IBmbTab,
  IBmbActionHeader,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbAccordionComponent,
  BmbAccordionControlDirective,
  BmbTextLinkComponent,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import { RELEVANT_TITLE_LEVEL } from '../utils/doc/utils';

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
    BmbTextLinkComponent,
  ],
  selector: 'storybook-accordion-image',
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
          icon="map"
          bgIconAppearance="teal-primary"
          title="Mi Plan de Desarrollo"
          contentPadding="xl"
          [isExpanded]="true"
          (onBack)="handleBack()"
          [actionHeaders]="actionHeaders"
        >
          <section bmbLayout margin="none">
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <div class="bmb_template-accordion-content">
                <div class="bmb_template-accordion-image">
                  <img
                    src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
                    alt="Image description"
                  />
                </div>
                <bmb-card margin="none">
                  <bmb-card-header padding="m">
                    <h3 class="font-medium-5">Descripción</h3>
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
              </div>
            </div>
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <bmb-card margin="none">
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
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
                        <bmb-text-link
                          [textLink]="
                            'Guía para establecer y dar seguimiento a mi Plan de Desarrollo'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="
                            'Guía para acompañar a tu equipo en mi Plan de Desarrollo'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="
                            'Guía para reguistrar tu plan en Success Factors'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
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
                          >Recursos de desarrollo
                        </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <bmb-text-link
                          [textLink]="'Oferta de desarrollo'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="'Oportunidades de crecimiento'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="'mi BiblioTECa'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </ng-template>
                    </bmb-accordion>
                  </section>
                </bmb-card-content>
              </bmb-card>
            </div>
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
  title: 'Particularities/mitec web/Landings/Accordion With Image',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookAccordionTabs, BmbTopBarComponent],
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
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbAccordionComponent,
    BmbAccordionControlDirective,
    BmbTextLinkComponent,
  ],
  selector: 'storybook-accordion-image',
  template: '
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
          <section bmbLayout margin="none">
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <div class="bmb_template-accordion-content">
                <div class="bmb_template-accordion-image">
                  <img
                    src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
                    alt="Image description"
                  />
                </div>
                <bmb-card margin="none">
                  <bmb-card-header padding="m">
                    <h3 class="font-medium-5">Descripción</h3>
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
              </div>
            </div>
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <bmb-card margin="none">
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
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
                        <bmb-text-link
                          [textLink]="
                            'Guía para establecer y dar seguimiento a mi Plan de Desarrollo'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="
                            'Guía para acompañar a tu equipo en mi Plan de Desarrollo'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="
                            'Guía para reguistrar tu plan en Success Factors'
                          "
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
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
                          >Recursos de desarrollo
                        </span>
                      </ng-template>
                      <ng-template #bmbAccordionContent>
                        <bmb-text-link
                          [textLink]="'Oferta de desarrollo'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="'Oportunidades de crecimiento'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
                        <bmb-text-link
                          [textLink]="'mi BiblioTECa'"
                          [textLinkStyle]="'icon'"
                          [target]="'_blank'"
                          [icon]="'arrow_forward'"
                          [iconPosition]="'right'"
                          [link]="'https://www.youtube.com'"
                          [disabled]="false"
                        ></bmb-text-link>
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut justo ante, mattis nec libero a, malesuada
                          pellentesque sem. Aliquam erat volutpat. Nulla ut
                          consequat turpis, id efficitur velit. Fusce vitae
                          dolor leo. Praesent diam justo, consectetur in blandit
                          ut, tincidunt vitae enim. Nulla eleifend, leo at
                          finibus volutpat, nulla metus eleifend lacus,
                          ullamcorper dictum augue diam id erat.
                        </p>
                      </ng-template>
                    </bmb-accordion>
                  </section>
                </bmb-card-content>
              </bmb-card>
            </div>
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
  ',
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
      <storybook-accordion-image />
    `,
  };
};
