import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBottomNavigationBarComponent } from './bmb-bottom-navigation-bar.component';
import { ComponentRef } from '@angular/core';

describe('BmbBottomNavigationBarComponent', () => {
  let component: BmbBottomNavigationBarComponent;
  let fixture: ComponentFixture<BmbBottomNavigationBarComponent>;
  let componentRef: ComponentRef<BmbBottomNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbBottomNavigationBarComponent],
    }).compileComponents();

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

  it('should create the component', () => {
    expect(component).toBeDefined();
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
    spyOn(component.navigationBarEvents, 'emit');
    const event: any = 'back';
    component.onNavigationBarOptionClick(event);
    expect(component.navigationBarEvents.emit).toHaveBeenCalledWith(event);
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
    const renderedIcons = fixture.nativeElement.querySelectorAll(
      'bmb-interactive-icon',
    );
    expect(renderedIcons.length).toBe(4);
  });

  it('should handle undefined navigationBarIcons gracefully', () => {
    expect(() => component.onNavigationBarOptionClick('back')).not.toThrow();
  });
});
