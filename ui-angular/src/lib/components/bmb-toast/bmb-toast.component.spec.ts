import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbToastComponent } from './bmb-toast.component';

describe('BmbToastComponent', () => {
  let component: BmbToastComponent;
  let fixture: ComponentFixture<BmbToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbToastComponent],
    });

    fixture = TestBed.createComponent(BmbToastComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default to the neutral appearance classes', () => {
    fixture.detectChanges();
    expect(component.getClasses()).toEqual(['bmb_toast', 'bmb_toast-neutral']);
  });

  it('should build classes for the given appearance', () => {
    fixture.componentRef.setInput('appearance', 'error');
    fixture.detectChanges();
    expect(component.getClasses()).toEqual(['bmb_toast', 'bmb_toast-error']);
  });

  it('should map known appearances to their icon', () => {
    fixture.componentRef.setInput('appearance', 'warning');
    fixture.detectChanges();
    expect(component.getIcon()).toBe('warning');

    fixture.componentRef.setInput('appearance', 'successful');
    fixture.detectChanges();
    expect(component.getIcon()).toBe('check_circle');
  });

  it('should fall back to the info icon for appearances without one', () => {
    fixture.componentRef.setInput('appearance', 'mitec_blue');
    fixture.detectChanges();
    expect(component.getIcon()).toBe('info');
  });

  it('should emit onClose when handleClose is called', () => {
    fixture.detectChanges();
    const event = new MouseEvent('click');
    jest.spyOn(component.onClose, 'emit');

    component.handleClose(event);

    expect(component.onClose.emit).toHaveBeenCalledWith(event);
  });

  it('should render the close button and emit onClose when clicked', () => {
    fixture.componentRef.setInput('isClosable', true);
    fixture.componentRef.setInput('componentTitle', 'Título');
    fixture.detectChanges();

    jest.spyOn(component.onClose, 'emit');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.bmb_toast-button');
    expect(button).toBeTruthy();

    button.click();

    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
