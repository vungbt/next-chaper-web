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

export const apiUpdateCategory = async (id: string, body: ICreateCategory) => {
  const res = await axiosClient.post<ICreateCategory, ICategory>(
    `${apiName.Categories}/update/${id}`,
    body,
    {
      authorization: true
    }
  );
  if (res.data) return res?.data;
};

export const apiDeleteCategory = async (id: string) => {
  try {
    const res = await axiosClient.delete<string, ICategory>(
      `${apiName.Categories}/${id}`,
      undefined,
      {
        authorization: true
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetCategoryById = async (id: string) => {
  try {
    const res = await axiosClient.get<string, ICategory>(`${apiName.Categories}/${id}`, undefined, {
      authorization: true
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
