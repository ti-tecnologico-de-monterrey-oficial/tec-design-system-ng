import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueCounterPage } from './value-counter-page';

describe('ValueCounterPage', () => {
  let component: ValueCounterPage;
  let fixture: ComponentFixture<ValueCounterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueCounterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueCounterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update every editable input', () => {
    component.setLabel('Tareas');
    component.setProgress('4');
    component.setValue('10');
    component.setSeparator(':');
    component.setFormatterMode('custom');

    expect(component.label()).toBe('Tareas');
    expect(component.progress()).toBe('4');
    expect(component.value()).toBe('10');
    expect(component.separator()).toBe(':');
    expect(component.formatter()('4', '10')).toBe('4:10');
  });

  it('should provide the currency formatter', () => {
    component.setFormatterMode('currency');
    expect(component.formatter()('20', '100')).toBe('$20/$100 MXN');
  });
});
