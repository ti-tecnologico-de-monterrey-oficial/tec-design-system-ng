import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInnerHeaderComponent } from './bmb-inner-header.component';

describe('BmbInnerHeaderComponent', () => {
  let component: BmbInnerHeaderComponent;
  let fixture: ComponentFixture<BmbInnerHeaderComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInnerHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getLeftIcon', () => {
    it('should return an empty string by default', () => {
      expect(component.getLeftIcon()).toBe('');
    });

    it('should return arrow_back when showReturn is true and showClose is false', () => {
      fixture.componentRef.setInput('showReturn', true);
      expect(component.getLeftIcon()).toBe('arrow_back');
    });

    it('should return close when showClose is true and showReturn is false', () => {
      fixture.componentRef.setInput('showClose', true);
      expect(component.getLeftIcon()).toBe('close');
    });

    it('should return an empty string when both are true', () => {
      fixture.componentRef.setInput('showClose', true);
      fixture.componentRef.setInput('showReturn', true);
      expect(component.getLeftIcon()).toBe('');
    });
  });

  describe('handleBack', () => {
    it('should emit onHandleBack', () => {
      const emitSpy = jest.spyOn(component.onHandleBack, 'emit');
      const event = new MouseEvent('click');

      component.handleBack(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleClose', () => {
    it('should emit onHandleClose', () => {
      const emitSpy = jest.spyOn(component.onHandleClose, 'emit');
      const event = new MouseEvent('click');

      component.handleClose(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleSearch', () => {
    it('should toggle the search state', () => {
      expect(component.toggleSearch()).toBe(false);

      component.handleSearch();
      expect(component.toggleSearch()).toBe(true);

      component.handleSearch();
      expect(component.toggleSearch()).toBe(false);
    });
  });

  describe('handleTrailingIconPrimary', () => {
    it('should emit onHandleTrailingPrimary', () => {
      const emitSpy = jest.spyOn(component.onHandleTrailingPrimary, 'emit');
      const event = new MouseEvent('click');

      component.handleTrailingIconPrimary(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleTrailingIconSecondary', () => {
    it('should emit onHandleTrailingSecondary', () => {
      const emitSpy = jest.spyOn(component.onHandleTrailingSecondary, 'emit');
      const event = new MouseEvent('click');

      component.handleTrailingIconSecondary(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('onSubmit', () => {
    it('should emit the search value', () => {
      const emitSpy = jest.spyOn(component.searchData, 'emit');
      component.searchForm.get('search')?.setValue('hello');

      component.onSubmit();

      expect(emitSpy).toHaveBeenCalledWith('hello');
    });

    it('should emit an empty string when there is no search value', () => {
      const emitSpy = jest.spyOn(component.searchData, 'emit');

      component.onSubmit();

      expect(emitSpy).toHaveBeenCalledWith('');
    });
  });

  describe('getFormControl', () => {
    it('should return the named form control', () => {
      expect(component.getFormControl('search')).toBe(
        component.searchForm.get('search'),
      );
    });
  });
});
