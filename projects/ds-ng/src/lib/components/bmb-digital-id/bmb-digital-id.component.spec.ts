import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbDigitalIdComponent } from './bmb-digital-id.component';

describe('BmbDigitalIdComponent', () => {
  let component: BmbDigitalIdComponent;
  let fixture: ComponentFixture<BmbDigitalIdComponent>;
  let componentRef: ComponentRef<BmbDigitalIdComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbDigitalIdComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('name', 'Paola');
    componentRef.setInput('surname', 'Mendez');
    componentRef.setInput('registration', 'A0323822');
    componentRef.setInput('campus', 'Campus Norte');
    componentRef.setInput('career', 'ITICS');
    componentRef.setInput('role', 'Estudiante');
    componentRef.setInput('imgProfile', 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg');
    componentRef.setInput('imgBackground', 'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg');
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
