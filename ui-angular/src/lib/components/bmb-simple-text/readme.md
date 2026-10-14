# BmbSimpleTextComponent

Renders a simple text block with configurable size, weight, color and html tag.

## Inputs

| Name          | Type      | Default     | Description                                   |
| ------------- | --------- | ----------- | ---------------------------------------------- |
| `size`        | `number`  | `14`        | Font size in px.                                |
| `weight`      | `number`  | `400`       | Font weight.                                    |
| `color`       | `string`  | `'inherit'` | Text color (any valid CSS color value).         |
| `elementType` | `string`  | `'p'`       | Html tag used to render the text (`p`, `span`, `div`, `label`, `strong`, `small`, `h1`-`h6`). |

## Usage

```html
<bmb-simple-text [size]="16" [weight]="600" color="#1E1E1E" elementType="span">
  Hello world
</bmb-simple-text>
```
