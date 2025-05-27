import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropdownContentComponent } from './bmb-dropdown-content.component';

describe('BmbDropdownMenuContentComponent', () => {
  let component: BmbDropdownContentComponent;
  let fixture: ComponentFixture<BmbDropdownContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDropdownContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropdownContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
