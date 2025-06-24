import { Meta, StoryObj } from '@storybook/angular';
import { BmbLayoutDirective } from './bmb-layout.directive';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';
import { attributes } from '../../utils/utils';

const meta: Meta<BmbLayoutDirective> = {
  title: 'Foundations/Layouts/Layout',
  component: BmbLayoutDirective,
  subcomponents: { BmbLayoutItemDirective },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbCardComponent,
        BmbCardContentComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLayoutDirective, BmbLayoutItemDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLayoutDirective, BmbLayoutItemDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

The **Bamboo** Layout component is a flexible and responsive layout system that allows you to create complex layouts with ease. It provides a set of directives that can be used to define the layout structure, including the \`BmbLayout\` and \`BmbLayoutItem\` directives.

The \`BmbLayout\` directive is used to create a layout container, while the \`BmbLayoutItem\` directive is used to define individual items within the layout. The layout can be customized using various properties such as \`gap\`, \`size\`, \`margin\`, and \`alignment\` options.

The \`BmbLayoutItem\` directive can be used to define the size of each column within the layout. You can specify the size for different screen sizes using properties like \`colSm\`, and \`colLm\`. This allows you to create responsive layouts that adapt to different screen sizes.

## Equivalences

1 Sm column = 1/4 of the available width space, this is valid for maximum 1000px screen width, if the screen is bigger than 1000px, the column will be 3/12 of the available width space.

1 Lg column = 1/12 of the available width space, this is valid for minimum 1001px screen width, if the screen is smaller than 1001px, the column will be 4/4 of the available width space.

## Dynamic Columns

The \`BmbLayoutItem\` directive can also be used to create dynamic columns. By setting the \`isDynamicItem\` property to true, the item will automatically adjust its size based on the available space in the layout. This is useful for creating flexible layouts that can adapt to different screen sizes and content.

The \`colGrow\` property can be used to specify the growth factor of the item. This determines how much space the item will take up in relation to other items in the layout. For example, if you set \`colGrow\` to 2 for one item and 1 for another, the first item will take up twice as much space as the second item.

## Offset

The \`BmbLayoutItem\` directive also supports offsetting columns. You can use the \`marginLeft\` and \`marginRight\` properties to specify the offset for each column. This allows you to create more complex layouts with precise control over the positioning of each item.

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    gapSize: {
      name: 'Gap size',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the size of the space between elements.',
    },
    margin: {
      name: 'Margin',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Set the margin size',
    },
    dynamicCols: {
      name: 'Enable dinamyc cols',
      control: { type: 'boolean' },
      description: 'This property enable the dinamic size for bmbLayoutItem',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    justify: {
      name: 'Justify content',
      control: {
        type: 'select',
      },
      options: [
        'center',
        'end',
        'start',
        'stretch',
        'spaceAround',
        'spaceBetween',
        'spaceEvenly',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
      description: 'Set the justify content.',
    },
    alignItems: {
      name: 'Align items',
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
      description: 'Set the align items.',
    },
  },
  args: {
    gapSize: 'm',
    margin: 'm',
    dynamicCols: false,
    justify: 'start',
    alignItems: 'start',
  },
};

export default meta;

type Story = StoryObj<BmbLayoutDirective>;

export const Default = {
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbLayout ${attributes(args)}>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="3">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="3">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="3">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="3">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};

export const ColumnSmSizes = {
  name: 'Column Sizes Sm',
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [colSm]="4" type="primary">
          <bmb-card-content padding="m">
            4/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="3" type="primary">
          <bmb-card-content padding="m">
            3/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1">
          <bmb-card-content padding="m">
            1/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" type="primary">
          <bmb-card-content padding="m">
            2/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2">
          <bmb-card-content padding="m">
            2/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" type="primary">
          <bmb-card-content padding="m">
            1/4
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="3">
          <bmb-card-content padding="m">
            3/4
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};

export const ColumnLgSizes = {
  name: 'Column Sizes Lg',
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [colLg]="12" type="primary">
          <bmb-card-content padding="m">
            12/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="11" type="primary">
          <bmb-card-content padding="m">
            11/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="1">
          <bmb-card-content padding="m">
            1/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="10" type="primary">
          <bmb-card-content padding="m">
            10/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="2">
          <bmb-card-content padding="m">
            2/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="9" type="primary">
          <bmb-card-content padding="m">
            9/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="3">
          <bmb-card-content padding="m">
            3/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="8" type="primary">
          <bmb-card-content padding="m">
            8/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="4">
          <bmb-card-content padding="m">
            4/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="7" type="primary">
          <bmb-card-content padding="m">
            7/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="5">
          <bmb-card-content padding="m">
            5/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="6" type="primary">
          <bmb-card-content padding="m">
            6/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="6">
          <bmb-card-content padding="m">
            6/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="5" type="primary">
          <bmb-card-content padding="m">
            5/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="7">
          <bmb-card-content padding="m">
            7/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="4" type="primary">
          <bmb-card-content padding="m">
            4/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="8">
          <bmb-card-content padding="m">
            8/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="3" type="primary">
          <bmb-card-content padding="m">
            3/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="9">
          <bmb-card-content padding="m">
            9/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="2" type="primary">
          <bmb-card-content padding="m">
            2/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="10">
          <bmb-card-content padding="m">
            10/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="1" type="primary">
          <bmb-card-content padding="m">
            1/12
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="11">
          <bmb-card-content padding="m">
            11/12
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};

export const AutoLayout = {
  name: 'Auto Layout',
  args: {
    dynamicCols: true,
  },
  describe: `Some text`,
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true [colGrow]="1">
          <bmb-card-content padding="m">
            1
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true>
          <bmb-card-content padding="m">
            auto
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true>
          <bmb-card-content padding="m">
            auto
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true>
          <bmb-card-content padding="m">
            auto
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true>
          <bmb-card-content padding="m">
            auto
          </bmb-card-content>
        </bmb-card>
      </section>
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true [colGrow]="1">
          <bmb-card-content padding="m">
            1
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true type="primary" [colGrow]="3">
          <bmb-card-content padding="m">
            3
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true [colGrow]="2">
          <bmb-card-content padding="m">
            2
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDynamicItem]=true>
          <bmb-card-content padding="m">
            auto
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};

export const ColumnOffset = {
  name: 'Column Offset',
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="3" [marginLeft]="{ 'sm': 3, 'lg': 9 }" [marginRight]="{ 'sm': 0, 'lg': 0 }">
          <bmb-card-content padding="m">
            <strong>Left</strong> Sm: 3, Lg: 9<br />
            <strong>Right</strong> Sm: 0, Lg: 0
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="3" [marginLeft]="{ 'sm': 2, 'lg': 6 }" [marginRight]="{ 'sm': 1, 'lg': 3 }">
          <bmb-card-content padding="m">
            <strong>Left</strong> Sm: 2, Lg: 6<br />
            <strong>Right</strong> Sm: 1, Lg: 3
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="3" [marginLeft]="{ 'sm': 1, 'lg': 3 }" [marginRight]="{ 'sm': 2, 'lg': 6 }">
          <bmb-card-content padding="m">
            <strong>Left</strong> Sm: 1, Lg: 3<br />
            <strong>Right</strong> Sm: 2, Lg: 6
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="3" [marginLeft]="{ 'sm': 0, 'lg': 0 }" [marginRight]="{ 'sm': 3, 'lg': 9 }">
          <bmb-card-content padding="m">
            <strong>Left</strong> Sm: 0, Lg: 0<br />
            <strong>Right</strong> Sm: 3, Lg: 9
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="3">
          <bmb-card-content padding="m">
            <strong>Left</strong> Sm: 0, Lg: 0<br />
            <strong>Right</strong> Sm: 0, Lg: 0
          </bmb-card-content>
        </bmb-card>
    `,
  }),
};
