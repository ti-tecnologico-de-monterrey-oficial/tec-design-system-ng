import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCardButtonComponent } from './bmb-card-button.component';
import { CommonModule } from '@angular/common';

describe('BmbCardButtonComponent', () => {
  let component: BmbCardButtonComponent;
  let fixture: ComponentFixture<BmbCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbCardButtonComponent],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
