import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  BmbSearchCardComponent,
  IBmbSearchCardItemResult,
} from './bmb-search-card.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

describe('BmbSearchCardComponent', () => {
  let component: BmbSearchCardComponent;
  let fixture: ComponentFixture<BmbSearchCardComponent>;
  let componentRef: ComponentRef<BmbSearchCardComponent>;
  let translationsServiceMock: any;

  beforeEach(async () => {
    translationsServiceMock = {
      translate: jasmine.createSpy('translate').and.callFake((key: string) => {
        const translations: { [key: string]: string } = {
          'search_card.tabs.all': 'All',
          'search_card.tabs.favorites': 'Favorites',
          'search_card.tabs.services': 'Services',
          'search_card.tabs.people': 'People',
        };
        return translations[key] || key;
      }),
      getTranslationVersion: () => 0,
      getCurrentLanguage: () => 'es',
    };

    await TestBed.configureTestingModule({
      imports: [BmbSearchCardComponent],
      providers: [
        { provide: BmbTranslationsService, useValue: translationsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute results correctly', () => {
    const mockResults: IBmbSearchCardItemResult[] = [
      {
        id: '1',
        name: 'Service 1',
        subtitle: 'Subtitle 1',
        avatarOrIcon: 'icon1',
        type: 'service',
      },
      {
        id: '2',
        name: 'Person 1',
        subtitle: 'Subtitle 2',
        avatarOrIcon: 'image1',
        type: 'person',
      },
      {
        id: '3',
        name: 'Service 2',
        subtitle: 'Subtitle 3',
        avatarOrIcon: 'icon2',
        type: 'service',
      },
    ];

    componentRef.setInput('results', mockResults);
    component.inputSearchControl.setValue('test');
    fixture.detectChanges();

    const result = component.computedResults();
    expect(result.services.length).toBe(2);
    expect(result.persons.length).toBe(1);
    expect(result.services[0].name).toBe('Service 1');
    expect(result.persons[0].name).toBe('Person 1');
  });

  it('should compute tabs data correctly', () => {
    const mockResults: IBmbSearchCardItemResult[] = [
      {
        id: '1',
        name: 'Service 1',
        subtitle: 'Subtitle 1',
        avatarOrIcon: 'icon1',
        type: 'service',
      },
      {
        id: '2',
        name: 'Person 1',
        subtitle: 'Subtitle 2',
        avatarOrIcon: 'image1',
        type: 'person',
      },
    ];

    componentRef.setInput('results', mockResults);
    component.inputSearchControl.setValue('test');
    fixture.detectChanges();

    const tabs = component.tabsData();
    expect(tabs.length).toBe(4);

    // Tab 1: All
    expect(tabs[0].title).toBe('All');
    expect(tabs[0].badge).toBe(2);
    expect(tabs[0].isActive).toBe(true);

    // Tab 2: Favorites
    expect(tabs[1].title).toBe('Favorites');
    expect(tabs[1].badge).toBe(0);

    // Tab 3: Services
    expect(tabs[2].title).toBe('Services');
    expect(tabs[2].badge).toBe(1);

    // Tab 4: People
    expect(tabs[3].title).toBe('People');
    expect(tabs[3].badge).toBe(1);
  });

  it('should emit triggerSearch when input control changes', (done) => {
    const testValue = 'test search';
    component.triggerSearch.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });

    component.inputSearchControl.setValue(testValue);
  });

  it('should emit the selected result when a result item is clicked', () => {
    const result: IBmbSearchCardItemResult = {
      id: '1',
      name: 'Service 1',
      subtitle: 'Subtitle 1',
      avatarOrIcon: 'home',
      type: 'service',
    };
    const emittedResults: IBmbSearchCardItemResult[] = [];

    component.searchItemClick.subscribe((item) => emittedResults.push(item));
    componentRef.setInput('results', [result]);
    component.inputSearchControl.setValue('service');
    fixture.detectChanges();

    const item = fixture.debugElement.query(
      By.css('bmb-search-card-item'),
    ).componentInstance;
    item.triggerClick.emit();

    expect(emittedResults).toEqual([result]);
  });

  it('should pass showBookmark and bookmark state to result items', () => {
    const result: IBmbSearchCardItemResult = {
      id: '1',
      name: 'Service 1',
      subtitle: 'Subtitle 1',
      avatarOrIcon: 'home',
      type: 'service',
      isBookmarkActive: true,
      showBookmark: false,
    };

    componentRef.setInput('results', [result]);
    component.inputSearchControl.setValue('service');
    fixture.detectChanges();

    const item = fixture.debugElement.query(
      By.css('bmb-search-card-item'),
    ).componentInstance;

    expect(item.isBookmarkActive()).toBe(true);
    expect(item.showBookmark()).toBe(false);
  });

  it('should emit the result with the toggled bookmark state', () => {
    const result: IBmbSearchCardItemResult = {
      id: '1',
      name: 'Service 1',
      subtitle: 'Subtitle 1',
      avatarOrIcon: 'home',
      type: 'service',
      isBookmarkActive: false,
    };
    let emittedResult: IBmbSearchCardItemResult | undefined;

    component.getBookmarkItemClick.subscribe((item) => {
      emittedResult = item;
    });

    component.handleBookmarkClick(result);

    expect(emittedResult).toEqual({ ...result, isBookmarkActive: true });
    expect(result.isBookmarkActive).toBe(false);
  });

  it('should show favorites when the favorites view is enabled and search is empty', () => {
    const favorite: IBmbSearchCardItemResult = {
      id: '1',
      name: 'Favorite service',
      subtitle: 'Subtitle',
      avatarOrIcon: 'home',
      type: 'service',
      isBookmarkActive: true,
    };

    componentRef.setInput('disableFavoritesTab', false);
    componentRef.setInput('favorites', [favorite]);
    fixture.detectChanges();

    const item = fixture.debugElement.query(By.css('bmb-search-card-item'));
    expect(item).toBeTruthy();
    expect(item.componentInstance.name()).toBe(favorite.name);
  });

  it('should show the loading state instead of results', () => {
    componentRef.setInput('isLoading', true);
    component.inputSearchControl.setValue('service');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('bmb-loader'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('bmb-tabs'))).toBeNull();
  });

  it('should show filtered favorites in the favorites tab', () => {
    const result: IBmbSearchCardItemResult = {
      id: '1',
      name: 'Service 1',
      subtitle: 'Subtitle 1',
      avatarOrIcon: 'home',
      type: 'service',
      isBookmarkActive: true,
    };

    componentRef.setInput('favorites', [result]);
    componentRef.setInput('results', [result]);
    component.inputSearchControl.setValue('service');
    fixture.detectChanges();
    component.selectedTabId.set(2);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('bmb-search-card-item')),
    ).toBeTruthy();
  });
});
