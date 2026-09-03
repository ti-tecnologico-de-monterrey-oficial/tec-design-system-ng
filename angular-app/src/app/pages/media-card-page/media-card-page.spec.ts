import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCardPage } from './media-card-page';

describe('MediaCardPage', () => {
  let component: MediaCardPage;
  let fixture: ComponentFixture<MediaCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose every media card type', () => {
    expect(component.types).toEqual(['inline', 'floating', 'author_detail']);
  });

  it('should use the test image on desktop and mobile', () => {
    const testImage =
      'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg';

    expect(component.src()).toBe(testImage);
    expect(component.mobileSrc()).toBe(testImage);
  });

  it('should record media card interactions', () => {
    component.handleMediaCardClick();
    component.handleMediaCardClick();

    expect(component.clickCount()).toBe(2);
  });
});
