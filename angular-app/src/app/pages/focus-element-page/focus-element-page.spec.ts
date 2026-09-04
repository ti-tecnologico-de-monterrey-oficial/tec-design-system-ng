import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusElementPage } from './focus-element-page';

describe('FocusElementPage', () => {
  let component: FocusElementPage;
  let fixture: ComponentFixture<FocusElementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusElementPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FocusElementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the appearance controls', () => {
    component.setUseIcon(false);
    component.setNumber(5);
    component.setComponentTitle('Título');
    component.setIsNormal(true);
    component.setIsNonFocused(true);
    component.setIsInheritedBg(true);
    component.setIsContainerSize(true);
    fixture.detectChanges();

    expect(component.useIcon()).toBe(false);
    expect(component.number()).toBe(5);
    expect(component.componentTitle()).toBe('Título');
    expect(component.isNormal()).toBe(true);
    expect(component.isNonFocused()).toBe(true);
    expect(component.isInheritedBg()).toBe(true);
    expect(component.isContainerSize()).toBe(true);
  });
});
