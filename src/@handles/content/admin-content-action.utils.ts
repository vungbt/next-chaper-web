import { apiGetAllAuthor } from '@/apis/authors';
import { apiCreateContents } from '@/apis/content';
import { toastError } from '@/configs/toast';
import useAuthor from '@/hooks/author/useAuthor';
import { ICreateContent, IOptItem } from '@/types';
import { IAuthor } from '@/types/author';
import { upload } from '@/utils/upload';
import { FormikProps } from 'formik';
import { RefObject, useEffect, useRef, useState } from 'react';

type AdminContentActionResult = {
  loading: boolean;
  formikRef: RefObject<FormikProps<ICreateContent>>;
  onSubmit: (values: ICreateContent) => void;

  // filter author
  loadingAuthor: boolean;
  selectOptions: IOptItem[];
  filterAuthors: (searchValue: string) => void;
};

export default function AdminContentActionUtils(): AdminContentActionResult {
  const [loading, setLoading] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<ICreateContent>>(null);

  // filter author
  const { selectOptions, loading: loadingAuthor, getAuthors } = useAuthor();
  useEffect(() => {
    getAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: ICreateContent) => {
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

      const res = await apiCreateContents({
        name: values.name,
        description: values.description,
        publicId,
        authorId: values?.author?.value,
        pageType: values.pageType,
        status: values.status
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterAuthors = async (searchValue: string) => {
    try {
      if (!searchValue || searchValue.length <= 0) return [];
      const res = await getAuthors({ q: searchValue });
      const authors = res?.data ?? [];
      const options = ((authors ?? []) as IAuthor[]).map((item) => ({
        label: item.fullName,
        value: item.id
      }));
      return options;
    } catch (error) {
      return [];
    }
  };

  return {
    loading,
    formikRef,
    onSubmit,

    // author
    loadingAuthor,
    selectOptions,
    filterAuthors
  };
}
