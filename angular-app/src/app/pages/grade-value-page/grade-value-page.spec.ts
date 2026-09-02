import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradeValuePage } from './grade-value-page';

describe('GradeValuePage', () => {
  let component: GradeValuePage;
  let fixture: ComponentFixture<GradeValuePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeValuePage],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeValuePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the grade properties', () => {
    component.setType('partial-grade');
    component.setContrast('alternative');
    component.setScore('87.5');

    expect(component.type()).toBe('partial-grade');
    expect(component.contrast()).toBe('alternative');
    expect(component.score()).toBe(87.5);
  });

  it('should preserve a non-numeric score', () => {
    component.setScore('Cu');

    expect(component.score()).toBe('Cu');
  });
});
