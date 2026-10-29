import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
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

    expect(component.isLoading()).toBeTrue();
    expect(
      fixture.debugElement
        .queryAll(By.directive(BmbSearchInputComponent))
        .every((element) => element.componentInstance.isLoading()),
    ).toBeTrue();
  });

  it('should set loading while the debounced mock request runs', fakeAsync(() => {
    component.handleServerSideFilterEvent('David');

    tick(component.searchDebounceTime());
    fixture.detectChanges();
    expect(component.isLoading()).toBeTrue();

    tick(400);
    fixture.detectChanges();

    expect(component.isLoading()).toBeFalse();
    expect(component.serverSideFilteredData()).toEqual([
      'David Medina',
      'David Cabrera Yáñez',
      'David Ríos Pérez',
      'David Villanueva',
      'David Pineda Quijano',
      'Alan David Corvee',
    ]);
  }));
});
