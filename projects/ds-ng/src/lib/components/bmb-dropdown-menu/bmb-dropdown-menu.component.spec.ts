import { TestBed } from '@angular/core/testing';
import { BmbDropdownMenuComponent } from './bmb-dropdown-menu.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { RouterModule } from '@angular/router';

describe('BmbDropdownMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule],
      declarations: [BmbDropdownMenuComponent, BmbIconComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbDropdownMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    const fixture = TestBed.createComponent(BmbDropdownMenuComponent);
    const component = fixture.componentInstance;
    component.isOpen.set(false);
    expect(component.isOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(true);
  });
});
