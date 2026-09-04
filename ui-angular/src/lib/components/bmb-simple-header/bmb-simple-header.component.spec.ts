import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSimpleHeaderComponent } from './bmb-simple-header.component';

describe('BmbSimpleHeaderComponent', () => {
  let component: BmbSimpleHeaderComponent;
  let fixture: ComponentFixture<BmbSimpleHeaderComponent>;
  let componentRef: ComponentRef<BmbSimpleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSimpleHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSimpleHeaderComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prioritize componentTitle over the deprecated title', () => {
    componentRef.setInput('title', 'Anterior');
    componentRef.setInput('componentTitle', 'Actual');
    expect(component.displayTitle()).toBe('Actual');
  });

  it('should keep the deprecated title as fallback', () => {
    componentRef.setInput('title', 'Anterior');
    expect(component.displayTitle()).toBe('Anterior');
  });

  it('should emit the icon click event', () => {
    const event = new MouseEvent('click');
    const listener = jest.fn();
    component.onIconClick.subscribe(listener);
    component.handleClick(event);
    expect(listener).toHaveBeenCalledWith(event);
  });
});
