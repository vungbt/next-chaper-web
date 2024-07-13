import { IResponseBase } from '@/types';
import { ICategory, ICreateCategory, IFindManyCategory } from '@/types/category';
import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  Categories: '/categories'
};

export const apiGetAllCategory = async (params?: IFindManyCategory) => {
  const res = await axiosClient.get<IFindManyCategory, ICategory[]>(apiName.Categories, params);
  if (res.data) return res;
};

export const apiCreateCategory = async (body: ICreateCategory) => {
  const res = await axiosClient.post<ICreateCategory, ICategory>(apiName.Categories, body, {
    authorization: true
  });
  if (res.data) return res?.data;
};
