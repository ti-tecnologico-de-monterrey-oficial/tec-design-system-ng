import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipPage } from './tooltip-page';

describe('TooltipPage', () => {
  let component: TooltipPage;
  let fixture: ComponentFixture<TooltipPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipPage],
    }).compileComponents();
    fixture = TestBed.createComponent(TooltipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
