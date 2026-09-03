import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import type { IBmbDataAlertsParsed } from '../../bmb-alert-center/types';
import { BmbNotificationCardModalComponent } from './bmb-notification-card-modal.component';

const alert: IBmbDataAlertsParsed = {
  id: 1,
  title: 'Test alert',
  description: [{ text: 'Alert detail', type: 'paragraph' }],
  date: '02/09/2026 10:00',
  time: '10:00',
  type: 'info',
  isRead: false,
  isFavorite: false,
  isArchived: false,
  pDate: DateTime.fromFormat('02/09/2026 10:00', 'dd/MM/yyyy HH:mm'),
};

describe('BmbNotificationCardModalComponent', () => {
  let component: BmbNotificationCardModalComponent;
  let componentRef: ComponentRef<BmbNotificationCardModalComponent>;
  let fixture: ComponentFixture<BmbNotificationCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNotificationCardModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNotificationCardModalComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create and expose the visible alert', () => {
    componentRef.setInput('visibleAlert', alert);
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.getAlert()).toBe(alert);
  });

  it('should reject access when there is no visible alert', () => {
    expect(() => component.getAlert()).toThrow('No alert visible');
  });

  it('should emit alert interactions', () => {
    const emitSpy = jest.spyOn(component.alertEvent, 'emit');

    component.handleAlertEvent(alert);

    expect(emitSpy).toHaveBeenCalledWith(alert);
  });
});
