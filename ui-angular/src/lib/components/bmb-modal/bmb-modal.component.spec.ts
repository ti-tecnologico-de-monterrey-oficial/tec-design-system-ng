import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BmbModalComponent } from './bmb-modal.component';

describe('BmbModalComponent', () => {
  let component: BmbModalComponent;
  let fixture: ComponentFixture<BmbModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
