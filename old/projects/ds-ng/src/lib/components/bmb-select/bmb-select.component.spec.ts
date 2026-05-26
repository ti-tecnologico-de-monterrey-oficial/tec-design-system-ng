import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSelectComponent } from './bmb-select.component';

describe('BmbSelectComponent', () => {
  let component: BmbSelectComponent;
  let fixture: ComponentFixture<BmbSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
