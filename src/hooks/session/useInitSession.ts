import { ESubjectType, subject } from '@/hooks/rxjs/useInitSubject';
import isEqual from 'lodash/isEqual';
import { useEffect } from 'react';
import useSessionStore from './store';

export default function useInitSession() {
  const { session, setSession, getSession } = useSessionStore();

  useEffect(() => {
    const subscribe = subject.subscribe((event) => {
      const { type, data } = event;
      if (type === ESubjectType.SET_SESSION) {
        if (!isEqual(data, session)) {
          setSession(data);
        }
      }
    });
    return () => subscribe.unsubscribe();
  }, [session, setSession]);

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
