# Action Menu

The `BmbActionMenuComponent` is a standalone Angular component designed to display a customizable action menu with a title, subtitle, and optional icon. It supports content projection for flexible menu item customization and can be styled to fit various use cases.

---

## Selector

```html
<bmb-action-menu></bmb-action-menu>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input                 | Type        | Default     | Description                                                                                       |
| --------------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `componentTitle` (*)  | `string`    | `undefined` | Required title of the action menu. If not provided, the component will throw an error.           |
| `subtitle`            | `string`    | `undefined` | The subtitle of the action menu.                                                                  |
| `icon`                | `string`    | `''`        | The name of the icon to display in the header.                                                    |
| `iconSize`            | `number`    | `24`        | The size of the icon in pixels.                                                                   |
| `bgIconAppearance`    | `IBmbColor` | `undefined` | The background color of the icon.                                                                 |
| `showHeader`          | `boolean`   | `true`      | Determines whether the header (title, subtitle, and icon) is displayed.                           |
| `title` (deprecated)  | `string`    | `undefined` | Deprecated. Use `componentTitle` instead. Kept only for backward compatibility and logs a warning. |

---

## Content Projection

The component supports content projection for flexible customization of menu items. You can use Angular's `<ng-template>` to define the projected content.

| Template Reference | Description                             |
| ------------------ | --------------------------------------- |
| `contentTemplates` | Defines the content of the action menu. |

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-action-menu
  [componentTitle]="'Menu Title'"
  [subtitle]="'Menu Subtitle'"
  [icon]="'menu'"
  [iconSize]="32"
  [bgIconAppearance]="'primary'"
  [showHeader]="true"
>
  <ng-template>
    <p>Menu Item 1</p>
  </ng-template>
  <ng-template>
    <p>Menu Item 2</p>
  </ng-template>
</bmb-action-menu>
```

---

## Methods

### `ngAfterContentInit()`

This lifecycle hook initializes the projected content by converting the `ContentChildren` query list into an array of templates.

---

## Usage Example

```html
<bmb-action-menu
  [componentTitle]="'Actions'"
  [subtitle]="'Choose an option'"
  [icon]="'settings'"
  [iconSize]="24"
  [bgIconAppearance]="'secondary'"
  [showHeader]="true"
>
  <ng-template>
    <button>Option 1</button>
  </ng-template>
  <ng-template>
    <button>Option 2</button>
  </ng-template>
</bmb-action-menu>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbTitleContentComponent` (Bamboo Design System)
