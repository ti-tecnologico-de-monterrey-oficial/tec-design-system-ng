import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbActionIconComponent', () => {
  let component: BmbActionIconComponent;
  let fixture: ComponentFixture<BmbActionIconComponent>;
  let componentRef: ComponentRef<BmbActionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
