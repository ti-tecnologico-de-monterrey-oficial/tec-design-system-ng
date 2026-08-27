import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressCirclePage } from './progress-circle-page';

describe('ProgressCirclePage', () => {
  let component: ProgressCirclePage;
  let fixture: ComponentFixture<ProgressCirclePage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
      json: async () => ({}),
    } as Response);

    await TestBed.configureTestingModule({
      imports: [ProgressCirclePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressCirclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update progress values', () => {
    component.setPercent('80');
    component.setFillPathStatus('warning');
    component.setSize('small');

    expect(component.percent()).toBe(80);
    expect(component.valueLabel()).toBe('80%');
    expect(component.fillPathStatus()).toBe('warning');
    expect(component.size()).toBe('small');
  });

  it('should expose icon options for the playground selector', () => {
    const iconSelect: HTMLSelectElement =
      fixture.nativeElement.querySelector('#progress-icon');

    expect(iconSelect.tagName).toBe('SELECT');
    expect(component.iconOptions).toContain('school');
    expect(component.iconOptions).toContain('check_circle');
    expect(iconSelect.options.length).toBe(component.iconOptions.length);
  });
});
