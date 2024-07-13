import { FILE_IMAGE } from '@/constants/common';
import { RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ChangeEvent, Ref, forwardRef, useMemo, useState } from 'react';
import { FormGroup, UploadItem, UploadPreview } from '..';

type UploadProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'max'
> & {
  label?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  classNameWrap?: string;
  subPlaceholder?: string;
  values?: UploadItem[];
  size?: number;
  max?: number;
  isTouched?: boolean;

  error?: string;
  layout?: 'horizontal' | 'vertical';
  name?: string;
  onChange: (values?: UploadItem[]) => void;
  setError?: (mess: any) => void;
};

export const UploadMultiple = forwardRef(function UploadMultipleInput(
  props: UploadProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    className,
    classNameWrap,
    layout,
    // isLoading,
    isRequired,
    disabled,
    label,
    error,
    accept = FILE_IMAGE.accepts.join(', '),
    name,
    placeholder,
    values = [],
    subPlaceholder,
    size = FILE_IMAGE.size,
    max = 5,
    isTouched,
    setError,
    onChange,
    ...reset
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const t = useTranslations();
  const isHaveError = useMemo(
    () => error && error.length > 0 && (isFocus || isTouched),
    [error, isFocus, isTouched]
  );

  const onHandleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files ?? [];
    if (!files || files.length <= 0) return showError(t('validation.fileInvalid'));

    const newValues: UploadItem[] = [...values];
    const existingFiles = new Set(
      newValues.map((item) => `${item.file?.type}-${item.file?.size}-${item.file?.name}`)
    ); // Track existing file combinations

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileSize = file.size;
      const fileName = file?.name;

      // Check for unique file combination
      const uniqueIdentifier = `${fileType}-${fileSize}-${fileName}`;
      if (existingFiles.has(uniqueIdentifier)) continue;

      // Check for accepted file type
      const acceptsList = accept.split(',').map((item) => item.trim());
      if (!acceptsList.includes(fileType))
        return showError(t('validation.fileNotInAccepts', { types: accept }));

      // Check for file size limit
      if (size < fileSize) return showError(t('validation.fileLarge', { max: size }));

      const fileId = `${new Date().toISOString()}-${fileName}`;
      if (file) {
        const reader = new FileReader();
        await new Promise((resolve: any, reject) => {
          reader.onload = () => {
            newValues.push({
              id: fileId,
              url: reader.result as string,
              file: file
            });
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    }
    if (newValues.length > max)
      return showError(t('validation.max', { label: t(`form.${name}`), number: max }));
    onChange && onChange(newValues);
    resetInputFile();
  };

  const showError = (mess: string) => {
    const messError: any = {};
    messError[`${name}`] = mess;
    setError && setError(messError);
  };

  const onHandleRemove = (value: UploadItem) => {
    const newItem = [...values];
    const indexItemValid = newItem.findIndex((item) => item.id === value.id);
    if (indexItemValid !== -1) {
      newItem.splice(indexItemValid, 1);
    }
    onChange && onChange(newItem);
    resetInputFile();
  };

  const resetInputFile = () => {
    if (!document || !name) return;
    const inputFile = document.getElementById(name) as HTMLInputElement;
    if (inputFile) {
      inputFile.value = '';
    }
  };

  return (
    <FormGroup
      isShowError={false}
      layout={layout}
      label={label}
      name={name}
      isRequired={isRequired}
    >
      <label
        htmlFor={name}
        onClick={() => setIsFocus(true)}
        className={clsx(
          'box-border flex flex-col gap-2 w-fit min-w-full md:min-w-[304px] items-center border border-dashed transition-all bg-white ease-linear hover:border-info cursor-pointer px-4 py-6 rounded-xl',
          {
            '!border-danger': isHaveError,
            'border-indigo-900': !isHaveError,
            '!cursor-not-allowed !bg-slate-500': disabled
          },
          classNameWrap
        )}
      >
        <RenderIcon name="image-icon" />
        <p className="text-sm text-dark">{placeholder}</p>
        <p className="text-sm text-text-secondary">{subPlaceholder}</p>

        {/* input file */}
        <input
          ref={ref}
          name={name}
          id={name}
          type="file"
          hidden
          accept={accept}
          onChange={onHandleChangeFile}
          disabled={disabled}
          multiple
          className={clsx(
            'w-full flex-1 border-none text-dark outline-none bg-transparent',
            { '!cursor-not-allowed bg-slate-100': disabled },
            className
          )}
          {...reset}
        />
      </label>
      {isHaveError && (
        <div
          className={clsx('mt-1', {
            'grid grid-cols-12 gap-2': layout === 'horizontal'
          })}
        >
          <div
            className={clsx({
              hidden: layout === 'vertical',
              'col-span-4': layout === 'horizontal'
            })}
          />
          <div className="col-span-8 w-full text-sm text-danger">{error}</div>
        </div>
      )}

      {values && values.length > 0 && <UploadPreview items={values} onRemove={onHandleRemove} />}
    </FormGroup>
  );
});
