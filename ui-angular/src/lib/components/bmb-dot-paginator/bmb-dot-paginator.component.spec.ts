import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbDotPaginatorComponent } from './bmb-dot-paginator.component';

describe('BmbDotPaginatorComponent', () => {
  let component: BmbDotPaginatorComponent;
  let fixture: ComponentFixture<BmbDotPaginatorComponent>;
  let componentRef: ComponentRef<BmbDotPaginatorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDotPaginatorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the public classes contract', () => {
    componentRef.setInput('appearance', 'secondary');

    expect(component.getClasses()).toEqual([
      'bmb_dot_paginator',
      'bmb_dot_paginator-secondary',
    ]);
  });

  it('selects a dot and emits its index', () => {
    const listener = jest.fn();
    component.onDotPress.subscribe(listener);

    component.dotClick(2);

    expect(component.activeDotIndex()).toBe(2);
    expect(listener).toHaveBeenCalledWith(2);
  });

  it('moves between dots without crossing the boundaries', () => {
    componentRef.setInput('targets', [
      { target: '#one', index: 0 },
      { target: '#two', index: 1 },
    ]);

    component.prevItem();
    expect(component.activeDotIndex()).toBe(0);

    component.nextItem();
    component.nextItem();
    expect(component.activeDotIndex()).toBe(1);
  });
});
