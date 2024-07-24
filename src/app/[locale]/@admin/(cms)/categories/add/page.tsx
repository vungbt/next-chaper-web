'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AdminCategoryActionUtils } from '@/@handles/category/admin-category-acton.utils';
import { Button, InputForm, TextareaForm, Upload, UploadItem } from '@/libraries/common';
import { validationCustoms } from '@/utils/helpers/validation';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { useSearchQuery } from '@/utils/navigation';

type CategoryFormValues = {
  name: string;
  description?: string;
  thumbnail: UploadItem;
};

export default function CategoryPage() {
  const t = useTranslations();
  const { loading, onSubmitCategory, fetchingCategory, onUpdateCategory } =
    AdminCategoryActionUtils();
  const { searchQuery } = useSearchQuery<{ id: string }>();
  const id = searchQuery?.id;
  console.log(id);

  const defaultThumbnail: UploadItem = { id: '', url: '' };

  const [initialValues, setInitialValues] = useState<CategoryFormValues>({
    name: '',
    description: '',
    thumbnail: defaultThumbnail
  });

  const formikRef = useRef<FormikProps<CategoryFormValues>>(null);

  const stableFetchingCategory = useCallback(fetchingCategory, []);

  useEffect(() => {
    if (id) {
      stableFetchingCategory(id)
        .then((category) => {
          setInitialValues({
            name: category.name,
            description: category.description,
            thumbnail: category.thumbnail
          });
        })
        .catch((error) => {
          console.error('Failed to fetch category:', error);
        });
    }
  }, [id, stableFetchingCategory]);

  const validationSchema = Yup.object({
    name: Yup.string().required(
      t('validation.required', { label: t('common.name').toLowerCase() })
    ),
    thumbnail: validationCustoms.upload(t, t('common.thumbnail'))
  });

  const handleSubmit = async (values: CategoryFormValues, actions: any) => {
    const formData: CategoryFormValues = { ...values };

    if (!formData.thumbnail.id && initialValues.thumbnail.id) {
      formData.thumbnail = initialValues.thumbnail;
    }

    try {
      if (id) {
        await onUpdateCategory(id, formData, initialValues.thumbnail);
      } else {
        await onSubmitCategory(formData);
        actions.resetForm();
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div className="w-[60%] mx-auto">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
