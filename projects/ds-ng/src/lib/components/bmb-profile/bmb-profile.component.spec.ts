import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProfileComponent } from './bmb-profile.component';
import { ComponentRef } from '@angular/core';
import { IBmbProfileData, IBmbTargetLink } from '../../types';

describe('BmbProfileComponent', () => {
  let component: BmbProfileComponent;
  let fixture: ComponentFixture<BmbProfileComponent>;
  let componentRef: ComponentRef<BmbProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbProfileComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('userData', {
      name: 'Profile',
      userImg: 'test.jpg',
      matricula: '123456',
      mail: 'test@test.com',
      period: '2021-1',
      campus: 'Campus',
      program: 'Program',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.campusAcessLink()).toBe('');
    expect(component.idDigitalLink()).toBe('');
    expect(component.targetLinks()).toBe('_blank');
  });

  it('should emit handleCloseSession when closeSession is called', () => {
    spyOn(component.handleCloseSession, 'emit');
    component.closeSession();
    expect(component.handleCloseSession.emit).toHaveBeenCalled();
  });

  it('should set userData input correctly', () => {
    const userData: IBmbProfileData = {
      name: 'Test User',
      userImg: 'test.jpg',
      matricula: '654321',
      mail: 'user@test.com',
      period: '2022-1',
      campus: 'Test Campus',
      program: 'Test Program',
    };
    componentRef.setInput('userData', userData);
    fixture.detectChanges();
    expect(component.userData()).toEqual(userData);
  });

  it('should set campusAcessLink input correctly', () => {
    componentRef.setInput('campusAcessLink', 'https://www.youtube.com/');
    fixture.detectChanges();
    expect(component.campusAcessLink()).toEqual('https://www.youtube.com/');
  });

  it('should set idDigitalLink input correctly', () => {
    componentRef.setInput('idDigitalLink', 'https://www.youtube.com/');
    fixture.detectChanges();
    expect(component.idDigitalLink()).toEqual('https://www.youtube.com/');
  });

  it('should set targetLinks input correctly', () => {
    const targetLink: IBmbTargetLink = '_self';
    componentRef.setInput('targetLinks', targetLink);
    fixture.detectChanges();
    expect(component.targetLinks()).toBe(targetLink);
  });
});
