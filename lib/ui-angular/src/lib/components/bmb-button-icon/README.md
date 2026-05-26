# BmbButtonIconComponent

The `BmbButtonIconComponent` is a standalone Angular component designed to display an interactive button with an icon. It supports toggling states, outline styles, and emits events for user interactions.

---

## Selector

```html
<bmb-button-icon></bmb-button-icon>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input             | Type      | Default     | Description                                          |
| ----------------- | --------- | ----------- | ---------------------------------------------------- |
| `idElement`       | `string`  | `undefined` | Unique identifier for the button.                    |
| `icon` (required) | `string`  | `undefined` | The name of the icon to display inside the button.   |
| `showContainer`   | `boolean` | `true`      | Determines whether the button has a container style. |
| `disabled`        | `boolean` | `false`     | Disables the button, preventing user interaction.    |

---

## Models

The component uses the following reactive models to manage its state:

| Model       | Type      | Default | Description                                          |
| ----------- | --------- | ------- | ---------------------------------------------------- |
| `active`    | `boolean` | `false` | Indicates whether the button is in an active state.  |
| `isOutline` | `boolean` | `false` | Determines whether the button uses an outline style. |

---

## Outputs

The component emits the following events:

| Output          | Type   | Description                         |
| --------------- | ------ | ----------------------------------- |
| `onButtonClick` | `void` | Emitted when the button is clicked. |

---

## Methods

### `handlePress(): void`

Toggles the `active` state of the button when pressed.

### `handleClick(): void`

Emits the `onButtonClick` event when the button is clicked.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-button-icon
  [idElement]="'unique-id'"
  [icon]="'home'"
  [showContainer]="true"
  [disabled]="false"
  (onButtonClick)="onButtonClicked()"
></bmb-button-icon>
```

---

## Usage Example

```html
<bmb-button-icon
  [idElement]="'button-1'"
  [icon]="'settings'"
  [showContainer]="true"
  [disabled]="false"
  (onButtonClick)="handleButtonClick()"
></bmb-button-icon>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbActionIconComponent` (Bamboo Design System)
