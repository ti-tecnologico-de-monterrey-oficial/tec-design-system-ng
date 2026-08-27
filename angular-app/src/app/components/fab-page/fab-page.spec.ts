import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabPage } from './fab-page';

describe('FabPage', () => {
  let component: FabPage;
  let fixture: ComponentFixture<FabPage>;

  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [FabPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FabPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates all typed controls and records the output', () => {
    component.setSize('small');
    component.setType('extended');
    component.registerClick(new MouseEvent('click'));

    expect(component.size()).toBe('small');
    expect(component.type()).toBe('extended');
    expect(component.lastEvent()).toBe('fabClick: click');
  });
});
