import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAcademicProgressComponent } from './bmb-academic-progress.component';
import type { IBmbNameValuePair } from '../../_shared/types/utils';

describe('BmbAcademicProgressComponent', () => {
  let component: BmbAcademicProgressComponent;
  let fixture: ComponentFixture<BmbAcademicProgressComponent>;
  const values = () =>
    Array.from(
      fixture.nativeElement.querySelectorAll('.bmb_focus-element-number'),
    ).map((element) => (element as HTMLElement).textContent?.trim());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAcademicProgressComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbAcademicProgressComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('accredited', {
      name: 'Accredited',
      value: 0,
    });
    fixture.componentRef.setInput('average', { name: 'Average', value: 95.5 });
    fixture.componentRef.setInput('summary', { name: 'Summary', value: 240 });
    fixture.detectChanges();
  });

  it('renders zero and decimal values in accredited, average, summary order', () => {
    expect(values()).toEqual(['0', '95.5', '240']);
    expect(component.metrics().map((metric) => metric.name)).toEqual([
      'Accredited',
      'Average',
      'Summary',
    ]);
  });

  it.each(['accredited', 'average', 'summary'])(
    'updates %s independently without losing the other metrics',
    (field) => {
      const expected = ['0', '95.5', '240'];
      const index = ['accredited', 'average', 'summary'].indexOf(field);
      expected[index] = '42';
      fixture.componentRef.setInput(field, { name: 'Updated', value: 42 });
      fixture.detectChanges();
      expect(values()).toEqual(expected);
      expect(component.metrics()[index].name).toBe('Updated');
    },
  );

  it('preserves string and boolean values without converting or hiding them', () => {
    fixture.componentRef.setInput('accredited', { name: 'Text', value: '100' });
    fixture.componentRef.setInput('average', { name: 'Boolean', value: false });
    fixture.detectChanges();
    expect(component.metrics().map((metric) => metric.value)).toEqual([
      '100',
      false,
      240,
    ]);
    expect(values()).toEqual(['100', 'false', '240']);
  });

  it('keeps updateMetrics as a copying adapter', () => {
    const metrics = [{ name: 'Replacement', value: 7 }];
    component.updateMetrics(metrics);
    metrics[0].value = 99;
    fixture.detectChanges();
    expect(values()).toEqual(['7']);
    expect(component.metrics()).not.toBe(metrics);
  });

  it.each([0, 3.5, NaN, Infinity, '100', true])(
    'preserves shouldShowMetric for %s',
    (value) => {
      const metric: IBmbNameValuePair = { name: 'Metric', value };
      expect(component.shouldShowMetric(metric)).toBe(
        typeof value === 'number',
      );
    },
  );

  it('still requires all three inputs', () => {
    const missing = TestBed.createComponent(BmbAcademicProgressComponent);
    expect(() => missing.detectChanges()).toThrow();
  });
});
