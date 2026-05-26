import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonSquareComponent } from './bmb-container-button-square.component';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonSquareComponent', () => {
  let component: BmbContainerButtonSquareComponent;
  let fixture: ComponentFixture<BmbContainerButtonSquareComponent>;
  let componentRef: ComponentRef<BmbContainerButtonSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonSquareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonSquareComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('iconName', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
