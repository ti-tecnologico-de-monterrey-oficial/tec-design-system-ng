# BmbChevronTitleSelectorComponent

The `BmbChevronTitleSelectorComponent` is a standalone Angular component designed to display a title with optional subtitle and leading/trailing icons. It provides interactivity through click events on the icons, making it suitable for use in lists, selectors, or navigation elements.

---

## Selector

```html
<bmb-chevron-title-selector></bmb-chevron-title-selector>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input            | Type      | Default     | Description                                                                 |
|-------------------|-----------|-------------|-----------------------------------------------------------------------------|
| `title` (required)| `string`  | `undefined` | The main title text to display.                                            |
| `subtitle`        | `string`  | `undefined` | The subtitle text to display below the title.                              |
| `isIconSubtitle`  | `boolean` | `undefined` | Determines whether the subtitle is displayed as an icon.                   |
| `iconSubtitle`    | `string`  | `''`        | The icon to display as the subtitle (if `isIconSubtitle` is `true`).       |
| `leadingIcon`     | `string`  | `''`        | The icon displayed on the left side of the title.                          |
| `trailingIcon`    | `string`  | `''`        | The icon displayed on the right side of the title.                         |

---

## Outputs

The component emits the following events:

| Output            | Type       | Description                                                                 |
|--------------------|------------|-----------------------------------------------------------------------------|
| `onLeadingClick`   | `any`      | Emitted when the leading icon is clicked.                                   |
| `onTrailingClick`  | `any`      | Emitted when the trailing icon is clicked.                                  |

---

## Methods

### `handleLeadingClick(event: any): void`
Handles the click event for the leading icon and emits the `onLeadingClick` output.

### `handleTrailingClick(event: any): void`
Handles the click event for the trailing icon and emits the `onTrailingClick` output.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-chevron-title-selector
  [title]="'Main Title'"
  [subtitle]="'Subtitle Text'"
  [isIconSubtitle]="false"
  [iconSubtitle]="'info'"
  [leadingIcon]="'menu'"
  [trailingIcon]="'chevron-right'"
  (onLeadingClick)="handleLeadingIconClick($event)"
  (onTrailingClick)="handleTrailingIconClick($event)"
></bmb-chevron-title-selector>
```

---

## Usage Example

### Example 1: Basic Title with Subtitle

```html
<bmb-chevron-title-selector
  [title]="'Settings'"
  [subtitle]="'Manage your preferences'"
  [leadingIcon]="'settings'"
  [trailingIcon]="'chevron-right'"
  (onTrailingClick)="navigateToSettings()"
></bmb-chevron-title-selector>
```

### Example 2: Icon Subtitle

```html
<bmb-chevron-title-selector
  [title]="'Notifications'"
  [isIconSubtitle]="true"
  [iconSubtitle]="'bell'"
  [leadingIcon]="'notifications'"
  [trailingIcon]="'chevron-right'"
  (onTrailingClick)="openNotifications()"
></bmb-chevron-title-selector>
```

---

## Dependencies

The component relies on the following modules and components:

- `BmbThreeColsComponent` (Bamboo Design System)
- `BmbTitleContentComponent` (Bamboo Design System)
- `BmbActionIconComponent` (Bamboo Design System)

---

## Notes

- The `leadingIcon` and `trailingIcon` inputs allow for flexible customization of the icons displayed on either side of the title.
- The `isIconSubtitle` input enables the use of an icon as the subtitle, providing a more visual representation.
- The component is designed with accessibility and responsiveness in mind.
