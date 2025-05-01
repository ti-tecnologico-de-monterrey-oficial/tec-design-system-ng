# BmbContainerComponent

The `BmbContainerComponent` is a standalone Angular component designed to act as a flexible container for wrapping content. It supports various appearance styles and visibility toggling, making it suitable for different layout and design needs.

---

## Selector

```html
<bmb-container></bmb-container>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input       | Type                  | Default             | Description                                                                 |
|-------------|-----------------------|---------------------|-----------------------------------------------------------------------------|
| `appearance`| `IBmbAppearanceType` | `'primary-container'` | Defines the appearance style of the container.                             |
| `isHidden`  | `boolean`            | `false`             | Determines whether the container is hidden.                                |

### `IBmbAppearanceType` Values

The `appearance` input accepts the following values:

- `'primary-container'`
- `'primary-home'`
- `'primary-header'`
- `'secondary-container'`
- `'contrast-box-container'`
- `'button-container'`

---

## Methods

### `getClasses(): string[]`
Returns an array of CSS classes based on the `appearance` and `isHidden` inputs. If `isHidden` is `true`, the container will have a `bmb_container-hidden` class.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-container
  [appearance]="'primary-container'"
  [isHidden]="false"
>
  <p>Content inside the container</p>
</bmb-container>
```

---

## Usage Example

### Example 1: Default Container

```html
<bmb-container>
  <p>This is a default container.</p>
</bmb-container>
```

### Example 2: Custom Appearance

```html
<bmb-container [appearance]="'contrast-box-container'">
  <p>This container has a contrast box appearance.</p>
</bmb-container>
```

### Example 3: Hidden Container

```html
<bmb-container [isHidden]="true">
  <p>This content will not be visible.</p>
</bmb-container>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)

---

## Notes

- The `appearance` input allows for flexible styling of the container to match different design requirements.
- The `isHidden` input can be used to toggle the visibility of the container dynamically.
- The component is designed with performance in mind, using `ChangeDetectionStrategy.OnPush` for efficient updates.
