import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { BmbProfileComponent } from './bmb-profile.component';
import { Component, input, output } from '@angular/core';
import { IBmbProfileData } from '../../types';
import { IBmbTargetLink } from '../bmb-text-link/bmb-text-link.component';
import { BmbThemeComponent } from '../bmb-theme/bmb-theme.component';

@Component({
  standalone: true,
  imports: [BmbProfileComponent, BmbThemeComponent],
  selector: 'storybook-wrapper',
  template: `
    <div style="max-width: 450px; margin: 0 auto">
      <bmb-profile
        [userData]="userData()"
        [campusAcessLink]="campusAcessLink()"
        [idDigitalLink]="idDigitalLink()"
        [targetLinks]="targetLinks()"
        (handleCloseSession)="closeSession()"
      >
      </bmb-profile>
      <bmb-theme [initialTheme]="'light'" [showControls]="false" />
    </div>
  `,
})
class StorybookWrapperComponent {
  userData = input.required<IBmbProfileData>();
  campusAcessLink = input<string>('');
  idDigitalLink = input<string>('');
  targetLinks = input<IBmbTargetLink>('_blank');
  handleCloseSession = output();

  closeSession(): void {
    window.alert('Cerrar Session');
  }
}

export default {
  title: 'Macro Componentes/Profile',
  decorators: [
    moduleMetadata({
      imports: [StorybookWrapperComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import {
  BmbLoginComponent,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoginComponent ],
  templateUrl: '
  <!-- USE EXAMPLE -->
    <bmb-profile 
        [userData]="{
            name: 'Juanito Perez',
            userImg: 'https://picsum.photos/200/300',
            matricula: 'A032132',
            mail: 'mail@tec.mx',
            period: 'AGO-DIC 24',
            campus: 'Monterrey',
            program: 'ARQ19'
        }"
        [campusAcessLink]="'https://www.youtube.com'"
        [idDigitalLink]="'https://www.x.com'"
        [targetLinks]="'_blank'"
        (handleCloseSession)="closeSession()"
     />
  ',
  styleUrl: './component.scss',
})
export class AppComponent {
 
  closeSession(){
    console.log("Cerrar Sesion")
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
        category: 'Properties',
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
      control: 'text',
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    handleCloseSession: {
      name: 'Handle Close Session',
      control: null,
      description:
        'Output function, returns a void signal to indicates that close session button was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    userData: {
      name: 'Juanito Perez',
      userImg: 'https://picsum.photos/200/300',
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
  },
} as Meta<typeof BmbProfileComponent>;

function attributes(object: { [key: string]: any }): string {
  console.log('Object', object);
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'userData') {
        return `[${key}]='${JSON.stringify(value)}'`;
      } else {
        return `${key}="${value}"`;
      }
    })
    .join(' ');
}

export const Default: StoryFn<typeof StorybookWrapperComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-wrapper
        ${attributes(args)}
        (handleCloseSession)="closeSession()"
      ></storybook-wrapper>
      <!-- HTML CODE IS IN THE TOP OF THE DOCUMENTATION -->
      `,
  };
};
