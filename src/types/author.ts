import { IFetchBase, IItemBase } from './common';

export interface IAuthor extends IItemBase {
  fullName: string;
  avatarId?: string;
  thumbnailId?: string;
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
