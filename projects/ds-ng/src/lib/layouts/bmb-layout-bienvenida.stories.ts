import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbButtonDirective,
  BmbButtonIconComponent,
  BmbCheckboxComponent,
  BmbContainerComponent,
  BmbDotPaginatorComponent,
  BmbIconComponent,
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import { attributes } from '../utils/doc/utils';

export interface OnboardingStep {
  description: string;
  icon?: string;
  iconSize?: string;
  imageDesktop: string;
  imageMobile: string;
  primaryButton: string;
  secondaryButton?: string;
  shortDescription: string;
  showCheckbox?: boolean;
  subtitle?: string;
  title: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbContainerComponent,
    BmbCheckboxComponent,
    BmbDotPaginatorComponent,
    BmbIconComponent,
    BmbButtonIconComponent,
  ],
  selector: 'storybook-layout-bienvenida',
  template: `
    <ng-template #contentTemplate>
      <div class="bmb-bienvenida">
        <bmb-container [appearance]="'secondary-container'">
          <section class="bmb-bienvenida_mobile">
            <ng-container *ngFor="let step of steps; let i = index">
              <article
                class="bmb-bienvenida_step"
                [class.bmb-bienvenida_step-active]="i === currentIndex"
                [class.bmb-bienvenida_prev]="i < currentIndex"
                [class.bmb-bienvenida_next]="i > currentIndex"
              >
                <div class="bmb-bienvenida_content">
                  <div class="bmb-bienvenida_header">
                    <h2 class="font-bold-9">{{ step.title }}</h2>
                    <bmb-button-icon
                      [idElement]="''"
                      [icon]="'close'"
                      [showContainer]="false"
                      [disabled]="false"
                      [active]="false"
                      (onButtonClick)="closeOnboarding($event)"
                    ></bmb-button-icon>
                  </div>
                  <p class="font-regular-4" *ngIf="step.subtitle">
                    {{ step.subtitle }}
                  </p>
                  <img
                    [src]="step.imageMobile"
                    alt=""
                    class="bmb-bienvenida_image"
                  />
                  <p class="font-regular-5">{{ step.shortDescription }}</p>
                  <div *ngIf="step.showCheckbox">
                    <bmb-checkbox
                      [name]="'noShow'"
                      [label]="'No mostrar este tutorial nuevamente'"
                      (change)="change($event)"
                    ></bmb-checkbox>
                  </div>
                </div>
                <div class="bmb-bienvenida_actions">
                  <button
                    *ngIf="step.secondaryButton"
                    bmbButton
                    (click)="back()"
                    appearance="secondary-outlined"
                    [isMobile]="true"
                    size="large"
                  >
                    {{ step.secondaryButton }}
                  </button>

                  <button
                    (click)="next()"
                    bmbButton
                    size="small"
                    [isMobile]="true"
                    size="large"
                  >
                    {{ step.primaryButton }}
                  </button>
                </div>
              </article>
            </ng-container>
          </section>
          <section class="bmb-bienvenida_desktop">
            <div class="bmb-bienvenida_desktop-wrapper">
              <bmb-button-icon
                [idElement]="''"
                [icon]="'close'"
                [showContainer]="false"
                [disabled]="false"
                [active]="false"
                class="bmb-bienvenida_desktop-close"
                (onButtonClick)="closeOnboarding($event)"
              ></bmb-button-icon>
              <div class="bmb-bienvenida_desktop-container">
                <div class="bmb-bienvenida_desktop-content">
                  <div class="bmb-bienvenida_desktop-header">
                    <h2 class="font-bold-11">
                      {{ steps[currentIndex].title }}
                    </h2>
                    <bmb-icon
                      [icon]="steps[currentIndex].icon"
                      [size]="steps[currentIndex].iconSize"
                    ></bmb-icon>
                  </div>
                  <p class="font-bold-9" *ngIf="steps[currentIndex].subtitle">
                    {{ steps[currentIndex].subtitle }}
                  </p>
                  <p
                    class="font-regular-4 bmb-bienvenida_desktop-description"
                    [innerHTML]="steps[currentIndex].description"
                  ></p>
                  <div *ngIf="steps[currentIndex].showCheckbox">
                    <bmb-checkbox
                      name="desktopNoShow"
                      label="No mostrar este tutorial nuevamente"
                      (change)="change($event)"
                    ></bmb-checkbox>
                  </div>
                  <div class="bmb-bienvenida_actions">
                    <button
                      *ngIf="steps[currentIndex].secondaryButton"
                      bmbButton
                      appearance="secondary-outlined"
                      (click)="back()"
                    >
                      {{ steps[currentIndex].secondaryButton }}
                    </button>

                    <button bmbButton (click)="next()">
                      {{ steps[currentIndex].primaryButton }}
                    </button>
                  </div>
                </div>
                <img
                  [src]="steps[currentIndex]?.imageDesktop"
                  alt=""
                  class="bmb-bienvenida_image"
                />
              </div>
              <bmb-dot-paginator
                [activeDotIndex]="currentIndex"
                [totalDots]="steps.length"
                (onDotPress)="handleDotPress($event)"
              />
            </div>
          </section>
        </bmb-container>
      </div>
    </ng-template>
  `,
})
class StorybookLayoutBienvenida implements AfterViewInit, OnChanges {
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @Input() steps: OnboardingStep[] = [];
  @Input() startIndex = 0;
  currentIndex = 0;

  constructor(private contentProjected: BmbProjectionContentService) {}

  ngAfterViewInit() {
    const hide = localStorage.getItem('hideOnboarding');

    if (hide === 'true') {
      return;
    }

    this.openContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startIndex']) {
      this.currentIndex = this.startIndex;
    }
  }

  openContent() {
    const data: IBmbProjectionContent = {
      content: this.contentTemplate,
    };

    this.contentProjected.openContent(data);
  }

  next() {
    const lastIndex = this.steps.length - 1;

    if (this.currentIndex === lastIndex) {
      this.closeOnboarding();
      return;
    }

    this.currentIndex++;
  }

  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  closeOnboarding() {
    this.contentProjected.closeContent?.();
  }

  change(event: any) {
    const checked = event?.target?.checked;
    if (checked) {
      localStorage.setItem('hideOnboarding', 'true');
    } else {
      localStorage.removeItem('hideOnboarding');
    }
  }

  handleDotPress(index: number): void {
    this.currentIndex = index;
  }
}

export default {
  title: 'Organisms/Layout bienvenida',
  decorators: [
    moduleMetadata({
      imports: [StorybookLayoutBienvenida],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use the components needed
 TypeScript:

\`\`\`typescript
export interface OnboardingStep {
  description: string;
  icon?: string;
  iconSize?: string;
  imageDesktop: string;
  imageMobile: string;
  primaryButton: string;
  secondaryButton?: string;
  shortDescription: string;
  showCheckbox?: boolean;
  subtitle?: string;
  title: string;
}

import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbContainerComponent,
    BmbCheckboxComponent,
    BmbDotPaginatorComponent,
    BmbIconComponent,
  ],
  template: '',
  styleUrl: './component.scss',
})
class StorybookLayoutBienvenida implements AfterViewInit, OnChanges {
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @Input() steps: OnboardingStep[] = [];
  @Input() startIndex = 0;
  currentIndex = 0;

  constructor(private contentProjected: BmbProjectionContentService) {}

  ngAfterViewInit() {
    const hide = localStorage.getItem('hideOnboarding');

    if (hide === 'true') {
      return;
    }

    this.openContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startIndex']) {
      this.currentIndex = this.startIndex;
    }
  }

  openContent() {
    const data: IBmbProjectionContent = {
      content: this.contentTemplate,
    };

    this.contentProjected.openContent(data);
  }

  next() {
    const lastIndex = this.steps.length - 1;

    if (this.currentIndex === lastIndex) {
      this.closeOnboarding();
      return;
    }

    this.currentIndex++;
  }

  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  closeOnboarding() {
    this.contentProjected.closeContent?.();
  }

  change(event: any) {
    const checked = event?.target?.checked;
    if (checked) {
      localStorage.setItem('hideOnboarding', 'true');
    } else {
      localStorage.removeItem('hideOnboarding');
    }
  }

  handleDotPress(index: number): void {
    this.currentIndex = index;
  }
}
\`\`\`

Below is an example of how you can use the components needed for this organization in HTML:
<ng-template #contentTemplate>
      <div class="bmb-bienvenida">
        <bmb-container [appearance]="'secondary-container'">
          <section class="bmb-bienvenida_mobile">
            <ng-container *ngFor="let step of steps; let i = index">
              <article
                class="bmb-bienvenida_step"
                [class.bmb-bienvenida_step-active]="i === currentIndex"
                [class.bmb-bienvenida_prev]="i < currentIndex"
                [class.bmb-bienvenida_next]="i > currentIndex"
              >
                <h2 class="font-bold-9">{{ step.title }}</h2>
                <p class="font-regular-4" *ngIf="step.subtitle">
                  {{ step.subtitle }}
                </p>
                <img
                  [src]="step.imageMobile"
                  alt=""
                  class="bmb-bienvenida_image"
                />
                <p class="font-regular-5">{{ step.shortDescription }}</p>
                <div *ngIf="step.showCheckbox">
                  <bmb-checkbox
                    [name]="'noShow'"
                    [label]="'No mostrar este tutorial nuevamente'"
                    (change)="change($event)"
                  ></bmb-checkbox>
                </div>
                <div class="bmb-bienvenida_actions">
                  <button
                    *ngIf="step.secondaryButton"
                    bmbButton
                    (click)="back()"
                    appearance="secondary-outlined"
                    [isMobile]="true"
                    size="large"
                  >
                    {{ step.secondaryButton }}
                  </button>

                  <button
                    (click)="next()"
                    bmbButton
                    size="small"
                    [isMobile]="true"
                    size="large"
                  >
                    {{ step.primaryButton }}
                  </button>
                </div>
              </article>
            </ng-container>
          </section>
          <section class="bmb-bienvenida_desktop">
            <div class="bmb-bienvenida_desktop-wrapper">
              <div class="bmb-bienvenida_desktop-container">
                <div class="bmb-bienvenida_desktop-content">
                  <div class="bmb-bienvenida_desktop-header">
                    <h2 class="font-bold-11">
                      {{ steps[currentIndex].title }}
                    </h2>
                    <bmb-icon
                      [icon]="steps[currentIndex].icon"
                      [size]="steps[currentIndex].iconSize"
                    ></bmb-icon>
                  </div>
                  <p class="font-bold-9" *ngIf="steps[currentIndex].subtitle">
                    {{ steps[currentIndex].subtitle }}
                  </p>
                  <p
                    class="font-regular-4 bmb-bienvenida_desktop-description"
                    [innerHTML]="steps[currentIndex].description"
                  ></p>
                  <div *ngIf="steps[currentIndex].showCheckbox">
                    <bmb-checkbox
                      name="desktopNoShow"
                      label="No mostrar este tutorial nuevamente"
                      (change)="change($event)"
                    ></bmb-checkbox>
                  </div>
                  <div class="bmb-bienvenida_actions">
                    <button
                      *ngIf="steps[currentIndex].secondaryButton"
                      bmbButton
                      appearance="secondary-outlined"
                      (click)="back()"
                    >
                      {{ steps[currentIndex].secondaryButton }}
                    </button>

                    <button bmbButton (click)="next()">
                      {{ steps[currentIndex].primaryButton }}
                    </button>
                  </div>
                </div>
                <img
                  [src]="steps[currentIndex]?.imageDesktop"
                  alt=""
                  class="bmb-bienvenida_image"
                />
              </div>
              <bmb-dot-paginator
                [activeDotIndex]="currentIndex"
                [totalDots]="steps.length"
                (onDotPress)="handleDotPress($event)"
              />
            </div>
          </section>
        </bmb-container>
      </div>
    </ng-template>
        `,
      },
    },
  },
  argTypes: {
    steps: {
      control: 'object',
      description: 'Lista de pasos del tutorial',
    },
    startIndex: {
      control: { type: 'number', min: 0 },
      description: 'Paso inicial del onboarding',
    },
  },
  args: {
    startIndex: 0,
    steps: [
      {
        description:
          'Con la plataforma de mitec podrás descubrir una nueva forma de vivir tu experiencia dentro del Tecnológico de Monterrey. <br/> Diseñada de manera modular para mostrar diferentes niveles de contenido de manera sencilla, esta aplicación te brinda acceso automático a todos los servicios esenciales e información importante en tu estancia.',
        icon: 'waving_hand',
        iconSize: '32',
        imageDesktop: '../assets/images/bienvenida/step_1_desktop.png',
        imageMobile: '../assets/images/bienvenida/step_1.png',
        primaryButton: 'Empezar el tour',
        shortDescription: 'Este es tu tour introductorio a la app.',
        showCheckbox: true,
        subtitle: 'Bienvenida a MiTec',
        title: 'Hola, Paloma',
      },
      {
        description:
          'TECBot es el asistente virtual diseñado para todos los usuarios, que resuelve toda clase de dudas dentro de mitec sobre consulta de datos, servicios, información importante, horarios, realización de trámites, entre otros, para que tu experiencia sea más ágil y directa. ',
        imageDesktop: '../assets/images/bienvenida/step_2_desktop.gif',
        imageMobile: '../assets/images/bienvenida/step_2.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Diseñada de manera modular para mostrar información. Diseñada de manera modular para mostrar información.',
        title: 'Navegación intuitiva',
      },
      {
        description:
          'Para lograr una mejor experiencia, la navegación es en modo horizontal; para navegar selecciona las tarjetas semiocultas del lado derecho y arrastra hacia la izquierda para revelar el resto de secciones. <br/>Al final de la navegación en Home, verás un botón denominado “Regresar al inicio”, que permite regresar a la parte inicial del recorrido del Home.',
        imageDesktop: '../assets/images/bienvenida/step_3_desktop.gif',
        imageMobile: '../assets/images/bienvenida/step_3.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Al dar click en una sección, se expande en su totalidad.',
        title: 'Descubriendo secciones',
      },
      {
        description:
          'En la parte superior, al dar click en el icono “Notificaciones” nos llevará al Notification Center, un espacio donde podrás ver todas tus notificaciones en un solo lugar, de manera ordenada y fácil de revisar. <br /> ¡Es el momento! ¡Ahora ya estás preparado para empezar a descubrir todo lo que tenemos para ti en mitec! ',
        imageDesktop: '../assets/images/bienvenida/step_4_desktop.gif',
        imageMobile: '../assets/images/bienvenida/step_4.gif',
        primaryButton: 'Empezar',
        secondaryButton: 'Regresar',
        shortDescription:
          'El ícono de “Notificaciones” te lleva al Notification Center.',
        title: 'Acceso a tus notificaciones',
      },
    ],
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-layout-bienvenida ${attributes(args)}/>
    `,
  };
};
