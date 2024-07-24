import { useEffect, useState, useRef, RefObject } from 'react';
import { apiCreateCategory, apiGetCategoryById, apiUpdateCategory } from '@/apis/categories';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { ICategory } from '@/types';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';

type AdminCategoryActionUtilsResult = {
  handleSubmit: (
    id: string | null,
    values: CategoryFormValues,
    initialValues: CategoryFormValues,
    actions: any
  ) => Promise<void>;
  useFetchCategoryDetails: (id: string | undefined) => {
    initialValues: CategoryFormValues;
    loading: boolean;
  };
  loading: boolean;
  formikRef: RefObject<FormikProps<CategoryFormValues>>;
};

export type CategoryFormValues = {
  name: string;
  description?: string;
  thumbnail: UploadItem;
};

export function AdminCategoryActionUtils(): AdminCategoryActionUtilsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<CategoryFormValues>>(null);

  const useFetchCategoryDetails = (id: string | undefined) => {
    const [initialValues, setInitialValues] = useState<CategoryFormValues>({
      name: '',
      description: '',
      //@ts-ignore
      thumbnail: null
    });

    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          try {
            setLoading(true);
            const res = await apiGetCategoryById(id);
            setInitialValues({
              name: res.name,
              description: res.description,
              //@ts-ignore
              thumbnail: res.thumbnail
            });
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Failed to fetch category:', error);
          }
        }
      };

      fetchData();
    }, [id]);

    return { initialValues, loading };
  };

  const onSubmitCategory = async (
    id: string | null,
    values: CategoryFormValues,
    initialThumbnail?: UploadItem
  ) => {
    try {
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

  const handleSubmit = async (
    id: string | null,
    values: CategoryFormValues,
    initialValues: CategoryFormValues,
    actions: any
  ) => {
    const formData: CategoryFormValues = { ...values };

    if (!formData.thumbnail.id && initialValues.thumbnail.id) {
      formData.thumbnail = initialValues.thumbnail;
    }

    try {
      await onSubmitCategory(id, formData, initialValues.thumbnail);
      if (!id) {
        actions.resetForm();
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return {
    loading,
    formikRef,
    handleSubmit,
    useFetchCategoryDetails
  };
}
