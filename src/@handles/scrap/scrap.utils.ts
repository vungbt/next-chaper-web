import { apiScrapByUrl } from '@/apis/scrap';
import { toastError, toastSuccess } from '@/configs/toast';
import { FormikProps } from 'formik';
import { useTranslations } from 'next-intl';
import { RefObject, useRef, useState } from 'react';

type ScrapUtilsResults = {
  loading: boolean;
  formikRef: RefObject<
    FormikProps<{
      url: string;
      name: string;
    }>
  >;
  previewData: string[];
  isOpenPreview: boolean;
  setIsOpenPreview: (value: boolean) => void;
  onStartScrap: (values: { url: string }) => void;
};

export function ScrapUtils(): ScrapUtilsResults {
  const t = useTranslations();
  const formikRef = useRef<
    FormikProps<{
      url: string;
      name: string;
    }>
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewData, setPreviewDate] = useState<string[]>([]);
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);

  const onStartScrap = async (values: { url: string }) => {
    try {
      if (loading) return;
      setLoading(true);
      const data = await apiScrapByUrl(values.url);
      setLoading(false);
      if (data && data.length > 0) {
        setPreviewDate(data);
        toastSuccess(t('noti.crawlerContentSuccess'));
      }
      formikRef.current?.resetForm();
    } catch (error) {
      setLoading(false);
      toastError(t('noti.crawlerContentFailed'));
    }
  };

  return {
    loading,
    previewData,
    formikRef,
    isOpenPreview,
    setIsOpenPreview,
    onStartScrap
  };
}
