import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Description, Primary, Title } from '@storybook/addon-docs/blocks';
import { BmbTopBarComponent } from '../../public-api';
import {
  attributes,
  getBasicExampleBlock,
  getFormatName,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getStandaloneGeneralDesc,
  TECHNICAL_DOC_REFERENCES,
  TECHNICAL_DOC_TITLE,
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
    <div class="bmb_template-aside-full">
      <main class="bmb_template-aside-full-main">
        <h3 class="bmb_template-aside-full-title">Subheader</h3>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa
          repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi
          fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at
          culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe!
          Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet
          placeat, delectus, quis sapiente?
        </h5>
      </main>
      <aside class="bmb_template-aside-full-aside">
        <h3 class="bmb_template-aside-full-title">Subheader</h3>
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
  title: 'Templates/Stand alone sites/2 Column fullScreen',
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
${getStandaloneGeneralDesc('2 Column fullScreen')}
${getSpecialSpecifications(`### ${TECHNICAL_DOC_TITLE}
>
${TECHNICAL_DOC_REFERENCES}
- [${topBarStory.default.title}](/docs/${getFormatName(topBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
`)}
${getBasicExampleBlock('BmbTopBarComponent')}
\`\`\`html
<bmb-top-bar />
<section class="bmb_template-header">
  <h3>Header</h3>
  <h5>Text</h5>
</section>
<div class="bmb_template-aside-full">
  <main class="bmb_template-aside-full-main">
    <h3 class="bmb_template-aside-full-title">Subheader</h3>
    <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa
          repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi
          fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at
          culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe!
          Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet
          placeat, delectus, quis sapiente?
        </h5>
  </main>
  <aside class="bmb_template-aside-full-aside">
    <h3 class="bmb_template-aside-full-title">Subheader</h3>
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
