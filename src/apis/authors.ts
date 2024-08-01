import { IAuthor, IFindManyAuthor } from '@/types/author';
import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  Author: '/authors'
};

export const apiGetAllAuthor = async (params?: IFindManyAuthor) => {
  const res = await axiosClient.get<IFindManyAuthor, IAuthor[]>(apiName.Author, params);
  if (res.data) return res;
  return null;
};
