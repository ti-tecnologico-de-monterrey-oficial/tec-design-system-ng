# BmbCalendarComponent

The `BmbCalendarComponent` is a standalone Angular component designed to display a calendar with multiple views (day, week, month) and support for events. It provides features such as event selection, timezone handling, and responsive behavior.

---

## Selector

```html
<bmb-calendar></bmb-calendar>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input                | Type                  | Default                                | Description                                                                 |
|-----------------------|-----------------------|----------------------------------------|-----------------------------------------------------------------------------|
| `hourFormat`         | `IBmbCalendarHourFormat` | `'12'`                              | The hour format for the calendar (`'12'` or `'24'`).                        |
| `calendarTimezone`   | `string`              | User's local timezone                 | The timezone for the calendar.                                              |
| `clientTimezone`     | `string`              | User's local timezone                 | The timezone for the client.                                                |
| `lang`               | `string`              | `'es-MX'`                             | The language for the calendar.                                              |
| `currentDate`        | `string`              | `''`                                  | The current date in ISO format.                                             |
| `height`             | `number | string`     | `700`                                 | The height of the calendar.                                                 |
| `startBusinessHour`  | `number`              | `8`                                   | The starting hour for the business day.                                     |
| `calendarTitle`      | `string`              | `'Mi horario'`                        | The title of the calendar.                                                  |

---

## Outputs

The component emits the following events:

| Output          | Type       | Description                                                                 |
|------------------|------------|-----------------------------------------------------------------------------|
| `onDateChange`   | `EventEmitter<any>` | Emitted when the date range or view changes.                              |
| `onClose`        | `EventEmitter<any>` | Emitted when the calendar is closed.                                      |

---

## Methods

### `handleDateChange(range: IBmbCalendarView, now: DateTime): void`
Handles changes to the calendar view (day, week, month) and emits the `onDateChange` event with the updated range and visible dates.

### `handleCurrentDateChange(newDate: DateTime): void`
Updates the current date and recalculates the week number and visible days.

### `handleSelectEvent(newEvent: IBmbCalendarEventClick): void`
Handles the selection of an event and opens a modal with event details.

### `getHeight(height: string | number): string`
Returns the height of the calendar as a string with units.

### `onViewTypeChange(): void`
Toggles the visibility of the event list view.

### `getEvents(): IBmbCalendarEvent[]`
Retrieves the list of events from the calendar service.

### `getIsLoading(): boolean`
Checks if the calendar is currently loading events.

### `getDuration(): string`
Calculates and returns the duration of the selected event.

### `handleClose(): void`
Emits the `onClose` event when the calendar is closed.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-calendar
  [hourFormat]="'24'"
  [calendarTimezone]="'America/Mexico_City'"
  [clientTimezone]="'America/Mexico_City'"
  [lang]="'es-MX'"
  [currentDate]="'2025-04-30'"
  [height]="700"
  [startBusinessHour]="8"
  [calendarTitle]="'Mi horario'"
  (onDateChange)="onDateChange($event)"
  (onClose)="onCalendarClose()"
></bmb-calendar>
```

---

## Usage Example

```html
<bmb-calendar
  [hourFormat]="'12'"
  [calendarTimezone]="'America/New_York'"
  [clientTimezone]="'America/New_York'"
  [lang]="'en-US'"
  [currentDate]="'2025-05-01'"
  [height]="'600px'"
  [startBusinessHour]="9"
  [calendarTitle]="'My Schedule'"
  (onDateChange)="handleDateChange($event)"
  (onClose)="handleCalendarClose()"
></bmb-calendar>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbCalendarTemplateDayComponent` (Day view template)
- `BmbCalendarTemplateWeekComponent` (Week view template)
- `BmbCalendarTemplateMonthComponent` (Month view template)
- `BmbCalendarHeaderComponent` (Calendar header)
- `BmbCalendarTemplateMobileComponent` (Mobile view template)
- `BmbCalendarTemplateEventListComponent` (Event list template)
- `BmbIconComponent` (Icon support)
- `BmbBadgeComponent` (Badge support)
- `MatDialog` (Angular Material Dialog for modals)
