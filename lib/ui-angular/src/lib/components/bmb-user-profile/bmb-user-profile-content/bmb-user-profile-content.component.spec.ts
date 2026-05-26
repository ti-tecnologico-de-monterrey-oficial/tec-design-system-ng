import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbUserProfileContentComponent } from './bmb-user-profile-content.component';
import { ComponentRef } from '@angular/core';

describe('BmbUserProfileContentComponent', () => {
  let component: BmbUserProfileContentComponent;
  let fixture: ComponentFixture<BmbUserProfileContentComponent>;
  let componentRef: ComponentRef<BmbUserProfileContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserProfileContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbUserProfileContentComponent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
    componentRef.setInput('userInfo', {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture: '../assets/images/placeholders/user-icon-test.svg',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
