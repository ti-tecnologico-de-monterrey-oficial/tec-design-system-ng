import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';

describe('BmbProgressCircleComponent', () => {
  let component: BmbProgressCircleComponent;
  let fixture: ComponentFixture<BmbProgressCircleComponent>;
  let componentRef: ComponentRef<BmbProgressCircleComponent>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
      json: async () => ({}),
    } as Response);

    await TestBed.configureTestingModule({
      imports: [BmbProgressCircleComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbProgressCircleComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create with default options', () => {
    expect(component).toBeTruthy();
    expect(component.options().percent).toBe(0);
    expect(component.options().showValueLabel).toBe(false);
  });

  it('should draw the SVG when percent changes', () => {
    componentRef.setInput('percent', 75);
    fixture.detectChanges();
    expect(component.svg?.path.d).toContain('A 100 100');
    expect(component._lastPercent).toBe(75);
  });

  it('should resolve semantic state helpers', () => {
    componentRef.setInput('fillPathStatus', 'success');
    componentRef.setInput('fullFillPathStatus', true);
    componentRef.setInput('showOperationState', true);
    componentRef.setInput('showValueLabel', true);
    fixture.detectChanges();

    expect(component.displayIcon()).toBe('check_circle');
    expect(component.shouldShowProgressPath()).toBe(false);
    expect(component.shouldShowValueLabel()).toBe(true);
    expect(component.getContainerClasses()).toContain(
      'bmb_progress-circle-operation-success',
    );
  });

  it('should hide progress in empty state', () => {
    componentRef.setInput('percent', 50);
    componentRef.setInput('emptyState', true);
    fixture.detectChanges();
    expect(component.shouldShowProgressPath()).toBe(false);
  });
});
