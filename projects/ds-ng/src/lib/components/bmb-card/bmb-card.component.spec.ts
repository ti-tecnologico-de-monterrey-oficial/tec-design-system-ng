import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCardComponent } from './bmb-card.component';

describe('BmbCardComponent', () => {
  let component: BmbCardComponent;
  let fixture: ComponentFixture<BmbCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
