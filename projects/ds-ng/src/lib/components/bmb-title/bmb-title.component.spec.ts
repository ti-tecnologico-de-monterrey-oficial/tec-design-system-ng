import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTitleComponent } from './bmb-title.component';
import { ComponentRef } from '@angular/core';

describe('BmbTitleTemplateComponent', () => {
  let component: BmbTitleComponent;
  let fixture: ComponentFixture<BmbTitleComponent>;
  let componentRef: ComponentRef<BmbTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTitleComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
