import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbUserProfileComponent,
  IBmbHome,
  IBmbUserInfo,
} from '../../public-api';

@Component({
  standalone: true,
  imports: [BmbUserProfileComponent],
  selector: 'storybook-modal-wrapper',
  template: ` <div>test</div> `,
})
class StorybookModalWrapperComponent {
  // getUserInfo(data?: unknown): IBmbUserInfo {
  //   data;
  //   return {
  //     id: 'A00123456',
  //     fullName: 'Borrego Perez',
  //     profilePicture: '../assets/images/placeholders/user-icon-test.svg',
  //   };
  // }
  // handleRequestHome(event: IBmbHome): void {
  //   const { data, action, callback } = event;
  //   switch (action) {
  //     case 'auth':
  //       /* For testing and development purposes of this tutorial, this code is added as an example.*/
  //       setTimeout(() => {
  //         /*The callback is provided to perform the screen executions in the corresponding order*/
  //         callback(this.auth(data));
  //       }, 1000);
  //       break;
  //     case 'profile':
  //       callback(this.getUserInfo(data));
  //       break;
  //     default:
  //       console.log('Invalid action');
  //   }
  // }
  // auth(data: unknown): boolean {
  //   /*The developer should integrate the service used for authentication in this code block. */
  //   console.log('auth', data);
  //   return true;
  // }
  // handleContinue(event: unknown): void {
  //   /*If this event is emitted, it is possible to continue to the next page, next step or next item on the screen. If we are here we can continue because the event has already been emitted.*/
  //   //Checking the sent event
  //   console.log('event', event);
  // }
}

export default {
  title: 'Macro Componentes/Home Mitec',
  component: '',
  decorators: [
    moduleMetadata({
      imports: [StorybookModalWrapperComponent],
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
    div
  ',
  styleUrl: './component.scss',
})
export class Component {

\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  // argTypes: {
  //   title: {
  //     name: 'Title',
  //     control: {
  //       type: 'text',
  //     },
  //     description:
  //       'Specifies the text display. This message should be concise and direct.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   subtitle: {
  //     name: 'Subtitle',
  //     control: {
  //       type: 'text',
  //     },
  //     description:
  //       'Specifies the subtitle text display. This message should be concise and direct.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   content: {
  //     name: 'Content',
  //     control: {
  //       type: 'text',
  //     },
  //     description:
  //       'Specifies the body text display. This attribute can receive a Template Reference instead of the string.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   size: {
  //     name: 'Size',
  //     control: {
  //       type: 'select',
  //     },
  //     options: ['small', 'medium', 'large'],
  //     description: 'Specifies the size of the modal.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   type: {
  //     name: 'Type',
  //     control: {
  //       type: 'select',
  //     },
  //     options: ['alert', 'informative', 'action'],
  //     description: 'Specifies the type of the modal.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   alertStyle: {
  //     name: 'Alert Style',
  //     control: {
  //       type: 'select',
  //     },
  //     options: [
  //       'normal',
  //       'primary',
  //       'success',
  //       'event',
  //       'warning',
  //       'error',
  //       'neutral',
  //     ],
  //     description: 'Specifies the style of the alert.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   primaryBtnLabel: {
  //     name: 'Primary Button Label',
  //     control: {
  //       type: 'text',
  //     },
  //     description: 'Specifies the text of the primary button.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   secondaryBtnLabel: {
  //     name: 'Secondary Button Label',
  //     control: {
  //       type: 'text',
  //     },
  //     description: 'Specifies the text of the secondary button.',
  //     table: {
  //       category: 'Properties',
  //     },
  //   },
  //   primaryAction: {
  //     name: 'Primary Action',
  //     control: {
  //       type: null,
  //     },
  //     description:
  //       'Specifies the action to execute when the primary button is clicked.',
  //     table: {
  //       category: 'Events',
  //       type: { summary: 'function' },
  //     },
  //   },
  //   secondaryAction: {
  //     name: 'Secondary Action',
  //     control: {
  //       type: null,
  //     },
  //     description:
  //       'Specifies the action to execute when the secondary button is clicked.',
  //     table: {
  //       category: 'Events',
  //       type: { summary: 'function' },
  //     },
  //   },
  // },
  // args: {
  //   title: 'Modal Title',
  //   subtitle: 'Modal Subtitle',
  //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //   size: 'small',
  //   type: 'action',
  //   alertStyle: 'error',
  //   primaryBtnLabel: 'Action',
  //   secondaryBtnLabel: 'Cancel',
  // },
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
      <storybook-modal-wrapper></storybook-modal-wrapper>
    `,
  };
};
