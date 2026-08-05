import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonGradeComponent } from './bmb-container-button-grade.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonGradeComponent', () => {
  let component: BmbContainerButtonGradeComponent;
  let fixture: ComponentFixture<BmbContainerButtonGradeComponent>;
  let componentRef: ComponentRef<BmbContainerButtonGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonGradeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonGradeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('score', 'A');
    componentRef.setInput('rightIconName', 'home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set componentTitle input', () => {
    expect(component.componentTitle()).toBe('Test');
  });

  it('should set score input', () => {
    expect(component.score()).toBe('A');
  });

  it('should set rightIconName input', () => {
    expect(component.rightIconName()).toBe('home');
  });

  it('should render componentTitle', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test');
  });

  it('should render score', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('A');
  });
});
