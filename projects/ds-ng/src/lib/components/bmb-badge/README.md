# Badge

The `BmbBadgeComponent` is a standalone Angular component designed to display badges with customizable appearance and content. It is lightweight and flexible, making it suitable for various use cases such as labels, tags, or status indicators.

---

## Selector

```html
<bmb-badge></bmb-badge>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input        | Type                | Default     | Description                                                                 |
|--------------|---------------------|-------------|-----------------------------------------------------------------------------|
| `appearance` | `IBbmBgAppearance` | `'normal'`  | Defines the visual appearance of the badge (e.g., `normal`, `primary`).    |
| `text`       | `string`            | `''`        | The text content displayed inside the badge.                               |
| `container`  | `boolean`           | `true`      | Determines whether the badge has a container style applied.                |

---

## Methods

### `getClasses(): string[]`
Returns an array of CSS classes based on the `appearance` and `container` inputs. These classes are applied to the badge for styling.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-badge
  [appearance]="'primary'"
  [text]="'New'"
  [container]="true"
></bmb-badge>
```

---

## Usage Example

```html
<bmb-badge
  [appearance]="'success'"
  [text]="'Active'"
  [container]="true"
></bmb-badge>

<bmb-badge
  [appearance]="'warning'"
  [text]="'Pending'"
  [container]="false"
></bmb-badge>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)
