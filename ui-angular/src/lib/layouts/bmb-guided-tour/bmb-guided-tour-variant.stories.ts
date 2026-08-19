/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any*/
import {
  Component,
  input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import {
  BmbHomeCardComponent,
  BmbIconComponent,
  BmbCheckboxComponent,
  BmbImageComponent,
  BmbCarouselComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbProjectionContentService,
} from '../../../index';
import {
  attributes,
  BlockquoteType,
  DESIGN_SYSTEM_TITLE,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import * as homeCard from '../../components/old/bmb-home-card/bmp-home-card.stories';
import * as icon from '../../components/old/bmb-icon/bmb-icon.stories';
import * as checkbox from '../../components/old/bmb-checkbox/bmb-checkbox.stories';
import * as image from '../../components/old/bmb-image/bmb-image.stories';
import * as carousel from '../../components/bmb-carousel/bmb-carousel.stories';
import * as button from '../../directives/old/bmb-button/button.stories';
import * as layout from '../../directives/old/bmb-layout/bmb-layout.stories';
import * as verticalLayout from '../../directives/old/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';

interface OnboardingStep {
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

const htmlTemplate = `
<bmb-home-card
      class="bmb_template-guided-tour-container"
      leftIcon="chevron_left"
      icon="emoji_objects"
      bgIconAppearance="info-primary"
      title="TEC-IDEA"
      subtitle="Bienvenida"
    >
      <bmb-carousel [(selectedIndex)]="currentIndex">
        @for (step of steps(); track $index) {
          <section
            [id]="'carousel_'.concat($index)"
            #carouselItem
            bmbLayout
            margin="none"
            alignItems="stretch"
          >
            <section
              class="bmb_card-scroll"
              bmbLayoutItem
              [colSm]="4"
              [colLg]="6"
              bmbVerticalLayout
              gapSize="l"
            >
              <section
                style="display: flex;  gap: var(--bmb-spacing-l); align-items: center;"
                bmbVerticalLayoutItem
              >
                <h1>{{ step.title }}</h1>
                @if (step.icon) {
                  <bmb-icon [icon]="step.icon" [size]="step.iconSize || 32" />
                }
              </section>
              @if (step.subtitle) {
                <h2 bmbVerticalLayoutItem>
                  {{ step.subtitle }}
                </h2>
              }

              <p bmbVerticalLayoutItem [rowGrow]="1">
                {{ step.description }}
              </p>
              @if (step.showCheckbox) {
                <bmb-checkbox
                  name="desktopNoShow"
                  label="No mostrar este tutorial nuevamente"
                  (change)="change($event)"
                  bmbVerticalLayoutItem
                />
              }
            </section>

            <bmb-image
              [src]="step?.imageDesktop"
              [mobileSrc]="step?.imageMobile"
              [alt]="'guide_tour_'.concat(currentIndex)"
              borderRadius="m"
              loading="eager"
              bmbLayoutItem
              [colSm]="4"
              [colLg]="6"
            />
          </section>
        }
      </bmb-carousel>
      <section
        class="bmb_sticky"
        bmbLayout
        margin="none"
        gapSize="none"
        justify="end"
      >
        <section
          bmbLayoutItem
          [colSm]="4"
          [colLg]="6"
          bmbLayout
          margin="none"
          justify="end"
        >
          @if (steps()[currentIndex].secondaryButton) {
            <button
              bmbButton
              appearance="secondary-outlined"
              (click)="back()"
              bmbLayoutItem
              [colSm]="4"
              [colLg]="6"
            >
              {{ steps()[currentIndex].secondaryButton }}
            </button>
          }

          <button
            bmbButton
            (click)="next()"
            bmbLayoutItem
            [colSm]="4"
            [colLg]="6"
          >
            {{ steps()[currentIndex].primaryButton }}
          </button>
        </section>
      </section>
    </bmb-home-card>
`;

@Component({
  standalone: true,
  imports: [
    BmbHomeCardComponent,
    BmbIconComponent,
    BmbCheckboxComponent,
    BmbImageComponent,
    BmbCarouselComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  selector: 'storybook-guided-tour',
  template: htmlTemplate,
})
class StorybookGuidedTourHC implements OnChanges {
  steps = input<OnboardingStep[]>([]);
  startIndex = input<number>(0);
  currentIndex = 0;

  private readonly contentProjected = inject(BmbProjectionContentService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startIndex']) {
      this.currentIndex = this.startIndex();
    }
  }

  next() {
    const lastIndex = this.steps().length - 1;

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
  title: 'Templates/Guided tour/Home card',
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StorybookGuidedTourHC],
      providers: [],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 100dvh;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
        ${getGeneralDescription(`**Guided tour - Home card** is a template that helps implement a guided tour with the elements stipulated in the related documentation in ${DESIGN_SYSTEM_TITLE}.`, { generalDocLink: 'https://bamboo.tec.mx/latest/templates/guided-tour/descripcion-general-mMTQU3SK' })}
        ${getSpecialSpecifications(
          `${getAlertBlockquote(
            `This is just an example; you need to add the actual application data.`,
            {
              title: RELEVANT_TITLE.example,
              blockquoteType: BlockquoteType.important,
              isHeader: false,
              isRelevantTitle: true,
            },
          )}

>
${getTechnicalDocReferences({
  references: [
    { title: homeCard.default.title! },
    { title: icon.default.title! },
    { title: checkbox.default.title! },
    { title: image.default.title! },
    { title: carousel.default.title! },
    { title: button.default.title! },
    { title: layout.default.title! },
    { title: verticalLayout.default.title! },
  ],
})}`,
          { showAdditionalBlockquote: true },
        )}
        ${getBasicExampleBlock(
          `
BmbHomeCardComponent,
BmbIconComponent,
BmbCheckboxComponent,
BmbImageComponent,
BmbCarouselComponent,
BmbButtonDirective,
BmbLayoutDirective,
BmbLayoutItemDirective,
BmbVerticalLayoutDirective,
BmbVerticalLayoutItemDirective`,
          `import { OnChanges, SimpleChanges } from '@angular/core';`,
          `/* OnboardingStep {
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
} */
steps: OnboardingStep[] = [
      {
        description:
          'Con la plataforma de mitec podrás descubrir una nueva forma de vivir tu experiencia dentro del Tecnológico de Monterrey. Diseñada de manera modular para mostrar diferentes niveles de contenido de manera sencilla, esta aplicación te brinda acceso automático a todos los servicios esenciales e información importante en tu estancia.',
        icon: '',
        iconSize: '',
        imageDesktop: '../../../assets/doc/guided-tour/step_1_desktop.png',
        imageMobile: '../../../assets/doc/guided-tour/step_1.png',
        primaryButton: 'Empezar el tour',
        shortDescription: 'Este es tu tour introductorio a la app.',
        showCheckbox: true,
        subtitle: '',
        title: 'Te damos la bienvenida a TEC - IDEA',
      },
      {
        description:
          'TECBot es el asistente virtual diseñado para todos los usuarios, que resuelve toda clase de dudas dentro de mitec sobre consulta de datos, servicios, información importante, horarios, realización de trámites, entre otros, para que tu experiencia sea más ágil y directa. ',
        imageDesktop: '../../../assets/images/bienvenida/step_2_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_2.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Diseñada de manera modular para mostrar información. Diseñada de manera modular para mostrar información.',
        title: 'Navegación intuitiva',
      },
      {
        description:
          'Para lograr una mejor experiencia, la navegación es en modo horizontal; para navegar selecciona las tarjetas semiocultas del lado derecho y arrastra hacia la izquierda para revelar el resto de secciones. <br/>Al final de la navegación en Home, verás un botón denominado “Regresar al inicio”, que permite regresar a la parte inicial del recorrido del Home.',
        imageDesktop: '../../../assets/images/bienvenida/step_3_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_3.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Al dar click en una sección, se expande en su totalidad.',
        title: 'Descubriendo secciones',
      },
      {
        description:
          'En la parte superior, al dar click en el icono “Notificaciones” nos llevará al Notification Center, un espacio donde podrás ver todas tus notificaciones en un solo lugar, de manera ordenada y fácil de revisar. <br /> ¡Es el momento! ¡Ahora ya estás preparado para empezar a descubrir todo lo que tenemos para ti en mitec! ',
        imageDesktop: '../../../assets/images/bienvenida/step_4_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_4.gif',
        primaryButton: 'Empezar',
        secondaryButton: 'Regresar',
        shortDescription:
          'El ícono de “Notificaciones” te lleva al Notification Center.',
        title: 'Acceso a tus notificaciones',
      },
    ];
  currentIndex: number = 0;

  private readonly contentProjected = inject(BmbProjectionContentService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startIndex']) {
      this.currentIndex = this.startIndex();
    }
  }

  next() {
    const lastIndex = this.steps().length - 1;

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
  }`,
        )}
\`\`\`html
${htmlTemplate}
\`\`\`
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
        description: `Con la plataforma de mitec podrás descubrir una nueva forma de vivir tu experiencia dentro del Tecnológico de Monterrey. Diseñada de manera modular para mostrar diferentes niveles de contenido de manera sencilla, esta aplicación te brinda acceso automático a todos los servicios esenciales e información importante en tu estancia.
          Más allá del ámbito académico, la herramienta se convierte en tu centro de interacción con la vida universitaria. A través de sus tarjetas dinámicas, podrás explorar la agenda cultural y deportiva del campus, conectarte con grupos estudiantiles, descubrir convocatorias de voluntariado y mantenerte al día con los avisos más relevantes de la comunidad del Tec.
          La flexibilidad de su arquitectura modular permite adaptarse a cada etapa de tu vida dentro de la institución, ya seas alumno, docente o colaborador. Cada usuario dispone de un tablero inteligente que sugiere recursos relevantes según sus actividades diarias, integrando de manera fluida servicios como la biblioteca digital, los sistemas de pago y el acceso a plataformas educativas complementarias.
          De esta manera, mitec redefine la conectividad institucional al transformar la interacción cotidiana en un ecosistema digital eficiente y accesible desde cualquier dispositivo. La plataforma reafirma el compromiso del Tecnológico de Monterrey con la innovación tecnológica, acompañándote a lo largo de toda tu vivencia universitaria con seguridad y agilidad.`,
        icon: '',
        iconSize: '',
        imageDesktop:
          'https://editorialtelevisa.brightspotcdn.com/dims4/default/db8f1be/2147483647/strip/true/crop/1194x672+3+0/resize/1000x563!/quality/90/?url=https:%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2F35%2F6e%2Fb9c82c1e4b49a2500146c4721d7c%2Fsnacks-muy-divertidos-para-tu-perrito.jpg',
        imageMobile:
          'https://editorialtelevisa.brightspotcdn.com/dims4/default/db8f1be/2147483647/strip/true/crop/1194x672+3+0/resize/1000x563!/quality/90/?url=https:%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2F35%2F6e%2Fb9c82c1e4b49a2500146c4721d7c%2Fsnacks-muy-divertidos-para-tu-perrito.jpg',
        primaryButton: 'Empezar el tour',
        shortDescription: 'Este es tu tour introductorio a la app.',
        showCheckbox: true,
        subtitle: '',
        title: 'Te damos la bienvenida a TEC - IDEA ',
      },
      {
        description:
          'TECBot es el asistente virtual diseñado para todos los usuarios, que resuelve toda clase de dudas dentro de mitec sobre consulta de datos, servicios, información importante, horarios, realización de trámites, entre otros, para que tu experiencia sea más ágil y directa. ',
        imageDesktop: '../../../assets/images/bienvenida/step_2_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_2.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Diseñada de manera modular para mostrar información. Diseñada de manera modular para mostrar información.',
        title: 'Navegación intuitiva',
      },
      {
        description:
          'Para lograr una mejor experiencia, la navegación es en modo horizontal; para navegar selecciona las tarjetas semiocultas del lado derecho y arrastra hacia la izquierda para revelar el resto de secciones. <br/>Al final de la navegación en Home, verás un botón denominado “Regresar al inicio”, que permite regresar a la parte inicial del recorrido del Home.',
        imageDesktop: '../../../assets/images/bienvenida/step_3_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_3.gif',
        primaryButton: 'Siguiente',
        secondaryButton: 'Regresar',
        shortDescription:
          'Al dar click en una sección, se expande en su totalidad.',
        title: 'Descubriendo secciones',
      },
      {
        description:
          'En la parte superior, al dar click en el icono “Notificaciones” nos llevará al Notification Center, un espacio donde podrás ver todas tus notificaciones en un solo lugar, de manera ordenada y fácil de revisar. <br /> ¡Es el momento! ¡Ahora ya estás preparado para empezar a descubrir todo lo que tenemos para ti en mitec! ',
        imageDesktop: '../../../assets/images/bienvenida/step_4_desktop.gif',
        imageMobile: '../../../assets/images/bienvenida/step_4.gif',
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
      <storybook-guided-tour ${attributes(args)}/>
    `,
  };
};
