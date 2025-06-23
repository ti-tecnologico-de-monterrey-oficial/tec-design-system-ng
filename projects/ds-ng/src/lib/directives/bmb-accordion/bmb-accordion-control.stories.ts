import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbAccordionControlDirective } from './bmb-accordion-control.directive';
import { CommonModule } from '@angular/common';
import { BmbAccordionComponent } from '../../../public-api';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

const meta: Meta<BmbAccordionControlDirective> = {
  title: 'Components/Containers/Accordion control',
  component: BmbAccordionComponent,
  subcomponents: { BmbAccordionControlDirective },
  decorators: [
    storiesLayoutVertical,
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
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAccordionControlDirective, BmbAccordionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAccordionControlDirective, BmbAccordionComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

**For the correct operation of the Accordion Control Directive the Accordion Components need to have the attribute "accordionId" and the accordion component must not have the "lockToogle" attribute**

Below is an example of how you can use this component in HTML:
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
