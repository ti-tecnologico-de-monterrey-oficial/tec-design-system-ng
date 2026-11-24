import { TestBed } from '@angular/core/testing';
import { BmbSelectorDirective } from './bmb-selector.directive';

describe('BmbSelectorDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new BmbSelectorDirective();
      expect(directive).toBeTruthy();
    });
  });
});
