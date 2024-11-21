import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbTopBarComponent } from '../../public-api';

@Component({
  standalone: true,
  imports: [BmbTopBarComponent],
  selector: 'storybook-modal-wrapper',
  template: `
    <bmb-top-bar></bmb-top-bar>
    <section class="bmb_template-header">
      <h3>Main Full</h3>
      <h5>Template</h5>
    </section>
    <div class="bmb_template-main-full">
      <main class="bmb_template-main-full-card">
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit
          libero eveniet alias esse at perspiciatis minus quia aperiam enim?
          Commodi cum minima recusandae quidem blanditiis maiores, eaque
          perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil
          ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur
          corporis autem minima illo eum voluptas blanditiis esse nam obcaecati
          magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic
          consectetur iste quisquam, corporis molestias exercitationem dolore
          magni molestiae unde animi autem eos odit qui illum? Minus recusandae
          neque quia debitis nostrum aut, modi in omnis ad accusantium dolores
          vel eligendi labore.
        </h5>
      </main>
    </div>
  `,
})
class StorybookModalWrapperComponent {}

export default {
  title: 'Micro Componentes/Web Templates/Main full',
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
        <h3>Main Full</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-main-full">
        <main class="bmb_template-main-full-card">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
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

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      return `${key}="${value}"`;
    })
    .join(' ');
}

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${attributes(args)}></storybook-modal-wrapper>
    `,
  };
};
