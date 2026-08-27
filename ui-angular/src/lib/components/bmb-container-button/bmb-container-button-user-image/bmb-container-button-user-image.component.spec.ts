import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonUserImageComponent } from './bmb-container-button-user-image.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonUserImageComponent', () => {
  let component: BmbContainerButtonUserImageComponent;
  let fixture: ComponentFixture<BmbContainerButtonUserImageComponent>;
  let componentRef: ComponentRef<BmbContainerButtonUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonUserImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonUserImageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('fullName', 'Full name');
    componentRef.setInput('rightIconName', 'home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fullName input correctly', () => {
    expect(component.fullName()).toBe('Full name');
  });

  it('should set rightIconName input correctly', () => {
    expect(component.rightIconName()).toBe('home');
  });
});
