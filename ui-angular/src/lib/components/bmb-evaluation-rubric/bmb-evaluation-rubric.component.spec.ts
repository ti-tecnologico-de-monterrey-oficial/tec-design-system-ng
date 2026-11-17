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
  it('keeps model updates, matching-object identity and summary behavior', () => {
    const item = { criterion: 'A', tooltip: '', evaluation: 1 };
    componentRef.setInput('evaluationRubricList', [item]);
    const changed = jest.fn();
    component.evaluationRubricList.subscribe(changed);
    component.handleEval('A', 4);
    expect(component.evaluationRubricList()[0]).toBe(item);
    expect(component.summary).toBe(4);
    expect(changed).toHaveBeenCalled();
    expect(component.getSelectedButtonClass(4, 4)).toBe('-active');
  });
});
