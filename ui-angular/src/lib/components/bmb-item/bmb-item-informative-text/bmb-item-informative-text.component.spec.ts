import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbItemInformativeTextComponent } from './bmb-item-informative-text.component';
import { ComponentRef } from '@angular/core';

describe('BmbItemInformativeTextComponent', () => {
  let component: BmbItemInformativeTextComponent;
  let fixture: ComponentFixture<BmbItemInformativeTextComponent>;
  let componentRef: ComponentRef<BmbItemInformativeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbItemInformativeTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbItemInformativeTextComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('itemTitle', 'Text');
    componentRef.setInput('supportText', 'Text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
