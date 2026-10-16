import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDrawerOverlayComponent } from './bmb-drawer-overlay.component';

describe('BmbDrawerOverlayComponent', () => {
  let component: BmbDrawerOverlayComponent;
  let fixture: ComponentFixture<BmbDrawerOverlayComponent>;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fixture = TestBed.createComponent(BmbDrawerOverlayComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not throw when the menu is within the limit', () => {
      fixture.componentRef.setInput(
        'menu',
        Array.from({ length: 5 }, (_, i) => ({ title: `item-${i}` })),
      );

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should not throw when the menu is undefined', () => {
      fixture.componentRef.setInput('menu', undefined);

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should throw when the menu exceeds the limit', () => {
      fixture.componentRef.setInput(
        'menu',
        Array.from({ length: 6 }, (_, i) => ({ title: `item-${i}` })),
      );

      expect(() => fixture.detectChanges()).toThrow();
    });
  });

  describe('toggleDrawer', () => {
    it('should open the drawer', () => {
      fixture.detectChanges();
      component.toggleDrawer();
      expect(component.isOpen).toBe(true);
    });

    it('should close the full drawer when closing the drawer', () => {
      fixture.detectChanges();
      component.isOpen = true;
      component.isFull = true;

      component.toggleDrawer();

      expect(component.isOpen).toBe(false);
      expect(component.isFull).toBe(false);
    });
  });

  describe('closeDrawer', () => {
    it('should close the drawer and the full drawer', () => {
      fixture.detectChanges();
      component.isOpen = true;
      component.isFull = true;

      component.closeDrawer(new MouseEvent('click'));

      expect(component.isOpen).toBe(false);
      expect(component.isFull).toBe(false);
    });
  });

  describe('onEsc', () => {
    it('should close the drawer when it is open', () => {
      fixture.detectChanges();
      component.isOpen = true;

      component.onEsc();

      expect(component.isOpen).toBe(false);
    });

    it('should do nothing when the drawer is closed', () => {
      fixture.detectChanges();
      component.isOpen = false;

      expect(() => component.onEsc()).not.toThrow();
      expect(component.isOpen).toBe(false);
    });
  });

  describe('toggleFullDrawer', () => {
    it('should open the full drawer and run the item action', () => {
      fixture.detectChanges();
      const buttonClick = jest.fn();
      const event = new MouseEvent('click');

      component.toggleFullDrawer(event, { buttonClick });

      expect(component.isFull).toBe(true);
      expect(buttonClick).toHaveBeenCalledWith(event);
    });

    it('should close the full drawer without needing an item', () => {
      fixture.detectChanges();
      component.isFull = true;

      expect(() =>
        component.toggleFullDrawer(new MouseEvent('click')),
      ).not.toThrow();
      expect(component.isFull).toBe(false);
    });
  });

  describe('selectNavItem', () => {
    it('should update the active nav item index', () => {
      fixture.detectChanges();
      component.selectNavItem(2);
      expect(component.activeNavItemIndex).toBe(2);
    });
  });

  describe('handleValueChange', () => {
    it('should emit onValueChange', () => {
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onValueChange, 'emit');

      component.handleValueChange('search text');

      expect(emitSpy).toHaveBeenCalledWith('search text');
    });
  });

  describe('appsActive', () => {
    it('should return an empty array when there are no apps for the current nav', () => {
      fixture.detectChanges();
      expect(component.appsActive).toEqual([]);
    });

    it('should return the apps for the active nav item', () => {
      const apps = [{ title: 'App 1', icon: 'home', appearance: 'red' as const }];
      fixture.componentRef.setInput('appServices', { 0: apps });
      fixture.detectChanges();

      expect(component.appsActive).toEqual(apps);
    });
  });
});
