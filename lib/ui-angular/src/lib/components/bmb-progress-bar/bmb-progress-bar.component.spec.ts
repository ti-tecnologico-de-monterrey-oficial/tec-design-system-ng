import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbProgressBarComponent', () => {
  let component: BmbProgressBarComponent;
  let fixture: ComponentFixture<BmbProgressBarComponent>;
  let componentRef: ComponentRef<BmbProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BmbIconComponent, BmbProgressBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values', () => {
    expect(component.type()).toBe('simple');
    expect(component.totalCount()).toBe(0);
    expect(component.counter()).toBe(0);
    expect(component.title()).toBe('');
    expect(component.appearance()).toBe('info');
    expect(component.textLink()).toBe('');
    expect(component.href()).toBe('');
    expect(component.target()).toBe('_blank');
  });

  it('should calculate progress correctly', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 50);
    expect(component.progressValue()).toBe('50.00');

    componentRef.setInput('counter', 0);
    expect(component.progressValue()).toBe('0.00');

    componentRef.setInput('counter', 150);
    expect(component.progressValue()).toBe('100');
  });

  it('should not set progress below 0', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 10);
    expect(component.progressValue()).toBe('10.00');
  });

  it('should not set progress above 100', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 200);
    expect(component.progressValue()).toBe('100');
  });
});
