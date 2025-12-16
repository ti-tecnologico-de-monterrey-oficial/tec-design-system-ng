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
});
