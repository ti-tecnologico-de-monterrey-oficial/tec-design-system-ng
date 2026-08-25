import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

import { BmbFabComponent } from './bmb-fab.component';

describe('BmbFabComponent', () => {
  let component: BmbFabComponent;
  let fixture: ComponentFixture<BmbFabComponent>;
  let componentRef: ComponentRef<BmbFabComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbFabComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the default large normal FAB behavior', () => {
    expect(component.activeState).toBe(true);
    expect(component.className).toBe('bmb_fab-main bmb_fab-main-large');
    expect(component.iconName).toBe('apps');
  });

  it('uses the extended and MiTec class contracts', () => {
    componentRef.setInput('type', 'extended');
    expect(component.className).toBe('bmb_fab-main bmb_fab-main-extended');

    componentRef.setInput('mitec', true);
    expect(component.className).toBe('bmb_fab-mitec-button');
    expect(component.activeState).toBe(false);
  });

  it('toggles its active icon and emits the click event', () => {
    const listener = jest.fn();
    const event = new MouseEvent('click');
    component.fabClick.subscribe(listener);

    component.handleFabClick(event);

    expect(component.isActive).toBe(true);
    expect(component.iconName).toBe('close');
    expect(listener).toHaveBeenCalledWith(event);
  });
});
