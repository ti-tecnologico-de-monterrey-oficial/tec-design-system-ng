import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
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
          'search_card.tabs.services': 'Services',
          'search_card.tabs.people': 'People',
        };
        return translations[key] || key;
      }),
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
    fixture.detectChanges();

    const tabs = component.tabsData();
    expect(tabs.length).toBe(3);

    // Tab 1: All
    expect(tabs[0].title).toBe('All');
    expect(tabs[0].badge).toBe(2);
    expect(tabs[0].isActive).toBeTrue();

    // Tab 2: Services
    expect(tabs[1].title).toBe('Services');
    expect(tabs[1].badge).toBe(1);

    // Tab 3: People
    expect(tabs[2].title).toBe('People');
    expect(tabs[2].badge).toBe(1);
  });

  it('should emit triggerSearch when input control changes', (done) => {
    const testValue = 'test search';
    component.triggerSearch.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });

    component.inputSearchControl.setValue(testValue);
  });
});
