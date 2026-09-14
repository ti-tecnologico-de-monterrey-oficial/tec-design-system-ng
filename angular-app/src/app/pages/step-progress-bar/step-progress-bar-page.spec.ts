import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepProgressBarPage } from './step-progress-bar-page';

describe('StepProgressBarPage', () => {
  let component: StepProgressBarPage;
  let fixture: ComponentFixture<StepProgressBarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepProgressBarPage],
    }).compileComponents();
    fixture = TestBed.createComponent(StepProgressBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every variant', () =>
    expect(component.types).toEqual(['horizontal', 'vertical', 'step-panel']));
  it('should update labels', () => {
    component.setLabels('Uno\nDos');
    expect(component.labelSteps()).toEqual(['Uno', 'Dos']);
  });
  it('should record events', () => {
    component.recordEvent('onStepPress', 2);
    expect(component.lastEvent()).toBe('onStepPress: 2');
  });
});
