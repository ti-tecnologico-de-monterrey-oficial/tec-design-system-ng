import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkPage } from './bookmark-page';

describe('BookmarkPage', () => {
  let component: BookmarkPage;
  let fixture: ComponentFixture<BookmarkPage>;

  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [BookmarkPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the active state without changing its public contract', () => {
    component.setActive(true);

    expect(component.isActive()).toBe(true);
    expect(component.lastEvent()).toBe('isActiveChange: true');
  });
});
