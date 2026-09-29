import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BmbSidebarComponent } from 'ui-angular';
import { sidebarOptions } from './sidebarOptions';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the app shell and sidebar navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('bmb-top-bar')).not.toBeNull();
    expect(compiled.querySelector('main router-outlet')).not.toBeNull();
    const sidebar = fixture.debugElement.query(By.directive(BmbSidebarComponent));
    expect(sidebar).not.toBeNull();
    expect(sidebar.componentInstance.elements()).toEqual(sidebarOptions);
  });
});
