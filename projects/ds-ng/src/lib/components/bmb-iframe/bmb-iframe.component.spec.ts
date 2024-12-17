import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIframeComponent } from './bmb-iframe.component';
import { ComponentRef } from '@angular/core';

describe('BmbIframeComponent', () => {
  let component: BmbIframeComponent;
  let fixture: ComponentFixture<BmbIframeComponent>;
  let componentRef: ComponentRef<BmbIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIframeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('src', 'testSrc');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.height()).toBe('100%');
    expect(component.width()).toBe('100%');
    expect(component.loading()).toBe('eager');
    expect(component.name()).toBe('');
  });

  it('should set input values correctly', () => {
    componentRef.setInput('height', '500px');
    componentRef.setInput('width', '500px');
    componentRef.setInput('loading', 'lazy');
    componentRef.setInput('name', 'iframeName');
    componentRef.setInput('src', 'https://example.com');

    expect(component.height()).toBe('500px');
    expect(component.width()).toBe('500px');
    expect(component.loading()).toBe('lazy');
    expect(component.name()).toBe('iframeName');
    expect(component.src()).toBe('https://example.com');
  });
});
