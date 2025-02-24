import type { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { BmbDigitalIdComponent } from './bmb-digital-id.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Macro Componentes/Digital Id',
  component: BmbDigitalIdComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDigitalIdComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [BmbDigitalIdComponent],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent(){
    access() {
        window.alert('Access Button');
    }
}
\`\`\`
Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    name: {
      name: 'Name',
      control: {
        type: 'text',
      },
      description: 'The name of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    surname: {
      name: 'SurName',
      control: {
        type: 'text',
      },
      description: 'The Surname of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    registration: {
      name: 'Registration',
      control: {
        type: 'text',
      },
      description: 'The id of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    campus: {
      name: 'Campus',
      control: {
        type: 'text',
      },
      description: 'The Campus of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    career: {
      name: 'Career',
      control: {
        type: 'text',
      },
      description: 'The career of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    role: {
      name: 'Role',
      control: {
        type: 'text',
      },
      description: 'The role of the user to show.',
      table: {
        category: 'Properties',
      },
    },
    textButton: {
      name: 'Text Button',
      control: {
        type: 'text',
      },
      description: 'The text that the action button shows.',
      table: {
        category: 'Properties',
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an icon. If you need to set an image as icon, you can set the image path here.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    imgProfile: {
      name: 'Image Profile',
      control: {
        type: 'text',
      },
      description: 'The source of the image to display.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    imgBackground: {
      name: 'Image Background',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display in the background of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    hideButton: {
      name: 'Hide Button',
      control: { type: 'boolean' },
      description: 'Sets the if the button is visible to the user',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    close: {
      name: 'Handle Close',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that close the component',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    access: {
      name: 'Handle Access',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that button access was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    name: 'Paola',
    surname: 'Montes Perez',
    registration: 'L0353882',
    career: 'ITICS',
    campus: 'Campus Tec Norte',
    role: 'Estudiante',
    textButton: 'Acceso a Campues',
    icon: 'qr_code_scanner',
    hideButton: false,
    imgProfile: 'https://picsum.photos/id/64/200/300',
    imgBackground:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    access: () => {
      window.alert('Access Button');
    },
    close: () => {
      window.alert('Close Button');
    },
  },
} as Meta<typeof BmbDigitalIdComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <div style="max-width: 430px; margin: 0 auto">
      <bmb-digital-id
        ${attributes(args)}
      />
    </div>
  `,
});

export const Default = customizable();
