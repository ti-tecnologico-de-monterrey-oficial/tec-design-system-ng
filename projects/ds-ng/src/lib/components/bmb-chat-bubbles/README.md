# BmbChatBubblesComponent

The `BmbChatBubblesComponent` is a standalone Angular component designed to display chat messages in a bubble format. It supports both user and bot messages, with additional features for GPT-like bots, including interactive icons for actions such as repeat, voice, copy, like, and dislike.

---

## Selector

```html
<bmb-chat-bubble></bmb-chat-bubble>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input            | Type               | Default                                                                | Description                                           |
| ---------------- | ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------- |
| `iconBot`        | `string`           | `'/assets/images/bot-icons/bot_tecStandar.svg'`                        | The icon displayed for the bot.                       |
| `message`        | `IBmbChatMessage`  | `undefined`                                                            | The chat message to display (required).               |
| `gptBot`         | `boolean`          | `false`                                                                | Indicates whether the message is from a GPT-like bot. |
| `gptIcons`       | `boolean`          | `false`                                                                | Enables GPT-specific icons for actions.               |
| `isThinking`     | `boolean`          | `false`                                                                | Displays a "thinking" animation for the bot.          |
| `gptActiveIcons` | `IBmbChatGptIcons` | `{ repeat: true, voice: true, copy: true, like: true, dislike: true }` | Configures which GPT-specific icons are active.       |

---

## Outputs

The component emits the following events:

| Output            | Type   | Description                                     |
| ----------------- | ------ | ----------------------------------------------- |
| `onRepeatRequest` | `void` | Emitted when the "repeat" action is triggered.  |
| `onVoice`         | `void` | Emitted when the "voice" action is triggered.   |
| `onCopy`          | `void` | Emitted when the "copy" action is triggered.    |
| `onLike`          | `void` | Emitted when the "like" action is triggered.    |
| `onDislike`       | `void` | Emitted when the "dislike" action is triggered. |

---

## Methods

### `handleRepeat(): void`

Emits the `onRepeatRequest` event when the "repeat" icon is clicked.

### `handleVoice(): void`

Emits the `onVoice` event when the "voice" icon is clicked.

### `handleCopyContent(): void`

Emits the `onCopy` event when the "copy" icon is clicked.

### `handleLike(): void`

Emits the `onLike` event when the "like" icon is clicked.

### `handleDislike(): void`

Emits the `onDislike` event when the "dislike" icon is clicked.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-chat-bubble
  [iconBot]="'/assets/images/bot-icons/custom_bot.svg'"
  [message]="{ text: 'Hello, how can I help you?', sender: 'bot' }"
  [gptBot]="true"
  [gptIcons]="true"
  [isThinking]="false"
  [gptActiveIcons]="{ repeat: true, voice: true, copy: true, like: true, dislike: true }"
  (onRepeatRequest)="handleRepeat()"
  (onVoice)="handleVoice()"
  (onCopy)="handleCopy()"
  (onLike)="handleLike()"
  (onDislike)="handleDislike()"
></bmb-chat-bubble>
```

---

## Usage Example

```html
<bmb-chat-bubble
  [iconBot]="'/assets/images/bot-icons/chat_gpt.svg'"
  [message]="{ text: 'This is a GPT bot message.', sender: 'bot' }"
  [gptBot]="true"
  [gptIcons]="true"
  [isThinking]="true"
  [gptActiveIcons]="{ repeat: true, voice: false, copy: true, like: true, dislike: false }"
  (onRepeatRequest)="onRepeat()"
  (onVoice)="onVoice()"
  (onCopy)="onCopy()"
  (onLike)="onLike()"
  (onDislike)="onDislike()"
></bmb-chat-bubble>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbUserImageComponent` (Bamboo Design System)
- `BmbIconComponent` (Bamboo Design System)
- `BmbTextLinkComponent` (Bamboo Design System)

---

## Notes

- The `gptBot` input enables GPT-specific behavior, such as displaying a custom bot icon and enabling GPT-specific actions.
- The `isThinking` input can be used to display a "typing" or "thinking" animation for the bot.
- The `gptActiveIcons` input allows fine-grained control over which GPT-specific icons are displayed.
