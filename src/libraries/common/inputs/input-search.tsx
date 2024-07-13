import { IconName } from '@/libraries/icons';
import clsx from 'clsx';
import { FieldInputProps, FormikProps } from 'formik';
import { Ref, forwardRef } from 'react';
import { FormGroup, IconViewSize } from '..';

type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  field?: FieldInputProps<never>;
  form?: FormikProps<any>;
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  isLoading?: boolean;
  isRequired?: boolean;
  classNameWrap?: string;

  error?: string;
  size?: 'large' | 'middle' | 'small';
  layout?: 'horizontal' | 'vertical';
};

export const InputSearch = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    className,
    classNameWrap,
    size = 'large',
    field,
    form,
    iconLeft,
    iconRight,
    layout,
    isLoading,
    isRequired,
    disabled,
    label,
    onChange,
    ...reset
  } = props;
  const name = field?.name;
  const isHaveError = !form || !name ? false : form.errors[name] && form.touched[name];

  return (
    <FormGroup size={size} layout={layout} label={label} name={name} isRequired={isRequired}>
      <label
        htmlFor={name}
        className={clsx(
          'input-search-custom box-border flex w-full items-center border border-solid transition-all ease-linear hover:border-green-700 bg-white',
          {
            'min-h-10 gap-3 rounded-4xl px-4 pr-2 text-base': size === 'large',
            'min-h-8 gap-2 rounded-3xl px-4 pr-2 text-sm': size === 'middle',
            'min-h-6 gap-1 rounded-2xl px-2 text-sm': size === 'small',

            '!border-danger': isHaveError,
            'border-indigo-900': !isHaveError,
            'cursor-not-allowed !bg-slate-500 opacity-50': disabled
          },
          classNameWrap
        )}
      >
        {iconLeft && (
          <span className="icon-right text-white rounded-full p-[0.375rem] bg-green-900 my-2">
            <IconViewSize className="icon-left" name={iconLeft} isLoading={isLoading} size={size} />
          </span>
        )}
        <input
          ref={ref}
          name={name}
          id={name}
          value={field?.value}
          onChange={(e) => {
            if (disabled) return;
            if (onChange) {
              onChange(e);
            }
            field?.onChange(e);
          }}
          onBlur={field?.onBlur}
          disabled={disabled}
          className={clsx(
            'w-full flex-1 border-none text-dark outline-none bg-transparent',
            { 'cursor-not-allowed bg-slate-500': disabled },
            className
          )}
          {...reset}
        />
        {(iconRight || isLoading) && (
          <span className="icon-right text-white rounded-full p-[0.375rem] bg-green-900 my-2">
            <IconViewSize
              className={clsx({
                'text-slate-600': disabled
              })}
              name={iconRight}
              isLoading={isLoading}
              size={size}
            />
          </span>
        )}
      </label>
    </FormGroup>
  );
});
