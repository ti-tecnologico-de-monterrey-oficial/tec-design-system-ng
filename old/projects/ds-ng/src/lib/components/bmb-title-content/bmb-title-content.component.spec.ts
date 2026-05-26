import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTitleContentComponent } from './bmb-title-content.component';
import { ComponentRef } from '@angular/core';

describe('BmbTitleContentTemplateComponent', () => {
  let component: BmbTitleContentComponent;
  let fixture: ComponentFixture<BmbTitleContentComponent>;
  let componentRef: ComponentRef<BmbTitleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTitleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTitleContentComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
