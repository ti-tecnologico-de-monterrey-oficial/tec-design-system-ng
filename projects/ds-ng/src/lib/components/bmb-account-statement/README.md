# Account Statement

The `BmbAccountStatementComponent` is a standalone Angular component designed to display account statements with detailed payment information, progress tracking, and interactive features such as modals and forms. It provides a user-friendly interface for managing account-related data.

---

## Selector

```html
<bmb-account-statement></bmb-account-statement>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input                     | Type       | Default       | Description                                                            |
| ------------------------- | ---------- | ------------- | ---------------------------------------------------------------------- |
| `componentTitle`          | `string`   | `undefined`   | Title of the account statement.                                       |
| `title` (deprecated)      | `string`   | `undefined`   | Deprecated. Use `componentTitle` instead.                             |
| `progressCircleTitle`     | `string[]` | `[]`          | Title lines displayed inside the progress circle.                     |
| `labelPrimary`            | `string`   | `undefined`   | Label for the primary amount.                                         |
| `labelSecondary`          | `string`   | `undefined`   | Label for the secondary amount.                                       |
| `totalCount`              | `number`   | `0`           | Total amount to be paid.                                              |
| `counter`                 | `number`   | `0`           | Amount already paid.                                                  |
| `progressTitle`           | `string`   | `undefined`   | Title for the progress bar.                                           |
| `formatDates`             | `string`   | `'yyyy-MM-dd'`| Date format used for displaying dates (e.g., payment deadline).       |
| `paymentDeadline`         | `string`   | `undefined`   | Payment deadline date.                                                |
| `cutOffDate`              | `string`   | `undefined`   | Cutoff date for the account statement.                                |
| `paymentDeadlineLabel`    | `string`   | `undefined`   | Label for the payment deadline.                                       |
| `cutOffDateLabel`         | `string`   | `undefined`   | Label for the cutoff date.                                            |
| `payButtonLabel`          | `string`   | `undefined`   | Label for the pay button.                                             |
| `backButtonLabel`         | `string`   | `undefined`   | Label for the back button.                                            |
| `modalTitle`              | `string`   | `undefined`   | Title of the payment modal.                                           |
| `modalSubtitle`           | `string`   | `undefined`   | Subtitle of the payment modal.                                        |
| `modalRestLabel`          | `string`   | `undefined`   | Label for the "pay remaining" option in the modal.                   |
| `modalOtherAmountLabel`   | `string`   | `undefined`   | Label for the "other amount" option in the modal.                    |
| `modalPrimaryButtonLabel` | `string`   | `undefined`   | Label for the primary button in the modal.                            |
| `errorMessage`            | `string`   | `undefined`   | Custom error message displayed for invalid inputs.                    |

---

## Outputs

The component emits the following events:

| Output       | Type     | Description                                                                |
| ------------ | -------- | -------------------------------------------------------------------------- |
| `closeEvent` | `void`   | Emitted when the close button is clicked.                                  |
| `backEvent`  | `void`   | Emitted when the back button is clicked.                                   |
| `payEvent`   | `number` | Emitted when a payment is made, passing the payment amount as a parameter. |

---

## Methods

### `handleClose()`

Emits the `closeEvent` when the close button is clicked.

### `handleBack()`

Emits the `backEvent` when the back button is clicked.

### `handlePay()`

Opens a modal for payment options.

### `getFormattedDate(date?: string): string`

Formats a date string using the specified `formatDates` input.

### `getFormattedAmount(amount: number): string`

Formats a number as currency.

### `handleActiveCustomAmount(event: any)`

Enables or disables the custom amount input based on the selected option.

### `handleSubmit()`

Handles the form submission for payments inside the modal, validating the input and emitting the `payEvent`.

### `getFormControl(name: string): FormControl`

Returns a specific form control from the `amountForm`.

### `updateErrorState()`

Updates the error state of the form controls.

### `getProgressPercent(): number`

Calculates the progress percentage based on the `counter` and `totalCount`.

### `customHandleClick()`

Handles the click action when using the component without the native modal service, emitting `payEvent` based on the configured amount.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-account-statement
  [componentTitle]="'Estado de cuenta'"
  [progressCircleTitle]="['Total a pagar', 'este mes']"
  [labelPrimary]="'Cuota Mensual'"
  [labelSecondary]="'Pendiente'"
  [totalCount]="1000"
  [counter]="500"
  [progressTitle]="'Total pagado'"
  [formatDates]="'yyyy-MM-dd'"
  [paymentDeadline]="'2025-04-30'"
  [cutOffDate]="'2025-04-15'"
  [paymentDeadlineLabel]="'Fecha límite de pago:'"
  [cutOffDateLabel]="'Fecha de corte:'"
  [payButtonLabel]="'Pagar'"
  [backButtonLabel]="'Regresar'"
  [modalTitle]="'Confirmar Pago'"
  [modalSubtitle]="'Seleccione una opción para continuar'"
  [modalRestLabel]="'Pagar restante'"
  [modalOtherAmountLabel]="'Otra cantidad'"
  [modalPrimaryButtonLabel]="'Pagar'"
  [errorMessage]="'Error, Este campo es requerido y debe ser una cantidad válida.'"
  (closeEvent)="onClose()"
  (backEvent)="onBack()"
  (payEvent)="onPay($event)"
></bmb-account-statement>
```

---

## Dependencies

The component relies on the following modules and components:

- `BmbHeaderMobileComponent`
- `BmbBalanceOverviewComponent`
- `BmbCardComponent`
- `BmbCardContentComponent`
- `BmbProgressBarComponent`
- `BmbDividerComponent`
- `BmbButtonDirective`
- `BmbModalComponent`
- `BmbRadialComponent`
- `BmbLayoutDirective`
- `BmbLayoutItemDirective`
- `BmbInputComponent`
- `ReactiveFormsModule`
