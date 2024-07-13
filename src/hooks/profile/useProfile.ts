import { apiGetMe } from '@/apis/auth';
import { useProfileStore } from './store';

export default function useProfile() {
  const profile = useProfileStore((state) => state.profile);
  const loading = useProfileStore((state) => state.loading);
  const setProfile = useProfileStore((state) => state.setProfile);
  const getProfileFromStore = useProfileStore((state) => state.getProfile);

  const getProfile = async () => {
    const res = await getProfileFromStore(apiGetMe);
    return res;
  };

  return {
    profile,
    loading,
    setProfile,
    getProfile
  };
}
