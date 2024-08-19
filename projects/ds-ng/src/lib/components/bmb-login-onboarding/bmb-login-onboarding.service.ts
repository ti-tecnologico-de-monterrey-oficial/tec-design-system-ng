import { signal } from '@angular/core';
import { IBmbAuthenticateInfo, IBmbUserInfo } from './types';

export class BmbLoginOnboardingService {
  isLoading = signal<boolean>(false);
  activePage = signal<number>(0);
  activeStep = signal<number>(0);
  totalSteps = signal<number>(0);
  correctCode = signal<string>('');
  userInfo = signal<IBmbUserInfo>({
    id: '',
    fullName: '',
    profilePicture: '',
  });
  authenticateInfo = signal<IBmbAuthenticateInfo>({
    user: '',
    password: '',
  });

  getIsLoading(): boolean {
    return this.isLoading();
  }

  setIsLoading(state: boolean): void {
    this.isLoading.set(state);
  }

  setActivePage(state: number): void {
    this.activePage.set(state);
  }

  getActivePage(): number {
    return this.activePage();
  }

  setActiveStep(state: number): void {
    this.activeStep.set(state);
  }

  getActiveStep(): number {
    return this.activeStep();
  }

  getTotalSteps(): number {
    return this.totalSteps();
  }

  setTotalSteps(state: number): void {
    this.totalSteps.set(state);
  }

  getCorrectCode() {
    return this.correctCode();
  }

  setCorrectCode(state: string) {
    this.correctCode.set(state);
  }

  getUserInfo(): IBmbUserInfo {
    return this.userInfo();
  }

  setUserInfo(state: IBmbUserInfo) {
    this.userInfo.set(state);
  }

  getAuthenticateInfo() {
    return this.authenticateInfo();
  }

  setAuthenticateInfo(state: IBmbAuthenticateInfo) {
    this.authenticateInfo.set(state);
  }
}
