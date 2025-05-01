# BmbCheckboxComponent

The `BmbCheckboxComponent` is a standalone Angular component designed to provide a customizable checkbox with support for accessibility, indeterminate states, and keyboard interactions. It is lightweight and flexible, making it suitable for various use cases.

---

## Selector

```html
<bmb-checkbox></bmb-checkbox>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input             | Type                  | Default     | Description                                                                 |
|--------------------|-----------------------|-------------|-----------------------------------------------------------------------------|
| `id`              | `string`             | `''`        | Unique identifier for the checkbox.                                        |
| `checked`         | `boolean`            | `false`     | Indicates whether the checkbox is checked.                                 |
| `disabled`        | `boolean`            | `false`     | Disables the checkbox, preventing user interaction.                        |
| `indeterminate`   | `boolean`            | `false`     | Sets the checkbox to an indeterminate state.                               |
| `required`        | `boolean`            | `false`     | Marks the checkbox as required.                                            |
| `value`           | `string`             | `''`        | The value associated with the checkbox.                                    |
| `name`            | `string`             | `''`        | The name attribute for the checkbox.                                       |
| `label`           | `string`             | `''`        | The label text displayed alongside the checkbox.                           |
| `labelPosition`   | `'before' | 'after'` | `'after'`   | Specifies the position of the label relative to the checkbox.              |
| `ariaDescribedby` | `string`             | `''`        | The `aria-describedby` attribute for accessibility.                        |
| `ariaLabel`       | `string`             | `''`        | The `aria-label` attribute for accessibility.                              |
| `ariaLabelledby`  | `string`             | `''`        | The `aria-labelledby` attribute for accessibility.                        |

---

## Outputs

The component emits the following events:

| Output   | Type       | Description                                                                 |
|----------|------------|-----------------------------------------------------------------------------|
| `change` | `Event`    | Emitted when the checkbox state changes (checked, unchecked, or indeterminate). |

---

## Methods

### `handleChange(event: Event): void`
Handles the change event for the checkbox. Updates the `checked` state and emits the `change` event.

### `handleKeyDown(event: KeyboardEvent): void`
Handles the `Enter` key press for the checkbox. Toggles the `checked` state or clears the `indeterminate` state and emits the `change` event.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-checkbox
  [id]="'checkbox-1'"
  [checked]="true"
  [disabled]="false"
  [indeterminate]="false"
  [required]="true"
  [value]="'option1'"
  [name]="'exampleCheckbox'"
  [label]="'Accept Terms and Conditions'"
  [labelPosition]="'after'"
  [ariaDescribedby]="'description-id'"
  [ariaLabel]="'Accept Terms'"
  [ariaLabelledby]="'label-id'"
  (change)="onCheckboxChange($event)"
></bmb-checkbox>
```

---

## Usage Example

### Example 1: Basic Checkbox

```html
<bmb-checkbox
  [id]="'basic-checkbox'"
  [label]="'I agree to the terms and conditions'"
  [checked]="false"
  (change)="onCheckboxChange($event)"
></bmb-checkbox>
```

### Example 2: Indeterminate Checkbox

```html
<bmb-checkbox
  [id]="'indeterminate-checkbox'"
  [label]="'Select All'"
  [indeterminate]="true"
  (change)="onCheckboxChange($event)"
></bmb-checkbox>
```

### Example 3: Disabled Checkbox

```html
<bmb-checkbox
  [id]="'disabled-checkbox'"
  [label]="'Disabled Option'"
  [disabled]="true"
></bmb-checkbox>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)

---

## Accessibility

The component supports accessibility features such as `aria-label`, `aria-labelledby`, and `aria-describedby` attributes to ensure compatibility with screen readers.

---

## Notes

- The `indeterminate` state is visual only and does not affect the `checked` value.
- The `handleKeyDown` method allows toggling the checkbox state using the `Enter` key for better keyboard accessibility.
