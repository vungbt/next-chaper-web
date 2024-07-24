import { apiCreateCategory, apiGetCategoryById, apiUpdateCategory } from '@/apis/categories';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { RefObject, useRef, useState } from 'react';

type AdminCategoryActionUtilsResult = {
  onSubmitCategory: (values: any) => void;
  onUpdateCategory: (id: string, values: any, initialThumbnail: UploadItem) => void;
  fetchingCategory: (id: string) => Promise<any>;
  loading: boolean;
  formikRef: RefObject<
    FormikProps<{
      name: string;
      thumbnail: UploadItem;
      description?: string;
    }>
  >;
};

export function AdminCategoryActionUtils(): AdminCategoryActionUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<
    FormikProps<{
      name: string;
      thumbnail: UploadItem;
      description?: string;
    }>
  >(null);

  const fetchingCategory = async (id: string) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetCategoryById(id);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onSubmitCategory = async (values: {
    name: string;
    thumbnail: UploadItem;
    description?: string;
  }) => {
    try {
      if (loading) return;
      setLoading(true);
      const thumbnail = values?.thumbnail;

      let publicId = null;
      if (thumbnail && thumbnail.file) {
        const file = thumbnail.file;
        const res = await upload.uploadFile(file);
        publicId = res.public_id;
      }
      if (!publicId) {
        toastError('Upload category failed.');
        return setLoading(false);
      }
      const res = await apiCreateCategory({
        name: values.name,
        publicId,
        description: values.description
      });
      formikRef.current?.resetForm();
      setLoading(false);
      if (res) return toastSuccess('Create category success');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onUpdateCategory = async (
    id: string,
    values: {
      name: string;
      thumbnail: UploadItem;
      description?: string;
    },
    initialThumbnail: UploadItem | null
  ): Promise<string | undefined> => {
    try {
      const defaultThumbnail: UploadItem = { id: '', url: '' };
      if (loading) return;
      setLoading(true);

      let publicId = initialThumbnail?.id || null;

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

      const res = await apiUpdateCategory(id, {
        name: values.name,
        publicId,
        description: values.description
      });

      formikRef.current?.resetForm();
      setLoading(false);
      if (res) return toastSuccess('Update category success');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    loading,
    formikRef,
    onSubmitCategory,
    onUpdateCategory,
    fetchingCategory
  };
}
