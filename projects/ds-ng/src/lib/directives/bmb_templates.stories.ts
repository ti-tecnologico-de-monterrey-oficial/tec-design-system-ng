import { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { BmbSidebarComponent, BmbMediaCardComponent } from '../../public-api';

export default {
  title: 'Micro Componentes/Templates',
  component: BmbSidebarComponent,
  parameters: {
    docs: {
      description: {
        component: `

A Stand Alone Site Template is the skeleton or structure that visually organizes the elements of a web page to ensure a coherent and functional
experience. Defines how these components are presented in the interface, ensuring a clear and consistent layout for navigation and use of the 
site. 

To use these templates it is necessary to use the classes that already come within the bamboo package. Below are examples with the different
templates available for the sites. It is important to mention that these templates are for web use and must add the sidebar component


Below is an example of how you can use this component in HTML with the different classes:
        `,
      },
    },
  },
  argTypes: {},
  args: {},
} as Meta<typeof BmbSidebarComponent>;

type Story = StoryObj<BmbSidebarComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    
<!-- Full Aside Full Card -->
<section class="bmb_template-header">
  <h3>Aside Card</h3>
  <h5>Template</h5>
</section>
    <div class="bmb_template-aside-full">
        <main class="bmb_template-aside-full-main">
            <h3 class="bmb_template-aside-full-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </main>
        <aside class="bmb_template-aside-full-aside">
            <h3 class="bmb_template-aside-full-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>

<!-- Aside Card -->
<section class="bmb_template-header">
  <h3>Aside Card</h3>
  <h5>Template</h5>
</section>
    <div class="bmb_template-aside">
        <main class="bmb_template-aside-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-aside-aside">
            <h3 class="bmb_template-aside-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>

<!-- Aside First Card -->
    <section class="bmb_template-header">
        <h3>Aside First Card</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-aside-first">
        <main class="bmb_template-aside-first-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-aside-first-aside">
            <h3 class="bmb_template-aside-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>

<!-- Main Full -->
    <section class="bmb_template-header">
        <h3>Main Full</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-main-full">
        <main class="bmb_template-main-full-card">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
    </div>

<!-- Twice Full Card-->
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

<!-- Twice Card -->
    <section class="bmb_template-header">
        <h3>Twice Card</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-twice">
        <main class="bmb_template-twice-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <aside class="bmb_template-twice-secondary">
            <h3 class="bmb_template-twice-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </aside>
    </div>

<!-- List -->
    <section class="bmb_template-header">
        <h3>List</h3>
        <h5>Template</h5>
    </section>
    <div class="bmb_template-list">
        <main class="bmb_template-list-main">
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
        </main>
        <section class="bmb_template-list-secondary">
            <h3 class="bmb_template-list-title">Subheader</h3>
            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit. Deleniti similique tempore at culpa facilis sunt laudantium, magni maxime dolor reprehenderit saepe! Quam eius, iste voluptate corporis sequi impedit fuga repudiandae amet placeat, delectus, quis sapiente?</h5>
        </section>
    </div>

<!-- Article -->
<section class="bmb_template-header">
  <h3>Article</h3>
  <h5>Template</h5>
</section>
<div class="bmb_template-article">
  <article class="bmb_template-article-aside">
    <h4 class="bmb_template-article-title">Subheader</h4>
    <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ipsa repudiandae hic. Non, fugiat? Repellendus impedit soluta excepturi fugit doloribus. Quos, vel suscipit.</h5>
  </article>
  <main class="bmb_template-article-main">
    <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi velit libero eveniet alias esse at perspiciatis minus quia aperiam enim? Commodi cum minima recusandae quidem blanditiis maiores, eaque perspiciatis at molestiae, dicta velit consequatur hic dolor! Nihil ipsa ullam, dolorum ut quod delectus fuga quam neque, velit tenetur corporis autem minima illo eum voluptas blanditiis esse nam obcaecati magni? Consequuntur rerum quas veritatis nobis maiores cumque ut hic consectetur iste quisquam, corporis molestias exercitationem dolore magni molestiae unde animi autem eos odit qui illum? Minus recusandae neque quia debitis nostrum aut, modi in omnis ad accusantium dolores vel eligendi labore.</h5>
  </main>
</div>
  `,
});

export const Default = customizable();
