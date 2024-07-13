import { ESubjectType, subject } from '@/hooks/rxjs/useInitSubject';
import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import useSessionStore from './store';

export default function useSessionClient() {
  const { session, setSession, getSession } = useSessionStore();

  useEffect(() => {
    const subscribe = subject.subscribe((event: any) => {
      const { type, data } = event;
      if (type === ESubjectType.SET_SESSION) {
        if (!isEqual(data, session)) {
          setSession(data);
        }
      }
    });
    return () => subscribe.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, setSession]);

  return { session, setSession, getSession };
}
