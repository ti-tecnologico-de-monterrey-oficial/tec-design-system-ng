import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbStudentActivitySelectorComponent } from './bmb-student-activity-selector.component';

describe('BmbStudentActivitySelectorComponent', () => {
  let component: BmbStudentActivitySelectorComponent;
  let fixture: ComponentFixture<BmbStudentActivitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbStudentActivitySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbStudentActivitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
