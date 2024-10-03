import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbEvaluationRubricComponent } from './bmb-evaluation-rubric.component';

describe('BmbEvaluationRubricComponent', () => {
  let component: BmbEvaluationRubricComponent;
  let fixture: ComponentFixture<BmbEvaluationRubricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbEvaluationRubricComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbEvaluationRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
