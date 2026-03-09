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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
