import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbGradeValueComponent } from '../../bmb-grade-value/bmb-grade-value.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import {
  getGeneralDescription,
  getSpecialSpecifications,
  getTypescriptExampleTextBlock,
} from '@docs/utils/utils';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Informative Grade',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbContainerButtonBaseComponent,
        BmbGradeValueComponent,
        BmbBadgeComponent,
        BmbLayoutDirective,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription('The Container Button component is used to take advantage of its built-in states, behaviors, and features. The Desktop and Mobile stories provide separate compositions and copyable HTML.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`The left content in the desktop composition accepts other Bamboo elements in place of the grade value:
>
> > - [BmbIconComponent](?path=/docs/components-visual-labels-icon-item--documentation)
> > - [BmbBoxIconComponent](?path=/docs/components-visual-labels-box-icon--documentation)
> > - [BmbUserImageComponent](?path=/docs/components-images-user-image--documentation)
> > - [BmbImageComponent](?path=/docs/components-images-image--documentation)
>
> Components used in this composition:
> - [BmbContainerButtonBaseComponent](?path=/docs/templates-container-button--documentation)
> - [BmbGradeValueComponent](?path=/docs/organisms-grades--documentation)
> - [BmbBadgeComponent](?path=/docs/components-visual-labels-badge--documentation)
> - [BmbLayoutDirective](?path=/docs/foundations-layouts-layout--documentation)
> - [BmbVerticalLayoutDirective](?path=/docs/foundations-layouts-vertical-layout-container--documentation)
>
> Please remember to refer to the [resolutions foundation](https://bamboo.tec.mx/latest/foundations/resoluciones-A1nepmXF) for more information.`)}
<div style="height: 24px;"></div>
${getTypescriptExampleTextBlock(
  'BmbContainerButtonBaseComponent, BmbGradeValueComponent, BmbBadgeComponent, BmbLayoutDirective, BmbVerticalLayoutDirective',
  '',
  '',
  '',
  "import { BreakpointObserver } from '@angular/cdk/layout';\nimport { inject } from '@angular/core';\nimport { map } from 'rxjs';",
  'for responsive composition',
  false,
  'with the Desktop and Mobile story markup',
  `readonly isMobile$ = inject(BreakpointObserver)
    .observe('(max-width: 1000px)')
    .pipe(map(({ matches }) => matches));`,
)}
Use \`isMobile$ | async\` in the application template to render the Mobile story markup when true and the Desktop story markup otherwise.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<BmbContainerButtonBaseComponent>;

const desktopTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerLeft>
    <bmb-grade-value
      type="main-grade"
      appearanceContrast="default"
      score="Cu"
    />
  </ng-template>

  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="m" justify="center" alignItems="start">
      <span class="font-regular-5">
        Op. de humanidades y bellas a. (INGL)
      </span>
      <span class="font-regular-3">Crédito: 1</span>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbVerticalLayout gapSize="none" alignItems="end">
      <bmb-badge
        appearance="semantic-info-event"
        text="Cursando"
        [container]="false"
      />
      <span class="font-regular-3">Semana: 5</span>
    </div>
  </ng-template>
</bmb-container-button-base>`;
const mobileTemplate = `<bmb-container-button-base>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="stretch">
      <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
        <bmb-grade-value type="main-grade" appearanceContrast="default" score="Cu" />
        <bmb-badge appearance="semantic-info-event" text="Cursando" [container]="false" />
      </div>
      <div bmbVerticalLayout gapSize="m" alignItems="start">
        <span class="font-regular-5">Op. de humanidades y bellas a. (INGL)</span>
      </div>
      <div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true">
        <span class="font-regular-3">Crédito: 1</span>
        <span class="font-regular-3">Semana: 5</span>
      </div>
    </div>
  </ng-template>
</bmb-container-button-base>`;

export const Desktop: Story = {
  render: () => ({ template: desktopTemplate }),
  parameters: { docs: { source: { code: desktopTemplate, language: 'html' } } },
};

export const Mobile: Story = {
  render: () => ({ template: mobileTemplate }),
  globals: { viewport: { value: 'small', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      previewWidth: '375px',
      story: { inline: false, height: '280px' },
      source: { code: mobileTemplate, language: 'html' },
    },
  },
};
