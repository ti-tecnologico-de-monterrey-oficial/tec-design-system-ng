import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbBoxIconComponent } from './bmb-box-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbBoxIconComponent', () => {
  let component: BmbBoxIconComponent;
  let fixture: ComponentFixture<BmbBoxIconComponent>;
  let componentRef: ComponentRef<BmbBoxIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbBoxIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbBoxIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('iconName', 'Test');
    componentRef.setInput('boxColor', 'transparent');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
