import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PullWedgePage } from './pull-wedge';

describe('PullWedgePage', () => {
  let component: PullWedgePage;
  let fixture: ComponentFixture<PullWedgePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PullWedgePage],
    }).compileComponents();

    fixture = TestBed.createComponent(PullWedgePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update its controls', () => {
    component.setInitialHeight(420);
    component.setMinContentHeight(120);
    component.setOpen(true);
    expect(component.initialHeight()).toBe(420);
    expect(component.minContentHeight()).toBe(120);
    expect(component.isOpen()).toBe(true);
  });
});
