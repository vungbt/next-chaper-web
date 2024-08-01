import { IFetchBase, IItemBase } from './common';
import { IFile } from './file';

export interface ICreateAuthor {
  fullName: string;
  publicId?: string;
  publicAvatarId?: string;
}

export interface IAuthor extends IItemBase {
  fullName: string;
  avatarId?: string;
  avatar?: IFile;
  thumbnailId?: string;
  thumbnail?: IFile;
}

export interface IFindManyAuthor extends IFetchBase {
  q?: string;
}
