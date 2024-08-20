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

export interface IBmbLoginOnbording {
  data: {
    [x: string]: unknown;
  };
  activeStep: number;
  callback: (result: unknown) => void;
}
