import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HitoListPage } from './hito-list-page';

describe('HitoListPage', () => {
  let component: HitoListPage;
  let fixture: ComponentFixture<HitoListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitoListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HitoListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update formatting and month order', () => {
    component.setDateFormat('dd/MM/yyyy');
    component.setLang('en');
    component.reverseMonths();

    expect(component.dateFormat()).toBe('dd/MM/yyyy');
    expect(component.lang()).toBe('en');
    expect(component.orderedMonths()).toEqual(['February', 'January']);
  });

  it('should capture the selected date output', () => {
    const selectedDate = {
      month: 'February',
      day: '20',
      date: component.events.February.events['20'].date,
    };

    component.handleSelectedDate(selectedDate);

    expect(component.selectedDate()).toEqual(selectedDate);
    expect(component.lastAction()).toContain('February 20');
  });
});
