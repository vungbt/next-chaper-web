import { useEffect, useState, useRef, RefObject } from 'react';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { apiCreateAuthor, apiGetAuthorById, apiUpdateAuthor } from '@/apis/author';

type AdminAuthorActionUtils = {
  handleSubmit: (
    id: string | null,
    values: AuthorFormValues,
    initialValues: AuthorFormValues,
    actions: any
  ) => Promise<void>;
  useFetchAuthorDetails: (id: string | undefined) => {
    initialValues: AuthorFormValues;
    loading: boolean;
  };
  loading: boolean;
  formikRef: RefObject<FormikProps<AuthorFormValues>>;
};

export type AuthorFormValues = {
  fullName: string;
  avatar: UploadItem;
  thumbnail: UploadItem;
};

export function AdminAuthorActionUtils(): AdminAuthorActionUtils {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<AuthorFormValues>>(null);

  const useFetchAuthorDetails = (id: string | undefined) => {
    const [initialValues, setInitialValues] = useState<AuthorFormValues>({
      fullName: '',
      //@ts-ignore
      avatar: null,
      //@ts-ignore
      thumbnail: null
    });

    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          try {
            setLoading(true);
            const res = await apiGetAuthorById(id);
            setInitialValues({
              fullName: res.fullName,
              //@ts-ignore
              avatar: res.avatar,
              //@ts-ignore
              thumbnail: res.thumbnail
            });
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Failed to fetch author:', error);
          }
        }
      };

      fetchData();
    }, [id]);

    return { initialValues, loading };
  };

  const onSubmitAuthor = async (
    id: string | null,
    values: AuthorFormValues,
    initialAvatar?: UploadItem,
    initialThumbnail?: UploadItem
  ) => {
    try {
      if (loading) return;
      setLoading(true);

      let avatarUrlId = initialAvatar?.id || null;
      const avatar = values.avatar;
      if (avatar && avatar.file) {
        const file = avatar.file;
        const res1 = await upload.uploadFile(file);
        avatarUrlId = res1.public_id;
      }

      let thumbnailUrlId = initialThumbnail?.id || null;
      const thumbnail = values.thumbnail;
      if (thumbnail && thumbnail.file) {
        const file = thumbnail.file;
        const res = await upload.uploadFile(file);
        thumbnailUrlId = res.public_id;
      }

      if (!thumbnailUrlId) {
        toastError('Upload author failed.');
        setLoading(false);
        return;
      }
      if (!avatarUrlId) {
        toastError('Upload author failed.');
        setLoading(false);
        return;
      }

      let res;
      if (id) {
        res = await apiUpdateAuthor(id, {
          fullName: values.fullName,
          avatarUrlId,
          thumbnailUrlId
        });
        toastSuccess('Update author success');
      } else {
        res = await apiCreateAuthor({
          fullName: values.fullName,
          thumbnailUrlId,
          avatarUrlId
        });

        formikRef.current?.resetForm();
        toastSuccess('Create author success');
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
    values: AuthorFormValues,
    initialValues: AuthorFormValues,
    actions: any
  ) => {
    const formData: AuthorFormValues = { ...values };

    if (!formData.thumbnail.id && initialValues.thumbnail.id) {
      formData.thumbnail = initialValues.thumbnail;
    }
    if (!formData.avatar.id && initialValues.avatar.id) {
      formData.avatar = initialValues.avatar;
    }
    try {
      await onSubmitAuthor(id, formData, initialValues.thumbnail, initialValues.avatar);
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
    useFetchAuthorDetails
  };
}
