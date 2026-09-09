import { TestBed } from '@angular/core/testing';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ActivatedRoute } from '@angular/router';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';

describe('BmbDropdownMenuComponent', () => {
  const projectionService = {
    openContent: jest.fn().mockReturnValue('content-1'),
    closeContent: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [CommonModule, BmbIconComponent],
      providers: [
        {
          provide: BmbProjectionContentService,
          useValue: projectionService,
        },
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
      fixture.nativeElement.querySelector('.bmb_dropdown-menu');
    expect(dropdownMenuElement).toBeTruthy();
  });

  it('should open the projected dropdown and handle selected items', () => {
    const fixture = TestBed.createComponent(BmbDropdownMenuComponent);
    const component = fixture.componentInstance;
    const selectedItem = { icon: 'settings', text: 'Settings' };
    const emitSpy = jest.spyOn(component.clickedItem, 'emit');

    fixture.detectChanges();
    component.openDropdown();

    expect(projectionService.openContent).toHaveBeenCalledWith(
      expect.objectContaining({
        inputContext: { items: [] },
        focusOnOpen: true,
        showBackdrop: false,
      }),
    );
    expect(component.contentID()).toBe('content-1');

    const config = projectionService.openContent.mock.calls[0][0];
    config.outputContext.clickedItem(selectedItem);

    expect(emitSpy).toHaveBeenCalledWith(selectedItem);
    expect(projectionService.closeContent).toHaveBeenCalledWith('content-1');
  });
});
