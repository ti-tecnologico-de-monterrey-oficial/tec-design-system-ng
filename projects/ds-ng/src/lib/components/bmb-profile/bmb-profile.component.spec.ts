import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProfileComponent } from './bmb-profile.component';
import { ComponentRef } from '@angular/core';
import {
  IBmbCollaboratorProfileData,
  IBmbStudentProfileData,
  IBmbTargetLink,
  IBmbUserData,
} from '../../types';

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
    componentRef.setInput('studentData', {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'A032132',
        email: 'mail@tec.mx',
      },
      period: 'AGO-DIC 24',
      campus: 'Monterrey',
      program: 'ARQ19',
    });
    componentRef.setInput('isMobile', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.idDigitalLink()).toBe('');
    expect(component.campusAcessLink()).toBe('');
    expect(component.tecServicesLink()).toBe('');
    expect(component.targetLinks()).toBe('_blank');
  });

  it('should emit handleCloseSession when closeSession is called', () => {
    spyOn(component.handleCloseSession, 'emit');
    component.closeSession();
    expect(component.handleCloseSession.emit).toHaveBeenCalled();
  });

  it('should set standAloneData input correctly', () => {
    const standAloneData: IBmbUserData = {
      name: 'Paloma Araujo',
      userImg: 'https://picsum.photos/id/64/200/300',
      registration: 'A032132',
      email: 'mail@tec.mx',
    };
    componentRef.setInput('standAloneData', standAloneData);
    fixture.detectChanges();
    expect(component.standAloneData()).toEqual(standAloneData);
  });

  it('should set studentData input correctly', () => {
    const studentData: IBmbStudentProfileData = {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'A032132',
        email: 'mail@tec.mx',
      },
      period: 'AGO-DIC 24',
      campus: 'Monterrey',
      program: 'ARQ19',
    };
    expect(component.studentData()).toEqual(studentData);
  });

  it('should set standAloneData input correctly', () => {
    const collaboratorData: IBmbCollaboratorProfileData = {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'L0123456',
        email: 'mail@tec.mx',
      },
      position: 'Desarrollador de Software',
      area: 'Dirección de Desarrollo-Techvolution 2.0',
      leader: {
        userData: {
          name: 'Arturo González Martínez',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
      generalist: {
        userData: {
          name: 'Ana María Gutiérrez Pineda',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
    };

    componentRef.setInput('collaboratorData', {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'L0123456',
        email: 'mail@tec.mx',
      },
      position: 'Desarrollador de Software',
      area: 'Dirección de Desarrollo-Techvolution 2.0',
      leader: {
        userData: {
          name: 'Arturo González Martínez',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
      generalist: {
        userData: {
          name: 'Ana María Gutiérrez Pineda',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
    });
    fixture.detectChanges();
    expect(component.collaboratorData()).toEqual(collaboratorData);
  });

  it('should set idDigitalLink input correctly', () => {
    componentRef.setInput('idDigitalLink', 'https://www.example.com/');
    fixture.detectChanges();
    expect(component.idDigitalLink()).toEqual('https://www.example.com/');
  });

  it('should set campusAcessLink input correctly', () => {
    componentRef.setInput('campusAcessLink', 'https://www.example.com/');
    fixture.detectChanges();
    expect(component.campusAcessLink()).toEqual('https://www.example.com/');
  });

  it('should set tecServicesLink input correctly', () => {
    componentRef.setInput('tecServicesLink', 'https://www.example.com/');
    fixture.detectChanges();
    expect(component.tecServicesLink()).toEqual('https://www.example.com/');
  });

  it('should set targetLinks input correctly', () => {
    const targetLink: IBmbTargetLink = '_self';
    componentRef.setInput('targetLinks', targetLink);
    fixture.detectChanges();
    expect(component.targetLinks()).toBe(targetLink);
  });

  it('should set tecServicesLink input correctly', () => {
    componentRef.setInput('versionLabel', 'Versión 1.5.10');
    fixture.detectChanges();
    expect(component.versionLabel()).toEqual('Versión 1.5.10');
  });
});
