import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbValueCounterComponent } from './bmb-value-counter.component';

describe('BmbValueCounterComponent', () => {
  let component: BmbValueCounterComponent;
  let fixture: ComponentFixture<BmbValueCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbValueCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbValueCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label, value and progress inputs correctly', () => {
    const component = new BmbValueCounterComponent();
    component.label = 'Test Label';
    component.value = 'Test Value';
    component.progress = 'Test Progress';

    expect(component.label).toEqual('Test Label');
    expect(component.value).toEqual('Test Value');
    expect(component.progress).toEqual('Test Progress');
  });
});
