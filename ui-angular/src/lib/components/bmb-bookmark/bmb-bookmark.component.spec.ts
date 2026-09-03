import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbBookmarkComponent } from './bmb-bookmark.component';

describe('BmbBookmarkComponent', () => {
  let component: BmbBookmarkComponent;
  let fixture: ComponentFixture<BmbBookmarkComponent>;

  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [BmbBookmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isActive when handleClick is called', () => {
    const event = { stopPropagation: jest.fn() };

    expect(component.isActive()).toBe(false);
    component.handleClick(event);
    expect(component.isActive()).toBe(true);
    component.handleClick(event);
    expect(component.isActive()).toBe(false);
    expect(event.stopPropagation).toHaveBeenCalledTimes(2);
  });
});
