import { IFetchBase, IItemBase } from './common';
import { IFile } from './file';

export interface IAuthor extends IItemBase {
  fullName: string;
  avatarId?: string;
  avatar?: IFile;
  thumbnailId?: string;
  thumbnail?: IFile;
}

export interface IAuthorAttributes {
  fullName: string;
  avatarId?: string;
  thumbnailId?: string;
}

export interface ICreateAuthor {
  fullName: string;
  avatarUrlId?: string;
  thumbnailUrlId?: string;
}

export interface IFindManyAuthor {
  q?: string;
}
