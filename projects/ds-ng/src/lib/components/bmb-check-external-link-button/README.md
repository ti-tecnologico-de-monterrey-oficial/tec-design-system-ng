# BmbCheckExternalLinkButtonComponent

The `BmbCheckExternalLinkButtonComponent` is a standalone Angular component designed to handle both internal and external links. It provides a button-like interface that can either navigate to a link or trigger custom actions. The component supports templates for customization and emits events for user interactions.

---

## Selector

```html
<bmb-check-external-link-button></bmb-check-external-link-button>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input       | Type             | Default    | Description                                                        |
| ----------- | ---------------- | ---------- | ------------------------------------------------------------------ | --------------------------------- |
| `idElement` | `string          | undefined` | `''`                                                               | Unique identifier for the button. |
| `link`      | `string`         | `''`       | The URL to navigate to when the button is clicked.                 |
| `target`    | `IBmbTargetLink` | `'_blank'` | Specifies how the link should be opened (e.g., `_blank`, `_self`). |
| `disabled`  | `boolean`        | `false`    | Disables the button, preventing user interaction.                  |

---

## Outputs

The component emits the following events:

| Output        | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| `buttonPress` | `void` | Emitted when the button is pressed. |
| `buttonClick` | `void` | Emitted when the button is clicked. |

---

## Methods

### `isExternalLink(link: string): boolean`

Determines whether the provided link is an external URL.

### `isButton(isLink: boolean): boolean`

Returns `true` if the component should behave as a button (i.e., no link is provided).

### `handlePress(event: any): void`

Handles the button press event, emits the `buttonPress` output, and stops event propagation.

### `handleClick(event: any): void`

Handles the button click event, emits the `buttonClick` output, and stops event propagation.

---

## Content Projection

The component supports content projection using the `commonTemplate` template reference. This allows you to customize the button's content.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-check-external-link-button [idElement]="'unique-id'" [link]="'https://example.com'" [target]="'_blank'" [disabled]="false" (buttonPress)="onButtonPress()" (buttonClick)="onButtonClick()">
  <ng-template #commonTemplate>
    <span>Custom Button Content</span>
  </ng-template>
</bmb-check-external-link-button>
```

---

## Styling

The component uses the following SCSS file for styling:

```scss
// filepath: ./bmb-check-external-link-button.component.scss
```

Ensure the styles are defined in the corresponding SCSS file to maintain visual consistency.

---

## Usage Example

### Example 1: External Link Button

```html
<bmb-check-external-link-button [idElement]="'external-link-button'" [link]="'https://example.com'" [target]="'_blank'" (buttonClick)="handleExternalClick()">
  <ng-template #commonTemplate>
    <span>Go to Example</span>
  </ng-template>
</bmb-check-external-link-button>
```

### Example 2: Internal Navigation Button

```html
<bmb-check-external-link-button [idElement]="'internal-link-button'" [link]="'/dashboard'" [target]="'_self'" (buttonClick)="handleInternalClick()">
  <ng-template #commonTemplate>
    <span>Go to Dashboard</span>
  </ng-template>
</bmb-check-external-link-button>
```

### Example 3: Disabled Button

```html
<bmb-check-external-link-button [idElement]="'disabled-button'" [disabled]="true" (buttonPress)="handleDisabledPress()">
  <ng-template #commonTemplate>
    <span>Disabled Button</span>
  </ng-template>
</bmb-check-external-link-button>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)
- `RouterModule` (Angular)

---

## Notes

- The `isExternalLink` utility function is used to determine whether the provided link is external.
- The `commonTemplate` allows for flexible customization of the button's content.
- The component supports both internal navigation (using Angular's Router) and external links.
