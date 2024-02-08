import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbIconTextInput } from './bmb-icon-text-input.component';

describe('BmbIconComponent', () => {
  let component: BmbIconTextInput;
  let fixture: ComponentFixture<BmbIconTextInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbIconTextInput],
    });

    fixture = TestBed.createComponent(BmbIconTextInput);
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
