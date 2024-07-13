import { IFetchBase, IItemBase } from './common';
import { IFile } from './file';

export interface ICreateCategory {
  name: string;
  description?: string;
  publicId?: string;
}

export interface ICategory extends IItemBase {
  slug: string;
  name: string;
  userId: string;
  description?: string;
  thumbnailId?: string;
  thumbnail?: IFile;
}

export interface IFindManyCategory extends IFetchBase {
  q?: string;
}
