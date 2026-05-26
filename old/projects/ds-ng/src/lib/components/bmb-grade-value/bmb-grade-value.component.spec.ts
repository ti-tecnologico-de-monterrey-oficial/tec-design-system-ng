import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbGradeValueComponent } from './bmb-grade-value.component';
import { ComponentRef } from '@angular/core';

describe('BmbGradeValueComponent', () => {
  let component: BmbGradeValueComponent;
  let fixture: ComponentFixture<BmbGradeValueComponent>;
  let componentRef: ComponentRef<BmbGradeValueComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbGradeValueComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.type()).toBe('main-grade');
    expect(component.score()).toBe(0);
  });

  it('should render SVG for main-grade', () => {
    componentRef.setInput('type', 'main-grade');
    componentRef.setInput('score', 10);
    fixture.detectChanges();

    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
    expect(
      svgElement.querySelector('.bmb_grade-value-main-score').textContent,
    ).toContain('10');
  });

  it('should render partial div for partial-grade', () => {
    componentRef.setInput('type', 'partial-grade');
    componentRef.setInput('score', 5);
    fixture.detectChanges();

    const divElement = fixture.nativeElement.querySelector(
      '.bmb_grade-value-partial',
    );
    expect(divElement).toBeTruthy();
    expect(
      divElement.querySelector('.bmb_grade-value-partial-score').textContent,
    ).toContain('5');
  });

  it('should render text for score', () => {
    componentRef.setInput('score', 'Cu');
    fixture.detectChanges();

    expect(component.score()).toBe('Cu');
  });

  it('should set type and score correctly', () => {
    componentRef.setInput('type', 'partial-grade');
    componentRef.setInput('score', 75);
    fixture.detectChanges();

    expect(component.type()).toBe('partial-grade');
    expect(component.score()).toBe(75);
  });
});
