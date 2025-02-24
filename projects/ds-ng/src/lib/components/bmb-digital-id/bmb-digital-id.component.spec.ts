import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDigitalIdComponent } from './bmb-digital-id.component';

describe('BmbDigitalIdComponent', () => {
  let component: BmbDigitalIdComponent;
  let fixture: ComponentFixture<BmbDigitalIdComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDigitalIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('BmbDigitalIdComponent', () => {
    let component: BmbDigitalIdComponent;
    let fixture: ComponentFixture<BmbDigitalIdComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BmbDigitalIdComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BmbDigitalIdComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit close event when closeDigitalId is called', () => {
      spyOn(component.close, 'emit');
      component.closeDigitalId();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });
});
