import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTopBarComponent } from './bmb-top-bar.component';

describe('BmbTopBarComponent', () => {
  let component: BmbTopBarComponent;
  let fixture: ComponentFixture<BmbTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTopBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
