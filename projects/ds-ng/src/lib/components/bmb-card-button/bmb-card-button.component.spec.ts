import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbCardButtonComponent } from './bmb-card-button.component';

describe('BmbCardButtonComponent', () => {
  let component: BmbCardButtonComponent;
  let fixture: ComponentFixture<BmbCardButtonComponent>;
  let componentRef: ComponentRef<BmbCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCardButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('body', 'Test Body');
    componentRef.setInput('icon', 'test-icon');
    componentRef.setInput('isFullInteractive', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-header-text',
    );
    expect(titleElement.textContent).toBe('Test Title');
  });

  it('should render body', () => {
    const bodyElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-body',
    );
    expect(bodyElement.textContent).toBe('Test Body');
  });

  it('should render icon', () => {
    const iconElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-header-icon',
    );
    expect(iconElement).toBeTruthy();
  });

  it('should render in full interactive mode', () => {
    const wrapperElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-wrapper',
    );
    expect(wrapperElement).toBeTruthy();
  });

  it('should render in add content mode', () => {
    componentRef.setInput('isFullInteractive', false);
    fixture.detectChanges();
    const addContentElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-add',
    );
    expect(addContentElement).toBeTruthy();
  });
});
