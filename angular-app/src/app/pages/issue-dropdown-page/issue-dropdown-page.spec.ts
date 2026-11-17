import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbDropdownComponent } from 'ui-angular';
import { IssueDropdownPage } from './issue-dropdown-page';

describe('IssueDropdownPage live controls', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [IssueDropdownPage] })
      .overrideComponent(BmbDropdownComponent, {
        set: { template: '', imports: [] },
      })
      .compileComponents();
  });

  it('forwards text and checkbox edits to the same dropdown instance', async () => {
    const fixture = TestBed.createComponent(IssueDropdownPage);
    fixture.detectChanges();
    await fixture.whenStable();
    const dropdown = fixture.debugElement.query(
      By.directive(BmbDropdownComponent),
    ).componentInstance as BmbDropdownComponent;
    const label = fixture.nativeElement.querySelector(
      '#property-label',
    ) as HTMLInputElement;
    label.value = 'Nueva etiqueta';
    label.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.draft.label).toBe('Nueva etiqueta');
    expect(fixture.componentInstance.error()).toBe('');
    expect(dropdown.label()).toBe('Nueva etiqueta');
    const checkbox = fixture.nativeElement.querySelector(
      '#property-isFilterable',
    ) as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(dropdown.isFilterable()).toBe(false);
    expect(
      fixture.debugElement.query(By.directive(BmbDropdownComponent))
        .componentInstance,
    ).toBe(dropdown);
  });

  it('forwards structured properties and keeps selections during unrelated edits', () => {
    const fixture = TestBed.createComponent(IssueDropdownPage);
    fixture.detectChanges();
    const page = fixture.componentInstance;
    const dropdown = fixture.debugElement.query(
      By.directive(BmbDropdownComponent),
    ).componentInstance as BmbDropdownComponent;
    page.control.setValue(['opportunity-2']);
    page.align = 'below';
    page.filterMode = 'value';
    page.useCustomValidation = true;
    page.updateProperties();
    fixture.detectChanges();
    expect(dropdown.tooltipPosition().align).toBe('below');
    expect(dropdown.customFilterFunction()).toBe(page.customFilterFunction);
    expect(dropdown.customValidation()).toBe(page.rejectFirst);
    expect(dropdown.control().value).toEqual(['opportunity-2']);
    page.optionsText = 'invalid JSON';
    page.updateProperties();
    fixture.detectChanges();
    expect(page.error()).not.toBe('');
    expect(dropdown.options().length).toBe(40);
  });
});
