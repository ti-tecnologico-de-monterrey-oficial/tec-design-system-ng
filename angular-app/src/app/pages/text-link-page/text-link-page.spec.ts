import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextLinkPage } from './text-link-page';

describe('TextLinkPage', () => {
  let component: TextLinkPage;
  let fixture: ComponentFixture<TextLinkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextLinkPage],
    }).compileComponents();
    fixture = TestBed.createComponent(TextLinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every text link style', () =>
    expect(component.textLinkStyles).toEqual(['icon', 'underlined']));
  it('should expose every icon position', () =>
    expect(component.iconPositions).toEqual(['left', 'right']));
});
