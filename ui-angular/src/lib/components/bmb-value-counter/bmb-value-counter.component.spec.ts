import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbValueCounterComponent } from './bmb-value-counter.component';
import { ComponentRef } from '@angular/core';

describe('BmbValueCounterComponent', () => {
  let component: BmbValueCounterComponent;
  let fixture: ComponentFixture<BmbValueCounterComponent>;
  let componentRef: ComponentRef<BmbValueCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbValueCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbValueCounterComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Test Label');
    componentRef.setInput('value', 'Test Value');
    componentRef.setInput('progress', 'Test Progress');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label, value and progress inputs correctly', () => {
    expect(componentRef.instance.label()).toBe('Test Label');
    expect(componentRef.instance.value()).toBe('Test Value');
    expect(componentRef.instance.progress()).toBe('Test Progress');
  });

  it('should render the default formatted values', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(
      element.querySelector('.bmb_value-counter-label')?.textContent,
    ).toContain('Test Label');
    expect(
      element.querySelector('.bmb_value-counter-progress')?.textContent,
    ).toContain('Test Progress');
    expect(
      element.querySelector('.bmb_value-counter-value')?.textContent,
    ).toContain('Test Value');
    expect(
      element.querySelector('.bmb_value-counter-slash')?.textContent,
    ).toContain('/');
  });

  it('should support a custom formatter and separator', () => {
    componentRef.setInput('progress', '25');
    componentRef.setInput('value', '100');
    componentRef.setInput('textFormatSeparator', ':');
    componentRef.setInput(
      'textFormat',
      (progress: string, total: string) => `${progress}:${total}`,
    );
    fixture.detectChanges();

    expect(component.progressValue()).toBe('25');
    expect(component.totalValue()).toBe('100');
    expect(component.separator()).toBe(':');
  });

  it('should show the complete formatted value when the separator is absent', () => {
    componentRef.setInput('textFormat', () => 'Sin separador');
    fixture.detectChanges();

    expect(component.progressValue()).toBe('');
    expect(component.totalValue()).toBe('Sin separador');
  });
});
