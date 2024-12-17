import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbUserProfileComponent } from './bmb-user-profile.component';
import { ComponentRef } from '@angular/core';

describe('BmbUserProfileComponent', () => {
  let component: BmbUserProfileComponent;
  let fixture: ComponentFixture<BmbUserProfileComponent>;
  let componentRef: ComponentRef<BmbUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbUserProfileComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('userInfo', {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture: '../assets/images/placeholders/user-icon-test.svg',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
