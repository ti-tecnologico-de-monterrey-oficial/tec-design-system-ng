# BmbCarouselComponent

The `BmbCarouselComponent` is a standalone Angular component designed to display a carousel of items. It supports touch gestures for navigation, dynamic content, and active item highlighting. The component is lightweight and customizable, making it suitable for various use cases.

---

## Selector

```html
<bmb-carousel></bmb-carousel>
```

---

## Features

- **Dynamic Content**: Automatically detects and manages carousel items using `ContentChildren`.
- **Touch Gestures**: Supports swipe gestures for navigation on touch devices.
- **Active Item Highlighting**: Highlights the currently active item with CSS classes.
- **Responsive Design**: Adapts to different screen sizes.

---

## Methods

### `ngAfterContentInit(): void`

Initializes the carousel by detecting the number of items and setting the first item as active.

### `selectItem(index: number): void`

Selects a specific item in the carousel by its index and updates the active state.

### `setClassActive(newIndex: number, oldIndex: number = 0): void`

Applies the active class to the new item and removes it from the old item. Adds a bounce animation when the active item changes.

---

## Touch Gesture Handlers

### `onTouchStart(event: TouchEvent): void`

Captures the starting position of a touch gesture.

### `onTouchMove(event: TouchEvent): void`

Tracks the movement of a touch gesture.

### `onTouchEnd(): void`

Calculates the swipe distance and navigates to the next or previous item if the swipe exceeds the threshold.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-carousel>
  <div #carouselItem class="carousel-item">Item 1</div>
  <div #carouselItem class="carousel-item">Item 2</div>
  <div #carouselItem class="carousel-item">Item 3</div>
</bmb-carousel>
```

---

## Usage Example

```html
<bmb-carousel>
  <div #carouselItem class="carousel-item">Slide 1</div>
  <div #carouselItem class="carousel-item">Slide 2</div>
  <div #carouselItem class="carousel-item">Slide 3</div>
</bmb-carousel>
```

---

## Dependencies

The component relies on the following modules:

- `CommonModule` (Angular)

Ensure these dependencies are properly imported and available in your project.

---

## Touch Gesture Threshold

The swipe threshold is set to `50px`. Swipes shorter than this distance will not trigger navigation. You can adjust the threshold by modifying the `swipeThreshold` property in the component.

---

## Notes

- The carousel automatically detects items using the `#carouselItem` template reference.
- Ensure that each carousel item has the `carousel-item` class for proper styling and functionality.
- The component uses Angular's `ChangeDetectorRef` to ensure smooth updates to the UI.
