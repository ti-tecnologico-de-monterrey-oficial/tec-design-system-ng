import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbMediaCardComponent } from './bmb-media-card.component';

describe('BmbGenericCardComponent', () => {
  let component: BmbMediaCardComponent;
  let fixture: ComponentFixture<BmbMediaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbMediaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbMediaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
