import { apiDeleteAuthor, apiGetAllAuthors } from '@/apis/author';

import { ESortOrder, IMetadata, IPaginationInput } from '@/types';
import { IAuthor, IFindManyAuthor } from '@/types/author';
import { useEffect, useState } from 'react';

type AdminAuthorUtilsResult = {
  loading: boolean;
  items: IAuthor[];
  loadingDelete: boolean;
  onDelete: (item: IAuthor) => void;
  sortActives: Record<string, ESortOrder>[];
  metadata?: IMetadata;
  onSort?: (values: Record<string, ESortOrder>[]) => void;
  setSearchValue: (value: string) => void;
  pagination: IPaginationInput;
  setPagination: (value: IPaginationInput) => void;
};

export function AdminAuthorUtils(): AdminAuthorUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [pagination, setPagination] = useState<IPaginationInput>({ page: 1, limit: 30 });
  // sort action
  const [sortActives, setSortActives] = useState<Record<string, ESortOrder>[]>([]);

  useEffect(() => {
    fetchingAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchingAuthors = async (params?: IFindManyAuthor) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetAllAuthors(params);
      setLoading(false);
      if (res?.data) {
        const { data, ...metadata } = res;
        setMetadata(metadata);
        setAuthors(res.data);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onDelete = async (item: IAuthor) => {
    try {
      setLoadingDelete(true);
      await apiDeleteAuthor(item.id);
      setAuthors(authors.filter((authors) => authors.id !== item.id));
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const onSort = (values: Record<string, ESortOrder>[]) => {
    console.log('Sort with====>', values);
    setSortActives(values);
  };

  const setSearchValue = (value: string) => console.log('Value search');

  return {
    loading,
    items: authors,
    loadingDelete,
    onDelete,
    sortActives,
    metadata,
    pagination,
    setPagination,
    onSort,
    setSearchValue
  };
}
