# BmbCardComponent

The `BmbCardComponent` is a standalone Angular component designed to display content in a card layout. It supports customizable styles, including border radius, margin, and type. The component also includes subcomponents for headers, footers, and content.

---

## Selector

```html
<bmb-card></bmb-card>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input            | Type                                | Default     | Description                                                                                |
| ---------------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `borderRadius`   | `SizeNames \| SizeNames[]`          | `'m'`       | Defines the border radius of the card.                                                     |
| `margin`         | `SizeNames \| SizeNames[]`          | `'m'`       | Sets the margin around the card.                                                           |
| `type`           | `IBmbCardType`                      | `'normal'`  | Specifies the type of the card (e.g., `primary`, `secondary`, `error`, `transparent`).     |
| `state`          | `'disabled' \| 'error' \| 'normal'` | `'normal'`  | Defines the state of the card (disabled, error, or normal).                                |
| `boxShadowStyle` | `IBmbBoxShadowStyle \| 'none'`      | `'none'`    | Applies a shadow style to the card. Use `'none'` to disable box shadow.                    |
| `borderColor`    | `IBmbBgColor \| 'default'`          | `'default'` | Sets the border color using Bamboo background tokens. `'default'` uses the standard style. |

### `IBmbCardType` Values

The `type` input accepts the following values:

- `'primary'`
- `'secondary'`
- `'success'`
- `'info'`
- `'warning'`
- `'error'`
- `'normal'`
- `'transparent'`

---

## Methods

### `getClasses(): string[]`

Returns an array of CSS classes based on the `borderRadius`, `margin`, and `type` inputs.

### `getStyles(): any`

Returns an object of inline styles for the card, including `border-radius` and `margin`.

---

## Subcomponents

### BmbCardHeaderComponent

#### Selector

```html
<bmb-card-header></bmb-card-header>
```

#### Inputs

| Input             | Type                       | Default | Description                               |
| ----------------- | -------------------------- | ------- | ----------------------------------------- |
| `padding`         | `SizeNames \| SizeNames[]` | `'m'`   | Sets the padding for the card header.     |
| `colorBackground` | `IBmbBgColor \| null`      | `null`  | Optional background color for the header. |

---

### BmbCardFooterComponent

#### Selector

```html
<bmb-card-footer></bmb-card-footer>
```

#### Inputs

| Input             | Type                       | Default | Description                               |
| ----------------- | -------------------------- | ------- | ----------------------------------------- |
| `padding`         | `SizeNames \| SizeNames[]` | `'m'`   | Sets the padding for the card footer.     |
| `colorBackground` | `IBmbBgColor \| null`      | `null`  | Optional background color for the footer. |

---

### BmbCardContentComponent

#### Selector

```html
<bmb-card-content></bmb-card-content>
```

#### Inputs

| Input             | Type                       | Default | Description                                            |
| ----------------- | -------------------------- | ------- | ------------------------------------------------------ |
| `padding`         | `SizeNames \| SizeNames[]` | `'m'`   | Sets the padding for the card content.                 |
| `colorBackground` | `IBmbBgColor \| null`      | `null`  | Optional background color for the content.             |
| `setBorderRadius` | `boolean`                  | `false` | Applies border radius styles to the content container. |

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-card [type]="'primary'" [borderRadius]="'l'" [margin]="'s'">
  <bmb-card-header [padding]="'m'">
    <h3>Card Header</h3>
  </bmb-card-header>
  <bmb-card-content [padding]="'m'">
    <p>This is the card content.</p>
  </bmb-card-content>
  <bmb-card-footer [padding]="'m'">
    <button>Footer Button</button>
  </bmb-card-footer>
</bmb-card>
```

---

## Usage Example

```html
<bmb-card
  [type]="'succes'"
  [borderRadius]="'xl'"
  [margin]="'l'"
  [boxShadowStyle]="'box-shadow-2'"
>
  <bmb-card-header [padding]="'s'">
    <h3>Success Card</h3>
  </bmb-card-header>
  <bmb-card-content [padding]="'m'">
    <p>This card indicates a successful operation.</p>
  </bmb-card-content>
  <bmb-card-footer [padding]="'s'">
    <button>Confirm</button>
  </bmb-card-footer>
</bmb-card>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)
