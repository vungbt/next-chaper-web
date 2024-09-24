'use client';
import {
  Button,
  InputForm,
  InputSearch,
  Upload,
  UploadItem,
  UploadMultiple
} from '@/libraries/common';
import { validationCustoms } from '@/utils/helpers/validation';
import { upload } from '@/utils/upload';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import * as Yup from 'yup';

export default function TestPage() {
  const t = useTranslations();

  const initialValues: any = {
    inputName: '',
    searchInput: '',
    thumbnails: [],
    thumbnail: null
  };

  const validationSchema: any = Yup.object({
    inputName: Yup.string().required(
      t('validation.required', { label: t('common.title').toLowerCase() })
    ),
    searchInput: Yup.string().required('Search input must be required.'),
    thumbnails: validationCustoms.uploadMultiple(t, t('common.thumbnails'), { max: 5, min: 1 }),
    thumbnail: validationCustoms.upload(t, t('common.thumbnail'))
  });

  const onSubmit = async (values: {
    inputName: string;
    searchInput: string;
    thumbnails: UploadItem[];
    thumbnail: UploadItem;
  }) => {
    const thumbnails = values?.thumbnails ?? [];
    const thumbnail = values?.thumbnail ?? [];

    if (thumbnails && thumbnails.length > 0) {
      const files = thumbnails.map((item) => item.file);
      const res = await upload.uploadFiles(files);
    }
    if (thumbnail && thumbnail.file) {
      const file = thumbnail.file;
      const res = await upload.uploadFile(file);
    }
  };

  return (
    <div>
      <div className="p-6 rounded-2xl mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors, touched, setErrors }) => {
            return (
              <Form className="flex flex-col gap-6">
                <Field
                  label={t('common.title')}
                  isRequired
                  name="inputName"
                  iconRight="arrow-right"
                  component={InputForm}
                  placeholder={t('placeholder.enter', {
                    label: t('common.title').toLowerCase()
                  })}
                />
                <Field
                  label="Search input"
                  isRequired
                  name="searchInput"
                  iconRight="arrow-right"
                  component={InputSearch}
                  placeholder="Enter search input"
                />

                {/* Upload Multiple */}
                <UploadMultiple
                  label="Upload multiple"
                  name="thumbnails"
                  isTouched={touched.thumbnails !== undefined}
                  values={values?.thumbnails}
                  placeholder="Drop or Drag photos"
                  subPlaceholder={t('common.supported', { type: 'png, jpeg, jpg, webp, gif' })}
                  onChange={(value) => {
                    setFieldValue('thumbnails', value);
                  }}
                  error={errors?.thumbnails as string}
                  setError={(mess) => setErrors(mess)}
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

                <Button label="Submit" type="submit" />
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="flex items-center flex-wrap flex-col gap-4">
        <Button
          buttonType="default"
          styleType="default"
          label="Submit"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="outline"
          label="Submit"
          styleType="default"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="default"
          styleType="secondary"
          label="Submit"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="outline"
          label="Submit"
          styleType="secondary"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="default"
          styleType="tertiary"
          label="Submit"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="outline"
          label="Submit"
          styleType="tertiary"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          buttonType="default"
          styleType="danger"
          label="Submit"
          iconLeft="close"
          iconRight="arrow-right"
        />
        <Button
          label="Submit"
          buttonType="outline"
          styleType="danger"
          iconLeft="close"
          iconRight="arrow-right"
          isLoading
        />

        <Button isLoading shape="square" buttonType="default" styleType="danger" iconLeft="close" />
        <Button shape="square" buttonType="outline" styleType="danger" iconLeft="close" />

        <Button shape="square" buttonType="default" styleType="white" iconLeft="close" />
        <Button shape="circle" buttonType="default" styleType="white" iconLeft="close" />

        <Button shape="circle" buttonType="default" styleType="danger" iconLeft="close" />
        <Button shape="circle" buttonType="outline" styleType="danger" iconLeft="close" />
      </div>
    </div>
  );
}
