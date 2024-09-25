import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextLinkComponent } from './bmb-text-link.component';

describe('BmbTextLinkComponent', () => {
  let component: BmbTextLinkComponent;
  let fixture: ComponentFixture<BmbTextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTextLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
