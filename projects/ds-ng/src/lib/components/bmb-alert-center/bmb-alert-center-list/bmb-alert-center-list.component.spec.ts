import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, DebugElement } from '@angular/core';
import { DateTime } from 'luxon';
import { By } from '@angular/platform-browser';

import { BmbAlertCenterListComponent } from './bmb-alert-center-list.component';
import { IBmbDataAlertsParsed } from '../types';

describe('BmbAlertCenterListComponent', () => {
  let component: BmbAlertCenterListComponent;
  let fixture: ComponentFixture<BmbAlertCenterListComponent>;
  let componentRef: ComponentRef<BmbAlertCenterListComponent>;

  const mockAlerts: IBmbDataAlertsParsed[] = [
    {
      id: 1,
      title: 'Alert 1',
      description: [{ text: 'Description 1', type: 'paragraph' }],
      date: '01/01/2023',
      time: '09:30',
      isRead: false,
      isFavorite: false,
      isArchived: false,
      type: 'notification',
      pDate: DateTime.fromISO('2023-01-01T09:30:00') as DateTime<true>,
      tags: [
        { text: 'Urgent', color: 'error' },
        { text: 'Academic', color: 'info' },
      ],
    },
    {
      id: 2,
      title: 'Alert 2',
      description: [{ text: 'Description 2', type: 'paragraph' }],
      date: '02/01/2023',
      time: '14:00',
      isRead: true,
      isFavorite: false,
      isArchived: false,
      type: 'reminder',
      pDate: DateTime.fromISO('2023-01-02T14:00:00') as DateTime<true>,
    },
    {
      id: 3,
      title: 'Favorite Alert',
      description: [{ text: 'Description 3', type: 'paragraph' }],
      date: '03/01/2023',
      time: '16:15',
      isRead: false,
      isFavorite: true,
      isArchived: false,
      type: 'event',
      pDate: DateTime.fromISO('2023-01-03T16:15:00') as DateTime<true>,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterListComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required input
    componentRef.setInput('alerts', mockAlerts);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Inputs', () => {
    it('should handle required alerts input', () => {
      expect(component.alerts()).toEqual(mockAlerts);
    });

    it('should have default name input as empty string', () => {
      expect(component.name()).toBe('');
    });

    it('should handle custom name input', () => {
      componentRef.setInput('name', 'Custom Alert List');
      expect(component.name()).toBe('Custom Alert List');
    });

    it('should have enableMultipleSelection as true by default', () => {
      expect(component.enableMultipleSelection()).toBe(true);
    });

    it('should handle enableMultipleSelection input', () => {
      componentRef.setInput('enableMultipleSelection', false);
      expect(component.enableMultipleSelection()).toBe(false);
    });
  });

  describe('Template Rendering', () => {
    it('should render correct number of alert items', () => {
      const alertItems = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item'),
      );
      expect(alertItems.length).toBe(mockAlerts.length);
    });

    it('should display alert titles correctly', () => {
      const titleElements = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item-title'),
      );

      expect(titleElements.length).toBe(mockAlerts.length);
      expect(titleElements[0].nativeElement.textContent.trim()).toBe('Alert 1');
      expect(titleElements[1].nativeElement.textContent.trim()).toBe('Alert 2');
      expect(titleElements[2].nativeElement.textContent.trim()).toBe(
        'Favorite Alert',
      );
    });

    it('should display formatted time correctly', () => {
      const timeElements = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item-time'),
      );

      expect(timeElements.length).toBe(mockAlerts.length);
      expect(timeElements[0].nativeElement.textContent.trim()).toBe('9:30 AM');
      expect(timeElements[1].nativeElement.textContent.trim()).toBe('2:00 PM');
      expect(timeElements[2].nativeElement.textContent.trim()).toBe('4:15 PM');
    });

    it('should show checkboxes when enableMultipleSelection is true', () => {
      const checkboxes = fixture.debugElement.queryAll(By.css('bmb-checkbox'));
      expect(checkboxes.length).toBe(mockAlerts.length);
    });

    it('should hide checkboxes when enableMultipleSelection is false', () => {
      componentRef.setInput('enableMultipleSelection', false);
      fixture.detectChanges();

      const checkboxes = fixture.debugElement.queryAll(By.css('bmb-checkbox'));
      expect(checkboxes.length).toBe(0);
    });

    it('should show unread status circle for unread non-favorite alerts', () => {
      const statusCircles = fixture.debugElement.queryAll(
        By.css(
          '.bmb_alert-center-list-item-status-circle:not(.bmb_alert-center-list-item-status-circle-read)',
        ),
      );
      expect(statusCircles.length).toBe(1); // Only Alert 1 is unread and not favorite
    });

    it('should show read status circle for read alerts', () => {
      const readStatusCircles = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item-status-circle-read'),
      );
      expect(readStatusCircles.length).toBe(1); // Only Alert 2 is read and not favorite
    });

    it('should show favorite star icon for favorite alerts', () => {
      const favoriteIcons = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item-status-favorite'),
      );
      expect(favoriteIcons.length).toBe(1); // Only Alert 3 is favorite
    });

    it('should render tags when present', () => {
      const badges = fixture.debugElement.queryAll(By.css('bmb-badge'));
      expect(badges.length).toBe(2); // Only Alert 1 has tags (2 tags)
    });

    it('should not render tags section when alerts have no tags', () => {
      const alertsWithoutTags: IBmbDataAlertsParsed[] = [
        {
          ...mockAlerts[0],
          tags: undefined,
        },
      ];

      componentRef.setInput('alerts', alertsWithoutTags);
      fixture.detectChanges();

      const tagsSection = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-tags'),
      );
      expect(tagsSection).toBeNull();
    });
  });

  describe('Event Handling', () => {
    it('should emit alertSelected when handleRowClick is called', () => {
      spyOn(component.alertSelected, 'emit');

      component.handleRowClick(mockAlerts[0]);

      expect(component.alertSelected.emit).toHaveBeenCalledWith(mockAlerts[0]);
    });

    it('should emit alertSelected when row is clicked', () => {
      spyOn(component.alertSelected, 'emit');

      const contentElement = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-content'),
      );
      contentElement.nativeElement.click();

      expect(component.alertSelected.emit).toHaveBeenCalledWith(mockAlerts[0]);
    });

    it('should emit selectedAlert when handleSelection is called', () => {
      spyOn(component.selectedAlert, 'emit');
      const mockEvent = new Event('change');

      component.handleSelection(mockEvent, mockAlerts[0]);

      expect(component.selectedAlert.emit).toHaveBeenCalledWith({
        event: mockEvent,
        item: mockAlerts[0],
      });
    });

    it('should emit selectedAlert when checkbox changes', () => {
      spyOn(component.selectedAlert, 'emit');

      const checkbox = fixture.debugElement.query(By.css('bmb-checkbox'));
      const changeEvent = new Event('change');
      checkbox.triggerEventHandler('change', changeEvent);

      expect(component.selectedAlert.emit).toHaveBeenCalledWith({
        event: changeEvent,
        item: mockAlerts[0],
      });
    });
  });

  describe('Date and Time Formatting', () => {
    it('should format date correctly in Spanish', () => {
      const testDate = DateTime.fromISO(
        '2023-01-01T10:00:00',
      ) as DateTime<true>;
      const formattedDate = component.getTextFromDate(testDate);

      expect(formattedDate).toContain('domingo'); // Sunday in Spanish
      expect(formattedDate).toContain('01'); // day
      expect(formattedDate).toContain('enero'); // January in Spanish
      expect(formattedDate).toContain('2023'); // year
    });

    it('should format time correctly to 12-hour format', () => {
      expect(component.getFormattedTime('09:30')).toBe('9:30 AM');
      expect(component.getFormattedTime('14:00')).toBe('2:00 PM');
      expect(component.getFormattedTime('00:00')).toBe('12:00 AM');
      expect(component.getFormattedTime('12:00')).toBe('12:00 PM');
      expect(component.getFormattedTime('23:59')).toBe('11:59 PM');
    });

    it('should handle invalid time format gracefully', () => {
      expect(() => component.getFormattedTime('invalid')).not.toThrow();
    });
  });

  describe('Component State', () => {
    it('should initialize isSelected as empty array', () => {
      expect(component.isSelected).toEqual([]);
    });

    it('should handle empty alerts array', () => {
      componentRef.setInput('alerts', []);
      fixture.detectChanges();

      const alertItems = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item'),
      );
      expect(alertItems.length).toBe(0);
    });

    it('should handle alerts without optional properties', () => {
      const minimalAlerts: IBmbDataAlertsParsed[] = [
        {
          id: 1,
          title: 'Minimal Alert',
          description: [{ text: 'Description', type: 'paragraph' }],
          date: '01/01/2023',
          time: '09:30',
          isRead: false,
          isFavorite: false,
          isArchived: false,
          type: 'notification',
          pDate: DateTime.fromISO('2023-01-01T09:30:00') as DateTime<true>,
          // no tags property
        },
      ];

      componentRef.setInput('alerts', minimalAlerts);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();

      const alertItems = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item'),
      );
      expect(alertItems.length).toBe(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper list structure', () => {
      const listElement = fixture.debugElement.query(
        By.css('ul.bmb_alert-center-list'),
      );
      expect(listElement).toBeTruthy();

      const listItems = fixture.debugElement.queryAll(
        By.css('li.bmb_alert-center-list-item'),
      );
      expect(listItems.length).toBe(mockAlerts.length);
    });

    it('should handle keyboard events on alert content', () => {
      spyOn(component.alertSelected, 'emit');

      const contentElement = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-content'),
      );
      const keyupEvent = new KeyboardEvent('keyup', { key: 'Enter' });

      contentElement.nativeElement.dispatchEvent(keyupEvent);

      expect(component.alertSelected.emit).toHaveBeenCalledWith(mockAlerts[0]);
    });

    it('should have proper checkbox ids and names', () => {
      const checkboxes = fixture.debugElement.queryAll(By.css('bmb-checkbox'));

      expect(checkboxes[0].componentInstance.name()).toBe('1');
      expect(checkboxes[0].componentInstance.value()).toBe('1');
      expect(checkboxes[1].componentInstance.name()).toBe('2');
      expect(checkboxes[1].componentInstance.value()).toBe('2');
    });
  });

  describe('Edge Cases', () => {
    it('should handle alerts with very long titles', () => {
      const longTitleAlert: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        title:
          'This is a very long alert title that should be handled gracefully by the component without breaking the layout or causing any issues',
      };

      componentRef.setInput('alerts', [longTitleAlert]);
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-title'),
      );
      expect(titleElement.nativeElement.textContent.trim()).toContain(
        'This is a very long alert title',
      );
    });

    it('should handle alerts with special characters in title', () => {
      const specialCharAlert: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        title: 'Alert with émojis 🚨 & spëcial characters <>&"',
      };

      componentRef.setInput('alerts', [specialCharAlert]);
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-title'),
      );
      expect(titleElement.nativeElement.textContent.trim()).toBe(
        'Alert with émojis 🚨 & spëcial characters <>&"',
      );
    });

    it('should handle alerts with empty tags array', () => {
      const emptyTagsAlert: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        tags: [],
      };

      componentRef.setInput('alerts', [emptyTagsAlert]);
      fixture.detectChanges();

      const badges = fixture.debugElement.queryAll(By.css('bmb-badge'));
      expect(badges.length).toBe(0);
    });

    it('should handle different alert states combination', () => {
      const complexStateAlert: IBmbDataAlertsParsed = {
        ...mockAlerts[0],
        isRead: true,
        isFavorite: true,
        isArchived: true,
      };

      componentRef.setInput('alerts', [complexStateAlert]);
      fixture.detectChanges();

      // Should show favorite icon (takes priority over read status)
      const favoriteIcon = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-status-favorite'),
      );
      expect(favoriteIcon).toBeTruthy();

      // Should not show read status circle when favorite
      const readCircle = fixture.debugElement.query(
        By.css('.bmb_alert-center-list-item-status-circle-read'),
      );
      expect(readCircle).toBeFalsy();
    });
  });

  describe('Performance', () => {
    it('should handle large number of alerts efficiently', () => {
      const manyAlerts: IBmbDataAlertsParsed[] = Array.from(
        { length: 100 },
        (_, index) => ({
          id: index + 1,
          title: `Alert ${index + 1}`,
          description: [
            { text: `Description ${index + 1}`, type: 'paragraph' },
          ],
          date: '01/01/2023',
          time: '09:30',
          isRead: index % 2 === 0,
          isFavorite: index % 5 === 0,
          isArchived: false,
          type: 'notification',
          pDate: DateTime.fromISO('2023-01-01T09:30:00') as DateTime<true>,
        }),
      );

      const startTime = performance.now();
      componentRef.setInput('alerts', manyAlerts);
      fixture.detectChanges();
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000); // Should render within 1 second

      const alertItems = fixture.debugElement.queryAll(
        By.css('.bmb_alert-center-list-item'),
      );
      expect(alertItems.length).toBe(100);
    });
  });
});
