import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbNotificationCardComponent } from './bmb-notification-card.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { IBmbDataAlert, IBmbDataAlertsParsed } from '../bmb-alert-center/types';
import { ComponentRef } from '@angular/core';
import { DateTime } from 'luxon';
import { BmbNotificationCardModalComponent } from './bmb-notification-card-modal/bmb-notification-card-modal.component';

class MockBmbTranslationsService {
  translate(key: string) {
    return key;
  }
}

class MockBmbProjectionContentService {
  closeContent() {}
}

class MockBmbNativeModalService {
  openModal(config: any) {}
}

const mockAlert: IBmbDataAlert = {
  id: 1,
  title: 'Test Alert',
  description: [{ text: 'desc', type: 'paragraph' }],
  date: '01/01/2023 10:00',
  isRead: false,
  time: '10:00',
  type: 'info',
  isFavorite: false,
  isArchived: false,
};

const mockParsedAlert: IBmbDataAlertsParsed = {
  ...mockAlert,
  pDate: DateTime.fromFormat('01/01/2023 10:00', 'dd/MM/yyyy HH:mm'),
};

describe('BmbNotificationCardComponent', () => {
  let component: BmbNotificationCardComponent;
  let fixture: ComponentFixture<BmbNotificationCardComponent>;
  let componentRef: ComponentRef<BmbNotificationCardComponent>;
  let modalService: BmbNativeModalService;
  let projectionService: BmbProjectionContentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNotificationCardComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useClass: MockBmbTranslationsService,
        },
        {
          provide: BmbProjectionContentService,
          useClass: MockBmbProjectionContentService,
        },
        { provide: BmbNativeModalService, useClass: MockBmbNativeModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNotificationCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    modalService = TestBed.inject(BmbNativeModalService);
    projectionService = TestBed.inject(BmbProjectionContentService);

    componentRef.setInput('data', []);
    componentRef.setInput('advertisements', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parsedData', () => {
    it('should parse dates correctly with default format', () => {
      componentRef.setInput('data', [mockAlert]);
      fixture.detectChanges();

      const parsed = component.parsedData();
      expect(parsed.length).toBe(1);
      expect(parsed[0].pDate.isValid).toBe(true);
      expect(parsed[0].pDate.toFormat('dd/MM/yyyy HH:mm')).toBe(
        '01/01/2023 10:00',
      );
    });

    it('should parse dates correctly with iso format', () => {
      const isoDate = '2023-01-01T10:00:00';
      const isoAlert = { ...mockAlert, date: isoDate };
      componentRef.setInput('data', [isoAlert]);
      componentRef.setInput('dateFormat', 'iso');
      fixture.detectChanges();

      const parsed = component.parsedData();
      expect(parsed.length).toBe(1);
      expect(parsed[0].pDate.isValid).toBe(true);
      expect(parsed[0].pDate.hasSame(DateTime.fromISO(isoDate), 'minute')).toBe(
        true,
      );
    });
  });

  describe('badgeTabs', () => {
    it('should calculate badge counts for unread items', () => {
      const unreadAlert = { ...mockAlert, isRead: false };
      const readAlert = { ...mockAlert, isRead: true };

      componentRef.setInput('data', [unreadAlert, readAlert, unreadAlert]);
      componentRef.setInput('advertisements', [unreadAlert]);
      fixture.detectChanges();

      const badges = component.badgeTabs();
      expect(badges[0]).toBe(2); // 2 unread alerts
      expect(badges[1]).toBe(1); // 1 unread advertisement
    });
  });

  describe('tabsConfig', () => {
    it('should configure tabs with translated titles and badges', () => {
      componentRef.setInput('data', [{ ...mockAlert, isRead: false }]);
      fixture.detectChanges();

      const tabs = component.tabsConfig();
      expect(tabs.length).toBe(2);
      expect(tabs[0].title).toBe('notification_card.tabs.notifications');
      expect(tabs[0].badge).toBe(1);
      expect(tabs[1].title).toBe('notification_card.tabs.advertisements');
    });
  });

  describe('getEmptyStateData', () => {
    it('should return custom empty state if provided', () => {
      const customState = { primaryText: 'Custom', showButton: true };
      componentRef.setInput('emptyStateData', customState);
      fixture.detectChanges();

      expect(component.getEmptyStateData()).toBe(customState as any);
    });

    it('should return default empty state if not provided', () => {
      const defaultState = component.getEmptyStateData();
      expect(defaultState.primaryText).toBe(
        'notification_card.empty_state.primary_text',
      );
      expect(defaultState.showButton).toBe(false);
    });
  });

  describe('handleAlertEvent', () => {
    it('should emit alertEvent', () => {
      const spy = spyOn(component.alertEvent, 'emit');
      component.handleAlertEvent(mockAlert);
      expect(spy).toHaveBeenCalledWith(mockAlert);
    });
  });

  describe('handleAlertSelected', () => {
    it('should emit showAlertDetail, close existing projection, and open modal', () => {
      const emitSpy = spyOn(component.showAlertDetail, 'emit');
      const closeSpy = spyOn(projectionService, 'closeContent');
      const openModalSpy = spyOn(modalService, 'openModal');

      component.handleAlertSelected(mockParsedAlert);

      expect(emitSpy).toHaveBeenCalledWith(mockParsedAlert);
      expect(closeSpy).toHaveBeenCalled();
      expect(openModalSpy).toHaveBeenCalledWith({
        title: mockParsedAlert.title,
        content: BmbNotificationCardModalComponent,
        size: 'small',
        inputContext: {
          visibleAlert: mockParsedAlert,
        },
      });
    });
  });
});
