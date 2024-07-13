import { FILE_IMAGE } from '@/constants/common';
import { RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';
import { ChangeEvent, Ref, forwardRef, useMemo, useState } from 'react';
import { FormGroup, UploadItem, UploadPreview } from '..';
import { useTranslations } from 'next-intl';

type UploadProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'onChange' | 'value'
> & {
  label?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  classNameWrap?: string;
  subPlaceholder?: string;
  value?: UploadItem | null;
  size?: number;
  isTouched?: boolean;

  error?: string;
  layout?: 'horizontal' | 'vertical';
  name?: string;
  onChange: (value?: UploadItem | null) => void;
  setError?: (mess: any) => void;
};

export const Upload = forwardRef(function UploadInput(
  props: UploadProps,
  ref: Ref<HTMLInputElement>
) {
  const t = useTranslations();
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
    size = FILE_IMAGE.size,
    name,
    placeholder,
    value,
    subPlaceholder,
    isTouched,
    setError,
    onChange,
    ...reset
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const isHaveError = useMemo(
    () => error && error.length > 0 && (isFocus || isTouched),
    [error, isFocus, isTouched]
  );

  const onHandleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files ?? [];
    if (!files || files.length <= 0) return showError(t('validation.fileInvalid'));
    const file = files[0];
    const fileType = file.type;
    const fileSize = file.size;
    const fileId = `${new Date().toISOString()}-${file?.name}`;

    const acceptsList = accept.split(',').map((item) => item.trim());
    if (!acceptsList.includes(fileType))
      return showError(t('validation.fileNotInAccepts', { types: accept }));
    if (size < fileSize) return showError(t('validation.fileLarge', { max: size }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ id: fileId, url: reader.result as string, file });
      };
      reader.readAsDataURL(file);
      resetInputFile();
    }
  };

  const showError = (mess: string) => {
    const messError: any = {};
    messError[`${name}`] = mess;
    setError && setError(messError);
  };

  const onHandleRemove = () => {
    onChange && onChange(null);
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
        className={clsx(
          'box-border flex flex-col gap-2 w-fit min-w-[304px] items-center border border-dashed transition-all ease-linear hover:border-info cursor-pointer px-4 py-6 rounded-xl bg-white',
          {
            '!border-danger': isHaveError,
            'border-indigo-900': !isHaveError,
            '!cursor-not-allowed !bg-slate-500': disabled
          },
          classNameWrap
        )}
        onClick={() => setIsFocus(true)}
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
          className={clsx(
            'w-full flex-1 border-none text-dark outline-none bg-transparent',
            { '!cursor-not-allowed bg-slate-500': disabled },
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

      {value && Object.keys(value).length > 0 && (
        <UploadPreview items={value} onRemove={onHandleRemove} />
      )}
    </FormGroup>
  );
});
