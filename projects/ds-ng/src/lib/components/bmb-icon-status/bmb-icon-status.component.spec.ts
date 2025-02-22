import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbIconStatusComponent } from './bmb-icon-status.component';
import { ComponentRef } from '@angular/core';

describe('BmbIconStatusComponent', () => {
  let component: BmbIconStatusComponent;
  let fixture: ComponentFixture<BmbIconStatusComponent>;
  let componentRef: ComponentRef<BmbIconStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIconStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIconStatusComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'close');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
