import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSelectComponent } from './bmb-select.component';

describe('BmbSelectComponent', () => {
  let component: BmbSelectComponent;
  let fixture: ComponentFixture<BmbSelectComponent>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
      json: async () => ({}),
    } as Response);

    await TestBed.configureTestingModule({
      imports: [BmbSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the open class when expanded', () => {
    component.isExpanded = true;
    expect(component.getClassName()).toBe('bmb_select-list-open');
  });

  it('should close when clicking outside', () => {
    component.isExpanded = true;
    component.onClick(new MouseEvent('click'));
    expect(component.isExpanded).toBe(false);
  });

  it('should emit the selected item value', () => {
    const emitted: string[] = [];
    component.onValueChange.subscribe((value) => emitted.push(value));
    const item = document.createElement('bmb-select-item');
    item.setAttribute('value', 'second');
    const button = document.createElement('button');
    item.append(button);
    fixture.nativeElement.append(item);

    component.onClick(new MouseEvent('click', { bubbles: true }));
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(emitted).toContain('second');
  });
});
