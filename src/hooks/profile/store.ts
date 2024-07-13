import { IUser } from '@/types';
import { create } from 'zustand';

interface ProfileState {
  profile?: IUser | null;
  loading: boolean;
  setProfile: (profile: IUser) => void;
  clearProfile: () => void;
  getProfile: (apiClient: () => Promise<IUser | undefined>) => Promise<IUser | null>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  setProfile: (profile) => set({ profile }),
  getProfile: async (apiGetMe: () => Promise<IUser | undefined>) => {
    set({ loading: true });
    const res = await apiGetMe();
    if (res) {
      set({ profile: res as IUser, loading: false });
      return res as IUser;
    }
    set({ loading: false });
    return null;
  },
  clearProfile: () => set({ profile: null })
}));
