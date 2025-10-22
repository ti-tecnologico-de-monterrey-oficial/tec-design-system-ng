import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';

it('should create an instance', () => {
  TestBed.runInInjectionContext(() => {
    const el = new ElementRef(document.createElement('div'));
    const directive = new BmbLayoutItemDirective(el);
    expect(directive).toBeTruthy();
  });
});
