import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTimestreamCardComponent } from './bmb-timestream-card.component';
import { ComponentRef } from '@angular/core';

describe('BmbTimestreamCardComponent', () => {
  let component: BmbTimestreamCardComponent;
  let fixture: ComponentFixture<BmbTimestreamCardComponent>;
  let componentRef: ComponentRef<BmbTimestreamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
