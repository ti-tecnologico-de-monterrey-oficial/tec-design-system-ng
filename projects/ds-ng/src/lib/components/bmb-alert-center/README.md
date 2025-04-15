# Alert Center

The `BmbAlertCenterComponent` is a standalone Angular component designed to display alerts or notifications in a centralized and organized manner. It provides flexibility for managing and displaying multiple alerts with customizable content and actions.

---

## Selector

```html
<bmb-alert-center></bmb-alert-center>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input          | Type         | Default     | Description                                                                 |
|-----------------|--------------|-------------|-----------------------------------------------------------------------------|
| `alerts`       | `Array<any>` | `[]`        | An array of alert objects to display in the alert center.                  |
| `title`        | `string`     | `''`        | The title of the alert center.                                             |
| `showCloseAll` | `boolean`    | `true`      | Determines whether the "Close All" button is displayed.                    |

---

## Outputs

The component emits the following events:

| Output         | Type       | Description                                                                 |
|-----------------|------------|-----------------------------------------------------------------------------|
| `alertClick`   | `any`      | Emitted when an alert is clicked, passing the alert object as a parameter.   |
| `closeAll`     | `void`     | Emitted when the "Close All" button is clicked.                             |

---

## Methods

### `closeAlert(alert: any): void`
Closes a specific alert and removes it from the list of alerts.

### `handleCloseAll(): void`
Closes all alerts and emits the `closeAll` event.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-alert-center
  [alerts]="alerts"
  [title]="'Notifications'"
  [showCloseAll]="true"
  (alertClick)="onAlertClick($event)"
  (closeAll)="onCloseAll()"
>
  <ng-container *ngFor="let alert of alerts">
    <div class="alert">
      <h3>{{ alert.title }}</h3>
      <p>{{ alert.message }}</p>
      <button (click)="closeAlert(alert)">Close</button>
    </div>
  </ng-container>
</bmb-alert-center>
```

---

## Usage Example

```html
<bmb-alert-center
  [alerts]="[
    { title: 'Alert 1', message: 'This is the first alert.' },
    { title: 'Alert 2', message: 'This is the second alert.' }
  ]"
  [title]="'Alert Center'"
  [showCloseAll]="true"
  (alertClick)="onAlertClick($event)"
  (closeAll)="onCloseAll()"
></bmb-alert-center>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
