import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchCardEmptyStateComponent } from './bmb-search-card-empty-state.component';
import { ComponentRef } from '@angular/core';

describe('BmbSearchCardEmptyStateComponent', () => {
  let component: BmbSearchCardEmptyStateComponent;
  let fixture: ComponentFixture<BmbSearchCardEmptyStateComponent>;
  let componentRef: ComponentRef<BmbSearchCardEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchCardEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardEmptyStateComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTitleText', () => {
    it('should return the provided placeholderTitle when there is no input value', () => {
      componentRef.setInput('inputHasValue', false);
      componentRef.setInput('placeholderTitle', 'Custom placeholder');
      fixture.detectChanges();
      expect(component.getTitleText()).toBe('Custom placeholder');
    });

    it('should fall back to the translated placeholder title when none is provided', () => {
      componentRef.setInput('inputHasValue', false);
      fixture.detectChanges();
      expect(component.getTitleText()).toBe(
        'search_card.empty_state.new_search_card_title',
      );
    });

    it('should return the provided noResultsTitle when there is an input value', () => {
      componentRef.setInput('inputHasValue', true);
      componentRef.setInput('noResultsTitle', 'Custom no results');
      fixture.detectChanges();
      expect(component.getTitleText()).toBe('Custom no results');
    });

    it('should fall back to the translated no results title when none is provided', () => {
      componentRef.setInput('inputHasValue', true);
      fixture.detectChanges();
      expect(component.getTitleText()).toBe(
        'search_card.empty_state.no_results_title',
      );
    });
  });
});
