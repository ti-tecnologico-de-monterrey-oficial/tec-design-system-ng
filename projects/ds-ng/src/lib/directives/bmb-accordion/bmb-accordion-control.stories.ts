import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbAccordionControlDirective } from './bmb-accordion-control.directive';
import { CommonModule } from '@angular/common';
import { BmbAccordionComponent } from '../../../public-api';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getSubStoryIdentifier,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';

const meta: Meta<BmbAccordionControlDirective> = {
  title: 'Components/Containers/Accordion/Accordion control',
  tags: ['!autodocs'],
  component: BmbAccordionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbAccordionControlDirective,
        BmbAccordionComponent,
      ],
    }),
  ],
  parameters: {
    withCustomLayout: true,
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('AccordionControl', 'directive')} to bmb-accordion components to be presented in collapsible and vertically stacked elements.`, 'https://bamboo.tec.mx/latest/componentes/accordion/descripcion-general-yABR8pUx', true)}
${getSpecialSpecifications(
  `${getEmptyStateMessage(true)}<br/><br/>
###${getSubStoryIdentifier(true)}${RELEVANT_TITLE_LEVEL[0]}
>
For the correct operation of the Accordion control directive the Accordion component must have
\`accordionId\` attribute
and must not have \`lockToogle\` attribute
`,
  true,
)}
${getBasicExampleBlock('BmbAccordionComponent', '', '', true)}
        `,
      },
    },
  },
  argTypes: {
    accordionStates: {
      description:
        'Accordion states to control the open/close state of the accordions. The name of the property must be the same as the accordionId of the accordion component.',
      control: {
        type: 'object',
      },
      table: {
        type: { summary: '{ [id: string]: boolean }' },
      },
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<BmbAccordionControlDirective>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbAccordionControl>
        <bmb-accordion
            [accordionId]="1"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>1</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [accordionId]="2"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>2</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [accordionId]="3"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>3</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
            mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
            Nulla ut consequat turpis, id efficitur velit.
            </p>
            </ng-template>
        </bmb-accordion>
      </section>
    `,
  }),
};

export const accordionStates: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbAccordionControl [accordionStates]="{ '1': true, '2': false, '3': false }">
        <bmb-accordion
            [accordionId]="1"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>1</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
                Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
                Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
                ullamcorper dictum augue diam id erat. Donec ac fringilla elit.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [accordionId]="2"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>2</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
                Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
                Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
                ullamcorper dictum augue diam id erat. Donec ac fringilla elit.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [accordionId]="3"
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
        >
            <ng-template #bmbAccordionHeader>3</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
            mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
            Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
            Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
            Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
            ullamcorper dictum augue diam id erat. Donec ac fringilla elit.
            </p>
            </ng-template>
        </bmb-accordion>
      </section>
    `,
  }),
};
