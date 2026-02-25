import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWDropdownComponent } from './modal-w-dropdown.component';

describe('ModalWDropdownComponent', () => {
  let component: ModalWDropdownComponent;
  let fixture: ComponentFixture<ModalWDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
