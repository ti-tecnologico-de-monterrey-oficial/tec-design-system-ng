import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DotPaginatorPage } from './dot-paginator-page';

describe('DotPaginatorPage', () => {
  let component: DotPaginatorPage;
  let fixture: ComponentFixture<DotPaginatorPage>;

  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [DotPaginatorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DotPaginatorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates every paginator control and event state', () => {
    component.setAppearance('secondary');
    component.setTotalDots(7);
    component.setTargetCount(3);
    component.handleDotPress(2);

    expect(component.appearance()).toBe('secondary');
    expect(component.totalDots()).toBe(7);
    expect(component.targets()).toHaveLength(3);
    expect(component.activeDotIndex()).toBe(2);
    expect(component.lastEvent()).toBe('onDotPress: 2');
  });
});
