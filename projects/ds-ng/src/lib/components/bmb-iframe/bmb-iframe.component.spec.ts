import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIframeComponent } from './bmb-iframe.component';

describe('BmbIframeComponent', () => {
  let component: BmbIframeComponent;
  let fixture: ComponentFixture<BmbIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
