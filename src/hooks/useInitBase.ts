import useInitSubject from './rxjs/useInitSubject';
import useInitSession from './session/useInitSession';

export default function useInitBase() {
  useInitSubject();
  useInitSession();
}
