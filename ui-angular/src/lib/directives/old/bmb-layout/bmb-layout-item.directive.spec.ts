import { Component, viewChild, signal, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';

const mockElementRef = new ElementRef(document.createElement('div'));

describe('BmbLayoutItemDirective', () => {
  let directive: BmbLayoutItemDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbLayoutItemDirective],
      providers: [BmbLayoutItemDirective, { provide: ElementRef, useValue: mockElementRef }]
    });

    directive = TestBed.inject(BmbLayoutItemDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should inject ElementRef', () => {
    expect(directive.el.nativeElement.tagName).toBe('DIV');
  });
});