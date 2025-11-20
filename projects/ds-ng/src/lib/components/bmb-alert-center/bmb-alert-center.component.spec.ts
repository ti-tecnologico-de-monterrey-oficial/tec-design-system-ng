import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { BmbAlertCenterComponent } from './bmb-alert-center.component';
import { BmbAlertCenterService } from './bmb-alert-center.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import {
  IBmbDataAlert,
  IBmbDataAlertsParsed,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertCenterTabConfig
} from './types';
import { ComponentRef } from '@angular/core';

describe('BmbAlertCenterComponent', () => {
  let component: BmbAlertCenterComponent;
  let fixture: ComponentFixture<BmbAlertCenterComponent>;
  let componentRef: ComponentRef<BmbAlertCenterComponent>;
  let mockAlertCenterService: jasmine.SpyObj<BmbAlertCenterService>;
  let mockNativeModalService: jasmine.SpyObj<BmbNativeModalService>;
  let mockTranslationsService: jasmine.SpyObj<BmbTranslationsService>;

  const mockAlerts: IBmbDataAlert[] = [
    {
      id: 1,
      title: 'Alert 1',
      description: [{ text: 'Description 1', type: 'paragraph' }],
      date: '01/01/2023',
      time: '12:00',
      isRead: false,
      isFavorite: false,
      isArchived: false,
      type: 'notification'
    },
    {
      id: 2,
      title: 'Alert 2',
      description: [{ text: 'Description 2', type: 'paragraph' }],
      date: '02/01/2023',
      time: '14:00',
      isRead: true,
      isFavorite: true,
      isArchived: false,
      type: 'notification'
    },
    {
      id: 3,
      title: 'Alert 3',
      description: [{ text: 'Description 3', type: 'paragraph' }],
      date: '15/11/2023',
      time: '10:00',
      isRead: false,
      isFavorite: false,
      isArchived: true,
      type: 'notification'
    }
  ];

  beforeEach(async () => {
    const alertCenterServiceSpy = jasmine.createSpyObj('BmbAlertCenterService', [
      'getAlerts',
      'getAdvertisements',
      'getLoadingState'
    ]);
    const nativeModalServiceSpy = jasmine.createSpyObj('BmbNativeModalService', [
      'openModal',
      'closeAllModals'
    ]);
    const translationsServiceSpy = jasmine.createSpyObj('BmbTranslationsService', [
      'translate'
    ]);

    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterComponent],
      providers: [
        { provide: BmbAlertCenterService, useValue: alertCenterServiceSpy },
        { provide: BmbNativeModalService, useValue: nativeModalServiceSpy },
        { provide: BmbTranslationsService, useValue: translationsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    mockAlertCenterService = TestBed.inject(BmbAlertCenterService) as jasmine.SpyObj<BmbAlertCenterService>;
    mockNativeModalService = TestBed.inject(BmbNativeModalService) as jasmine.SpyObj<BmbNativeModalService>;
    mockTranslationsService = TestBed.inject(BmbTranslationsService) as jasmine.SpyObj<BmbTranslationsService>;

    // Setup default mock returns
    mockAlertCenterService.getAlerts.and.returnValue([]);
    mockAlertCenterService.getAdvertisements.and.returnValue([]);
    mockAlertCenterService.getLoadingState.and.returnValue(false);
    mockTranslationsService.translate.and.returnValue('Translated text');

    componentRef.setInput('alerts', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('orderEvents', () => {
    it('should order events correctly by date and time (newest first)', () => {
      const alerts: IBmbDataAlert[] = [
        { ...mockAlerts[0], date: '01/01/2023', time: '12:00' },
        { ...mockAlerts[1], date: '02/01/2023', time: '12:00' },
      ];
      componentRef.setInput('dateFormat', 'dd/MM/yyyy');
      const orderedEvents = component.orderEvents(alerts);
      expect(orderedEvents[0].date).toBe('02/01/2023');
      expect(orderedEvents[1].date).toBe('01/01/2023');
    });

    it('should handle same date with different times', () => {
      const alerts: IBmbDataAlert[] = [
        { ...mockAlerts[0], date: '01/01/2023', time: '10:00' },
        { ...mockAlerts[1], date: '01/01/2023', time: '15:00' },
      ];
      componentRef.setInput('dateFormat', 'dd/MM/yyyy');
      const orderedEvents = component.orderEvents(alerts);
      expect(orderedEvents[0].time).toBe('15:00');
      expect(orderedEvents[1].time).toBe('10:00');
    });
  });

  describe('orderCategories', () => {
    beforeEach(() => {
      // Mock current date to have predictable test results
      const mockDate = DateTime.fromISO('2023-11-20T12:00:00') as DateTime<true>;
      spyOn(DateTime, 'now').and.returnValue(mockDate);
      component.now = mockDate;
    });

    it('should categorize alerts correctly', () => {
      const parsedAlerts: IBmbDataAlertsParsed[] = [
        { ...mockAlerts[0], pDate: DateTime.fromISO('2023-11-20T10:00:00') as DateTime<true> }, // same day (diff = 0)
        { ...mockAlerts[1], pDate: DateTime.fromISO('2023-11-15T10:00:00') as DateTime<true> }, // 5 days ago (diff = 5, <= 7)
        { ...mockAlerts[2], pDate: DateTime.fromISO('2023-10-15T10:00:00') as DateTime<true> }, // 36 days ago (diff > 30)
      ];

      const categories = component.orderCategories(parsedAlerts);

      expect(categories.recent.length).toBe(1); // same day
      expect(categories.sevenDays.length).toBe(1); // 5 days ago
      expect(categories.month.length).toBe(0); // no alerts in month range
      expect(categories.rest.length).toBe(1); // 36 days ago

      // Verify the correct alert is in each category
      expect(categories.recent[0].id).toBe(1);
      expect(categories.sevenDays[0].id).toBe(2);
      expect(categories.rest[0].id).toBe(3);
    });

    it('should handle empty alert array', () => {
      const categories = component.orderCategories([]);

      expect(categories.recent).toEqual([]);
      expect(categories.sevenDays).toEqual([]);
      expect(categories.month).toEqual([]);
      expect(categories.rest).toEqual([]);
    });
  });

  describe('computed properties', () => {
    it('should combine alerts from input and service', () => {
      const inputAlerts = [mockAlerts[0]];
      const serviceAlerts = [mockAlerts[1]];

      componentRef.setInput('alerts', inputAlerts);
      mockAlertCenterService.getAlerts.and.returnValue(serviceAlerts);

      const alertList = component.alertList();
      expect(alertList.length).toBe(2);
      expect(alertList).toContain(mockAlerts[0]);
      expect(alertList).toContain(mockAlerts[1]);
    });

    it('should generate tabs correctly from string array', () => {
      const tabNames = ['Tab 1', 'Tab 2'];
      componentRef.setInput('tabsName', tabNames);
      componentRef.setInput('alerts', [mockAlerts[0]]); // one unread alert

      const tabs = component.tabs();
      expect(tabs.length).toBe(2);
      expect(tabs[0].title).toBe('Tab 1');
      expect(tabs[0].isActive).toBe(true);
      expect(tabs[0].badge).toBe(1); // unread count
    });

    it('should generate tabs correctly from config objects', () => {
      const tabConfigs: IBmbAlertCenterTabConfig[] = [
        { title: 'Desktop Tab', isMobile: false, isDesktop: true },
        { title: 'Mobile Tab', isMobile: true, isDesktop: false }
      ];
      componentRef.setInput('tabsName', tabConfigs);

      const tabs = component.tabs();
      expect(tabs[0].isMobile).toBe(false);
      expect(tabs[0].isDesktop).toBe(true);
      expect(tabs[1].isMobile).toBe(true);
      expect(tabs[1].isDesktop).toBe(false);
    });

    it('should calculate unread badge count correctly', () => {
      const alertsWithUnread = [
        { ...mockAlerts[0], isRead: false },
        { ...mockAlerts[1], isRead: false },
        { ...mockAlerts[2], isRead: true }
      ];
      componentRef.setInput('alerts', alertsWithUnread);

      const tabs = component.tabs();
      expect(tabs[0].badge).toBe(2); // first two tabs should show unread count
      expect(tabs[1].badge).toBe(2);
    });
  });

  describe('handleShowAlert', () => {
    beforeEach(() => {
      // Mock container width
      Object.defineProperty(component.container.nativeElement, 'clientWidth', {
        writable: true,
        value: 500
      });
      // Mock window width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200
      });
    });

    it('should emit showAlertDetail event', () => {
      spyOn(component.showAlertDetail, 'emit');
      const alertWithParsedDate: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        pDate: DateTime.now() as DateTime<true>
      };

      component.handleShowAlert(alertWithParsedDate);

      expect(component.showAlertDetail.emit).toHaveBeenCalledWith(mockAlerts[0]);
    });

    it('should open modal on mobile view', () => {
      componentRef.setInput('showMobileVersion', true);
      const alertWithParsedDate: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        pDate: DateTime.now() as DateTime<true>
      };

      component.handleShowAlert(alertWithParsedDate);

      expect(mockNativeModalService.openModal).toHaveBeenCalled();
    });

    it('should open modal when container width is small', () => {
      Object.defineProperty(component.container.nativeElement, 'clientWidth', {
        value: 300
      });
      const alertWithParsedDate: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        pDate: DateTime.now() as DateTime<true>
      };

      component.handleShowAlert(alertWithParsedDate);

      expect(mockNativeModalService.openModal).toHaveBeenCalled();
    });
  });

  describe('handleCloseDetail', () => {
    it('should emit closeAlertDetail and close modals', () => {
      spyOn(component.closeAlertDetail, 'emit');
      const alertWithParsedDate: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        pDate: DateTime.now() as DateTime<true>
      };

      component.handleCloseDetail(alertWithParsedDate);

      expect(component.closeAlertDetail.emit).toHaveBeenCalledWith(mockAlerts[0]);
      expect(mockNativeModalService.closeAllModals).toHaveBeenCalled();
    });
  });

  describe('handleAlertEvent', () => {
    it('should emit alert event', () => {
      spyOn(component.alertEvent, 'emit');

      component.handleAlertEvent(mockAlerts[0]);

      expect(component.alertEvent.emit).toHaveBeenCalledWith(mockAlerts[0]);
    });
  });

  describe('handleChangeAlertStatus', () => {
    it('should emit change alert status event', () => {
      spyOn(component.onChangeAlertStatus, 'emit');
      const statusChange = { type: 'read', data: ['1'] };

      component.handleChangeAlertStatus(statusChange);

      expect(component.onChangeAlertStatus.emit).toHaveBeenCalledWith(statusChange);
    });
  });

  describe('handleNavigationBarEvents', () => {
    beforeEach(() => {
      componentRef.setInput('alerts', mockAlerts);
    });

    it('should handle tags event correctly', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'tags',
        alerts: ['1', '2']
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).toHaveBeenCalledWith({
        alerts: [mockAlerts[0], mockAlerts[1]],
        event: 'tags'
      });
    });

    it('should handle add_read event when some alerts are unread', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'isRead',
        alerts: ['1'] // mockAlerts[0] is unread
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).toHaveBeenCalledWith({
        alerts: [mockAlerts[0]],
        event: 'add_read'
      });
    });

    it('should handle remove_read event when all alerts are read', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'isRead',
        alerts: ['2'] // mockAlerts[1] is read
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).toHaveBeenCalledWith({
        alerts: [mockAlerts[1]],
        event: 'remove_read'
      });
    });

    it('should handle favorite events correctly', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'isFavorite',
        alerts: ['1'] // mockAlerts[0] is not favorite
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).toHaveBeenCalledWith({
        alerts: [mockAlerts[0]],
        event: 'add_favorite'
      });
    });

    it('should handle archived events correctly', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'isArchived',
        alerts: ['3'] // mockAlerts[2] is archived
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).toHaveBeenCalledWith({
        alerts: [mockAlerts[2]],
        event: 'remove_archived'
      });
    });

    it('should return early when no matching alerts found', () => {
      spyOn(component.navigationBarEvents, 'emit');
      const event: IBmbAlertCenterProtoEventFooter = {
        event: 'isRead',
        alerts: ['999'] // non-existent alert ID
      };

      component.handleNavigationBarEvents(event);

      expect(component.navigationBarEvents.emit).not.toHaveBeenCalled();
    });
  });

  describe('input validation', () => {
    it('should handle default dateFormat', () => {
      expect(component.dateFormat()).toBe('dd/MM/yyyy');
    });

    it('should handle default tabsName configuration', () => {
      const defaultTabs = component.tabs();
      expect(defaultTabs.length).toBe(5);
      expect(defaultTabs[0].title).toBe('Notificaciones');
      expect(defaultTabs[1].title).toBe('No leídos');
      expect(defaultTabs[4].title).toBe('Anuncios');
    });

    it('should handle default emptyStateData', () => {
      const emptyState = component.emptyStateData();
      expect(emptyState.size).toBe('large');
      expect(emptyState.showButton).toBe(false);
    });

    it('should handle enableMultipleSelection input', () => {
      expect(component.enableMultipleSelection()).toBe(true);

      componentRef.setInput('enableMultipleSelection', false);
      expect(component.enableMultipleSelection()).toBe(false);
    });

    it('should handle showMobileVersion input', () => {
      expect(component.showMobileVersion()).toBe(false);

      componentRef.setInput('showMobileVersion', true);
      expect(component.showMobileVersion()).toBe(true);
    });

    it('should handle hideTabs input', () => {
      expect(component.hideTabs()).toBe(false);

      componentRef.setInput('hideTabs', true);
      expect(component.hideTabs()).toBe(true);
    });
  });

  describe('service integration', () => {
    it('should use loading state from service', () => {
      // Reset and setup mock for loading state
      TestBed.resetTestingModule();
      const alertCenterServiceSpy = jasmine.createSpyObj('BmbAlertCenterService', [
        'getAlerts',
        'getAdvertisements', 
        'getLoadingState'
      ]);
      alertCenterServiceSpy.getAlerts.and.returnValue([]);
      alertCenterServiceSpy.getAdvertisements.and.returnValue([]);
      alertCenterServiceSpy.getLoadingState.and.returnValue(true);

      TestBed.configureTestingModule({
        imports: [BmbAlertCenterComponent],
        providers: [
          { provide: BmbAlertCenterService, useValue: alertCenterServiceSpy },
          { provide: BmbNativeModalService, useValue: mockNativeModalService },
          { provide: BmbTranslationsService, useValue: mockTranslationsService }
        ]
      });

      const testFixture = TestBed.createComponent(BmbAlertCenterComponent);
      const testComponent = testFixture.componentInstance;
      testFixture.componentRef.setInput('alerts', []);
      testFixture.detectChanges();
      
      expect(testComponent.isLoading()).toBe(true);
    });

    it('should get advertisements from service', () => {
      const serviceAds = [mockAlerts[0]];
      mockAlertCenterService.getAdvertisements.and.returnValue(serviceAds);

      expect(component.advertisementsList()).toContain(mockAlerts[0]);
    });
  });
});
