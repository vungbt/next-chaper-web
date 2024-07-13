import { apiSignUploadUrl, apiSignUploadUrls } from '@/apis/files';
import { toastError } from '@/configs/toast';
import axios from 'axios';

export type FileCloudinary = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
};

const getUrl = async (name: string) => {
  const res = await apiSignUploadUrl({ name });
  if (res?.length && res?.length > 0) return res;
  return toastError('Get upload url failed.');
};

const getUrls = async (names: string[]) => {
  const res = await apiSignUploadUrls({ names });
  if (res && res.length > 0) return res;
  return toastError('Get upload url failed.');
};

const uploadByUrl = (url: string, formData: FormData) => {
  return axios.post<any, { data: FileCloudinary }>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const uploadFile = async (file: File) => {
  const url = await getUrl(file.name);
  const formData = imgFormData(file);
  const result = await uploadByUrl(url, formData);
  return result?.data;
};

const uploadFiles = async (files: (File | undefined)[]) => {
  if (!files || files.length <= 0) return [];
  const cleanFiles = files.filter((item): item is File => item !== undefined);
  const names = cleanFiles.map((item) => item?.name ?? '');
  const urls = (await getUrls(names)) as string[];

  const results = await Promise.all(
    urls.map((url, index) => {
      const formData = imgFormData(cleanFiles[index]);
      return uploadByUrl(url, formData);
    })
  );
  return results.map((item) => item.data);
};

const imgFormData = (file: File) => {
  const uploadData = new FormData();
  uploadData.append('image', file);
  uploadData.append('file', file, 'file');
  return uploadData;
};

export const upload = {
  getUrl,
  getUrls,
  imgFormData,
  uploadByUrl,
  uploadFile,
  uploadFiles
};
