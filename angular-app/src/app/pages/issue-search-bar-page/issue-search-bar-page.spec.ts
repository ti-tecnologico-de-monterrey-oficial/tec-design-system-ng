import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbSearchInputComponent } from 'ui-angular';
import { IssueSearchBarPage } from './issue-search-bar-page';

describe('IssueSearchBarPage', () => {
  let component: IssueSearchBarPage;
  let fixture: ComponentFixture<IssueSearchBarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueSearchBarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueSearchBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should propagate isLoading changes from the search input to the page', () => {
    const searchInput = fixture.debugElement.query(
      By.directive(BmbSearchInputComponent),
    ).componentInstance as BmbSearchInputComponent;

    searchInput.isLoading.set(true);
    fixture.detectChanges();

    expect(component.isLoading()).toBe(true);
    expect(
      fixture.debugElement
        .queryAll(By.directive(BmbSearchInputComponent))
        .every((element) => element.componentInstance.isLoading()),
    ).toBe(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set loading while the debounced mock request runs', () => {
    jest.useFakeTimers();
    component.handleServerSideFilterEvent('David');

    jest.advanceTimersByTime(component.searchDebounceTime());
    fixture.detectChanges();
    expect(component.isLoading()).toBe(true);

    jest.advanceTimersByTime(400);
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    expect(component.serverSideFilteredData()).toEqual([
      'David Medina',
      'David Cabrera Yáñez',
      'David Ríos Pérez',
      'David Villanueva',
      'David Pineda Quijano',
      'Alan David Corvee',
    ]);
  });
});
