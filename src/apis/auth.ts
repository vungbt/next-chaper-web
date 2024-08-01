import { IUser } from '@/types';
import { ISignInReq, ISignInRes } from '@/types/auth';
import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  Me: '/auth/me',
  SignIn: '/auth/sign-in',
  SignUp: '/auth/sign-up'
};

export const apiGetMe = async () => {
  const res = await axiosClient.get<{}, IUser>(apiName.Me, undefined, { authorization: true });
  if (res.data) return res.data ?? null;
};

export const apiSignIn = async (body: ISignInReq) => {
  const res = await axiosClient.post<ISignInReq, ISignInRes>(apiName.SignIn, body);
  if (res.data) return res.data ?? null;
};
