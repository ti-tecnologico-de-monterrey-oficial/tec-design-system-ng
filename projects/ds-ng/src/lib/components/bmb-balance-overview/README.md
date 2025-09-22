# Balance Overview

The `BmbBalanceOverviewComponent` is a standalone Angular component designed to display a balance overview with a progress circle and legends. It provides a clear and customizable way to represent progress and associated values.

---

## Selector

```html
<bmb-balance-overview></bmb-balance-overview>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

### Progress Circle Inputs

| Input                          | Type                                                    | Default            | Description                                                     |
| ------------------------------ | ------------------------------------------------------- | ------------------ | --------------------------------------------------------------- |
| `progressCirclePercent`        | `number`                                                | `0`                | The percentage value to display in the progress circle.         |
| `progressCircleValue`          | `string`                                                | `'Progress Value'` | The value displayed inside the progress circle.                 |
| `showProgressCircleValue`      | `boolean`                                               | `true`             | Determines whether the progress circle value is displayed.      |
| `progressCircleTitle`          | `string                                                 | string[]`          |                                                                 |
| `'Title'`                      | The title displayed inside or near the progress circle. |
| `showProgressCircleTitle`      | `boolean`                                               | `true`             | Determines whether the progress circle title is displayed.      |
| `showProgressCircleBackground` | `boolean`                                               | `true`             | Determines whether the progress circle background is displayed. |

### Legend Inputs

| Input            | Type     | Default  | Description                         |
| ---------------- | -------- | -------- | ----------------------------------- |
| `labelPrimary`   | `string` | `'Text'` | The label for the primary legend.   |
| `valuePrimary`   | `string` | `'$0'`   | The value for the primary legend.   |
| `labelSecondary` | `string` | `'Text'` | The label for the secondary legend. |
| `valueSecondary` | `string` | `'$0'`   | The value for the secondary legend. |

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-balance-overview
  [progressCirclePercent]="75"
  [progressCircleValue]="'75%'"
  [showProgressCircleValue]="true"
  [progressCircleTitle]="'Progress Overview'"
  [showProgressCircleTitle]="true"
  [showProgressCircleBackground]="true"
  [labelPrimary]="'Total Balance'"
  [valuePrimary]="'$1,000'"
  [labelSecondary]="'Remaining Balance'"
  [valueSecondary]="'$250'"
></bmb-balance-overview>
```

---

## Styling

The component uses the following SCSS file for styling:

```scss
// filepath: ./bmb-balance-overview.component.scss
```

Ensure the styles are defined in the corresponding SCSS file to maintain visual consistency.

---

## Usage Example

```html
<bmb-balance-overview
  [progressCirclePercent]="50"
  [progressCircleValue]="'50%'"
  [showProgressCircleValue]="true"
  [progressCircleTitle]="['Total Progress', 'This Month']"
  [showProgressCircleTitle]="true"
  [showProgressCircleBackground]="false"
  [labelPrimary]="'Paid Amount'"
  [valuePrimary]="'$500'"
  [labelSecondary]="'Due Amount'"
  [valueSecondary]="'$500'"
></bmb-balance-overview>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbProgressCircleComponent` (Bamboo Design System)
- `BmbLegendComponent` (Bamboo Design System)
