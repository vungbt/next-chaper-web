import { IResponseBase } from '@/types';
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import { format } from 'date-fns';
import queryString from 'query-string';

const getLabelLogRequest = (config: InternalAxiosRequestConfig) => {
  const method = config?.method?.toUpperCase();
  const url = config.url;
  return `${format(new Date(), 'HH:mm:ss:SSS')} <<< ${
    config['timeoutErrorMessage']
  } ${method} ${url}`;
};

export const instance = axios.create({
  baseURL: process.env.RESTFUL_API_URL,
  timeout: 10000,
  paramsSerializer: (params: Record<string, any>) => queryString.stringify(params)
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    if (process.env.NODE_ENV !== 'production') {
      config['timeoutErrorMessage'] = format(new Date(), 'HH:mm:ss:SSS');
    }
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    if (!error.response) {
      if (process.browser) {
        console.log('Alert here====>', process.browser);
      }
      return { message: error.message, error: error.message };
    }
    return error.response.data;
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse<any, any>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (process.env.NODE_ENV !== 'production') {
      const labelLog = getLabelLogRequest(response.config);
      console.groupCollapsed(labelLog);
      Object.keys(response.config.params || {}).length &&
        response.config.data &&
        console.log('data', response.config.data);
      console.groupEnd();
    }
    return response.data;
  },
  function (error: AxiosError<any>) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const response = error?.response;
    // alert.error(response?.data?.message || error.message);
    if (response?.status) {
      return { error: error, message: error.message, ...response?.data };
    }
    return { message: error.message, error: error.message };
  }
);

export type HeaderConf = {
  authorization?: boolean;
  locale?: string;
} & Record<string, unknown>;

export type Res<T = any> = T & {
  error?: string;
  message?: string;
};

export type ListParams<T = any> = T & {
  limit?: number;
  page?: number;
};

export type ListRes<T = any> = Res<{
  items: T[];
  total: number;
}>;

export const getAccessToken = async () => {
  // const session = await getSession();
  // if (session) {
  //   return session?.accessToken;
  // }
  return null;
};

export const getHeader = async (headerConf: HeaderConf = {}) => {
  const { authorization, locale, ...reset } = headerConf;
  const headers = { ...reset };
  if (authorization) {
    headers['Authorization'] = await getAccessToken();
  }
  if (locale) {
    headers['Accept-Language'] = locale;
  } else {
    // if (isBrowser()) {
    //   headers['Accept-Language'] = localStorageHelper.getObject(KeyStorage.LOCALE)?.key;
    // }
  }
  return headers as AxiosRequestHeaders;
};

const axiosClient = {
  async get<ReqType, ResType>(
    url: string,
    params?: ReqType,
    headerConf?: HeaderConf
  ): Promise<IResponseBase<ResType>> {
    const headers = await getHeader(headerConf);
    return instance.get<ReqType, IResponseBase<ResType>>(url, { params, headers });
  },
  async post<ReqType, ResType>(
    url: string,
    data: ReqType,
    headerConf?: HeaderConf
  ): Promise<IResponseBase<ResType>> {
    const headers = await getHeader(headerConf);
    return instance.post<ReqType, IResponseBase<ResType>>(url, data, { headers });
  },
  async put<ReqType, ResType>(
    url: string,
    data: ReqType,
    headerConf?: HeaderConf
  ): Promise<IResponseBase<ResType>> {
    const headers = await getHeader(headerConf);
    return instance.put<ReqType, IResponseBase<ResType>>(url, data, { headers });
  },
  async delete<ReqType, ResType>(
    url: string,
    data?: ReqType,
    headerConf?: HeaderConf
  ): Promise<IResponseBase<ResType>> {
    const headers = await getHeader(headerConf);
    return instance.delete<ReqType, IResponseBase<ResType>>(url, { data, headers: { ...headers } });
  }
};

export default axiosClient;
