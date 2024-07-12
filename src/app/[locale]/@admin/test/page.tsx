'use client';
import { InputForm, InputSearch } from '@/libraries/common';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import React from 'react';
import * as Yup from 'yup';

export default function TestPage() {
  const t = useTranslations();

  const initialValues: any = {
    inputName: ''
  };

  const validationSchema: any = Yup.object({
    inputName: Yup.string().required(
      t('validation.required', { label: t('common.title').toLowerCase() })
    ),
    searchInput: Yup.string().required('Search input must be required.')
  });

  const onSubmit = (values: any) => {
    console.log('values===>', values);
  };

  return (
    <div>
      <div className="bg-gray-200 p-6 rounded-2xl mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
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
          </Form>
        </Formik>
      </div>
    </div>
  );
}
