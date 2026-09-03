import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCardPage } from './home-card-page';

describe('HomeCardPage', () => {
  let component: HomeCardPage;
  let fixture: ComponentFixture<HomeCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the appearance controls', () => {
    component.setComponentTitle('Nueva tarjeta');
    component.setSubtitle('Nuevo subtítulo');
    component.setIcon('star');
    component.selectContentPadding('s');
    component.setShowRightButton(false);
    component.setShowOneHeaderAction(true);
    component.setIsMobile(true);
    fixture.detectChanges();

    expect(component.componentTitle()).toBe('Nueva tarjeta');
    expect(component.subtitle()).toBe('Nuevo subtítulo');
    expect(component.icon()).toBe('star');
    expect(component.contentPadding()).toBe('s');
    expect(component.showRightButton()).toBe(false);
    expect(component.showOneHeaderAction()).toBe(true);
    expect(component.isMobile()).toBe(true);
  });

  it('should count close, back and expand events', () => {
    component.handleClose();
    component.handleBack();
    component.handleBack();
    component.handleExpand();

    expect(component.closeCount()).toBe(1);
    expect(component.backCount()).toBe(2);
    expect(component.expandCount()).toBe(1);
  });
});
