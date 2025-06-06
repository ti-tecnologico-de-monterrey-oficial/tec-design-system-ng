import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNoticeCardComponent } from './bmb-notice-card.component';
import { ComponentRef } from '@angular/core';

describe('BmbNoticeCardComponent', () => {
  let component: BmbNoticeCardComponent;
  let fixture: ComponentFixture<BmbNoticeCardComponent>;
  let componentRef: ComponentRef<BmbNoticeCardComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BmbNoticeCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbNoticeCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('description', { pageOne: 'Página 1', pageTwo: 'Página 2' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
