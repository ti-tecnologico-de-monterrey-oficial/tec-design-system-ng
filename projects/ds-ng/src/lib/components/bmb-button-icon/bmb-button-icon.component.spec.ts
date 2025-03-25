import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbButtonIconComponent } from './bmb-button-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbButtonIconComponent', () => {
  let component: BmbButtonIconComponent;
  let fixture: ComponentFixture<BmbButtonIconComponent>;
  let componentRef: ComponentRef<BmbButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbButtonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbButtonIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
