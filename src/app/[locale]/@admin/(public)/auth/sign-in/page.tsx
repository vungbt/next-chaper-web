'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { ISignInReq } from '@/types/auth';
import { RegexHelper } from '@/utils/helpers/regex';
import { Button, InputForm } from '@/libraries/common';

export default function LoginPage() {
  const t = useTranslations();
  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t('validation.required', { label: t('common.username').toLowerCase() }))
      .trim()
      .matches(RegexHelper.REGEX_USERNAME, t('validation.usernameInvalid')),
    password: Yup.string()
      .required(t('validation.required', { label: t('common.password').toLowerCase() }))
      .trim()
      .min(8, t('validation.min', { label: t('common.password').toLowerCase(), number: 8 }))
      .max(20, t('validation.max', { label: t('common.password').toLowerCase(), number: 20 }))
      .matches(RegexHelper.REGEX_PASSWORD, t('validation.passwordInvalid'))
  });

  const initialValues = {
    username: '',
    password: ''
  };

  const handleSubmit = async (values: ISignInReq) =>
    await signIn('credentials', { ...values, callbackUrl: '/' });

  return (
    <div>
      <Formik<ISignInReq>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form>
              <div className="flex flex-col gap-6 max-w-[500px] mx-auto">
                <Field
                  label={`${t('common.username')}:`}
                  isRequired={true}
                  name="username"
                  component={InputForm}
                  placeholder={t('common.username')}
                />
                <Field
                  label={`${t('common.password')}:`}
                  isRequired={true}
                  name="password"
                  component={InputForm}
                  placeholder={t('common.password')}
                />

                <Button className="mt-10" minWidth="full" type="submit" label={t('common.login')} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
