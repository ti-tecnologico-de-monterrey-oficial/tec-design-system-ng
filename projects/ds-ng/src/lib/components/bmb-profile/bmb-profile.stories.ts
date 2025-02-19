import { type Meta, type StoryFn } from '@storybook/angular';
import { BmbProfileComponent } from './bmb-profile.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Macro Componentes/Profile',
  component: BmbProfileComponent,
  parameters: {
    docs: {
      description: {
        component: `
Note: The theme toggle does not work correctly in Storybook. However, if you use it in the project, it functions without any issues.
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import {
  BmbProfileComponent,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbProfileComponent ],
  templateUrl: '
  ',
  styleUrl: './component.scss',
})
export class AppComponent {
  handleCloseSession(){
    console.log("Close Sesion")
  }

  handleCloseProfile: () => {
    console.log('Close Profile')
  }
}

\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    userData: {
      name: 'User Data',
      control: 'object',
      description: 'Set the basic information to display in the component',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    campusAcessLink: {
      name: 'Campus Access Link',
      control: 'text',
      description:
        'Set the link to redirect when the campus access button is clicked',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    idDigitalLink: {
      name: 'Id Digital Link',
      control: 'text',
      description:
        'Set the link to redirect when the id digital button is clicked',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    targetLinks: {
      name: 'Target Links',
      control: 'radio',
      options: ['_blank', '_parent', '_self', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    handleCloseSession: {
      name: 'Handle Close Session',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that close session button was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    handleCloseProfile: {
      name: 'Handle Close Profile',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that close profile window button was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    userData: {
      name: 'Juanito Perez',
      userImg: 'https://picsum.photos/id/64/200/300',
      matricula: 'A032132',
      mail: 'mail@tec.mx',
      period: 'AGO-DIC 24',
      campus: 'Monterrey',
      program: 'ARQ19',
    },
    campusAcessLink: 'https://www.youtube.com',
    idDigitalLink: 'https://www.x.com',
    targetLinks: '_blank',
    handleCloseSession: () => {
      window.alert('Cerrar Sesion');
    },
    handleCloseProfile: () => {
      window.alert('Close Profile');
    },
  },
} as Meta<typeof BmbProfileComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <div style="max-width: 450px; margin: 0 auto">
      <bmb-profile
        ${attributes(args)}
      />
    </div>
  `,
});

export const Default = customizable();
