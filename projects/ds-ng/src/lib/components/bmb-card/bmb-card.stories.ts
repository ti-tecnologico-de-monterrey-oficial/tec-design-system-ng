import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardFooterComponent,
  BmbCardHeaderComponent,
} from './bmb-card.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { attributes } from '../../utils/utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Micro Componentes/Card',
  component: BmbCardComponent,
  subcomponents: { BmbCardFooterComponent, BmbCardHeaderComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbCardComponent,
        BmbCardFooterComponent,
        BmbCardHeaderComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCardComponent, BmbCardFooterComponent, BmbCardHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCardComponent, BmbCardFooterComponent, BmbCardHeaderComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Architecture

\`\`\`html
<section class="bmb_card" <!-- conditional class bmb_border-radius-{borderRadius} bmb_margin-{this.margin} bmb_card-{type} --> >
  <header class="bmb_card-header" <!-- conditional class bmb_padding-{padding} --> >
      { header content }
  </header>
  <section class="bmb_card-content" <!-- conditional class bmb_padding-{padding} --> >
      { content }
  </section>
  <footer class="bmb_card-footer" <!-- conditional class bmb_padding-{padding} --> >
    <ng-content></ng-content>
  </footer>
</section>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    borderRadius: {
      name: 'Border radius',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the corner radius size',
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
    type: {
      name: 'Type',
      control: {
        type: 'select',
      },
      options: [
        'primary',
        'secondary',
        'succes',
        'info',
        'warning',
        'error',
        'normal',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'normal' },
      },
      description: 'Set the color schema',
    },
  },
  args: {
    borderRadius: 'm',
    margin: 'm',
    type: 'normal',
  },
};

export default meta;

type Story = StoryObj<BmbCardComponent>;

export const OneItem: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-card ${attributes(args)}>
        <bmb-card-header padding="s">
          <h3>Header</h3>
        </bmb-card-header>
        <bmb-card-content padding="none">
          <figure [ngStyle]="{margin: 0}">
            <img
              width="100%"
              alt="gatito"
              src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
            />
          </figure>
          <p [ngStyle]="{padding: '1rem'}">Los gatos son criaturas llenas de misterio. Su elegancia al moverse, sus ojos penetrantes y su habilidad para desaparecer en las sombras han inspirado leyendas y supersticiones. Pero más allá de su aura enigmática, los gatos también son compañeros leales y cariñosos.</p>
        </bmb-card-content>
        <bmb-card-footer padding="xl">
          <h3>Footer</h3>
        </bmb-card-footer>
      </bmb-card>
    `,
  }),
};
