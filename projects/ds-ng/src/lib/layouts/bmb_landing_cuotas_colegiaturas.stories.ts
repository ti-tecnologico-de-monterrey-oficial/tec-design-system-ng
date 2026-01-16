import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  BmbIconComponent,
  BmbButtonDirective,
  BmbDropdownComponent,
} from '../../public-api';

import {
  getBasicExampleBlock,
  getLandingGeneralDesc,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '../utils/doc/utils';

import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as layoutStory from '../directives/bmb-layout/bmb-layout.stories';
import * as layoutItemStory from '../directives/bmb-layout/bmb-layout.stories';
import * as cardStory from '../components/bmb-card/bmb-card.stories';
import * as cardHeaderStory from '../components/bmb-card/bmb-card.stories';
import * as cardContentStory from '../components/bmb-card/bmb-card.stories';
import * as iconStory from '../components/bmb-icon/bmb-icon.stories';
import * as buttonStory from '../directives/bmb-button/button.stories';
import * as dropdownStory from '../components/bmb-dropdown/bmb-dropdown.stories';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    BmbIconComponent,
    BmbButtonDirective,
    ReactiveFormsModule,
    BmbDropdownComponent,
  ],
  selector: 'storybook-cuotas-colegiaturas',
  template: `
    <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno'
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
              time: '4d 12h'
            }
          ],
          all: [
            { description: 'Descripcion Corta All', time: '4d 12h' },
            { description: 'Descripcion Corta all 1', time: '4d 12h' }
          ],
          seen: [
            { description: 'Descripcion Corta seen 1', time: '4d 12h' },
            { description: 'Descripcion Corta seen 2', time: '4d 12h' },
            { description: 'Descripcion Corta seen 3', time: '4d 12h' }
          ]
        }"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="receipt_long"
          bgIconAppearance="green-primary"
          title="Cuotas de colegiatura y políticas de pago"
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
            <div bmbLayoutItem [colSm]="6" [colLg]="6">
              <div style="display: flex; flex-direction: column; gap: 1rem;">
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
                      <h3 class="font-medium-5">¡Bienvenido/a!</h3>
                    </bmb-card-header>
                    <p class="font-regular-4 padding-s">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum. On quisque justo senectus in sed adipiscing. Arcu
                      neque feugiat aenean nam.
                    </p>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none">
                  <bmb-card-content>
                    <bmb-card-header padding="m">
                      <h3 class="font-medium-5">Simulador de colegiaturas</h3>
                    </bmb-card-header>
                    <div class="bmb_template-accordion-links padding-s">
                      <a
                        class="bmb_template-accordion-cta"
                        href="https://www.youtube.com"
                        target="'_blank'"
                      >
                        <span class="font-medium-4">Preparatoria</span>
                        <bmb-icon icon="arrow_forward" [size]="20" />
                      </a>
                      <a
                        class="bmb_template-accordion-cta"
                        href="https://www.youtube.com"
                        target="'_blank'"
                      >
                        <span class="font-medium-4">Profesional Tex21!</span>
                        <bmb-icon icon="arrow_forward" [size]="20" />
                      </a>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </div>
            </div>
            <div bmbLayoutItem [colSm]="6" [colLg]="6">
              <div class="bmb_template-height">
                <bmb-card margin="none" style="height: 100%;">
                  <bmb-card-content>
                    <bmb-card-header padding="m">
                      <h3 class="font-medium-5">
                        Para consultar la cuota de colegiatura selecciona:
                      </h3>
                    </bmb-card-header>
                    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [required]="true"
                        [options]="nivel"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Nivel académico'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('nivel')"
                        (onValueChange)="handleNivelChange($event)"
                      ></bmb-dropdown>
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [options]="nivel"
                        [required]="true"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Periodo'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('periodo')"
                        (onValueChange)="handlePeriodoChange($event)"
                      ></bmb-dropdown>
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [options]="nivel"
                        [required]="true"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Campus'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('campus')"
                        (onValueChange)="handleCampusChange($event)"
                      ></bmb-dropdown>
                      <div style="margin-top: 1rem;">
                        <button
                          bmbButton
                          appearance="primary"
                          type="submit"
                          size="large"
                        >
                          Mostrar colegiatura
                        </button>
                      </div>
                    </form>
                  </bmb-card-content>
                </bmb-card>
              </div>
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
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ'
          }
        ]
      ]"
      [title]="'Navegacion para mobiles'"
    ></bmb-sidebar>
  `,
})
class StorybookCuotasColegiaturasComponent {
  nivel = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

  periodo = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

  campus = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

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

  userForm: FormGroup = new FormGroup({
    nivel: new FormControl(),
    periodo: new FormControl(),
    campus: new FormControl(),
  });

  handleCampusChange(event: unknown) {
    //Add your code
  }

  handlePeriodoChange(event: unknown) {
    //Add your code
  }

  handleNivelChange(event: unknown) {
    //Add your code
  }

  onSubmit() {
    if (this.userForm.valid) {
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }
}

export default {
  title:
    'Particularities/mitec web/Landings/Container buttons card/Cuotas de colegiatura y políticas de pago',
  component: BmbTopBarComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StorybookCuotasColegiaturasComponent, BmbTopBarComponent],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getLandingGeneralDesc('Cuotas de colegiatura y políticas de pago')}
${getSpecialSpecifications(
  getTechnicalDocReferences({
    references: [
      { title: topBarStory.default.title! },
      { title: sideBarStory.default.title! },
      { title: homeCardStory.default.title! },
      { title: layoutStory.default.title! },
      { title: layoutItemStory.default.title! },
      { title: cardStory.default.title! },
      { title: cardHeaderStory.default.title! },
      { title: cardContentStory.default.title! },
      { title: iconStory.default.title! },
      { title: buttonStory.default.title! },
      { title: dropdownStory.default.title! },
    ],
    isFullScreenDesc: true,
  }),
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
    BmbIconComponent,
    BmbButtonDirective,
    ReactiveFormsModule,
    BmbDropdownComponent,`,
  '',
  `nivel = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

  periodo = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

  campus = [
    {
      name: 'Preparatoria',
      value: '_preparatoria',
      id: 'preparatoria_',
    },
    {
      name: 'Profesional planes anteriores a 2019',
      value: '_profesional',
      id: 'profesional_',
    },
    {
      name: 'Profesional Tec21',
      value: '_tec21',
      icon: 'bolt',
      id: 'tec21_',
    },
  ];

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

  userForm: FormGroup = new FormGroup({
    nivel: new FormControl(),
    periodo: new FormControl(),
    campus: new FormControl(),
  });

  handleCampusChange(event: unknown) {
    //Add your code
  }

  handlePeriodoChange(event: unknown) {
    //Add your code
  }

  handleNivelChange(event: unknown) {
    //Add your code
  }

  onSubmit() {
    if (this.userForm.valid) {
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
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
              time: '4d 12h'
            }
          ],
          all: [
            { description: 'Descripcion Corta All', time: '4d 12h' },
            { description: 'Descripcion Corta all 1', time: '4d 12h' }
          ],
          seen: [
            { description: 'Descripcion Corta seen 1', time: '4d 12h' },
            { description: 'Descripcion Corta seen 2', time: '4d 12h' },
            { description: 'Descripcion Corta seen 3', time: '4d 12h' }
          ]
        }"
      />
      <main class="bmb_template-single-home-card-main bmb_template-accordion">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="receipt_long"
          bgIconAppearance="green-primary"
          title="Cuotas de colegiatura y políticas de pago"
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
            <div bmbLayoutItem [colSm]="6" [colLg]="6">
              <div style="display: flex; flex-direction: column; gap: 1rem;">
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
                      <h3 class="font-medium-5">¡Bienvenido/a!</h3>
                    </bmb-card-header>
                    <p class="font-regular-4 padding-s">
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum. On quisque justo senectus in sed adipiscing. Arcu
                      neque feugiat aenean nam.
                    </p>
                  </bmb-card-content>
                </bmb-card>
                <bmb-card margin="none">
                  <bmb-card-content>
                    <bmb-card-header padding="m">
                      <h3 class="font-medium-5">Simulador de colegiaturas</h3>
                    </bmb-card-header>
                    <div class="bmb_template-accordion-links padding-s">
                      <a
                        class="bmb_template-accordion-cta"
                        href="https://www.youtube.com"
                        target="'_blank'"
                      >
                        <span class="font-medium-4">Preparatoria</span>
                        <bmb-icon icon="arrow_forward" [size]="20" />
                      </a>
                      <a
                        class="bmb_template-accordion-cta"
                        href="https://www.youtube.com"
                        target="'_blank'"
                      >
                        <span class="font-medium-4">Profesional Tex21!</span>
                        <bmb-icon icon="arrow_forward" [size]="20" />
                      </a>
                    </div>
                  </bmb-card-content>
                </bmb-card>
              </div>
            </div>
            <div bmbLayoutItem [colSm]="6" [colLg]="6">
              <div class="bmb_template-height">
                <bmb-card margin="none" style="height: 100%;">
                  <bmb-card-content>
                    <bmb-card-header padding="m">
                      <h3 class="font-medium-5">
                        Para consultar la cuota de colegiatura selecciona:
                      </h3>
                    </bmb-card-header>
                    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [required]="true"
                        [options]="nivel"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Nivel académico'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('nivel')"
                        (onValueChange)="handleNivelChange($event)"
                      ></bmb-dropdown>
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [options]="nivel"
                        [required]="true"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Periodo'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('periodo')"
                        (onValueChange)="handlePeriodoChange($event)"
                      ></bmb-dropdown>
                      <bmb-dropdown
                        [placeholder]="'Selecciona'"
                        [options]="nivel"
                        [required]="true"
                        [errorMessage]="'Error input dropdown'"
                        [label]="'Campus'"
                        [name]="'dropdown'"
                        [value]="''"
                        [inputId]="'this-value-should-be-unique'"
                        [control]="getFormControl('campus')"
                        (onValueChange)="handleCampusChange($event)"
                      ></bmb-dropdown>
                      <div style="margin-top: 1rem;">
                        <button
                          bmbButton
                          appearance="primary"
                          type="submit"
                          size="large"
                        >
                          Mostrar colegiatura
                        </button>
                      </div>
                    </form>
                  </bmb-card-content>
                </bmb-card>
              </div>
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
      <storybook-cuotas-colegiaturas />
    `,
  };
};
