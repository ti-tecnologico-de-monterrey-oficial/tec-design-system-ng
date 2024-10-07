import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbEvaluationRubricComponent } from './bmb-evaluation-rubric.component';
import { ComponentRef } from '@angular/core';

describe('BmbEvaluationRubricComponent', () => {
  let component: BmbEvaluationRubricComponent;
  let fixture: ComponentFixture<BmbEvaluationRubricComponent>;
  let componentRef: ComponentRef<BmbEvaluationRubricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbEvaluationRubricComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbEvaluationRubricComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    componentRef.setInput('evaluationRubricList', []);
    componentRef.setInput('summaryLabel', 'Test summary label');
    componentRef.setInput('commentEvalRubric', {});
    componentRef.setInput('evalRubricButtons', {});
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
