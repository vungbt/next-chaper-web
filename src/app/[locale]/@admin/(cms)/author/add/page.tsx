'use client';

import React from 'react';

import { Button, InputForm, TextareaForm, Upload, UploadItem } from '@/libraries/common';
import { validationCustoms } from '@/utils/helpers/validation';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { useSearchQuery } from '@/utils/navigation';
import { AdminAuthorActionUtils } from '@/@handles/author/admin-author-acton.utils';

export default function AddAuthorPage() {
  const t = useTranslations();
  const { loading, formikRef, useFetchAuthorDetails, handleSubmit } = AdminAuthorActionUtils();
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const id = searchQuery?.id;

  const { initialValues } = useFetchAuthorDetails(id);

  const validationSchema = Yup.object({
    fullName: Yup.string().required(
      t('validation.required', { label: t('common.fullName').toLowerCase() })
    ),
    thumbnail: validationCustoms.upload(t, t('common.thumbnail'))
  });

  return (
    <div className="w-[60%] mx-auto">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        loading={loading}
        //@ts-ignore
        onSubmit={(values, actions) => handleSubmit(id, values, initialValues, actions)}
        enableReinitialize
      >
        {({ setFieldValue, values, errors, touched, setErrors }) => (
          <Form className="flex flex-col gap-6">
            <Field
              label={t('common.fullName')}
              isRequired
              name="fullName"
              iconRight="arrow-right"
              component={InputForm}
              placeholder={t('placeholder.enter', {
                label: t('common.fullName').toLowerCase()
              })}
            />
            <Upload
              isRequired={true}
              label="Upload avatar"
              name="avatar"
              isTouched={touched.avatar !== undefined}
              value={values?.avatar}
              placeholder="Drop or Drag a photo"
              subPlaceholder="Supported png, jpeg, jpg, webp, gif"
              onChange={(value) => {
                setFieldValue('avatar', value);
              }}
              error={errors?.avatar as string}
              setError={(mess) => setErrors(mess)}
            />
            <Upload
              isRequired={true}
              label="Upload thumbnail"
              name="thumbnail"
              isTouched={touched.thumbnail !== undefined}
              value={values?.thumbnail}
              placeholder="Drop or Drag a photo"
              subPlaceholder="Supported png, jpeg, jpg, webp, gif"
              onChange={(value) => {
                setFieldValue('thumbnail', value);
              }}
              error={errors?.thumbnail as string}
              setError={(mess) => setErrors(mess)}
            />

            <Button
              isLoading={loading}
              label={id ? 'Update Author' : 'Create Author'}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
