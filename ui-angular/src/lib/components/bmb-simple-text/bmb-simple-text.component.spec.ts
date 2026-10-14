import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSimpleTextComponent } from './bmb-simple-text.component';

describe('BmbSimpleTextComponent', () => {
  let component: BmbSimpleTextComponent;
  let fixture: ComponentFixture<BmbSimpleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSimpleTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSimpleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default tag as <p>', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('p.bmb_simple-text')).toBeTruthy();
  });

  it('should render the tag set by elementType', () => {
    fixture.componentRef.setInput('elementType', 'span');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('span.bmb_simple-text')).toBeTruthy();
  });
});
