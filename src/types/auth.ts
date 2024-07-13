import { IUser } from './user';

export interface ISignInReq {
  username: string;
  password: string;
}

export interface ISignInRes {
  user: IUser;
  jwt: IJwt;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
  expires: string;
}
