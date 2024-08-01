import { IContent, ICreateContent } from '@/types';
import { IFindManyCategory } from '@/types/category';
import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  Contents: '/contents'
};

export const apiGetAllContents = async (params?: IFindManyCategory) => {
  const res = await axiosClient.get<IFindManyCategory, IContent[]>(apiName.Contents, params);
  if (res.data) return res;
};

export const apiCreateContents = async (body: ICreateContent) => {
  const res = await axiosClient.post<ICreateContent, IContent>(apiName.Contents, body, {
    authorization: true
  });
  if (res.data) return res?.data;
};
