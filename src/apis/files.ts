import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  SignUploadUrl: '/files/sign-upload-url',
  SignUploadUrls: '/files/sign-upload-urls',
  MOVE: '/files/move-file'
};

export const apiSignUploadUrl = async (params: { name: string }) => {
  if (!params.name || params.name.length <= 0) return null;
  const res = await axiosClient.get<{ name: string }, string>(apiName.SignUploadUrl, params);
  if (res.data) return res?.data ?? null;
};

export const apiSignUploadUrls = async (params: { names: string[] }) => {
  if (!params.names || params.names.length <= 0) return [];
  const res = await axiosClient.get<{ names: string[] }, string[]>(apiName.SignUploadUrls, params);
  if (res.data) return res?.data ?? [];
};
