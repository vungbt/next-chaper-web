'use client';
import { ScrapUtils } from '@/@handles/scrap/scrap.utils';
import ModalScrapPreview from '@/@views/scrap/modal-preview';
import { Button, InputForm, Steps, TextareaForm } from '@/libraries/common';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';

export default function ScrapPage() {
  const t = useTranslations();
  const { loading, onStartScrap, formikRef, previewData, isOpenPreview, setIsOpenPreview } =
    ScrapUtils();

  const initialValues: any = {
    url: '',
    name: ''
  };

  const validationSchema: any = Yup.object({
    url: Yup.string()
      .required(t('validation.required', { label: t('common.link').toLowerCase() }))
      .url(t('validation.valid', { label: t('common.link').toLowerCase() }))
      .min(30)
      .max(300)
      .trim(),
    name: Yup.string()
      .required(t('validation.required', { label: t('common.name').toLowerCase() }))
      .trim()
  });

  return (
    <div>
      <Steps
        className="mb-10"
        steps={2}
        active={0}
        // onChangeStep={(stepActive) => actions.changeStep(stepActive)}
      />
      <Formik<{ url: string; name: string }>
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onStartScrap}
      >
        {() => {
          return (
            <Form className="flex flex-col gap-6">
              <div className="md:w-1/2">
                <Field
                  label={t('common.name')}
                  isRequired
                  name="name"
                  component={InputForm}
                  placeholder={t('placeholder.enter', {
                    label: t('common.name').toLowerCase()
                  })}
                />
              </div>
              <div className="lg:w-3/4 xl:w-1/2">
                <Field
                  label={t('common.linkToScrap')}
                  isRequired
                  name="url"
                  component={TextareaForm}
                  placeholder={t('placeholder.enter', {
                    label: t('common.link').toLowerCase()
                  })}
                />
              </div>

              <div className="flex items-center justify-start gap-3">
                <Button isLoading={loading} label={t('common.startScrap')} type="submit" />
                <Button
                  styleType="tertiary"
                  buttonType="outline"
                  disabled={loading || previewData.length <= 0}
                  label={t('common.preview')}
                  type="button"
                  onClick={() => setIsOpenPreview(true)}
                />
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* preview */}
      <ModalScrapPreview
        isOpen={isOpenPreview}
        images={previewData}
        onClose={() => setIsOpenPreview(false)}
      />
    </div>
  );
}
