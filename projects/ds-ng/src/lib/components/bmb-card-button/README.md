# BmbCardButtonComponent

The `BmbCardButtonComponent` is a standalone Angular component designed to display a card with interactive features such as badges, icons, menus, and customizable content. It supports both full-size and small card layouts, making it versatile for various use cases.

---

## Selector

```html
<bmb-card-button></bmb-card-button>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input               | Type                    | Default     | Description                                            |
| ------------------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `isFullInteractive` | `boolean`               | `true`      | Enables full interactivity for the card.               |
| `title`             | `string`                | `''`        | The title of the card.                                 |
| `body`              | `string`                | `''`        | The body text of the card.                             |
| `badge`             | `IBmbBadgeInfo`         | `undefined` | Information for the badge displayed on the card.       |
| `icon`              | `string`                | `''`        | The icon displayed on the card.                        |
| `leftContentIcon`   | `string`                | `''`        | The icon displayed in the left content area.           |
| `leftContentImage`  | `IBmbImageInfo`         | `undefined` | The image displayed in the left content area.          |
| `leftContent`       | `boolean`               | `false`     | Determines whether the left content area is displayed. |
| `hasMenu`           | `boolean`               | `false`     | Enables a dropdown menu for the card.                  |
| `menuItems`         | `IDropdownItem[]`       | `[]`        | The items displayed in the dropdown menu.              |
| `isTemplate`        | `boolean`               | `false`     | Indicates whether the card uses a custom template.     |
| `textLink`          | `IBmbLinkConfiguration` | `undefined` | Configuration for the text link displayed on the card. |
| `isSmall`           | `boolean`               | `false`     | Enables the small card layout.                         |
| `botIcon`           | `string`                | `''`        | The icon displayed at the bottom of the small card.    |
| `botImage`          | `IBmbImageInfo`         | `undefined` | The image displayed at the bottom of the small card.   |
| `smallIcon`         | `string`                | `''`        | The icon displayed in the small card layout.           |
| `smallTitle`        | `string`                | `''`        | The title displayed in the small card layout.          |
| `smallDescription`  | `string`                | `''`        | The description displayed in the small card layout.    |

---

## Outputs

The component emits the following events:

| Output              | Type   | Description                                         |
| ------------------- | ------ | --------------------------------------------------- |
| `onAddContentClick` | `any`  | Emitted when the "Add Content" action is triggered. |
| `onTitleClick`      | `any`  | Emitted when the card title is clicked.             |
| `onSmallClick`      | `void` | Emitted when the small card is clicked.             |

---

## Methods

### `truncateText(text: string, maxLength: number): string`

Truncates the provided text to the specified maximum length and appends ellipsis (`...`) if necessary.

### `handleSmallClick(event: any): void`

Handles the click event for the small card layout and toggles the `isFlipped` state.

### `handleTitleClick(event: any): void`

Handles the click event for the card title and emits the `onTitleClick` event.

### `handleAddContent(event: any): void`

Handles the "Add Content" action and emits the `onAddContentClick` event based on the card's configuration.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-card-button
  [isFullInteractive]="true"
  [title]="'Card Title'"
  [body]="'This is the body text of the card.'"
  [badge]="{ text: 'New', appearance: 'primary' }"
  [icon]="'home'"
  [leftContentIcon]="'menu'"
  [leftContentImage]="{ src: 'image.jpg', alt: 'Image' }"
  [leftContent]="true"
  [hasMenu]="true"
  [menuItems]="[{ label: 'Option 1', action: 'action1' }, { label: 'Option 2', action: 'action2' }]"
  [isSmall]="false"
  [botIcon]="'settings'"
  [smallTitle]="'Small Card Title'"
  [smallDescription]="'Small card description.'"
  (onAddContentClick)="handleAddContent($event)"
  (onTitleClick)="handleTitleClick($event)"
  (onSmallClick)="handleSmallClick($event)"
>
  <ng-template #customContent>
    <p>Custom content goes here.</p>
  </ng-template>
</bmb-card-button>
```

---

## Usage Example

```html
<bmb-card-button
  [isFullInteractive]="true"
  [title]="'Interactive Card'"
  [body]="'This card has interactive features.'"
  [badge]="{ text: 'Hot', appearance: 'warning' }"
  [icon]="'star'"
  [leftContent]="true"
  [hasMenu]="true"
  [menuItems]="[{ label: 'Edit', action: 'edit' }, { label: 'Delete', action: 'delete' }]"
  (onAddContentClick)="onAddContent($event)"
  (onTitleClick)="onTitleClick($event)"
  (onSmallClick)="onSmallClick($event)"
>
  <ng-template #customContent>
    <p>Custom content for the card.</p>
  </ng-template>
</bmb-card-button>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `FormsModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
- `BmbBadgeComponent` (Bamboo Design System)
- `BmbDropdownMenuComponent` (Bamboo Design System)
- `BmbTextLinkComponent` (Bamboo Design System)
