import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbTopBarComponent } from '../../public-api';
import {
  attributes,
  getBasicExampleBlock,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getStandaloneGeneralDesc,
  getTechnicalDocReferences,
} from '../utils/doc/utils';
import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';

@Component({
  standalone: true,
  imports: [BmbTopBarComponent],
  selector: 'storybook-modal-wrapper',
  template: `
    <bmb-top-bar />
    <section class="bmb_template-header">
      <h3>Header</h3>
      <h5>Text</h5>
    </section>
    <div class="bmb_template-aside-first">
      <main class="bmb_template-aside-first-main">
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
      <aside class="bmb_template-aside-first-aside">
        <h3 class="bmb_template-aside-title">Subheader</h3>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa
          repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi
          fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at
          culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe!
          Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet
          placeat, delectus, quis sapiente?
        </h5>
      </aside>
    </div>
  `,
})
class StorybookModalWrapperComponent {}

export default {
  title: 'Templates/Stand alone sites/2 Column normal screen left',
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
${getStandaloneGeneralDesc('2 Column normal screen left')}
${getSpecialSpecifications(
  getTechnicalDocReferences({
    references: [{ title: topBarStory.default.title! }],
  }),
)}
${getBasicExampleBlock('BmbTopBarComponent')}
\`\`\`html
<bmb-top-bar/>
<section class="bmb_template-header">
  <h3>Header</h3>
  <h5>Text</h5>
</section>
<div class="bmb_template-aside-first">
  <main class="bmb_template-aside-first-main">
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
  <aside class="bmb_template-aside-first-aside">
    <h3 class="bmb_template-aside-title">Subheader</h3>
    <h5>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa
      repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi
      fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at
      culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe!
      Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet
      placeat, delectus, quis sapiente?
    </h5>
  </aside>
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
