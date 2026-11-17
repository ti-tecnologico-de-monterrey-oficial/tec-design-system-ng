import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';

describe('BmbHeaderMobileComponent', () => {
  let component: BmbHeaderMobileComponent;
  let fixture: ComponentFixture<BmbHeaderMobileComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Header title');
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('handleTrailingIconClick', () => {
    it('should emit onTrailingIconClick', () => {
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onTrailingIconClick, 'emit');
      const event = new MouseEvent('click');

      component.handleTrailingIconClick(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleLogoClick', () => {
    it('should emit onLogoClick', () => {
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onLogoClick, 'emit');
      const event = new MouseEvent('click');

      component.handleLogoClick(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleUserImageClick', () => {
    it('should emit onUserImageClick', () => {
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onUserImageClick, 'emit');
      const event = new MouseEvent('click');

      component.handleUserImageClick(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });
});
