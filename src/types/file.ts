import { IItemBase } from './common';

export enum EProvider {
  S3 = 's3',
  Cloudinary = 'cloudinary',
  System = 'system'
}

export interface IFile extends IItemBase {
  url?: string;
  storageId: string;
  provider?: EProvider;
  metadata?: any;
}
