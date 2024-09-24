import { apiCreateCategory, apiGetCategoryById, apiUpdateCategory } from '@/apis/categories';
import { toastError, toastSuccess } from '@/configs/toast';
import { RouterPath } from '@/constants/router-path';
import { UploadItem } from '@/libraries/common';
import { useRouter, useSearchQuery } from '@/utils/navigation';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { useTranslations } from 'next-intl';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

export type CategoryFormValues = {
  name: string;
  description?: string;
  thumbnail?: UploadItem | null;
};

type AdminCategoryActionUtilsResult = {
  onSubmitCategory: (values: any) => void;
  loading: boolean;
  formikRef: RefObject<FormikProps<CategoryFormValues>>;
};

export function AdminCategoryActionUtils(): AdminCategoryActionUtilsResult {
  const t = useTranslations();
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const router = useRouter();
  const categoryId = useMemo(() => searchQuery?.id, [searchQuery?.id]);
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<CategoryFormValues>>(null);

  useEffect(() => {
    if (categoryId) {
      fetchingCategory(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // get detail & set into form data
  const fetchingCategory = async (id: string) => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await apiGetCategoryById(id);
      const form = formikRef.current;
      if (form) {
        form.setFieldValue('name', res.name);
        form.setFieldValue('description', res.description);
        const thumbnailValue: UploadItem = {
          url: res.thumbnail?.url ?? '',
          id: res.thumbnailId ?? ''
        };
        form.setFieldValue('thumbnail', thumbnailValue);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

      let publicId = thumbnail?.id;
      // in case thumbnail is new upload will push into cloudinary
      if (thumbnail && thumbnail.file) {
        const file = thumbnail.file;
        const res = await upload.uploadFile(file);
        publicId = res.public_id;
      }

      if (!publicId) {
        toastError(t('noti.uploadedError', { label: t('common.thumbnail').toLowerCase() }));
        return setLoading(false);
      }
      let res = null;
      if (categoryId) {
        res = await apiUpdateCategory(categoryId, {
          name: values.name,
          publicId,
          description: values.description
        });
      } else {
        res = await apiCreateCategory({
          name: values.name,
          publicId,
          description: values.description
        });
      }
      setLoading(false);
      if (res) {
        router.push(RouterPath.Categories);
        toastSuccess(
          t(categoryId ? 'noti.updatedSuccess' : 'noti.createdSuccess', {
            label: t('common.category')
          })
        );
        formikRef.current?.resetForm();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    formikRef,
    onSubmitCategory
  };
}
