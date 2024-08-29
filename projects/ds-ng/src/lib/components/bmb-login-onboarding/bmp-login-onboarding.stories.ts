import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { BmbLoginOnboardingComponent } from './bmb-login-onboarding.component';
import { Component } from '@angular/core';
import { IBmbLoginOnboarding, IBmbUserInfo } from './types';

@Component({
  standalone: true,
  imports: [BmbLoginOnboardingComponent],
  selector: 'storybook-toast-wrapper',
  template: `
    <div style="max-width: 300px; margin: 0 auto">
      <bmb-login-onboarding (handleRequest)="handleRequest($event)">
        <p>custom content</p>
      </bmb-login-onboarding>
      <bmb-theme initialTheme="dark" [showControls]="false" />
    </div>
  `,
})
class StorybookToastWrapperComponent {
  auth(data: unknown): boolean {
    data;
    return true;
  }

  toTPCode(data: unknown): boolean {
    return data === '123456';
  }

  biometricData(): boolean {
    return true;
  }

  activate(): boolean {
    return true;
  }

  getUserInfo(data: unknown): IBmbUserInfo {
    data;
    return {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://studio-assets.supernova.io/design-systems/74407/16b3da66-1d17-46fe-be94-a01dea059580.svg',
    };
  }

  init(): void {
    console.log('init');
  }

  handleRequest(event: IBmbLoginOnboarding) {
    const { data, action, callback } = event;

    switch (action) {
      case 'auth':
        setTimeout(() => {
          callback(this.auth(data));
        }, 1000);
        break;
      case 'toTP':
        callback(this.toTPCode(data));
        break;
      case 'biometric':
        callback(this.biometricData());
        break;
      case 'activate':
        callback(this.activate());
        break;
      case 'getUserInfo':
        callback(this.getUserInfo(data));
        break;
      case 'init':
        setTimeout(() => {
          callback(this.init());
        }, 1000);
        break;
      default:
        console.log('Invalid action');
    }
  }
}

export default {
  title: 'Macro Componentes/Login onboarding',
  component: BmbLoginOnboardingComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookToastWrapperComponent, BmbLoginOnboardingComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Note: This component **does not have support** for the \`light\` theme.

Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import {
  BmbLoginOnboardingComponent,
  IBmbLoginOnboarding,
   IBmbUserInfo,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoginOnboardingComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  auth(data: unknown): boolean {
    data;
    return true;
  }

  toTPCode(data: unknown): boolean {
    return data === '123456';
  }

  biometricData(): boolean {
    return true;
  }

  activate(): boolean {
    return true;
  }

  getUserInfo(data: unknown): IBmbUserInfo {
    data;
    return {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture: 'https://studio-assets.supernova.io/design-systems/74407/16b3da66-1d17-46fe-be94-a01dea059580.svg',
    };
  }

  init(): void {
    console.log('init');
  }

  handleRequest(event: IBmbLoginOnboarding) {
    const { data, action, callback } = event;

    switch (action) {
      case 'auth':
        setTimeout(() => {
          callback(this.auth(data));
        }, 1000);
        break;
      case 'toTP':
        callback(this.toTPCode(data));
        break;
      case 'biometric':
        callback(this.biometricData());
        break;
      case 'activate':
        callback(this.activate());
        break;
      case 'getUserInfo':
        callback(this.getUserInfo(data));
        break;
      case 'init':
        setTimeout(() => {
          callback(this.init());
        }, 1000);
        break;
      default:
        console.log('Invalid action');
    }
  }
}

\`\`\`

Below is an example of how you can use this component in HTML:
<bmb-login-onboarding (handleRequet)="handleRequet($event)">
  <p>custom content</p>
</bmb-login-onboarding>
        `,
      },
    },
  },
  argTypes: {
    handleRequest: {
      name: 'Handle Request',
      control: null,
      description: 'Output function',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
} as Meta<typeof BmbLoginOnboardingComponent>;

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (
  args,
) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
        <bmb-login-onboarding (handleRequest)="handleRequest($event)">
          <p>custom content</p>
        </bmb-login-onboarding>
      `,
  };
};
