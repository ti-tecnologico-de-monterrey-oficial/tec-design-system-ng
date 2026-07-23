import { TestBed } from '@angular/core/testing';
import { BmbLayoutDirective } from './bmb-layout.directive';

describe('BmbLayoutDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new BmbLayoutDirective();
      expect(directive).toBeTruthy();
    });
  });
});
