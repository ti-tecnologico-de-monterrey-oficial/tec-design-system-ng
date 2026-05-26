import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoginComponent } from './bmb-login.component';

describe('BmbLoginComponent', () => {
  let component: BmbLoginComponent;
  let fixture: ComponentFixture<BmbLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
