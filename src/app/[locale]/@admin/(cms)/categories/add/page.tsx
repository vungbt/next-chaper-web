'use client';

import React from 'react';
import {
  AdminCategoryActionUtils,
  CategoryFormValues
} from '@/@handles/category/admin-category-acton.utils';
import { Button, InputForm, TextareaForm, Upload, UploadItem } from '@/libraries/common';
import { validationCustoms } from '@/utils/helpers/validation';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { useSearchQuery } from '@/utils/navigation';

export default function AddCategoryPage() {
  const t = useTranslations();
  const { loading, handleSubmit, formikRef, useFetchCategoryDetails } = AdminCategoryActionUtils();
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const id = searchQuery?.id;

  const { initialValues } = useFetchCategoryDetails(id);

  const validationSchema = Yup.object({
    name: Yup.string().required(
      t('validation.required', { label: t('common.name').toLowerCase() })
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
              label={t('common.name')}
              isRequired
              name="name"
              iconRight="arrow-right"
              component={InputForm}
              placeholder={t('placeholder.enter', {
                label: t('common.name').toLowerCase()
              })}
            />
            <Field
              label={t('common.description')}
              name="description"
              component={TextareaForm}
              placeholder={t('placeholder.enter', {
                label: t('common.description').toLowerCase()
              })}
            />
            <Upload
              isRequired={true}
              label="File upload"
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
              label={id ? 'Update Category' : 'Create Category'}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
