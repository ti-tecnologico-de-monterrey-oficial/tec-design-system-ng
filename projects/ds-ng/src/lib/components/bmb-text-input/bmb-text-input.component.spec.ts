import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextInput } from './bmb-text-input.component';

describe('BmbIconComponent', () => {
  let component: BmbTextInput;
  let fixture: ComponentFixture<BmbTextInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbTextInput],
    });

    fixture = TestBed.createComponent(BmbTextInput);
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
