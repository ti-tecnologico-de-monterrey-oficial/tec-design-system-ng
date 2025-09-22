# Academic Progress

The `BmbAcademicProgressComponent` is a standalone Angular component designed to display academic progress data in a structured and visually appealing layout. It uses other components and directives from the Bamboo Design System to ensure consistency and reusability.

---

## Selector

```html
<bmb-academic-progress></bmb-academic-progress>
```

---

## Inputs

The component requires the following inputs, which must be provided as objects implementing the `IBmbNameValuePair` interface:

| Input        | Type                | Description                              |
| ------------ | ------------------- | ---------------------------------------- |
| `accredited` | `IBmbNameValuePair` | Represents the accredited progress data. |
| `average`    | `IBmbNameValuePair` | Represents the average progress data.    |
| `summary`    | `IBmbNameValuePair` | Represents the summary progress data.    |

Example Input Object (`IBmbNameValuePair`)

```
{
  name: 'Accredited Courses',
  value: 25
}
```

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-container class="bmb_academic-progress-summary">
  <section
    class="bmb_academic-progress-summary-container"
    bmbLayout
    margin="none"
    justify="spaceAround"
    [dynamicCols]="true"
  >
    <bmb-focus-element
      bmbLayoutItem
      [title]="getName(accredited())"
      [number]="getValue(accredited())"
      [isNormal]="true"
      [isNonFocused]="true"
    ></bmb-focus-element>
    <bmb-focus-element
      bmbLayoutItem
      [title]="getName(average())"
      [number]="getValue(average())"
      [isNonFocused]="true"
    ></bmb-focus-element>
    <bmb-focus-element
      bmbLayoutItem
      [title]="getName(summary())"
      [number]="getValue(summary())"
      [isNormal]="true"
      [isNonFocused]="true"
    ></bmb-focus-element>
  </section>
</bmb-container>
```

---

## Error Handling

The component validates the presence of all required inputs (`accredited`, `average`, `summary`) during initialization. If any of these inputs are missing, an error is thrown with a detailed message.

Example Error

`The accredited, average, summary required.`

## Methods

`getName(element: IBmbNameValuePair): string`
Returns the `name` property of the provided `IBmbNameValuePair` object.

`getValue(element: IBmbNameValuePair): number`
Returns the `value` property of the provided `IBmbNameValuePair` object as a number.

---

## Usage Example

```html
<bmb-academic-progress
  [accredited]="{ name: 'Accredited Courses', value: 25 }"
  [average]="{ name: 'Average Grade', value: 85 }"
  [summary]="{ name: 'Total Credits', value: 120 }"
></bmb-academic-progress>
```

This example will render the component with the provided data for `accredited`, `average`, and `summary`.

---

## Dependencies

The component relies on the following Bamboo Design System components and directives:

- BmbContainerComponent
- BmbFocusElementComponent
- BmbLayoutDirective
- BmbLayoutItemDirective
