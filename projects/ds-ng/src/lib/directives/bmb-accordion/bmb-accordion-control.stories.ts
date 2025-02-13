import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbAccordionControlDirective } from './bmb-accordion-control.directive';
import { CommonModule } from '@angular/common';
import { BmbAccordionComponent } from '../../../public-api';

const meta: Meta<BmbAccordionControlDirective> = {
  title: 'Micro Componentes/Accordion Control',
  component: BmbAccordionComponent,
  subcomponents: { BmbAccordionControlDirective },
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

**For the correct operation of the Accordion Control Directive the Accordion Components need to have the attribute "accordionId"**

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<BmbAccordionControlDirective>;

export const OneItem: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbAccordionControl>
        <bmb-accordion
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
            [active]="true"
            [disabled]="false"
        >
            <ng-template #bmbAccordionHeader>1</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
                Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
                Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
                ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
                sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
                commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
                aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
                posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
                egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
                rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
                Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
                Morbi luctus porta orci eu iaculis.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
            [active]="true"
            [disabled]="false"
        >
            <ng-template #bmbAccordionHeader>2</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
                mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
                Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
                Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
                Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
                ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
                sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
                commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
                aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
                posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
                egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
                rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
                Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
                Morbi luctus porta orci eu iaculis.
            </p>
            </ng-template>
        </bmb-accordion>

        <bmb-accordion
            [icon]="icon"
            [borderRadius]="'m'"
            [margin]="'m'"
            [paddingHeader]="'m'"
            [paddingContent]="'m'"
            [hideToggle]="true"
            [active]="true"
            [disabled]="false"
        >
            <ng-template #bmbAccordionHeader>3</ng-template>
            <ng-template #bmbAccordionContent>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
            mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
            Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
            Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
            Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
            ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
            sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
            commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
            aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
            posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
            egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
            rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
            Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
            Morbi luctus porta orci eu iaculis.
            </p>
            </ng-template>
        </bmb-accordion>
      </section>
    `,
  }),
};
