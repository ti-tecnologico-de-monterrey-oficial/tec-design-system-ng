import { Component, Input, ViewChild } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbToastComponent } from './bmb-toast.component';
import { ToastService } from '../../services/toast.service';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  standalone: true,
  imports: [BmbToastComponent, BmbButtonDirective],
  selector: 'storybook-toast-wrapper',
  template: `
    <button
      bmbButton
      appearance="primary"
      icon="home"
      size="small"
      position="left"
      [case]="false"
      (click)="onButtonClick()"
    >
      Click Here
    </button>
    <bmb-toast
      [message]="message"
      [appearance]="appearance"
      [duration]="duration"
      [position]="position"
    ></bmb-toast>
  `,
})
class StorybookToastWrapperComponent {
  @Input() appearance: string = '';
  @Input() message: string = '';
  @Input() duration?: number;
  @Input() position?: 'top' | 'bottom' | 'middle';

  @ViewChild(BmbToastComponent)
  private toastComponent!: BmbToastComponent;
  onButtonClick() {
    this.toastComponent.openToast();
  }
}

export default {
  title: 'Toast',
  component: BmbToastComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbToastComponent,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      providers: [ToastService],
    }),
  ],
  argTypes: {
    message: { control: 'text' },
    appearance: {
      control: 'radio',
      options: [
        'neutral',
        'primary',
        'successful',
        'warning',
        'error',
        'event',
      ],
    },
    duration: { control: 'number' },
    position: { control: 'radio', options: ['top', 'bottom', 'middle'] },
  },
  args: {
    message: 'Your toast text here',
    appearance: 'neutral',
    duration: 5000,
    position: 'top',
  },
} as Meta<typeof BmbToastComponent>;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'duration') {
        return `[${key}]="${value}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

export const Default: StoryFn<typeof BmbToastComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instrucción para los usuarios: Este componente se utiliza para la lógica interna de Storybook y no debe copiarse -->
      <storybook-toast-wrapper ${attributes(args)}></storybook-toast-wrapper>

<!----------------------------------
Para abrir el toast, incluye esto en tu component.ts
@ViewChild(BmbToastComponent)
private toastComponent!: BmbToastComponent;
onButtonClick() {
  this.toastComponent.openToast();
}
------------------------------------>
      
      <!-- Comience a copiar desde aquí -->
      <div class="actions">
      <button bmbButton appearance="primary" icon="home" size="small" position="left" [case]="false" (click)="onButtonClick()">Click Here</button>
      <bmb-toast ${attributes(args)}></bmb-toast></div>`,
  };
};
