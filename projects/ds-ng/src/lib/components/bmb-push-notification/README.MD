# BmbPushNotificationComponent

The `BmbPushNotificationComponent` is an Angular component that displays push notifications. It uses the `BmbNotificationService` to manage the list of notifications.

## Selector

```html
<bmb-push-notification></bmb-push-notification>
```

## Inputs

This component does not have any input properties.

## Outputs

This component does not have any output properties.

## Methods

### getNotifications

This method retrieves the list of notifications from the `BmbNotificationService`.

```typescript
getNotifications() {
  return this.notificationSignal.getNotificationList();
}
```

### closeNotification

This method closes a notification by deleting it from the `BmbNotificationService`.

```typescript
closeNotification(notification: INotification) {
  if (notification.id) {
    this.notificationSignal.deleteNotification(notification.id);
  }
}
```

## Usage Example

```typescript
import { Component } from "@angular/core";
import { BmbPushNotificationComponent } from "./bmb-push-notification.component";

@Component({
  selector: "app-root",
  template: ` <bmb-push-notification></bmb-push-notification> `,
})
export class AppComponent {}
```

## Dependencies

- `BmbPushNotificationItemComponent`
- `BmbNotificationService`
- `INotification`

## Encapsulation

The component uses `ViewEncapsulation.None`.

## Change Detection

The component uses `ChangeDetectionStrategy.OnPush`.
