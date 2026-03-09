# Accordion

The `BmbAccordionComponent` is a standalone Angular component designed to create accessible and customizable accordion elements. It provides flexibility in styling, behavior, and content, making it suitable for various use cases.

---

## Selector

```html
<bmb-accordion></bmb-accordion>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input              | Type                     | Default      | Description                                                                 |
| ------------------ | ------------------------ | ------------ | --------------------------------------------------------------------------- |
| `appearanceContrast` | `IBmbContrast`         | `'default'`  | Defines the contrast style of the accordion (`default`, `primary`, etc.).   |
| `borderRadius`     | `SizeNames \| SizeNames[]` | `'m'`      | Defines the border radius of the accordion.                                 |
| `margin`           | `SizeNames \| SizeNames[]` | `'m'`      | Sets the margin around the accordion.                                       |
| `paddingHeader`    | `SizeNames \| SizeNames[]` | `'m'`      | Sets the padding for the accordion header.                                  |
| `paddingContent`   | `SizeNames \| SizeNames[]` | `'m'`      | Sets the padding for the accordion content.                                 |
| `icon`             | `string`                 | `''`         | Specifies the icon to display in the header.                                |
| `accordionId`      | `number \| null`        | `null`       | Unique identifier for the accordion (used when grouping multiple items).    |
| `hideToggle`       | `boolean`                | `false`      | Hides the toggle icon if set to `true`.                                     |
| `active`           | `boolean`                | `false`      | Marks the accordion as active.                                              |
| `disabled`         | `boolean`                | `false`      | Disables the accordion, preventing interaction.                             |
| `expanded`         | `boolean \| undefined`  | `undefined`  | Controls whether the accordion is expanded (`true`/`false`) or controlled internally (`undefined`). |
| `lockToggle`       | `boolean`                | `false`      | Locks the toggle action when set to `true`, preventing the accordion state from changing. |

---

## Outputs

The component emits the following events:

| Output    | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `closed`  | `void` | Emitted when the accordion is collapsed.      |
| `opened`  | `void` | Emitted when the accordion is expanded.       |
| `onClick` | `void` | Emitted when the accordion header is clicked. |

---

## Content Projection

The component supports content projection for the header and content sections using the following template references:

| Template Reference    | Description                                   |
| --------------------- | --------------------------------------------- |
| `bmbAccordionHeader`  | Defines the content for the accordion header. |
| `bmbAccordionContent` | Defines the content for the accordion body.   |

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-accordion
  [borderRadius]="'m'"
  [margin]="'m'"
  [paddingHeader]="'m'"
  [paddingContent]="'m'"
  [icon]="'expand_more'"
  [accordionId]="1"
  [hideToggle]="false"
  [active]="false"
  [disabled]="false"
  [expanded]="true"
  (closed)="onAccordionClosed()"
  (opened)="onAccordionOpened()"
  (onClick)="onAccordionClicked()"
>
  <ng-template #bmbAccordionHeader>
    <h3>Accordion Header</h3>
  </ng-template>
  <ng-template #bmbAccordionContent>
    <p>This is the content of the accordion.</p>
  </ng-template>
</bmb-accordion>
```

---

## Methods

### `toggle()`

Toggles the accordion's expanded or collapsed state.

### `getIconToggle()`

Returns the appropriate icon based on the accordion's state (`expand_more` or `expand_less`).

### `onKeydown(event: KeyboardEvent)`

Handles keyboard interactions (`Enter` or `Space`) to toggle the accordion.

---

## Usage Example

```html
<bmb-accordion
  [borderRadius]="'l'"
  [margin]="'s'"
  [paddingHeader]="'m'"
  [paddingContent]="'l'"
  [icon]="'expand_more'"
  [accordionId]="2"
  [hideToggle]="false"
  [active]="true"
  [disabled]="false"
  [expanded]="false"
  (closed)="onAccordionClosed()"
  (opened)="onAccordionOpened()"
  (onClick)="onAccordionClicked()"
>
  <ng-template #bmbAccordionHeader>
    <h3>Custom Header</h3>
  </ng-template>
  <ng-template #bmbAccordionContent>
    <p>Custom content goes here.</p>
  </ng-template>
</bmb-accordion>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
