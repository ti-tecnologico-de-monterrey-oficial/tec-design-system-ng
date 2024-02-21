import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextInputComponent } from './bmb-text-input.component';

describe('BmbIconComponent', () => {
  let component: BmbTextInputComponent;
  let fixture: ComponentFixture<BmbTextInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbTextInputComponent],
    });

    fixture = TestBed.createComponent(BmbTextInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    // expect(component.icon).toBe('face');
  });

  it('should display the correct icon', () => {
    const compiled = fixture.nativeElement;
    // component.icon = 'other-icon';
    fixture.detectChanges();
    expect(compiled.querySelector('.icon').textContent).toContain('other-icon');
  });
});
