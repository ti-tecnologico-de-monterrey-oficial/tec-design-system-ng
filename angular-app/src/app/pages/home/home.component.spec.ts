import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Google in a new window from the language action', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    component.homeCardActions[0].action?.(new MouseEvent('click'));

    expect(openSpy).toHaveBeenCalledWith(
      'https://www.google.com/',
      '_blank',
      'noopener,noreferrer',
    );
  });
});
