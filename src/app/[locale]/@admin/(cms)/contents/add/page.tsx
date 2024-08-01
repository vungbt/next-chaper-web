'use client';
import AdminContentActionUtils from '@/@handles/content/admin-content-action.utils';
import {
  Button,
  FormGroup,
  InputForm,
  RadioGroup,
  SelectAsync,
  TextareaForm,
  Upload
} from '@/libraries/common';
import { EContentStatus, EContentType, ICreateContent } from '@/types';
import { validationCustoms } from '@/utils/helpers/validation';
import { Field, Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';

export default function CreateContentPage() {
  const { loading, formikRef, onSubmit, loadingAuthor, selectOptions, filterAuthors } =
    AdminContentActionUtils();
  const t = useTranslations();

  const initialValues: ICreateContent = {
    name: '',
    thumbnail: null,
    author: null,
    pageType: EContentType.Chapter,
    status: EContentStatus.Pending
  };

  const validationSchema: any = Yup.object({
    name: Yup.string().required(
      t('validation.required', { label: t('common.name').toLowerCase() })
    ),
    thumbnail: validationCustoms.upload(t, t('common.thumbnail')),
    author: validationCustoms.select(t, t('common.author'))
  });

  const pageTypeOtp = [
    { value: EContentType.Chapter, label: t('common.chapter') },
    { value: EContentType.Page, label: t('common.page') }
  ];

  const contentStatus = [
    { value: EContentStatus.Pending, label: t('common.pending') },
    { value: EContentStatus.Coming, label: t('common.comingSoon') },
    { value: EContentStatus.Finish, label: t('common.finish') }
  ];

  return (
    <div>
      <Formik<ICreateContent>
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched, setErrors }) => {
          return (
            <Form className="flex flex-col gap-6 lg:w-3/4 xl:w-1/2">
              <div className="flex items-center gap-6 flex-col sm:flex-row">
                <Field
                  label={t('common.name')}
                  isRequired
                  name="name"
                  component={InputForm}
                  placeholder={t('placeholder.enter', {
                    label: t('common.name').toLowerCase()
                  })}
                />

                <Field
                  label={t('common.author')}
                  isRequired={true}
                  name="author"
                  component={SelectAsync}
                  defaultOptions={selectOptions}
                  loading={loadingAuthor}
                  filterOptions={filterAuthors}
                />
              </div>

              <FormGroup label={t('common.pageType')}>
                <Field name="pageType" component={RadioGroup} options={pageTypeOtp} />
              </FormGroup>

              <FormGroup label={t('common.status')}>
                <Field name="status" component={RadioGroup} options={contentStatus} />
              </FormGroup>

              <Field
                label={t('common.description')}
                name="description"
                component={TextareaForm}
                placeholder={t('placeholder.enter', {
                  label: t('common.description').toLowerCase()
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

              <Button isLoading={loading} label={t('common.submit')} type="submit" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
