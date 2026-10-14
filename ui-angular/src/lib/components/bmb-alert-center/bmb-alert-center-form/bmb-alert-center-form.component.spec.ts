import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { DateTime } from 'luxon';
import { BmbAlertCenterFormComponent } from './bmb-alert-center-form.component';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import type {
  IBmbAlertCenterCategories,
  IBmbDataAlertsParsed,
} from '../types';

describe('BmbAlertCenterFormComponent', () => {
  let component: BmbAlertCenterFormComponent;
  let fixture: ComponentFixture<BmbAlertCenterFormComponent>;
  let componentRef: ComponentRef<BmbAlertCenterFormComponent>;

  const alerts: IBmbDataAlertsParsed[] = [
    {
      id: 1,
      title: 'Unread recent',
      description: [{ text: 'First', type: 'paragraph' }],
      date: '13/10/2026',
      time: '09:00',
      isRead: false,
      isFavorite: false,
      isArchived: false,
      type: 'notification',
      pDate: DateTime.fromISO('2026-10-13T09:00:00'),
    },
    {
      id: 2,
      title: 'Read favorite',
      description: [{ text: 'Second', type: 'paragraph' }],
      date: '12/10/2026',
      time: '10:00',
      isRead: true,
      isFavorite: true,
      isArchived: false,
      type: 'notification',
      pDate: DateTime.fromISO('2026-10-12T10:00:00'),
    },
    {
      id: 3,
      title: 'Archived',
      description: [{ text: 'Third', type: 'paragraph' }],
      date: '11/10/2026',
      time: '11:00',
      isRead: false,
      isFavorite: true,
      isArchived: true,
      type: 'notification',
      pDate: DateTime.fromISO('2026-10-11T11:00:00'),
    },
  ];

  const categories: IBmbAlertCenterCategories = {
    recent: [alerts[0]],
    sevenDays: [alerts[1]],
    month: [alerts[2]],
    rest: [alerts[0]],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterFormComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: {
            translate: (key: string) => key,
            getTranslationVersion: () => 0,
            getCurrentLanguage: () => 'es',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('eventsInCategories', categories);
    fixture.detectChanges();
  });

  it('initializes selection state for all categorized alerts', () => {
    expect(component.selectionState()).toEqual({ '1': false, '2': false, '3': false });
    expect(component.filteredEvents()).toEqual(categories);
  });

  it('filters unread alerts across all categories', () => {
    componentRef.setInput('filterBy', 'unread');

    expect(component.filteredEvents()).toEqual({
      recent: [alerts[0]],
      sevenDays: [],
      month: [alerts[2]],
      rest: [alerts[0]],
    });
  });

  it('filters archived alerts across all categories', () => {
    componentRef.setInput('filterBy', 'archived');

    expect(component.filteredEvents()).toEqual({
      recent: [],
      sevenDays: [],
      month: [alerts[2]],
      rest: [],
    });
  });

  it('filters favorites across all categories', () => {
    componentRef.setInput('filterBy', 'favorites');

    expect(component.filteredEvents()).toEqual({
      recent: [],
      sevenDays: [alerts[1]],
      month: [alerts[2]],
      rest: [],
    });
  });

  it('summarizes none, partial, and complete alert selection', () => {
    expect(component.isSomeAlertSelected()).toEqual({ some: false, all: false });

    component.selectionState.set({ '1': true, '2': false });
    expect(component.isSomeAlertSelected()).toEqual({ some: true, all: false });

    component.selectionState.set({ '1': true, '2': true });
    expect(component.isSomeAlertSelected()).toEqual({ some: true, all: true });
  });

  it('selects and clears every alert while preserving the selection keys', () => {
    component.handleSelectAll({ target: { checked: true } } as unknown as Event);
    expect(component.selectionState()).toEqual({ '1': true, '2': true, '3': true });

    component.handleSelectAll({ target: { checked: false } } as unknown as Event);
    expect(component.selectionState()).toEqual({ '1': false, '2': false, '3': false });
  });

  it('emits selected ids with the requested navigation action', () => {
    const emit = jest.spyOn(component.navigationBarEvents, 'emit');
    component.selectionState.set({ '1': true, '2': false, '3': true });

    component.handleNavigationBarEvents('isFavorite');

    expect(emit).toHaveBeenCalledWith({ alerts: ['1', '3'], event: 'isFavorite' });
  });

  it('emits alert selection and deletion events', () => {
    const selected = jest.spyOn(component.showAlertDetail, 'emit');
    const deleted = jest.spyOn(component.getDeleteClick, 'emit');

    component.alertSelected(alerts[0]);
    component.handleDelete(alerts[1]);

    expect(selected).toHaveBeenCalledWith(alerts[0]);
    expect(deleted).toHaveBeenCalledWith(alerts[1]);
  });

  it('includes toolbar actions only when enabled and dispatches their actions', () => {
    componentRef.setInput('enabledOptions', {
      tags: false,
      favorites: false,
      archive: false,
    });
    component.selectionState.set({ '1': true });
    const emit = jest.spyOn(component.navigationBarEvents, 'emit');

    const actions = component.navigationBarIcons();
    expect(actions).toHaveLength(1);
    expect(actions[0].action).toBeDefined();
    actions[0].action!();

    expect(emit).toHaveBeenCalledWith({ alerts: ['1'], event: 'isRead' });
  });

  it('builds and dispatches each optional toolbar action', () => {
    component.selectionState.set({ '2': true });
    const emit = jest.spyOn(component.navigationBarEvents, 'emit');

    const actions = component.navigationBarIcons();
    expect(actions).toHaveLength(4);
    expect(actions[1].action).toBeDefined();
    expect(actions[2].action).toBeDefined();
    expect(actions[3].action).toBeDefined();
    actions[1].action!();
    actions[2].action!();
    actions[3].action!();

    expect(emit).toHaveBeenNthCalledWith(1, { alerts: ['2'], event: 'tags' });
    expect(emit).toHaveBeenNthCalledWith(2, { alerts: ['2'], event: 'isFavorite' });
    expect(emit).toHaveBeenNthCalledWith(3, { alerts: ['2'], event: 'isArchived' });
  });
});
