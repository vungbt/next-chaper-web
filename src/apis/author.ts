import { IAuthor, ICreateAuthor, IFindManyAuthor } from '@/types/author';
import axiosClient from '@/utils/apis/axios-client';

const apiName = {
  Authors: '/authors'
};
export const apiGetAllAuthors = async (params?: IFindManyAuthor) => {
  const res = await axiosClient.get<IFindManyAuthor, IAuthor[]>(apiName.Authors, params);
  if (res.data) return res;
};

export const apiCreateAuthor = async (body: ICreateAuthor) => {
  const res = await axiosClient.post<ICreateAuthor, IAuthor>(apiName.Authors, body, {
    authorization: true
  });
  if (res.data) return res?.data;
};

export const apiUpdateAuthor = async (id: string, body: ICreateAuthor) => {
  const res = await axiosClient.put<ICreateAuthor, IAuthor>(`${apiName.Authors}/${id}`, body, {
    authorization: true
  });
  if (res.data) return res?.data;
};

export const apiGetAuthorById = async (id: string) => {
  try {
    const res = await axiosClient.get<string, IAuthor>(`${apiName.Authors}/${id}`, undefined, {
      authorization: true
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteAuthor = async (id: string) => {
  try {
    const res = await axiosClient.delete<string, IAuthor>(`${apiName.Authors}/${id}`, undefined, {
      authorization: true
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
