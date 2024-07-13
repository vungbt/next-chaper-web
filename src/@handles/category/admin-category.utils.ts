import { apiGetAllCategory } from '@/apis/categories';
import { ESortOrder, ICategory, IFindManyCategory } from '@/types';
import { useEffect, useState } from 'react';

type AdminCategoryUtilsResult = {
  loading: boolean;
  items: ICategory[];
  loadingDelete: boolean;
  onDelete: (item: ICategory) => void;
  sortActives: Record<string, ESortOrder>[];
  onSort?: (values: Record<string, ESortOrder>[]) => void;
};
export function AdminCategoryUtils(): AdminCategoryUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingDelete] = useState<boolean>(false);
  // sort action
  const [sortActives, setSortActives] = useState<Record<string, ESortOrder>[]>([]);

  useEffect(() => {
    fetchingCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchingCategories = async (params?: IFindManyCategory) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetAllCategory(params);
      setLoading(false);
      if (res?.data) {
        setCategories(res.data);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onDelete = (item: ICategory) => console.log('Delete item====>', item);

  const onSort = (values: Record<string, ESortOrder>[]) => {
    console.log('Sort with====>', values);
    setSortActives(values);
  };

  return {
    loading,
    items: categories,
    loadingDelete,
    onDelete,
    sortActives,
    onSort
  };
}
