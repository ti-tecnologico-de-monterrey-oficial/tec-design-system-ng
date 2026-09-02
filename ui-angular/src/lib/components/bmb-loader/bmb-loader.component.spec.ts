import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoaderComponent } from './bmb-loader.component';

describe('BmbLoaderComponent', () => {
  let component: BmbLoaderComponent;
  let fixture: ComponentFixture<BmbLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the overlay only when overlay is true and errorState is false', () => {
    expect(component.shouldShowOverlay()).toBe(false);

    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();
    expect(component.shouldShowOverlay()).toBe(true);

    fixture.componentRef.setInput('errorState', true);
    fixture.detectChanges();
    expect(component.shouldShowOverlay()).toBe(false);
  });

  it('should compute the modal and error classes', () => {
    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();
    expect(component.getClassList()).toEqual({
      'bmb_loader-modal': true,
      'bmb_loader-error': false,
    });

    fixture.componentRef.setInput('errorState', true);
    fixture.detectChanges();
    expect(component.getClassList()).toEqual({
      'bmb_loader-modal': false,
      'bmb_loader-error': true,
    });
  });

  it('should compute the error icon class from appearance', () => {
    fixture.componentRef.setInput('appearance', 'error');
    fixture.detectChanges();

    expect(component.getErrorIconClass()).toBe('bmb_loader-error-icon-error');
  });

  it('should emit onButtonPrimary and onButtonSecondary', () => {
    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();
    component.onButtonPrimary.subscribe(primarySpy);
    component.onButtonSecondary.subscribe(secondarySpy);
    const event = new MouseEvent('click');

    component.handleButtonPrimary(event);
    component.handleButtonSecondary(event);

    expect(primarySpy).toHaveBeenCalledWith(event);
    expect(secondarySpy).toHaveBeenCalledWith(event);
  });
});
