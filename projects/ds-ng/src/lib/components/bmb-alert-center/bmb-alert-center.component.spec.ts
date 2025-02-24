import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAlertCenterComponent } from './bmb-alert-center.component';
import { IBmbDataAlert } from './types';
import { ComponentRef } from '@angular/core';

describe('BmbAlertCenterComponent', () => {
  let component: BmbAlertCenterComponent;
  let fixture: ComponentFixture<BmbAlertCenterComponent>;
  let componentRef: ComponentRef<BmbAlertCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('alerts', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order events correctly', () => {
    const alerts: IBmbDataAlert[] = [
      { date: '01/01/2023', time: '12:00' } as IBmbDataAlert,
      { date: '02/01/2023', time: '12:00' } as IBmbDataAlert,
    ];
    componentRef.setInput('alerts', alerts);
    componentRef.setInput('dateFormat', 'dd/MM/yyyy');
    const orderedEvents = component.orderEvents(alerts);
    expect(orderedEvents[0].date).toBe('02/01/2023');
  });

  it('should categorize events correctly', () => {
    const alerts = [
      { date: '01/01/2023', time: '12:00' } as IBmbDataAlert,
      { date: '02/01/2023', time: '12:00' } as IBmbDataAlert,
    ];
    componentRef.setInput('alerts', alerts);
    componentRef.setInput('dateFormat', 'dd/MM/yyyy');
    component.ngOnInit();
    const categories = component.orderCategories(component.orderedEvents);
    expect(categories.recent.length).toBe(0);
    expect(categories.sevenDays.length).toBe(0);
    expect(categories.month.length).toBe(0);
    expect(categories.rest.length).toBe(2);
  });

  it('should filter events correctly', () => {
    const alerts = [
      { isRead: false, date: '01/01/2023', time: '12:00' } as IBmbDataAlert,
      { isRead: true, date: '02/01/2023', time: '12:00' } as IBmbDataAlert,
    ];
    componentRef.setInput('alerts', alerts);
    componentRef.setInput('dateFormat', 'dd/MM/yyyy');
    component.ngOnInit();
    const filteredEvents = component.filterEvents(1);
    expect(filteredEvents.recent.length).toBe(0);
    expect(filteredEvents.sevenDays.length).toBe(0);
    expect(filteredEvents.month.length).toBe(0);
    expect(filteredEvents.rest.length).toBe(1);
  });

  it('should handle tab change correctly', () => {
    component.handleTabChange({
      id: 1,
      title: 'No Leídos',
      isActive: true,
      badge: 0,
    });
    expect(component.selectedTab).toBe(1);
  });
});
