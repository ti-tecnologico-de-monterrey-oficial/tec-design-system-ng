import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSelectItemComponent } from './bmb-select-item.component';

describe('BmbSelectItemComponent', () => {
  let component: BmbSelectItemComponent;
  let fixture: ComponentFixture<BmbSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSelectItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
