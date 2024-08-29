export interface IBmbUserInfo {
  id: string;
  fullName: string;
  profilePicture: string;
}

export interface IBmbError {
  codeError: boolean;
  errorMessage: string;
}

export interface IBmbAuthenticateInfo {
  user: string;
  password: string;
}

export interface IBmbLoginOnboarding {
  data: {
    [x: string]: unknown;
  };
  action?: 'auth' | 'toTP' | 'biometric' | 'activate' | 'getUserInfo' | 'init';
  callback: (result: unknown) => void;
}
