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

| Input          | Type                     | Default     | Description                                                                 |
|-----------------|--------------------------|-------------|-----------------------------------------------------------------------------|
| `borderRadius` | `SizeNames | SizeNames[]` | `'m'`       | Defines the border radius of the card.                                     |
| `margin`       | `SizeNames | SizeNames[]` | `'m'`       | Sets the margin around the card.                                           |
| `type`         | `IBmbCardType`           | `'normal'`  | Specifies the type of the card (e.g., `primary`, `secondary`, `error`).    |
| `state`        | `'disabled' | 'error' | 'normal'` | `'normal'`  | Defines the state of the card.                                             |
| `alternative`  | `boolean`                | `false`     | Enables an alternative style for the card.                                 |

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

| Input     | Type                     | Default | Description                                                                 |
|-----------|--------------------------|---------|-----------------------------------------------------------------------------|
| `padding` | `SizeNames | SizeNames[]` | `'m'`   | Sets the padding for the card header.                                      |

---

### BmbCardFooterComponent

#### Selector

```html
<bmb-card-footer></bmb-card-footer>
```

#### Inputs

| Input     | Type                     | Default | Description                                                                 |
|-----------|--------------------------|---------|-----------------------------------------------------------------------------|
| `padding` | `SizeNames | SizeNames[]` | `'m'`   | Sets the padding for the card footer.                                      |

---

### BmbCardContentComponent

#### Selector

```html
<bmb-card-content></bmb-card-content>
```

#### Inputs

| Input     | Type                     | Default | Description                                                                 |
|-----------|--------------------------|---------|-----------------------------------------------------------------------------|
| `padding` | `SizeNames | SizeNames[]` | `'m'`   | Sets the padding for the card content.                                     |

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
<bmb-card [type]="'success'" [borderRadius]="'xl'" [margin]="'l'" [alternative]="true">
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
