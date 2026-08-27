import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimestreamErrorComponent } from './bmb-timestream-error.component';

describe('BmbTimestreamErrorComponent', () => {
  let component: BmbTimestreamErrorComponent;
  let fixture: ComponentFixture<BmbTimestreamErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
