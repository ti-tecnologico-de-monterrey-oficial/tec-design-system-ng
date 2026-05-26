import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonBadgeComponent } from './bmb-container-button-badge.component';
import { ComponentRef } from '@angular/core';
let componentRef: ComponentRef<BmbContainerButtonBadgeComponent>;

describe('BmbContainerButtonBadgeComponent', () => {
  let component: BmbContainerButtonBadgeComponent;
  let fixture: ComponentFixture<BmbContainerButtonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('leftIconName', 'home');
    componentRef.setInput('badge', {
      text: 'test',
      appearance: 'normal',
      container: false,
    });
    componentRef.setInput('rightIconName', 'help');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct componentTitle input', () => {
    expect(component.componentTitle()).toBe('Test');
  });

  it('should have correct leftIconName input', () => {
    expect(component.leftIconName()).toBe('home');
  });

  it('should have correct badge input', () => {
    expect(component.badge()).toEqual({
      text: 'test',
      appearance: 'normal',
      container: false,
    });
  });

  it('should have correct leftIconName input', () => {
    expect(component.rightIconName()).toBe('help');
  });

  it('should render badge text in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('test');
  });
});
