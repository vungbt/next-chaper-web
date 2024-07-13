'use client';
import { AdminCategoryActionUtils } from '@/@handles/category/admin-category-acton.utils';
import { Button, InputForm, Upload } from '@/libraries/common';
import { validationCustoms } from '@/utils/helpers/validation';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';

export default function AddCategoryPage() {
  const t = useTranslations();
  const { formikRef, loading, onSubmitCategory } = AdminCategoryActionUtils();

  const initialValues: any = {
    name: '',
    thumbnail: null
  };

  const validationSchema: any = Yup.object({
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
        onSubmit={onSubmitCategory}
      >
        {({ setFieldValue, values, errors, touched, setErrors }) => {
          return (
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

              {/* Upload Single */}
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

              <Button isLoading={loading} label="Create Category" type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
