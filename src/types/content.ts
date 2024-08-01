import { UploadItem } from '@/libraries/common';
import { ICategory } from './category';
import { EContentStatus, EContentType, IFetchBase, IItemBase } from './common';
import { IFile } from './file';
import { IUser } from './user';

export interface ICreateContent {
  name: string;
  description?: string;
  thumbnail?: UploadItem | null;
  publicId?: string;
  authorId?: string;
  author?: {
    label: string;
    value: string;
  } | null;
  pageType?: EContentType;
  status?: EContentStatus;
}

export interface IContent extends IItemBase {
  slug: string;
  name: string;
  categories: ICategory[];
  userId: string;
  user?: IUser;
  description?: string;
  thumbnailId?: string;
  thumbnail?: IFile;
}

export interface IFindManyContent extends IFetchBase {
  q?: string;
}
