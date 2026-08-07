import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerPage } from './container-page';

describe('ContainerPage', () => {
  let component: ContainerPage;
  let fixture: ComponentFixture<ContainerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update appearance and visibility controls', () => {
    component.selectAppearance('secondary-container');
    component.setHidden(true);
    fixture.detectChanges();

    expect(component.appearance()).toBe('secondary-container');
    expect(component.isHidden()).toBe(true);
    expect(fixture.nativeElement.querySelector('output').textContent).toContain(
      'oculto',
    );
  });
});
