import { apiGetAllAuthor } from '@/apis/authors';
import { IFindManyAuthor } from '@/types/author';
import { useAuthorStore } from './store';

export default function useAuthor() {
  const authors = useAuthorStore((state) => state.authors);
  const loading = useAuthorStore((state) => state.loading);
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const getAuthorFromStore = useAuthorStore((state) => state.getAuthors);

  const getAuthors = async (params?: IFindManyAuthor) => {
    const res = await getAuthorFromStore(apiGetAllAuthor, params);
    return res;
  };

  return {
    authors,
    selectOptions: authors.map((item) => ({
      label: item.fullName,
      value: item.id
    })),
    loading,
    setAuthors,
    getAuthors
  };
}
