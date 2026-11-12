import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbHomeCardComponent } from './bmb-home-card.component';
import { By } from '@angular/platform-browser';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header/bmb-home-card-header.component';

describe('BmbHomeCardComponent', () => {
  let component: BmbHomeCardComponent;
  let fixture: ComponentFixture<BmbHomeCardComponent>;
  let componentRef: ComponentRef<BmbHomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute the content padding class from contentPadding', () => {
    expect(component.getContentClass()).toBe('bmb_padding-l');

    componentRef.setInput('contentPadding', 's');
    fixture.detectChanges();

    expect(component.getContentClass()).toBe('bmb_padding-s');
  });

  it('should forward showFullText to the header', () => {
    const header = () =>
      fixture.debugElement.query(By.directive(BmbHomeCardHeaderComponent))
        .componentInstance as BmbHomeCardHeaderComponent;

    expect(header().showFullText()).toBe(false);

    componentRef.setInput('showFullText', true);
    fixture.detectChanges();

    expect(header().showFullText()).toBe(true);
  });

  it('should emit onClose, onBack and onExpandClick', () => {
    const closeSpy = jest.fn();
    const backSpy = jest.fn();
    const expandSpy = jest.fn();
    component.onClose.subscribe(closeSpy);
    component.onBack.subscribe(backSpy);
    component.onExpandClick.subscribe(expandSpy);

    component.handleClose();
    component.handleBack();
    component.handleExpand();

    expect(closeSpy).toHaveBeenCalled();
    expect(backSpy).toHaveBeenCalled();
    expect(expandSpy).toHaveBeenCalled();
  });

  it('should throw when neither title nor componentTitle is provided', () => {
    const freshFixture = TestBed.createComponent(BmbHomeCardComponent);

    expect(() => freshFixture.detectChanges()).toThrow(
      'The "componentTitle" input is required. Please provide a value for it.',
    );
  });
});
