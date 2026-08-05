# BmbChatBarComponent

The `BmbChatBarComponent` is a standalone Angular component designed to provide an interactive chat bar with support for bots, actions, file uploads, and voice recording. It is highly customizable and responsive, making it suitable for various chat-related use cases.

---

## Selector

```html
<bmb-chat-bar></bmb-chat-bar>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input         | Type                | Default                        | Description                                       |
| ------------- | ------------------- | ------------------------------ | ------------------------------------------------- |
| `placeholder` | `string`            | `'¿Qué deseas encontrar hoy?'` | Placeholder text for the input field.             |
| `botList`     | `IBotType[]`        | `defaultBotList`               | List of available bots for selection.             |
| `actionsList` | `IChatBarActions[]` | `defaultActionList`            | List of available actions for the chat bar.       |
| `showEmoji`   | `boolean`           | `false`                        | Determines whether the emoji picker is displayed. |

---

## Outputs

The component emits the following events:

| Output          | Type      | Description                                   |
| --------------- | --------- | --------------------------------------------- |
| `onSendMessage` | `string`  | Emitted when a message is sent.               |
| `onSendFiles`   | `File[]`  | Emitted when files are uploaded.              |
| `onRecord`      | `boolean` | Emitted when voice recording starts or stops. |
| `onEmoji`       | `boolean` | Emitted when the emoji picker is triggered.   |

---

## Methods

### `handleSend(): void`

Sends the current message and any attached files. Emits the `onSendMessage` and `onSendFiles` events.

### `handleChangeBot(bot: IBotType): void`

Changes the current bot and updates the bot selection dialog.

### `handleMic(): void`

Starts voice recording and emits the `onRecord` event.

### `handleStopMic(): void`

Stops voice recording and emits the `onRecord` event.

### `onDrop(event: any): void`

Handles file drop events for uploading files.

### `onFileSelect(event: any): void`

Handles file selection via the file input.

### `createImageThumbnail(file: File): void`

Creates a thumbnail for image files.

### `deleteFile(index: number): void`

Deletes a file from the uploaded files list.

### `handlePaginate(items: any[], page: number): void`

Handles pagination for the actions list.

### `handleDotPress(index: number): void`

Navigates to a specific page in the actions list.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-chat-bar
  [placeholder]="'Escribe un mensaje...'"
  [botList]="[{ name: 'TecBot', icon: 'bot_tecStandar' }]"
  [actionsList]="[{ name: 'Action 1', icon: 'icon1' }, { name: 'Action 2', icon: 'icon2' }]"
  [showEmoji]="true"
  (onSendMessage)="handleSendMessage($event)"
  (onSendFiles)="handleSendFiles($event)"
  (onRecord)="handleRecord($event)"
  (onEmoji)="handleEmoji($event)"
></bmb-chat-bar>
```

---

## Usage Example

```html
<bmb-chat-bar
  [placeholder]="'Type your message here...'"
  [botList]="[
    { name: 'SupportBot', icon: 'support_bot' },
    { name: 'SalesBot', icon: 'sales_bot' }
  ]"
  [actionsList]="[
    { name: 'Help', icon: 'help_icon' },
    { name: 'Settings', icon: 'settings_icon' }
  ]"
  [showEmoji]="true"
  (onSendMessage)="onMessageSent($event)"
  (onSendFiles)="onFilesUploaded($event)"
  (onRecord)="onVoiceRecord($event)"
  (onEmoji)="onEmojiTriggered($event)"
></bmb-chat-bar>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `ReactiveFormsModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
- `BmbDotPaginatorComponent` (Bamboo Design System)
- `BmbActionIconComponent` (Bamboo Design System)

---

## Notes

- The component supports drag-and-drop file uploads and file selection via an input field.
- The `botList` and `actionsList` inputs can be customized to fit specific use cases.
- The component is responsive and adapts to different screen sizes, with a mobile-friendly dialog for bot selection.
