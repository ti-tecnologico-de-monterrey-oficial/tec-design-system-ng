import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerPage } from './divider-page';

describe('DividerPage', () => {
  let component: DividerPage;
  let fixture: ComponentFixture<DividerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update type and margin controls', () => {
    component.selectType('dotted');
    component.setRemoveMargin(true);
    fixture.detectChanges();

    expect(component.type()).toBe('dotted');
    expect(component.removeMargin()).toBe(true);
    expect(fixture.nativeElement.querySelector('output').textContent).toContain(
      'sin margen',
    );
  });
});
