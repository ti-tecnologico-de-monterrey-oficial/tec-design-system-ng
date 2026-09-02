import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayPage } from './overlay-page';

describe('OverlayPage', () => {
  let component: OverlayPage;
  let fixture: ComponentFixture<OverlayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the overlay', () => {
    component.open();
    expect(component.active()).toBe(true);
    component.close('test-overlay');
    expect(component.active()).toBe(false);
    expect(component.lastClick()).toContain('test-overlay');
  });

  it('should update the uid', () => {
    component.setUid('new-overlay');
    expect(component.uid()).toBe('new-overlay');
  });
});
