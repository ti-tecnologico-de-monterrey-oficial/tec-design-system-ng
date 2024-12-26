import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProfileComponent } from './bmb-profile.component';
import { ComponentRef } from '@angular/core';

describe('BmbProfileComponent', () => {
  let component: BmbProfileComponent;
  let fixture: ComponentFixture<BmbProfileComponent>;
    let componentRef: ComponentRef<BmbProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbProfileComponent);
    component = fixture.componentInstance;componentRef = fixture.componentRef;
    componentRef.setInput('userData', {
      name: '',
      userImg: '',
      matricula: '',
      mail:  '',
      period:  '',
      campus:  '',
      program:  '',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
