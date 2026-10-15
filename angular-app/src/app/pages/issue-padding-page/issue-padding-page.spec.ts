import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuePaddingPage } from './issue-padding-page';

describe('IssuePaddingPage', () => {
  let component: IssuePaddingPage;
  let fixture: ComponentFixture<IssuePaddingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePaddingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuePaddingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the shortcut data used by the dashboard pages', () => {
    expect(component.workShortcuts.length).toBeGreaterThan(0);
    expect(component.serviceShortcuts.length).toBeGreaterThan(0);
    expect(component.reservationShortcuts.length).toBeGreaterThan(0);
  });
});
