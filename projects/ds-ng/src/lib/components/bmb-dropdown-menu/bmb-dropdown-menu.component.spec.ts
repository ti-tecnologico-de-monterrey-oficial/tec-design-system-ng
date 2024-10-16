import { TestBed } from '@angular/core/testing';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ActivatedRoute } from '@angular/router';

describe('BmbDropdownMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BmbIconComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [],
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbDropdownMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render dropdown menu', () => {
    const fixture = TestBed.createComponent(BmbDropdownMenuComponent);
    fixture.componentRef.setInput('items', [
      {
        icon: 'link',
        text: 'External Link',
        url: 'https://example.com',
        target: '_self',
      },
      {
        icon: 'link',
        text: 'Internal Link',
        url: '/vivencia',
      },
      {
        icon: 'delete',
        text: 'Delete',
        action: () => alert('Delete clicked!'),
      },
      {
        icon: 'settings',
        text: 'Settings',
        action: () => console.log('Settings clicked'),
      },
    ]);

    fixture.detectChanges();
    const dropdownMenuElement =
      fixture.nativeElement.querySelector('.bmb_dropdown_menu');
    expect(dropdownMenuElement).toBeTruthy();
  });
});
