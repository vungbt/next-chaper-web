'use client';
import clsx from 'clsx';
import React, { Ref, forwardRef, useMemo } from 'react';
import { IconViewSize } from '..';
import { IconName } from '@/libraries/icons';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  icon?: IconName;
  isLoading?: boolean;

  shape?: 'default' | 'circle' | 'square';
  styleType?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'orange' | 'white';
  buttonType?: 'default' | 'outline';
  minWidth?: 'full' | 'fit';
  size?: 'large' | 'middle' | 'small';
};

export const Button = forwardRef(function ButtonBase(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    className,
    label,
    iconLeft,
    iconRight,
    icon,
    isLoading,
    shape = 'default',
    styleType = 'default',
    buttonType = 'default',
    minWidth = 'fit',
    size = 'large',
    disabled,
    ...reset
  } = props;
  const isDisabled = disabled ?? isLoading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        'flex items-center justify-center gap-2 text-body border border-solid transition-all ease-linear',
        {
          'bg-green-900 border-green-900 text-white hover:bg-green-700 hover:shadow-green-hover':
            (styleType === 'default' && buttonType === 'default') ||
            (styleType === 'default' && buttonType === 'default'),
          'bg-white border-green-900 text-black-900 hover:bg-green-700 hover:shadow-green-hover hover:text-white':
            (styleType === 'default' && buttonType === 'outline') ||
            (styleType === 'default' && buttonType === 'outline'),

          // secondary
          'bg-indigo-900 border-indigo-900 text-white hover:bg-indigo-700 hover:shadow-indigo-hover':
            styleType === 'secondary' && buttonType === 'default',
          'bg-white border-indigo-900 text-black-900 hover:bg-indigo-700 hover:shadow-indigo-hover hover:text-white':
            styleType === 'secondary' && buttonType === 'outline',

          // tertiary
          'bg-yellow-900 border-yellow-900 text-black-900 hover:bg-yellow-700 hover:shadow-yellow-hover':
            styleType === 'tertiary' && buttonType === 'default',
          'bg-white border-yellow-900 text-black-900 hover:bg-yellow-700 hover:shadow-yellow-hover hover:text-black-900':
            styleType === 'tertiary' && buttonType === 'outline',

          // danger
          'bg-red-900 border-red-900 text-white hover:bg-red-700 hover:shadow-red-hover':
            styleType === 'danger' && buttonType === 'default',
          'bg-white border-red-900 text-black-900 hover:bg-red-700 hover:shadow-red-hover hover:text-white':
            styleType === 'danger' && buttonType === 'outline',

          // orange
          'bg-orange-900 border-orange-900 text-white hover:bg-orange-700 hover:shadow-orange-hover':
            styleType === 'orange' && buttonType === 'default',
          'bg-white border-orange-900 text-black-900 hover:bg-orange-700 hover:shadow-orange-hover hover:text-white':
            styleType === 'orange' && buttonType === 'outline',

          // white
          'bg-white text-black-900 border-none shadow-dark-opacity hover:text-white hover:bg-slate-900 hover:shadow-black-hover':
            (styleType === 'white' && buttonType === 'default') ||
            (styleType === 'white' && buttonType === 'outline'),

          'rounded-[100px] px-4 py-2': shape === 'default',
          'rounded-full p-2': shape === 'circle',
          'rounded-lg p-2': shape === 'square',

          // min width
          'justify-center gap-2 w-full': minWidth === 'full',
          'justify-between min-w-fit w-fit': minWidth === 'fit',

          'cursor-not-allowed !bg-gray-200 !text-black-900': isDisabled,
          'min-h-[38px]': size === 'large'
        },
        className
      )}
      type={reset.type ?? 'button'}
      {...reset}
      ref={ref}
    >
      {(iconLeft || icon) && (
        <IconViewSize
          className="!w-4 !h-4 !min-w-4"
          name={iconLeft || icon}
          isLoading={isLoading && (!iconRight || !icon)}
          size={size}
        />
      )}
      {label}

      {(iconRight || isLoading) && shape === 'default' && (
        <IconViewSize
          className="!w-4 !h-4 !min-w-4"
          name={iconRight}
          isLoading={isLoading && !iconLeft}
          size={size}
        />
      )}
    </button>
  );
});
