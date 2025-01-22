import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbNavigationIconComponent } from './bmb-navigation-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbNavigationIconComponent', () => {
  let component: BmbNavigationIconComponent;
  let fixture: ComponentFixture<BmbNavigationIconComponent>;
  let componentRef: ComponentRef<BmbNavigationIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNavigationIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNavigationIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
