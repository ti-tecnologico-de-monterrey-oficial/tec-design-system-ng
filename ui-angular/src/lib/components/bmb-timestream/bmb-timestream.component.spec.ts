import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimestreamComponent } from './bmb-timestream.component';

describe('BmbTimestreamComponent', () => {
  let component: BmbTimestreamComponent;
  let fixture: ComponentFixture<BmbTimestreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
