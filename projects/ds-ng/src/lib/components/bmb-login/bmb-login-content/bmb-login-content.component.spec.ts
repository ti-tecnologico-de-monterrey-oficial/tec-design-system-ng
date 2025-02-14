import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLoginContentComponent } from './bmb-login-content.component';
import { ComponentRef } from '@angular/core';

describe('BmbLoginContentComponent', () => {
  let component: BmbLoginContentComponent;
  let fixture: ComponentFixture<BmbLoginContentComponent>;
    let componentRef: ComponentRef<BmbLoginContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLoginContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLoginContentComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('forgottenPasswordLabel', '¿Olvidaste tu contraseña?');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
