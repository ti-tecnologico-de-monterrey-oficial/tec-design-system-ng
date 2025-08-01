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
});
