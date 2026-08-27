import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPage } from './select-page';

describe('SelectPage', () => {
  let component: SelectPage;
  let fixture: ComponentFixture<SelectPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
      json: async () => ({}),
    } as Response);

    await TestBed.configureTestingModule({
      imports: [SelectPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
