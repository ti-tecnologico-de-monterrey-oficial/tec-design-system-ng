import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAccordionSimpleTextComponent } from './bmb-accordion-simple-text.component';

describe('BmbAccordionSimpleText', () => {
  let component: BmbAccordionSimpleTextComponent;
  let fixture: ComponentFixture<BmbAccordionSimpleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAccordionSimpleTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAccordionSimpleTextComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
