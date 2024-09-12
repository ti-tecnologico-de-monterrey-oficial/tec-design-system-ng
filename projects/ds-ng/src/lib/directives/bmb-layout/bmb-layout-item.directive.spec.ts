import { TestBed } from '@angular/core/testing';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';

describe('BmbLayoutItemDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new BmbLayoutItemDirective();
      expect(directive).toBeTruthy();
    });
  });
});
