# BmbMultiDotPaginatorComponent

## Description

The `BmbMultiDotPaginatorComponent` is a component that manages a multi-dot paginator.

It allows for the selection and highlighting of items within a list of paginator items.

## Inputs

### Title

The title of the paginator. `@type` `tring` `required`.

### Subtitle

The subtitle of the paginator. `@type` `string`

## Usage

To use this component, simply include it in your HTML template and provide the content elements you want to paginate.

```
<bmb-multi-dot-paginator>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <!-- More elements -->
</bmb-multi-dot-paginator>
```

This component is useful for creating interactive user interfaces where you need to navigate between multiple sections of content in an intuitive and visually appealing way.

# BmbMultiDotPaginatorItemComponent

## Description

The `bmb-multi-dot-paginator-item.component.ts` is a component that represents an individual item within the multi-dot paginator. This component is standalone and can be used within the `BmbMultiDotPaginatorComponent` to create a pagination structure.

This component is useful for creating individual pagination items that can be navigated using the `BmbMultiDotPaginatorComponent`.
