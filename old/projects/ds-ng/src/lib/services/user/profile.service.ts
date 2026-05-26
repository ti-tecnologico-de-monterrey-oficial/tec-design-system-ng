import { Injectable, signal } from '@angular/core';
import { IBmbUserInfo } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class BmbUserProfileService {
  userInfo = signal<IBmbUserInfo>({
    id: '',
    fullName: '',
    profilePicture: '',
  });

  getUserInfo(): IBmbUserInfo {
    return this.userInfo();
  }

  setUserInfo(state: IBmbUserInfo) {
    this.userInfo.set(state);
  }
}
