import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInputTagsComponent } from './bmb-input-tags.component';

describe('BmbInputTagsComponent', () => {
  let component: BmbInputTagsComponent;
  let fixture: ComponentFixture<BmbInputTagsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInputTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the selected tags from the control value', () => {
    fixture.componentRef.setInput('tagOptions', ['a', 'b', 'c']);
    fixture.detectChanges();

    component.setSelectedTags(['a', 'c']);

    expect(component.selectedTags.map((item) => item.value)).toEqual([
      'a',
      'c',
    ]);
  });

  it('should add a new custom tag option', () => {
    fixture.componentRef.setInput('tagOptions', ['a', 'b']);
    fixture.detectChanges();

    component.addOption('c');

    expect(component.tagOptions()).toEqual(['a', 'b', 'c']);
  });

  it('should split and select multiple values when pressing comma or enter', () => {
    fixture.componentRef.setInput('tagOptions', ['a', 'b']);
    fixture.detectChanges();

    component.selectOptionWithKey('a');

    expect(component.control().value).toContain('a');
  });
});
