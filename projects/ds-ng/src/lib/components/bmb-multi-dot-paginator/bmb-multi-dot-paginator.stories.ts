import { Meta, StoryObj } from '@storybook/angular';
import { BmbMultiDotPaginatorComponent } from './bmb-multi-dot-paginator.component';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';

export default {
  title: 'Macro Componentes/Multi Dot Paginator',
  component: BmbMultiDotPaginatorComponent,
  subcomponents: { BmbMultiDotPaginatorItemComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbMultiDotPaginatorItemComponent,
        BmbMultiDotPaginatorComponent,
        BmbHomeCardComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Note: When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
        
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbMultiDotPaginatorComponent, BmbMultiDotPaginatorItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbMultiDotPaginatorComponent, BmbMultiDotPaginatorItemComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Title of the paginator',
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Subtitle of the paginator',
    },
  },
  args: {
    title: 'Example Title',
    subtitle: 'Example Subtitle',
  },
} as Meta<typeof BmbMultiDotPaginatorComponent>;

// export default meta;

type Story = StoryObj<BmbMultiDotPaginatorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-multi-dot-paginator [title]="title" [subtitle]="subtitle">
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <!-- More elements -->
</bmb-multi-dot-paginator>
  `,
  }),
};
