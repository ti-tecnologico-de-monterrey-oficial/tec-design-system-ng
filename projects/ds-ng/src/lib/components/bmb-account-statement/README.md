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

| Input                   | Type         | Default                          | Description                                                                 |
|--------------------------|--------------|----------------------------------|-----------------------------------------------------------------------------|
| `title`                 | `string`     | `'Estado de cuenta'`            | The title of the account statement.                                        |
| `progressCircleTitle`   | `string[]`   | `['Total a pagar', 'este mes']` | The title displayed inside the progress circle.                            |
| `labelPrimary`          | `string`     | `'Cuota Mensual'`               | The label for the primary amount.                                          |
| `labelSecondary`        | `string`     | `'Pendiente'`                   | The label for the secondary amount.                                        |
| `totalCount`            | `number`     | `0`                              | The total amount to be paid.                                               |
| `counter`               | `number`     | `0`                              | The amount already paid.                                                   |
| `progressTitle`         | `string`     | `'Total pagado'`                | The title for the progress bar.                                            |
| `formatDates`           | `string`     | `'yyyy-MM-dd'`                  | The date format used for displaying dates.                                 |
| `paymentDeadline`       | `string`     | `undefined`                     | The payment deadline date.                                                 |
| `cutOffDate`            | `string`     | `undefined`                     | The cutoff date for the account statement.                                 |
| `paymentDeadlineLabel`  | `string`     | `'Fecha límite de pago:'`       | The label for the payment deadline.                                        |
| `cutOffDateLabel`       | `string`     | `'Fecha de corte:'`             | The label for the cutoff date.                                             |
| `payButtonLabel`        | `string`     | `'Pagar'`                       | The label for the pay button.                                              |
| `backButtonLabel`       | `string`     | `'Regresar'`                    | The label for the back button.                                             |
| `modalTitle`            | `string`     | `''`                            | The title of the modal.                                                    |
| `modalSubtitle`         | `string`     | `''`                            | The subtitle of the modal.                                                 |
| `modalRestLabel`        | `string`     | `'Pagar restante'`              | The label for the "pay remaining" option in the modal.                     |
| `modalOtherAmountLabel` | `string`     | `'Otra cantidad'`               | The label for the "other amount" option in the modal.                      |
| `modalPrimaryButtonLabel` | `string`   | `'Pagar'`                       | The label for the primary button in the modal.                             |
| `errorMessage`          | `string`     | `'Error, Este campo es requerido y debe ser una cantidad entre 1 y '` | The error message displayed for invalid inputs. |

---

## Outputs

The component emits the following events:

| Output       | Type       | Description                                                                 |
|--------------|------------|-----------------------------------------------------------------------------|
| `closeEvent` | `void`     | Emitted when the close button is clicked.                                  |
| `backEvent`  | `void`     | Emitted when the back button is clicked.                                   |
| `payEvent`   | `number`   | Emitted when a payment is made, passing the payment amount as a parameter. |

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

### `onSubmit()`
Handles the form submission for payments, validating the input and emitting the `payEvent`.

### `getFormControl(name: string): FormControl`
Returns a specific form control from the `amountForm`.

### `updateErrorState()`
Updates the error state of the form controls.

### `getProgressPercent(): number`
Calculates the progress percentage based on the `counter` and `totalCount`.

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-account-statement
  [title]="'Estado de cuenta'"
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
