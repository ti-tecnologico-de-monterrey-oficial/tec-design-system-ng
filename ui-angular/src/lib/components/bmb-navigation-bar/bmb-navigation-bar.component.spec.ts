import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbNavigationBarComponent } from './bmb-navigation-bar.component';
import type { IBmbActionHeader } from '../../_shared/types/components/navigation-bar';

describe('BmbNavigationBarComponent', () => {
  let component: BmbNavigationBarComponent;
  let fixture: ComponentFixture<BmbNavigationBarComponent>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [BmbNavigationBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preserve its public default configuration', () => {
    expect(component.actionHeaders()).toEqual([]);
    expect(component.iconSize()).toBeUndefined();
    expect(component.config()).toEqual({
      gapSize: 'm',
      justify: 'spaceBetween',
      alignItems: 'start',
      isMitecHeader: false,
    });
  });

  it('should derive the navigation configuration from every layout input', () => {
    fixture.componentRef.setInput('gapSize', 'l');
    fixture.componentRef.setInput('justify', 'center');
    fixture.componentRef.setInput('alignItems', 'stretch');
    fixture.componentRef.setInput('isMitecHeader', true);

    expect(component.config()).toEqual({
      gapSize: 'l',
      justify: 'center',
      alignItems: 'stretch',
      isMitecHeader: true,
    });
  });

  it('should execute an optional navigation action exactly once', () => {
    const action = jest.fn();
    const actionHeader: IBmbActionHeader = { icon: 'home', action };

    component.handleClick(actionHeader);
    component.handleClick({ icon: 'search' });

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('should render one action icon for every action header', async () => {
    fixture.componentRef.setInput('actionHeaders', [
      { icon: 'home', alt: 'Inicio' },
      { icon: 'search', alt: 'Buscar' },
    ] satisfies IBmbActionHeader[]);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelectorAll('bmb-action-icon'),
    ).toHaveLength(2);
  });
});
