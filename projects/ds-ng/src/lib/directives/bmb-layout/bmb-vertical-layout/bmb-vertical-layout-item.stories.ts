import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BmbVerticalLayoutItemDirective } from './bmb-vertical-layout-item.directive';
import { attributes } from '../../../utils/doc/utils';
import {
  BmbIconStatusComponent,
  BmbCardComponent,
  BmbCardContentComponent,
  BmbVerticalLayoutDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTopBarComponent,
} from '../../../../public-api';

export default {
  title:
    'Foundations/Layouts/Vertical layout container/Vertical layout container item',
  tags: ['!autodocs'],
  component: BmbVerticalLayoutItemDirective,
  decorators: [
    moduleMetadata({
      imports: [
        BmbIconStatusComponent,
        BmbCardComponent,
        BmbCardContentComponent,
        BmbVerticalLayoutDirective,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbTopBarComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbVerticalLayoutItemDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbVerticalLayoutItemDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {

...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    rowGrow: {
      name: 'Row grow',
      control: 'number',
      description:
        'Sets how much of the flex container positive free space, if any, should be assigned to the flex item main size.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    rowGrow: 1,
    test_text: 'Estamos activando tu credencial digital en este equipo',
  },
} as Meta<typeof BmbVerticalLayoutItemDirective>;

export const Default = {
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <section bmbVerticalLayout layoutHeight="500px">
        <bmb-card bmbVerticalLayoutItem  margin="none">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbVerticalLayoutItem  margin="none">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbVerticalLayoutItem margin="none" type="primary" ${attributes(args)}>
          <bmb-card-content padding="m">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla eu risus in elementum. Sed volutpat urna vitae sem sodales fermentum ut id ante. Curabitur metus nulla, ultrices eu dictum id, efficitur quis nulla. Fusce ipsum sapien, aliquam congue urna non, tempus aliquet quam. Mauris ut lobortis ante. Nullam accumsan arcu eget tortor condimentum commodo. In dictum quam eget orci tristique pulvinar. Nulla porttitor nunc enim, ac rutrum lacus eleifend non. Etiam scelerisque molestie ex, ac ullamcorper orci rhoncus et. Suspendisse finibus bibendum nulla, a semper nulla dapibus et. Vivamus ut feugiat arcu, et dapibus erat.</p>
            <p>Praesent bibendum turpis pellentesque erat faucibus, et pulvinar sem sodales. Duis consectetur dui in dictum hendrerit. Duis pulvinar sem nisi. Quisque sed eleifend nisi. Fusce nec sagittis turpis. Nam ac dolor et nunc vulputate aliquet. Sed finibus semper consequat. Sed nisl ex, facilisis a justo id, laoreet elementum diam. Fusce vel condimentum orci. Phasellus erat odio, dictum ut viverra a, varius a tortor. Quisque dictum mollis tellus, tempor mattis neque. Etiam sed dignissim tellus, et pulvinar arcu. Phasellus ac ultrices quam. Vestibulum pretium urna rhoncus dapibus gravida. Donec vehicula tincidunt nisi, eget tempor metus varius sed.</p>
            <p>Aliquam luctus lobortis sapien, ut sagittis magna blandit non. Cras enim arcu, tempus ut bibendum ut, dignissim sit amet urna. Integer in imperdiet urna. Sed ac tortor ac ligula semper suscipit sed a urna. Suspendisse congue commodo sapien. In a purus interdum, scelerisque tellus id, ultrices est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae vestibulum felis. Nam sodales, lacus bibendum vehicula pharetra, massa libero euismod velit, congue cursus magna magna blandit metus. Integer quis urna lorem. Nullam quis venenatis odio. Mauris ultricies lacus et aliquet semper. Fusce dapibus nibh et urna condimentum elementum.</p>
            <p>Fusce sed posuere nisi. Donec eget quam sem. In et purus at mauris elementum fermentum eget eu arcu. In hac habitasse platea dictumst. Vestibulum lobortis lacus et nibh tristique euismod. Sed viverra sapien neque, non feugiat risus efficitur id. Praesent laoreet lectus eget consequat tincidunt. Duis auctor, ipsum sed sollicitudin finibus, ex felis convallis nunc, in mollis augue eros in quam. Nunc quis tempus augue, in sollicitudin est. Nulla eget urna ipsum. Donec varius euismod libero nec dignissim. Sed vitae tortor viverra, viverra nibh et, molestie sapien. Aliquam mollis sapien sit amet nisi molestie blandit. Proin sed neque mi. Etiam placerat ante at ex hendrerit, ac auctor felis volutpat.</p>
            <p>Vestibulum sollicitudin nunc non ornare ultrices. Nunc ut porttitor massa. Aliquam placerat, augue sed malesuada posuere, turpis metus posuere tellus, vel iaculis urna tellus id lacus. Nullam pharetra dui nec nibh gravida tincidunt. In efficitur ante ex, ut fringilla lorem feugiat ut. Phasellus a magna efficitur, ornare diam nec, vestibulum purus. Sed tristique suscipit augue, id interdum sapien interdum eget. Fusce pulvinar felis non nisl euismod, commodo egestas magna iaculis. Duis lobortis nunc eget mattis suscipit. Mauris vel interdum arcu. Vestibulum consequat fermentum augue a sagittis. Donec sapien augue, convallis sit amet eros vel, aliquet rhoncus elit.</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbVerticalLayoutItem  margin="none">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbVerticalLayoutItem  margin="none">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};

export const HomeLayout = {
  name: 'Home example layout',
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <main
        bmbVerticalLayout
        gapSize="m"
        justify="center"
        alignItems="center"
        layoutHeight="500px"
      >
        <bmb-top-bar bmbVerticalLayoutItem />
        <bmb-card bmbVerticalLayoutItem  margin="none" [rowGrow]="1">
          <bmb-card-content padding="m">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla eu risus in elementum. Sed volutpat urna vitae sem sodales fermentum ut id ante. Curabitur metus nulla, ultrices eu dictum id, efficitur quis nulla. Fusce ipsum sapien, aliquam congue urna non, tempus aliquet quam. Mauris ut lobortis ante. Nullam accumsan arcu eget tortor condimentum commodo. In dictum quam eget orci tristique pulvinar. Nulla porttitor nunc enim, ac rutrum lacus eleifend non. Etiam scelerisque molestie ex, ac ullamcorper orci rhoncus et. Suspendisse finibus bibendum nulla, a semper nulla dapibus et. Vivamus ut feugiat arcu, et dapibus erat.</p>
            <p>Praesent bibendum turpis pellentesque erat faucibus, et pulvinar sem sodales. Duis consectetur dui in dictum hendrerit. Duis pulvinar sem nisi. Quisque sed eleifend nisi. Fusce nec sagittis turpis. Nam ac dolor et nunc vulputate aliquet. Sed finibus semper consequat. Sed nisl ex, facilisis a justo id, laoreet elementum diam. Fusce vel condimentum orci. Phasellus erat odio, dictum ut viverra a, varius a tortor. Quisque dictum mollis tellus, tempor mattis neque. Etiam sed dignissim tellus, et pulvinar arcu. Phasellus ac ultrices quam. Vestibulum pretium urna rhoncus dapibus gravida. Donec vehicula tincidunt nisi, eget tempor metus varius sed.</p>
            <p>Aliquam luctus lobortis sapien, ut sagittis magna blandit non. Cras enim arcu, tempus ut bibendum ut, dignissim sit amet urna. Integer in imperdiet urna. Sed ac tortor ac ligula semper suscipit sed a urna. Suspendisse congue commodo sapien. In a purus interdum, scelerisque tellus id, ultrices est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae vestibulum felis. Nam sodales, lacus bibendum vehicula pharetra, massa libero euismod velit, congue cursus magna magna blandit metus. Integer quis urna lorem. Nullam quis venenatis odio. Mauris ultricies lacus et aliquet semper. Fusce dapibus nibh et urna condimentum elementum.</p>
            <p>Fusce sed posuere nisi. Donec eget quam sem. In et purus at mauris elementum fermentum eget eu arcu. In hac habitasse platea dictumst. Vestibulum lobortis lacus et nibh tristique euismod. Sed viverra sapien neque, non feugiat risus efficitur id. Praesent laoreet lectus eget consequat tincidunt. Duis auctor, ipsum sed sollicitudin finibus, ex felis convallis nunc, in mollis augue eros in quam. Nunc quis tempus augue, in sollicitudin est. Nulla eget urna ipsum. Donec varius euismod libero nec dignissim. Sed vitae tortor viverra, viverra nibh et, molestie sapien. Aliquam mollis sapien sit amet nisi molestie blandit. Proin sed neque mi. Etiam placerat ante at ex hendrerit, ac auctor felis volutpat.</p>
            <p>Vestibulum sollicitudin nunc non ornare ultrices. Nunc ut porttitor massa. Aliquam placerat, augue sed malesuada posuere, turpis metus posuere tellus, vel iaculis urna tellus id lacus. Nullam pharetra dui nec nibh gravida tincidunt. In efficitur ante ex, ut fringilla lorem feugiat ut. Phasellus a magna efficitur, ornare diam nec, vestibulum purus. Sed tristique suscipit augue, id interdum sapien interdum eget. Fusce pulvinar felis non nisl euismod, commodo egestas magna iaculis. Duis lobortis nunc eget mattis suscipit. Mauris vel interdum arcu. Vestibulum consequat fermentum augue a sagittis. Donec sapien augue, convallis sit amet eros vel, aliquet rhoncus elit.</p>
          </bmb-card-content>
        </bmb-card>
      </main>
    `,
  }),
};
