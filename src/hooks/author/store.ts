import { IOptItem, IResponseBase } from '@/types';
import { IAuthor, IFindManyAuthor } from '@/types/author';
import { create } from 'zustand';

interface AuthorState {
  authors: IAuthor[];
  loading: boolean;
  setAuthors: (authors: IAuthor[]) => void;
  clearProfile: () => void;
  getAuthors: (
    apiClient: (params?: IFindManyAuthor) => Promise<IResponseBase<IAuthor[]> | null>,
    params?: IFindManyAuthor
  ) => Promise<IResponseBase<IAuthor[]> | null>;
}

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  loading: false,
  setAuthors: (authors) => set({ authors }),
  clearProfile: () => set({ authors: [] }),
  getAuthors: async (apiClient, params) => {
    set({ loading: true });
    const res = await apiClient(params);
    set({ loading: false });
    if (res) {
      set({ authors: res.data });
    }
    return res;
  }
}));
