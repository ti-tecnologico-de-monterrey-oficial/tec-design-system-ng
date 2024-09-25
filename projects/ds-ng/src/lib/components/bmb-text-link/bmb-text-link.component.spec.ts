import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextLinkComponent } from './bmb-text-link.component';
import { provideRouter } from '@angular/router';

describe('BmbTextLinkComponent', () => {
  let component: BmbTextLinkComponent;
  let fixture: ComponentFixture<BmbTextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [BmbTextLinkComponent],
			providers: [provideRouter([])],
		}).compileComponents();

    fixture = TestBed.createComponent(BmbTextLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
