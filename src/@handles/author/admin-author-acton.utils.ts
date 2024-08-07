import { useEffect, useState, useRef, RefObject, useMemo } from 'react';
import { toastError, toastSuccess } from '@/configs/toast';
import { UploadItem } from '@/libraries/common';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { apiCreateAuthor, apiGetAuthorById, apiUpdateAuthor } from '@/apis/author';
import { useSearchQuery } from '@/utils/navigation';
import { IAuthor } from '@/types/author';

type AdminAuthorActionUtils = {
  handleSubmit: (values: IAuthor) => Promise<void>;
  author: IAuthor | null;
  isDetail: boolean;
  loading: boolean;
  formikRef: any;
};

export type AuthorFormValues = {
  fullName: string;
  avatar: UploadItem;
  thumbnail: UploadItem;
};

export function AdminAuthorActionUtils(): AdminAuthorActionUtils {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<AuthorFormValues>>(null);
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const id = searchQuery?.id;
  const isDetail = useMemo(() => !!id, [id]);
  const [author, setAuthor] = useState<IAuthor | null>(null);

  useEffect(() => {
    if (id && id.length > 0) {
      fetchAuthorDetails(id);
    }
  }, [id]);

  const fetchAuthorDetails = async (id: string | undefined) => {
    try {
      if (loading || !id) return;
      setLoading(true);
      const res = await apiGetAuthorById(id);
      setLoading(false);
      if (res) {
        setAuthor(res);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (loading) return;
      setLoading(true);

      let thumbnailUrlId = author?.thumbnailId || null;
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
      let avatarUrlId = author?.avatarId || null;
      const avatar = values.avatar;

      if (avatar && avatar.file) {
        const file = avatar.file;
        const res = await upload.uploadFile(file);
        avatarUrlId = res.public_id;
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
          thumbnailUrlId,
          avatarUrlId
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

  return {
    loading,
    isDetail,
    author,
    formikRef,
    handleSubmit
  };
}
