import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBottomNavigationBarComponent } from './bmb-bottom-navigation-bar.component';
import { ComponentRef } from '@angular/core';

describe('BmbBottomNavigationBarComponent', () => {
  let component: BmbBottomNavigationBarComponent;
  let fixture: ComponentFixture<BmbBottomNavigationBarComponent>;
  let componentRef: ComponentRef<BmbBottomNavigationBarComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbBottomNavigationBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('navigationBarIcons', {
      one: { name: 'arrow_back_ios', label: '' },
      two: { name: 'arrow_forward_ios', label: '' },
      three: { name: 'share', label: '' },
      four: { name: 'refresh', label: '' },
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind navigationBarIcons input property', () => {
    const icons: any = {
      one: { name: 'home', label: 'Home' },
      two: { name: 'search', label: 'Search' },
      three: { name: 'notifications', label: 'Notifications' },
      four: { name: 'profile', label: 'Profile' },
    };

    component.navigationBarIcons = icons;
    expect(component.navigationBarIcons).toEqual(icons);
  });

  it('should emit navigationBarEvents on option click', () => {
    jest.spyOn(component.navigationBarEvents, 'emit');
    const event: any = 'back';
    component.onNavigationBarOptionClick(event);
    expect(component.navigationBarEvents.emit).toHaveBeenCalledWith(event);
  });

  it('should emit the correct event when an actionHeader action is invoked', () => {
    jest.spyOn(component.navigationBarEvents, 'emit');

    component.actionHeaders.forEach((actionHeader, index) => {
      actionHeader.action();
      const expectedEvents: any[] = ['back', 'forward', 'share', 'reload'];
      expect(component.navigationBarEvents.emit).toHaveBeenNthCalledWith(
        index + 1,
        expectedEvents[index],
      );
    });
  });

  it('should render navigation bar icons', () => {
    const icons: any = {
      one: { name: 'home', label: 'Home' },
      two: { name: 'search', label: 'Search' },
      three: { name: 'notifications', label: 'Notifications' },
      four: { name: 'profile', label: 'Profile' },
    };
    component.navigationBarIcons = icons;
    fixture.detectChanges();
    const renderedIcons =
      fixture.nativeElement.querySelectorAll('bmb-action-icon');
    expect(renderedIcons.length).toBe(4);
  });

  it('should handle undefined navigationBarIcons gracefully', () => {
    expect(() => component.onNavigationBarOptionClick('back')).not.toThrow();
  });

  it('should set eventName when it differs from the current one', () => {
    const element = { name: 'home', label: 'Home' };

    const result = component.buildElement(element, 'back');

    expect(result).toEqual({ name: 'home', label: 'Home', eventName: 'back' });
    expect(result).not.toBe(element);
  });

  it('should keep the element unchanged when eventName already matches', () => {
    const element = { name: 'home', label: 'Home', eventName: 'back' as const };

    const result = component.buildElement(element, 'back');

    expect(result).toEqual(element);
  });

  it('should have four navigation bar icons', () => {
    const icons: any = {
      one: { name: 'home', label: 'Home' },
      two: { name: 'search', label: 'Search' },
      three: { name: 'notifications', label: 'Notifications' },
      four: { name: 'profile', label: 'Profile' },
    };
    componentRef.setInput('navigationBarIcons', icons);
    fixture.detectChanges();
    expect(component.navigationBarIcons().one).toBeDefined();
    expect(component.navigationBarIcons().two).toBeDefined();
    expect(component.navigationBarIcons().three).toBeDefined();
    expect(component.navigationBarIcons().four).toBeDefined();
  });
});
