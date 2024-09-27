import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimestreamDialogComponent } from './bmb-timestream-dialog.component';

describe('BmbTimestreamDialogComponent', () => {
  let component: BmbTimestreamDialogComponent;
  let fixture: ComponentFixture<BmbTimestreamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
