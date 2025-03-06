import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropdownMenuContentComponent } from './bmb-dropdown-menu-content.component';

describe('BmbDropdownMenuContentComponent', () => {
  let component: BmbDropdownMenuContentComponent;
  let fixture: ComponentFixture<BmbDropdownMenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDropdownMenuContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropdownMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
