import { EUserRole, IUser } from '@/types';

export interface Token {
  accessToken: string;
  refreshToken: string;
  expires: string;
}

declare module 'next-auth/jwt' {
  interface JWT extends Token {}
}

declare module 'next-auth' {
  interface Session {
    token?: Token;
    expires: string;
    role?: EUserRole;
    username?: string;
  }

  interface User extends Token {
    id: string;
    profile?: IUser;
  }
}
