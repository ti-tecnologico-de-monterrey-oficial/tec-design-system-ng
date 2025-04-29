# Advertisement Card

The `BmbAdvertisementCardComponent` is a standalone Angular component designed to display advertisements, promotions, and informational content in a card format. It supports tabs for switching between different categories of content and includes pagination for navigating through multiple items.

---

## Selector

```html
<bmb-advertisement-card></bmb-advertisement-card>
```

---

## Inputs

The component accepts the following inputs to customize its behavior and appearance:

| Input      | Type     | Default | Description                                       |
| ---------- | -------- | ------- | ------------------------------------------------- |
| `subtitle` | `string` | `''`    | The subtitle displayed in the advertisement card. |

---

## Data Model

The component uses the following data structure for its content:

```typescript
interface IBmbAdvertisementData {
  promociones: Array<{
    imgData: { url: string; alt: string };
    content: { title: string; description: string; linkBtn: string; labelBtn: string };
  }>;
  avisos: Array<{
    imgData: { url: string; alt: string };
    content: { title: string; description: string; linkBtn: string };
  }>;
  informacion: Array<{
    imgData: { url: string; alt: string };
    content: { title: string; description: string; linkBtn: string };
  }>;
}
```

---

## Methods

### `setActiveTab(tab: number): void`

Sets the active tab and updates the displayed content based on the selected category (`promociones`, `avisos`, or `informacion`).

### `onDotPress(event: any): void`

Handles the event when a pagination dot is pressed, updating the active dot.

### `setSize(size: string): void`

Expands or collapses the card based on the provided size (`expand` or `collapse`).

---

## HTML Structure

The component's template is structured as follows:

```html
<bmb-advertisement-card [subtitle]="'Promotions and Updates'">
  <div class="tabs">
    <button (click)="setActiveTab(1)">Promociones</button>
    <button (click)="setActiveTab(2)">Avisos</button>
    <button (click)="setActiveTab(3)">Información</button>
  </div>

  <div class="content">
    <ng-container *ngFor="let item of activeData">
      <div class="card">
        <img [src]="item.imgData.url" [alt]="item.imgData.alt" />
        <h3>{{ item.content.title }}</h3>
        <p>{{ item.content.description }}</p>
        <button *ngIf="item.content.linkBtn" [href]="item.content.linkBtn">{{ item.content.labelBtn }}</button>
      </div>
    </ng-container>
  </div>

  <bmb-dot-paginator [dots]="activeData.length" (dotPress)="onDotPress($event)"></bmb-dot-paginator>
</bmb-advertisement-card>
```

---

## Usage Example

```html
<bmb-advertisement-card [subtitle]="'Latest Promotions'"> </bmb-advertisement-card>
```

---

## Dependencies

The component relies on the following modules and components:

- `CommonModule` (Angular)
- `BmbIconComponent` (Bamboo Design System)
- `BmbDotPaginatorComponent` (Bamboo Design System)
- `BmbButtonDirective` (Bamboo Design System)
