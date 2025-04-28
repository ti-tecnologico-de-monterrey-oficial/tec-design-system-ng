# Bookmark

The `BmbBookmarkComponent` is a standalone Angular component designed to provide a bookmark feature with a toggleable active state. It is lightweight and can be used to mark or save items in a user interface.

---

## Selector

```html
<bmb-bookmark></bmb-bookmark>
```

---

## Behavior

The component maintains an internal state (`isActive`) to track whether the bookmark is active or inactive. Clicking on the bookmark toggles this state.

---

## Methods

### `handleClick(event: any): void`

Handles the click event on the bookmark. It toggles the `isActive` state and prevents event propagation.

### `getClassList(): string[]`

Returns an array of CSS classes based on the `isActive` state. If the bookmark is active, the `bmb_bookmark-active` class is added.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-bookmark (click)="handleClick($event)"></bmb-bookmark>
```

---

## Usage Example

```html
<bmb-bookmark></bmb-bookmark>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbActionIconComponent` (Bamboo Design System)
