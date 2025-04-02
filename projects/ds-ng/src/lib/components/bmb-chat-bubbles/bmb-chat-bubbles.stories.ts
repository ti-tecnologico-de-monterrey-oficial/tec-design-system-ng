import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';
import { IBmbChatMessage, TBmbMessageType, MessageContent } from './types';
import { attributes } from '../../utils/utils';
import { AfterViewInit, InputSignal, TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'storybook-modal-wrapper',
  template: `
    <ng-template #customTemplate>
    <div class="custom-content">
        <strong>🌟 Respuesta especial 🌟</strong>
        <p>¡Este es un contenido personalizado!</p>
    </div>
    </ng-template>

    <button (click)="agregarChat()">Clcik Aqui</button>
  `,
})
class StorybookModalWrapperComponent implements AfterViewInit {
    @ViewChild('customTemplate') customTemplate!: TemplateRef<unknown>;

    ngAfterViewInit(): void {

    }
}

export default {
  title: 'Micro Componentes/Chat bubbles',
  component: BmbChatBubblesComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbChatBubblesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
// optional you can customize the bot list from:
// import { defaultBotList, IBotType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbChatBubblesComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    iconBot: {
      name: 'Icon Bot',
      control: { type: 'text' },
      description: 'Use the url or the path for the icon bot',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    message: {
      name: 'Message',
      control: { type: 'object' },
      description: 'Set the information requiered for the chat bubble, includes the text, type of the text, image for the user etc.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbChatMessage' },
        defaultValue: { summary: {isUserMessage: false, type: 'text', content: {text: ' Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Ut justo.'}, time: '2025-03-27T15:48:33.065Z'} }
      },
    },
    gptBot: {
      name: 'GPT Bot',
      control: { type: 'boolean' },
      description: 'Set if the icon of Gpt will be used in the component.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    gptIcons: {
      name: 'GPT Icons',
      control: { type: 'boolean' },
      description: 'Set the extra icons, these icons are only for the response from the bot, not for the user.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isThinking: {
      name: 'Is Thinking',
      control: { type: 'boolean' },
      description: 'If this property is set as true, the componet show an animation as if it were thinking.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onRepeatRequest: {
      name: 'On Repeat Request',
      control: null,
      description: 'Emmit the event to repeat te request',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onVoice: {
      name: 'On Voice',
      control: null,
      description: 'Emmit the Voice event when the button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onCopy: {
      name: 'On Copy',
      control: null,
      description:
        'Emmit the copy event to copy the content of the chat bubble, the event only returns a signal to indicates the click event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onLike: {
      name: 'On Like',
      control: null,
      description:
        'Emmit the event when the like button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onDislike: {
      name: 'On Dislike',
      control: null,
      description:
        'Emmit the event when the dislike button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    message: {
        isUserMessage: false as unknown as InputSignal<boolean>,
        userProfile: 'https://picsum.photos/id/64/200/300' as unknown as InputSignal<string>,
        type: 'text' as unknown as InputSignal<TBmbMessageType>,
        content: {
          text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.' as unknown as InputSignal<MessageContent>
        },
        time: new Date() as unknown as InputSignal<Date>,
    } as unknown as InputSignal<IBmbChatMessage>,
    gptIcons: false as unknown as InputSignal<boolean>,
    onRepeatRequest: () => {
        window.alert('Repeat request Button');
    },
    onVoice: () => {
        window.alert('Play Voice Button');
    },
    onCopy: () => {
        window.alert('Copy Button');
    },
    onLike: () => {
        window.alert('Like Button');
    },
    onDislike: () => {
        window.alert('Dislike Button');
    },
  },
} as Meta<typeof BmbChatBubblesComponent>;

type Story = StoryObj<BmbChatBubblesComponent>;

export const Default: Story = {
};

export const UserMsg: Story = {
    args: {
        message: {
            isUserMessage: true as unknown as InputSignal<boolean>,
            userProfile: 'https://picsum.photos/id/64/200/300' as unknown as InputSignal<string>,
            type: 'text' as unknown as InputSignal<TBmbMessageType>,
            content: {
              text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.' as unknown as InputSignal<MessageContent>
            },
            time: new Date() as unknown as InputSignal<Date>,
        } as unknown as InputSignal<IBmbChatMessage>,
    },
    ...Default,
}

export const ChatGpt: Story = {
    args: {
        message: {
            isUserMessage: false as unknown as InputSignal<boolean>,
            type: 'text' as unknown as InputSignal<TBmbMessageType>,
            content: {
              text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.' as unknown as InputSignal<MessageContent>
            },
            time: new Date() as unknown as InputSignal<Date>,
        } as unknown as InputSignal<IBmbChatMessage>,
        gptIcons: true as unknown as InputSignal<boolean>,
        gptBot: true as unknown as InputSignal<boolean>,
    },
    ...Default,
}

export const LinkResponse: Story = {
    args: {
        message: {
            isUserMessage: false as unknown as InputSignal<boolean>,
            type: 'link' as unknown as InputSignal<TBmbMessageType>,
            content: {
              text: 'Link de prueba' as unknown as InputSignal<MessageContent>,
              link: 'https://www.youtube.com' as unknown as InputSignal<MessageContent>
            },
            time: new Date() as unknown as InputSignal<Date>,
        } as unknown as InputSignal<IBmbChatMessage>,
        gptIcons: true as unknown as InputSignal<boolean>,
        gptBot: true as unknown as InputSignal<boolean>,
    },
    ...Default,
}

export const TextAndImage: Story = {
    args: {
        message: {
            isUserMessage: false as unknown as InputSignal<boolean>,
            type: 'mixed' as unknown as InputSignal<TBmbMessageType>,
            content: {
              text: 'Lorem insup' as unknown as InputSignal<MessageContent>,
              imageUrl: 'https://picsum.photos/id/64/200/300' as unknown as InputSignal<MessageContent>
            },
            time: new Date() as unknown as InputSignal<Date>,
        } as unknown as InputSignal<IBmbChatMessage>,
    },
    ...Default,
}

export const Thinking: Story = {
    args: {
        message: {
            isUserMessage: false as unknown as InputSignal<boolean>,
            type: 'mixed' as unknown as InputSignal<TBmbMessageType>,
            content: {
              text: 'Lorem insup' as unknown as InputSignal<MessageContent>,
              imageUrl: 'https://picsum.photos/id/64/200/300' as unknown as InputSignal<MessageContent>
            },
            time: new Date() as unknown as InputSignal<Date>,
        } as unknown as InputSignal<IBmbChatMessage>,
        gptIcons: false as unknown as InputSignal<boolean>,
        isThinking: true as unknown as InputSignal<boolean>,
    },
    ...Default,
}