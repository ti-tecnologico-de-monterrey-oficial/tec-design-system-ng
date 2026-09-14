import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchPage } from './switch-page';

describe('SwitchPage', () => {
  let component: SwitchPage;
  let fixture: ComponentFixture<SwitchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPage],
    }).compileComponents();
    fixture = TestBed.createComponent(SwitchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should track the change event', () => {
    component.handleChange(true);
    expect(component.lastEvent()).toBe('change emitido: true');
  });
});
