import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import localStorageHelper, { EKeyStorage } from './helpers/local-storage';

export const getSession = async () => {
  try {
    const session = localStorageHelper.getObject(EKeyStorage.SESSION, null);
    if (session) {
      // if (moment(session?.expires) > moment().add(1, 'minute')) {
      //   const result = await refreshToken();
      //   if (result) {
      //     const newSession: Session = merge(session, result);
      //     setSession(newSession);
      //     return newSession;
      //   }
      // }
      console.log('session====>', session);
      return session as Session;
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
  // setSession(null);
  return null;
};

export const getSessionSS = async () => {
  const sessionSS = await getServerSession(authOptions);
  let newData: Session | null = null;
  if (sessionSS?.token) {
    newData = { ...sessionSS };
  }
  return newData;
};
