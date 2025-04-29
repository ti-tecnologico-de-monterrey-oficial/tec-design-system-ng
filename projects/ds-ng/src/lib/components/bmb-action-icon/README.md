# BmbActionIconComponent

The `BmbActionIconComponent` is a standalone Angular component designed to display an interactive icon with customizable behavior. It supports toggling states, notifications, and external links, making it versatile for various use cases.

---

## Selector

```html
<bmb-action-icon></bmb-action-icon>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input              | Type             | Default     | Description                                            |
| ------------------ | ---------------- | ----------- | ------------------------------------------------------ | ---------------------------------------------------- |
| `idElement`        | `string`         | `undefined` | Unique identifier for the component.                   |
| `icon` (required)  | `string`         | `undefined` | The name of the icon to display.                       |
| `alt`              | `string`         | `''`        | Alternative text for the icon.                         |
| `iconSize`         | `number          | undefined`  | `undefined`                                            | The size of the icon in pixels.                      |
| `toggleIconActive` | `string          | undefined`  | `undefined`                                            | The icon to display when the toggle state is active. |
| `isToggleActive`   | `boolean         | undefined`  | `false`                                                | Indicates whether the toggle state is active.        |
| `isAccentColor`    | `boolean         | undefined`  | `true`                                                 | Determines if the icon uses an accent color.         |
| `dotNotification`  | `number`         | `undefined` | Displays a notification dot with the specified number. |
| `target`           | `IBmbTargetLink` | `undefined` | Specifies the target link for the action.              |
| `link`             | `string`         | `undefined` | The URL to navigate to when the icon is clicked.       |
| `disabled`         | `boolean`        | `false`     | Disables the component, preventing interaction.        |

---

## Outputs

The component emits the following events:

| Output        | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| `buttonPress` | `void` | Emitted when the icon is pressed. |
| `buttonClick` | `void` | Emitted when the icon is clicked. |

---

## Methods

### `getIcon(): string`

Returns the appropriate icon based on the toggle state. If `isToggleActive` is `true` and `toggleIconActive` is defined, it returns the active icon; otherwise, it returns the default `icon`.

### `handlePress(): void`

Emits the `buttonPress` event when the icon is pressed.

### `handleClick(): void`

Toggles the `isToggleActive` state (if `toggleIconActive` is defined) and emits the `buttonClick` event.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-action-icon [idElement]="'unique-id'" [icon]="'home'" [alt]="'Home Icon'" [iconSize]="24" [toggleIconActive]="'home-filled'" [isToggleActive]="false" [isAccentColor]="true" [dotNotification]="3" [target]="{ href: 'https://example.com', target: '_blank' }" [link]="'https://example.com'" [disabled]="false" (buttonPress)="onIconPressed()" (buttonClick)="onIconClicked()"></bmb-action-icon>
```

---

## Usage Example

```html
<bmb-action-icon [idElement]="'action-icon-1'" [icon]="'settings'" [alt]="'Settings Icon'" [iconSize]="32" [toggleIconActive]="'settings-filled'" [isToggleActive]="true" [isAccentColor]="false" [dotNotification]="5" [target]="{ href: 'https://example.com/settings', target: '_self' }" [link]="'https://example.com/settings'" [disabled]="false" (buttonPress)="onSettingsPressed()" (buttonClick)="onSettingsClicked()"></bmb-action-icon>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
- `BmbCheckExternalLinkButtonComponent` (Bamboo Design System)
