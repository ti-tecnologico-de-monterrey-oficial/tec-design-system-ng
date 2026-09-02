import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarItemPage } from './top-bar-item-page';

describe('TopBarItemPage', () => {
  let component: TopBarItemPage;
  let fixture: ComponentFixture<TopBarItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarItemPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Bamboo component', () => {
    expect(component).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('bmb-top-bar-item'),
    ).not.toBeNull();
  });

  it('should update active state and projected text', () => {
    component.isActive.set(true);
    component.setProjectedText('Activo');
    fixture.detectChanges();

    const item: HTMLLIElement =
      fixture.nativeElement.querySelector('.bmb_top-bar-item');
    expect(item.classList).toContain('bmb_top-bar-item-active');
    expect(item.textContent).toContain('Activo');
  });
});
