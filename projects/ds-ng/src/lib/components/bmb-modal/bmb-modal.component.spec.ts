import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNewModalComponent } from './bmb-modal.component';

describe('BmbNewModalComponent', () => {
  let component: BmbNewModalComponent;
  let fixture: ComponentFixture<BmbNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNewModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
