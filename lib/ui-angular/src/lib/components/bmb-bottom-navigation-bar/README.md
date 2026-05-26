# Bottom Navigation Bar

The `BmbBottomNavigationBarComponent` is a standalone Angular component designed to display a bottom navigation bar with customizable icons and actions. It provides a flexible way to handle navigation events such as "back," "forward," "share," and "reload."

---

## Selector

```html
<bmb-bottom-navigation-bar></bmb-bottom-navigation-bar>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input                | Type                     | Description                                                          |
| -------------------- | ------------------------ | -------------------------------------------------------------------- |
| `navigationBarIcons` | `IBmbNavigationBarIcons` | An object containing the configuration for the navigation bar icons. |

### `IBmbNavigationBarIcons` Structure

The `navigationBarIcons` input expects an object with the following structure:

```typescript
export type IBmbNavigationBarIcons = {
  one: IBmbNavigationBarIcon;
  two: IBmbNavigationBarIcon;
  three: IBmbNavigationBarIcon;
  four: IBmbNavigationBarIcon;
};
```

### `IBmbNavigationBarIcon` Structure

Each icon in the `navigationBarIcons` object has the following properties:

| Property          | Type              | Description                                                        |
| ----------------- | ----------------- | ------------------------------------------------------------------ |
| `name`            | `string`          | The name of the icon to display.                                   |
| `label`           | `string`          | The label for the icon.                                            |
| `eventName`       | `IBmbFooterEvent` | The event name associated with the icon (e.g., `back`, `forward`). |
| `dotNotification` | `number`          | (Optional) Displays a notification dot with the specified number.  |

---

## Outputs

The component emits the following events:

| Output                | Type              | Description                                                              |
| --------------------- | ----------------- | ------------------------------------------------------------------------ |
| `navigationBarEvents` | `IBmbFooterEvent` | Emitted when a navigation bar option is clicked, passing the event name. |

### `IBmbFooterEvent` Values

The `navigationBarEvents` output emits one of the following values:

- `'back'`
- `'forward'`
- `'share'`
- `'reload'`

---

## Methods

### `buildElement(element: IBmbNavigationBarIcon, eventName: IBmbFooterEvent): IBmbNavigationBarIcon`

Creates a new navigation bar icon object with the specified event name.

### `onNavigationBarOptionClick(event: IBmbFooterEvent): void`

Handles the click event for a navigation bar option and emits the corresponding `navigationBarEvents` output.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-bottom-navigation-bar
  [navigationBarIcons]="{
    one: { name: 'home', label: 'Home', eventName: 'back' },
    two: { name: 'search', label: 'Search', eventName: 'forward' },
    three: { name: 'share', label: 'Share', eventName: 'share' },
    four: { name: 'refresh', label: 'Reload', eventName: 'reload' }
  }"
  (navigationBarEvents)="onNavigationEvent($event)"
></bmb-bottom-navigation-bar>
```

---

## Usage Example

```html
<bmb-bottom-navigation-bar
  [navigationBarIcons]="{
    one: { name: 'arrow_back', label: 'Back', eventName: 'back' },
    two: { name: 'arrow_forward', label: 'Forward', eventName: 'forward' },
    three: { name: 'share', label: 'Share', eventName: 'share' },
    four: { name: 'refresh', label: 'Reload', eventName: 'reload' }
  }"
  (navigationBarEvents)="handleNavigationEvent($event)"
></bmb-bottom-navigation-bar>
```

---

## Dependencies

The component relies on the following modules and components:

- `BmbContainerComponent` (Bamboo Design System)
- `BmbNavigationBarComponent` (Bamboo Design System)
