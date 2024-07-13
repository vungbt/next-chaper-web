import { apiSignIn } from '@/apis/auth';
import { EUserRole, IUser } from '@/types';
import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { notFound } from 'next/navigation';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // eslint-disable-next-line no-useless-catch
        try {
          const result = await apiSignIn({
            username: credentials?.username ?? '',
            password: credentials?.password ?? ''
          });
          const jwt = result?.jwt;
          const userProfile = result?.user;
          if (!jwt || !userProfile) throw notFound();
          const user: User = {
            accessToken: jwt?.accessToken,
            refreshToken: jwt?.refreshToken,
            expires: jwt?.expires,
            id: userProfile?.id ?? '',
            profile: userProfile as IUser
          };
          return user;
        } catch (error) {
          throw error;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      let newToken = token as JWT;
      if (!newToken.accessToken && user) {
        newToken = user;
      }
      if (
        newToken?.expires &&
        new Date(newToken.expires).getTime() <= new Date().getTime() + 60000
      ) {
        // return refreshToken({
        //   refreshToken: String(newToken?.refreshToken || '')
        // }).then((result) => {
        //   if (result.error) {
        //     return signOut();
        //   }
        //   return { ...newToken, ...result };
        // });
      }
      return newToken;
    },
    async session({ session, token }: any) {
      session.token = {
        accessToken: token?.accessToken,
        expires: token?.expires,
        refreshToken: token?.refreshToken
      };
      session.expires = token?.expires;
      session.userRole = token?.profile?.role ?? EUserRole.Customer;
      session.email = token?.profile?.email ?? '';
      delete session.profile;
      return session;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  pages: {
    signIn: '/auth/sign-in'
  }
};
