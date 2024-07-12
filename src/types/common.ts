export enum EThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface IResponseBase<T> {
  data: T;
}

export interface IDataResponseError {
  error: string;
  message: string;
  status: number;
  path: string;
}
