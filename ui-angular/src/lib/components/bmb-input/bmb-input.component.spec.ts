import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInputComponent } from './bmb-input.component';

describe('BmbInputComponent', () => {
  let component: BmbInputComponent;
  let fixture: ComponentFixture<BmbInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
