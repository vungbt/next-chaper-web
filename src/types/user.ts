import { EUserRole, IItemBase } from './common';
import { IFile } from './file';

export interface IUser extends IItemBase {
  username: string;
  avatarId?: string;
  avatar?: IFile;
  role?: EUserRole;
}
