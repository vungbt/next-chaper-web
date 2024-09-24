import { apiDeleteCategory, apiGetAllCategory, apiGetCategoryById } from '@/apis/categories';
import { ESortOrder, ICategory, IFindManyCategory, IMetadata, IPaginationInput } from '@/types';
import { useEffect, useState } from 'react';

type AdminCategoryUtilsResult = {
  loading: boolean;
  items: ICategory[];
  loadingDelete: boolean;
  onDelete: (item: ICategory) => void;
  sortActives: Record<string, ESortOrder>[];
  metadata?: IMetadata;
  onSort?: (values: Record<string, ESortOrder>[]) => void;
  setSearchValue: (value: string) => void;
  pagination: IPaginationInput;
  setPagination: (value: IPaginationInput) => void;
};

export function AdminCategoryUtils(): AdminCategoryUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IMetadata>();
  const [pagination, setPagination] = useState<IPaginationInput>({ page: 1, limit: 30 });
  // sort action
  const [sortActives, setSortActives] = useState<Record<string, ESortOrder>[]>([]);

  useEffect(() => {
    fetchingCategories({ orders: sortActives });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortActives]);

  const fetchingCategories = async (params?: IFindManyCategory) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetAllCategory(params);
      setLoading(false);
      if (res?.data) {
        const { data, ...metadata } = res;
        setMetadata(metadata);
        setCategories(res.data);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onDelete = async (item: ICategory) => {
    try {
      setLoadingDelete(true);
      await apiDeleteCategory(item.id);
      setCategories(categories.filter((category) => category.id !== item.id));
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const onSort = (values: Record<string, ESortOrder>[]) => {
    setSortActives(values);
  };

  const setSearchValue = (value: string) => console.log('Value search');

  return {
    loading,
    items: categories,
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
