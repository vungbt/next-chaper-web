import { ReactNode } from 'react';

export enum EThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface IResponseBase<T> {
  data: T;

  totalPages?: number;
  count?: number;
  page?: number;
  pageSize?: number;
}

export interface IDataResponseError {
  error: string;
  message: string;
  status: number;
  path: string;
}

export interface IItemBase {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IFetchBase {
  page?: number;
  pageSize?: number;
}

export enum EUserRole {
  Admin = 'admin',
  Customer = 'customer'
}

export interface IOptItem {
  value: string;
  label: string | ReactNode;
}

export enum ESortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface IPaginationInput {
  limit?: number;
  page: number;
  totalPages?: number;
  count?: number;
}
