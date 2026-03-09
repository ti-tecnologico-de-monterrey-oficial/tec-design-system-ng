import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonBadgeComponent } from './bmb-container-button-badge.component';
import { ComponentRef } from '@angular/core';
let componentRef: ComponentRef<BmbContainerButtonBadgeComponent>;

describe('BmbContainerButtonBadgeComponent', () => {
  let component: BmbContainerButtonBadgeComponent;
  let fixture: ComponentFixture<BmbContainerButtonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonBadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test');
    componentRef.setInput('leftIconName', 'Test');
    componentRef.setInput('badge', {
      text: 'test',
      appearance: 'normal',
      container: false,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
