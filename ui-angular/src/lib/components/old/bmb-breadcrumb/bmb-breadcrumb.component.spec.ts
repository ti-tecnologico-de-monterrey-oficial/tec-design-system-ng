import { TestBed } from '@angular/core/testing';
import { BmbBreadcrumbComponent } from './bmb-breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

describe('BmbBreadcrumbComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, BmbIconComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(0, '/emprendedor/vivencia', '/')),
            navigate: () => Promise.resolve(true),
            navigateByUrl: () => Promise.resolve(true),
            createUrlTree: () => {},
            serializeUrl: () => '',
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render top bar breadcrumb', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('dataTopBar', [
      { text: 'Tec. Sign', link: '/' },
      { text: 'Borem ipsum dolor sit amet 1 Borem ipsum dolor sit amet 1' },
    ]);
    fixture.componentRef.setInput('isTopBar', true);

    fixture.detectChanges();
    const topBarElement = fixture.nativeElement.querySelector(
      '.bmb_breadcrumb-top',
    );
    expect(topBarElement).toBeTruthy();
  });

  it('should render local navigation breadcrumb', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('dataLocalNav', [
      { text: 'Borem ipsum dolor sit amet 1', link: '/' },
      { text: 'Borem ipsum dolor sit amet 2', link: '/emprendedor' },
      { text: 'Borem ipsum dolor sit amet 3', link: '/emprendedor/vivencia' },
    ]);
    fixture.componentRef.setInput('isTopBar', false);

    fixture.detectChanges();
    const localNavElement = fixture.nativeElement.querySelector(
      '.bmb_breadcrumb-link',
    );
    expect(localNavElement).toBeTruthy();
  });
});
