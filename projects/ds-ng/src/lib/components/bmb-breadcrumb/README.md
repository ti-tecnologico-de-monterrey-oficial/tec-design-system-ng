# BmbBreadcrumbComponent

The `BmbBreadcrumbComponent` is a standalone Angular component designed to display breadcrumb navigation. It supports hierarchical navigation with optional dropdowns for managing long breadcrumb paths. The component is customizable and integrates seamlessly with Angular's Router.

---

## Selector

```html
<bmb-breadcrumb></bmb-breadcrumb>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input         | Type                  | Default     | Description                                                                 |
|---------------|-----------------------|-------------|-----------------------------------------------------------------------------|
| `dataTopBar`  | `IBmbDataTopBar[]`    | `[]`        | An array of breadcrumb items for the top bar.                              |
| `dataLocalNav`| `IBmbDataTopBar[]`    | `[]`        | An array of breadcrumb items for the local navigation.                     |
| `isTopBar`    | `boolean`             | `false`     | Determines whether the breadcrumb is displayed as a top bar.               |
| `isInactive`  | `boolean`             | `false`     | Marks the breadcrumb links as inactive.                                    |

### `IBmbDataTopBar` Structure

The breadcrumb data structure is defined as follows:

```typescript
export interface IBmbDataTopBar {
  text: string;
  link?: string;
}
```

| Property | Type     | Description                                                                 |
|----------|----------|-----------------------------------------------------------------------------|
| `text`   | `string` | The text to display for the breadcrumb item.                                |
| `link`   | `string` | (Optional) The URL to navigate to when the breadcrumb item is clicked.      |

---

## Methods

### `getLinkClass(length: number): string`
Returns a CSS class based on the number of breadcrumb items. If the length exceeds 4, a special class is applied.

### `getClasses(item: any): { [key: string]: boolean }`
Returns a set of CSS classes for a breadcrumb item based on its state (e.g., inactive).

### `toggleDropdown(): void`
Toggles the visibility of the dropdown menu for long breadcrumb paths.

### `getDropdownItems(items: any[]): any[]`
Returns the items to display in the dropdown menu when the breadcrumb path is too long.

### `getPenultimateLink(): string | undefined`
Returns the link for the penultimate breadcrumb item, if available.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-breadcrumb
  [dataTopBar]="[
    { text: 'Home', link: '/' },
    { text: 'Category', link: '/category' },
    { text: 'Subcategory', link: '/subcategory' }
  ]"
  [dataLocalNav]="[
    { text: 'Home', link: '/' },
    { text: 'Category', link: '/category' },
    { text: 'Subcategory', link: '/subcategory' },
    { text: 'Item', link: '/item' }
  ]"
  [isTopBar]="true"
  [isInactive]="false"
></bmb-breadcrumb>
```

---

## Usage Example

```html
<bmb-breadcrumb
  [dataTopBar]="[
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Settings', link: '/settings' }
  ]"
  [dataLocalNav]="[
    { text: 'Home', link: '/' },
    { text: 'Products', link: '/products' },
    { text: 'Electronics', link: '/electronics' },
    { text: 'Laptops', link: '/laptops' }
  ]"
  [isTopBar]="false"
  [isInactive]="false"
></bmb-breadcrumb>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `RouterModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
