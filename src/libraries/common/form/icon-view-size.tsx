import { IconName, RenderIcon } from '@/libraries/icons';
import clsx from 'clsx';

export const IconViewSize = ({
  name,
  isLoading,
  size,
  className,
  isCircle = false
}: {
  name?: IconName;
  isLoading?: boolean;
  size: 'large' | 'middle' | 'small';
  className?: string;
  isCircle?: boolean;
}) => {
  return (
    <span
      className={clsx({
        'rounded-full bg-green-900 h-8 w-8 flex items-center justify-center my-2': isCircle
      })}
    >
      <RenderIcon
        className={clsx(
          {
            'h-5 w-5 min-w-5': size === 'large',
            'h-4.5 w-4.5 min-w-4.5': size === 'middle',
            'h-4 w-4 min-w-4': size === 'small'
          },
          className
        )}
        name={isLoading ? 'loading' : name}
      />
    </span>
  );
};
