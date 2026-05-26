import { TestBed } from '@angular/core/testing';
import { BmbButtonGroupDirective } from './bmb-button-group.directive';

describe('BmbButtonGroupDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new BmbButtonGroupDirective();
      expect(directive).toBeTruthy();
    });
  });
});
