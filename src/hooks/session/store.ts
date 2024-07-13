import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from 'next-auth';
import localStorageHelper, { EKeyStorage } from '@/utils/helpers/local-storage';
import { getSession as getSessionNextAuth } from 'next-auth/react';
import isEqual from 'lodash/isEqual';

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
  getSession: () => Promise<Session | null>;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: localStorageHelper.getObject(EKeyStorage.SESSION, null),
      setSession: (session: Session | null) => {
        localStorageHelper.setObject(EKeyStorage.SESSION, session);
        set({ session });
      },
      getSession: async () => {
        const sessionSS = await getSessionNextAuth();
        let newData: Session | null = null;
        if (sessionSS?.token) {
          newData = { ...sessionSS };
        }
        if (!isEqual(get().session, newData)) {
          get().setSession(newData);
        }
        return newData;
      }
    }),
    {
      name: 'session-storage', // name of the item in the storage (must be unique)
      getStorage: () => localStorage // (optional) by default, 'localStorage' is used
    }
  )
);

export default useSessionStore;
