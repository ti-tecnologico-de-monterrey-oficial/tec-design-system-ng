import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { BmbListItemsComponent } from './bmb-list-items.component';

describe('BmbListItemsComponent', () => {
  let component: BmbListItemsComponent;
  let fixture: ComponentFixture<BmbListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbListItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbListItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should group items by recency based on their date', () => {
    const now = DateTime.now();
    const format = 'yyyy-MM-dd';
    fixture.componentRef.setInput('items', [
      { title: 'today', date: now.toFormat(format) },
      { title: 'last week', date: now.minus({ days: 5 }).toFormat(format) },
      { title: 'last month', date: now.minus({ days: 20 }).toFormat(format) },
      { title: 'old', date: now.minus({ days: 60 }).toFormat(format) },
    ]);

    fixture.detectChanges();

    expect(component.itemsGropedByDate.recent.map((e) => e.title)).toEqual([
      'today',
    ]);
    expect(component.itemsGropedByDate.lastWeek.map((e) => e.title)).toEqual([
      'last week',
    ]);
    expect(
      component.itemsGropedByDate.lastMonth.map((e) => e.title),
    ).toEqual(['last month']);
    expect(component.itemsGropedByDate.rest.map((e) => e.title)).toEqual([
      'old',
    ]);
  });

  it('should return relative labels for recent dates and a formatted date otherwise', () => {
    const now = DateTime.now();

    expect(component.getFormattedDate(now)).toBe('Hoy');
    expect(component.getFormattedDate(now.minus({ days: 1 }))).toBe('Ayer');

    const older = now.minus({ days: 10 });
    expect(component.getFormattedDate(older)).toBe(older.toFormat('dd/MM'));
  });

  it('should toggle isNewEnable and emit addButtonAction on add button click', () => {
    fixture.detectChanges();
    jest.spyOn(component.addButtonAction, 'emit');
    const event = new MouseEvent('click');

    component.handleAddButtonClick(event);

    expect(component.addButtonAction.emit).toHaveBeenCalledWith(event);
    expect(component.isNewEnable).toBe(true);
  });
});
