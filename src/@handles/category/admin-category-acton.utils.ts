import { apiCreateCategory } from '@/apis/categories';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { RefObject, useRef, useState } from 'react';

type AdminCategoryActionUtilsResult = {
  onSubmitCategory: (values: any) => void;
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

  return {
    loading,
    formikRef,
    onSubmitCategory
  };
}
