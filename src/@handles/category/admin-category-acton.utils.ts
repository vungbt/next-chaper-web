import { useEffect, useState, useRef, RefObject, useMemo } from 'react';
import { apiCreateCategory, apiGetCategoryById, apiUpdateCategory } from '@/apis/categories';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { ICategory, ICreateCategory } from '@/types';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { useSearchQuery } from '@/utils/navigation';

type AdminCategoryActionUtilsResult = {
  handleSubmit: (values: ICategory) => Promise<void>;
  category: ICategory | null;
  loading: boolean;
  isDetail: boolean;
  formikRef: any;
};

export type CategoryFormValues = {
  name: string;
  description?: string;
  thumbnail?: UploadItem | null;
};

export function AdminCategoryActionUtils(): AdminCategoryActionUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<ICreateCategory>>(null);

  // detail category
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const id = searchQuery?.id;
  const isDetail = useMemo(() => !!id, [id]);
  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    if (id && id.length > 0) {
      fetchCategoryDetails(id);
    }
  }, [id]);

  const fetchCategoryDetails = async (id: string | undefined) => {
    try {
      if (loading || !id) return;
      setLoading(true);
      const res = await apiGetCategoryById(id);
      setLoading(false);
      if (res) {
        setCategory(res);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (loading) return;
      setLoading(true);

      let publicId = category?.thumbnailId || null;
      const thumbnail = values.thumbnail;

      if (thumbnail && thumbnail.file) {
        const file = thumbnail.file;
        const res = await upload.uploadFile(file);
        publicId = res.public_id;
      }

      if (!publicId) {
        toastError('Upload category failed.');
        setLoading(false);
        return;
      }

      let res;
      if (id) {
        res = await apiUpdateCategory(id, {
          name: values.name,
          publicId,
          description: values.description
        });
        toastSuccess('Update category success');
      } else {
        res = await apiCreateCategory({
          name: values.name,
          publicId,
          description: values.description
        });
        formikRef.current?.resetForm();
        toastSuccess('Create category success');
      }
      setLoading(false);
      if (!res) throw new Error('Operation failed');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    loading,
    isDetail,
    formikRef,
    category,
    handleSubmit
  };
}
