import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbTopBarComponent } from '../../public-api';

@Component({
  standalone: true,
  imports: [BmbTopBarComponent],
  selector: 'storybook-modal-wrapper',
  template: `
    <bmb-top-bar
    ></bmb-top-bar>
    <section class="bmb_template-header">
        <h3>Twice Full Card</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-twice-full">
        <main class="bmb_template-twice-full-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-twice-full-secondary">
            <h3 class="bmb_template-twice-full-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>
  `,
})
class StorybookModalWrapperComponent {
}

export default {
  title: 'Hidden/Web Templates/Twice Full Card',
  tags: ['hideInSidebar'],
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookModalWrapperComponent,
        BmbTopBarComponent
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      hidden: true,
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
        <h3>Twice Full Card</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-twice-full">
        <main class="bmb_template-twice-full-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-twice-full-secondary">
            <h3 class="bmb_template-twice-full-title">Subheader</h3>
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
    docs:{
      hidden:true,
    },
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${attributes(args)}></storybook-modal-wrapper>
    `,
  };
};
