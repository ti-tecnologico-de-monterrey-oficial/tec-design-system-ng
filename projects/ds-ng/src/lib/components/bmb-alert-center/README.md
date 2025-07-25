# Alert Center

## Description

The `BmbAlertCenter` component is a notification center that allows people to efficiently manage alerts and announcements. It offers features such as categorization, multiple selection, and detailed alert visualization.

## Usage

### Import

```typescript
import { BmbAlertCenterComponent } from "./bmb-alert-center.component";
```

### Selector

```html
<bmb-alert-center></bmb-alert-center>
```

> **Important**: To manage the status of the Alert Center, you need to use the `BmbAlertCenterService` service (documentation is available at the end of the document).

## Properties

### Inputs

| Name                      | Type                  | Description                                              |
| ------------------------- | --------------------- | -------------------------------------------------------- |
| `dateFormat`              | `string`              | Date format used in alerts. Default value: `dd/MM/yyyy`. |
| `tabsName`                | `string[] or IBmbAlertCenterTabConfig[]` | Configuration of the component's tabs. |
| `hideTabs`                | `boolean`             | Hides the tabs if `true`.                                |
| `enableMultipleSelection` | `boolean`             | Enables multiple selection of alerts.                    |
| `emptyStateData`          | `IBmbAlertEmptyState` | Configuration of the component's empty state.            |

### Outputs

| Name                  | Type                   | Description                                    |
| --------------------- | ---------------------- | ---------------------------------------------- |
| `onChangeAlertStatus` | `IBmbDataAlertsOutput` | Event emitted when an alert's status changes.  |
| `alertEvent`          | `IBmbDataAlert`        | Event emitted when interacting with an alert.  |
| `showAlertDetail`     | `IBmbDataAlert`        | Event emitted when showing an alert's details. |
| `closeAlertDetail`    | `IBmbDataAlert`        | Event emitted when closing an alert's details. |

## Methods

### `handleTabChange(tabId: IBmbTab): void`

Changes the selected tab.

### `handleShowAlert(item: IBmbDataAlertsParsed): void`

Displays the details of an alert.

### `handleCloseDetail(alert: IBmbDataAlertsParsed): void`

Closes the details of an alert.

### `handleAlertEvent(alert: IBmbDataAlert): void`

Emits an event related to an alert.

### `handleChangeAlertStatus(alert: IBmbDataAlertsOutput): void`

Emits an event when an alert's status changes.

## HTML Structure

```html
<div class="bmb-alert-center">
  <bmb-tabs [tabs]="tabs" (tabChange)="handleTabChange($event)"></bmb-tabs>
  <div *ngIf="isLoading()" class="bmb-loader"></div>
  <div *ngIf="!isLoading() && alertList().length === 0" class="bmb-empty-state">
    <bmb-alert-center-empty [data]="emptyStateData"></bmb-alert-center-empty>
  </div>
  <div *ngIf="!isLoading() && alertList().length > 0" class="bmb-alert-list">
    <div *ngFor="let alert of alertList()" (click)="handleShowAlert(alert)">
      <!-- Render each alert -->
    </div>
  </div>
</div>
```

## Example Usage

```html
<bmb-alert-center [dateFormat]="'dd/MM/yyyy'" [tabsName]="[{title: 'Notificaciones', isMobile: true, isDesktop: true}, {title: 'No leídos', isMobile: false, isDesktop: true}, {title: 'Favoritos', isMobile: false, isDesktop: true}, {title: 'Archivados', isMobile: false, isDesktop: true}, {title: 'Anuncios', isMobile: true, isDesktop: true}]" [hideTabs]="false" [enableMultipleSelection]="true" (onChangeAlertStatus)="onChangeAlertStatus($event)" (alertEvent)="alertEvent($event)" (showAlertDetail)="showAlertDetail($event)" (closeAlertDetail)="closeAlertDetail($event)" />
```

---

## BmbAlertCenterService

### Description

The `BmbAlertCenterService` is a service designed to manage alerts and advertisements for the `BmbAlertCenter` component. It provides methods to set, update, and retrieve alerts and advertisements, as well as manage the loading state.

### Methods

#### Alerts Management

- **`setAlerts(alerts: IBmbDataAlert[]): void`**
  Sets the list of alerts.

- **`updateAlerts(alertList: IBmbDataAlert[]): void`**
  Updates the existing alerts with new data.

- **`addAlerts(alerts: IBmbDataAlert[]): void`**
  Adds new alerts to the existing list.

- **`getAlerts(): IBmbDataAlert[]`**
  Retrieves the current list of alerts.

#### Advertisements Management

- **`setAdvertisements(advertisements: IBmbDataAlert[]): void`**
  Sets the list of advertisements.

- **`updateAdvertisements(advertisements: IBmbDataAlert[]): void`**
  Updates the existing advertisements with new data.

- **`addAdvertisements(advertisements: IBmbDataAlert[]): void`**
  Adds new advertisements to the existing list.

- **`getAdvertisements(): IBmbDataAlert[]`**
  Retrieves the current list of advertisements.

#### Loading State Management

- **`getLoadingState(): boolean`**
  Retrieves the current loading state.

- **`setLoadingState(loading: boolean): void`**
  Sets the loading state.
