import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSidebarComponent } from './bmb-sidebar.component';

describe('BmbSidebarComponent', () => {
  let component: BmbSidebarComponent;
  let fixture: ComponentFixture<BmbSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(BmbSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFocusIn', () => {
    it('should call checkIfFocusInsideSidebar', () => {
      spyOn(component, 'checkIfFocusInsideSidebar');
      component.onFocusIn();
      expect(component.checkIfFocusInsideSidebar).toHaveBeenCalled();
    });
  });
});
