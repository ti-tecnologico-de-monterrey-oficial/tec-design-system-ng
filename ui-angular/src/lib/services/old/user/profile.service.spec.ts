import { BmbUserProfileService } from './profile.service';
import { IBmbUserInfo } from '../../types';

describe('BmbUserProfileService', () => {
  let service: BmbUserProfileService;

  beforeEach(() => {
    service = new BmbUserProfileService();
    service.setUserInfo({ id: '', fullName: '', profilePicture: '' }); // Reset state before each test
  });

  it('debe inicializar con valores vacíos', () => {
    const user = service.getUserInfo();
    expect(user).toEqual({ id: '', fullName: '', profilePicture: '' });
  });

  it('debe actualizar la información del usuario', () => {
    const newUser: IBmbUserInfo = {
      id: 'A01234567',
      fullName: 'Ana Pérez',
      profilePicture: '/assets/ana.jpg',
    };
    service.setUserInfo(newUser);
    const user = service.getUserInfo();
    expect(user).toEqual(newUser);
  });

  it('debe permitir actualizar solo algunos campos', () => {
    service.setUserInfo({ id: 'A01234567', fullName: '', profilePicture: '' });
    const user = service.getUserInfo();
    expect(user.id).toBe('A01234567');
    expect(user.fullName).toBe('');
    expect(user.profilePicture).toBe('');
  });
});
