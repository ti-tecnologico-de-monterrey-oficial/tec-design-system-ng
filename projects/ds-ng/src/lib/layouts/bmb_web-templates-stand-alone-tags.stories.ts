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
import { attributes } from '../utils/utils';

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
    <bmb-top-bar></bmb-top-bar>
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
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
            <bmb-badge
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
            <bmb-badge
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
            <bmb-badge
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
            <bmb-badge
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
            <bmb-badge
              [appearance]="'normal'"
              [text]="'Badge text'"
              [container]="true"
            ></bmb-badge>
          </li>
          <li>
            <bmb-step-progress-bar
              [activeStep]="0"
              [totalSteps]="3"
              [size]="'small'"
              [freeze]="false"
              [type]="'horizontal'"
              [labelSteps]="[
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
                '¡Orden de compra aprobada!',
              ]"
              [labelComplete]="'Completo'"
              [labelIncomplete]="'Pendiente'"
            ></bmb-step-progress-bar>
          </li>
        </ul>
      </div>
      <div class="bmb_template-stand-alone-tags-content">
        <main class="bmb_template-stand-alone-tags-content-main">
          <bmb-user-summary
            [isProfile]="false"
            [name]="'Test Name'"
            [id]="'AC123123'"
            [image]="'https://picsum.photos/id/64/200/300'"
            [infoCareer]="'ITICS-Semestre 5'"
            [noBox]="false"
            [salutation]="'Buenas tardes'"
            (onClick)="onClick($event)"
          ></bmb-user-summary>
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
          ></bmb-invoice>
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
        [title]="'Navegacion para mobiles'"
      ></bmb-sidebar>
    </div>
  `,
})
class StorybookModalWrapperComponent {}

export default {
  title: 'Micro Componentes/Web Templates/Stand Alone Tags',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookModalWrapperComponent, BmbTopBarComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
  templateUrl: '
    <bmb-top-bar
    ></bmb-top-bar>
    <section class="bmb_template-header">
        <h3>Aside First Card</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-aside-first">
        <main class="bmb_template-aside-first-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-aside-first-aside">
            <h3 class="bmb_template-aside-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>
  ',
  styleUrl: './component.scss',
})
export class Component {}
\`\`\`

Below is an example of how you can use this component in HTML:
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
