export interface IBmbLoginOnboarding {
  data: {
    [x: string]: unknown;
  };
  action?: 'auth' | 'toTP' | 'biometric' | 'activate' | 'getUserInfo' | 'init';
  callback: (result: unknown) => void;
}
