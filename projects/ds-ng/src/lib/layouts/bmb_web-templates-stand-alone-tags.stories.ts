import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbBadgeComponent,
  BmbStepProgressBarComponent,
  BmbInvoiceComponent,
  BmbUserSummaryComponent,
  BmbButtonDirective,
} from '../../public-api';
import {
  attributes,
  getBasicExampleBlock,
  getFormatName,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getStandaloneGeneralDesc,
  TECHNICAL_DOC_REFERENCES,
  TECHNICAL_DOC_TITLE,
} from '../utils/doc/utils';
import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as badgeStory from '../components/bmb-badge/bmb-badge.stories';
import * as stepProgressBarStory from '../components/bmb-step-progress-bar/bmb-step-progress-bar.stories';
import * as userSummaryStory from '../components/bmb-user-summary/bmb-user-summary.stories';
import * as invoiceStory from '../components/bmb-invoice/bmb-invoice.stories';
import * as buttonStory from '../directives/bmb-button/button.stories';

@Component({
  standalone: true,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbBadgeComponent,
    BmbStepProgressBarComponent,
    BmbUserSummaryComponent,
    BmbInvoiceComponent,
    BmbButtonDirective,
  ],
  selector: 'storybook-modal-wrapper',
  template: `
    <bmb-top-bar />
    <section class="bmb_template-header">
      <h3>Header</h3>
      <h5>Text</h5>
    </section>
    <div class="bmb_template-stand-alone-tags">
      <div class="bmb_template-subheader">
        <ul>
          <li>
            <h4>Subheader</h4>
          </li>
          <li>
            <bmb-badge
              appearance="normal"
              text="Badge text"
              [container]="true"
            />
            <bmb-badge
              appearance="normal"
              text="Badge text"
              [container]="true"
            />
            <bmb-badge
              appearance="normal"
              text="Badge text"
              [container]="true"
            />
            <bmb-badge
              appearance="normal"
              text="Badge text"
              [container]="true"
            />
            <bmb-badge
              appearance="normal"
              text="Badge text"
              [container]="true"
            />
          </li>
          <li>
            <bmb-step-progress-bar
              [activeStep]="0"
              [totalSteps]="3"
              size="small"
              [freeze]="false"
              type="horizontal"
              [labelSteps]="[
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
              ]"
              labelComplete="Completo"
              labelIncomplete="Pendiente"
            />
          </li>
        </ul>
      </div>
      <div class="bmb_template-stand-alone-tags-content">
        <main class="bmb_template-stand-alone-tags-content-main">
          <bmb-user-summary
            [isProfile]="false"
            name="Test Name"
            id="AC123123"
            image="https://picsum.photos/id/64/200/300"
            alt="test"
            infoCareer="ITICS-Semestre 5"
            [noBox]="false"
            salutation="Buenas tardes"
            (onClick)="onClick($event)"
          />
        </main>
        <aside class="bmb_template-stand-alone-tags-content-aside">
          <bmb-invoice
            [data]="{
              concept: [
                {
                  concept: 'Fecha de solicitud',
                  quantity: '$0, 000 USD',
                  badge: {
                    label: 'Discount',
                    appearance: 'success',
                    container: true,
                  },
                },
                {
                  concept: 'Tipo de cambio al día de hoy *',
                  quantity: '-$0, 000 USD',
                },
                {
                  concept: 'Fecha de solicitud',
                  quantity: '$0, 000 USD',
                  badge: {
                    label: 'Discount',
                    appearance: 'success',
                    container: false,
                  },
                },
              ],
              total: {
                label: 'Total',
                value: '$0, 000 USD',
                equivalence: [
                  '3, 828 créditos • 12 meses',
                  '319 créditos • al mes',
                ],
              },
            }"
          />
        </aside>
      </div>
      <div class="bmb_template-stand-alone-tags-footer">
        <button bmbButton appearance="secondary-outlined">Button text</button>
        <button bmbButton>Button text</button>
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
        title="Navegacion para mobiles"
      />
    </div>
  `,
})
class StorybookModalWrapperComponent {}

export default {
  title: 'Templates/Stand alone sites/2 Column info bar',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookModalWrapperComponent, BmbTopBarComponent],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getStandaloneGeneralDesc('2 Column info bar')}
${getSpecialSpecifications(`### ${TECHNICAL_DOC_TITLE}
>
${TECHNICAL_DOC_REFERENCES}
- [${topBarStory.default.title}](/docs/${getFormatName(topBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${sideBarStory.default.title}](/docs/${getFormatName(sideBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${badgeStory.default.title}](/docs/${getFormatName(badgeStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${stepProgressBarStory.default.title}](/docs/${getFormatName(stepProgressBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${userSummaryStory.default.title}](/docs/${getFormatName(userSummaryStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${invoiceStory.default.title}](/docs/${getFormatName(sideBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${buttonStory.default.title}](/docs/${getFormatName(buttonStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
`)}
${getBasicExampleBlock(`BmbTopBarComponent,
    BmbSidebarComponent,
    BmbBadgeComponent,
    BmbStepProgressBarComponent,
    BmbUserSummaryComponent,
    BmbInvoiceComponent,
    BmbButtonDirective`)}
\`\`\`html
<bmb-top-bar />
<section class="bmb_template-header">
  <h3>Header</h3>
  <h5>Text</h5>
</section>
<div class="bmb_template-stand-alone-tags">
  <div class="bmb_template-subheader">
    <ul>
      <li>
        <h4>Subheader</h4>
      </li>
      <li>
        <bmb-badge
      appearance="normal"
      text="Badge text"
      [container]="true"
    />
        <bmb-badge
      appearance="normal"
      text="Badge text"
      [container]="true"
    />
        <bmb-badge
      appearance="normal"
      text="Badge text"
      [container]="true"
    />
        <bmb-badge
      appearance="normal"
      text="Badge text"
      [container]="true"
    />
        <bmb-badge
      appearance="normal"
      text="Badge text"
      [container]="true"
    />
      </li>
      <li>
        <bmb-step-progress-bar
      [activeStep]="0"
      [totalSteps]="3"
      size="small"
      [freeze]="false"
      type="horizontal"
      [labelSteps]="[
        '¡Orden de compra aprobada!',
        '¡Orden de compra aprobada!',
        '¡Orden de compra aprobada!',
        '¡Orden de compra aprobada!',
        '¡Orden de compra aprobada!',
      ]"
      labelComplete="Completo"
      labelIncomplete="Pendiente"
    />
      </li>
    </ul>
  </div>
  <div class="bmb_template-stand-alone-tags-content">
    <main class="bmb_template-stand-alone-tags-content-main">
      <bmb-user-summary
    [isProfile]="false"
    name="Test Name"
    id="AC123123"
    image="https://picsum.photos/id/64/200/300"
    alt="test"
    infoCareer="ITICS-Semestre 5"
    [noBox]="false"
    salutation="Buenas tardes"
    (onClick)="onClick($event)"
  />
    </main>
    <aside class="bmb_template-stand-alone-tags-content-aside">
      <bmb-invoice
    [data]="{
      concept: [
        {
          concept: 'Fecha de solicitud',
          quantity: '$0, 000 USD',
          badge: {
            label: 'Discount',
            appearance: 'success',
            container: true,
          },
        },
        {
          concept: 'Tipo de cambio al día de hoy *',
          quantity: '-$0, 000 USD',
        },
        {
          concept: 'Fecha de solicitud',
          quantity: '$0, 000 USD',
          badge: {
            label: 'Discount',
            appearance: 'success',
            container: false,
          },
        },
      ],
      total: {
        label: 'Total',
        value: '$0, 000 USD',
        equivalence: [
          '3, 828 créditos • 12 meses',
          '319 créditos • al mes',
        ],
      },
    }"
  />
    </aside>
  </div>
  <div class="bmb_template-stand-alone-tags-footer">
    <button bmbButton appearance="secondary-outlined">Button text</button>
    <button bmbButton>Button text</button>
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
  title="Navegacion para mobiles"
/>
</div>
\`\`\`
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
      <storybook-modal-wrapper ${attributes(args)}></storybook-modal-wrapper>
    `,
  };
};
