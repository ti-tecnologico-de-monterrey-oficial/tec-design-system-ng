import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInputErrorMessageComponent } from './bmb-input-error-message.component';

describe('BmbInputErrorMessageComponent', () => {
  let fixture: ComponentFixture<BmbInputErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputErrorMessageComponent);
  });

  it('should not render anything without a message', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p')).toBeNull();
  });

  it('should render the message as an alert with the given id', () => {
    fixture.componentRef.setInput('message', 'Required field');
    fixture.componentRef.setInput('messageId', 'name-error');
    fixture.detectChanges();

    const p: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(p.textContent?.trim()).toBe('Required field');
    expect(p.getAttribute('role')).toBe('alert');
    expect(p.id).toBe('name-error');
  });
});
