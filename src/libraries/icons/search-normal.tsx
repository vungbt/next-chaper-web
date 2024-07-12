import clsx from 'clsx';
import { IconProps } from '.';

export default function SearchNormal({ className, transform, ...reset }: Readonly<IconProps>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-6 w-6', className)}
      transform={transform}
      {...reset}
    >
      <path
        d="M7.66668 14.5C3.90001 14.5 0.833344 11.4333 0.833344 7.66665C0.833344 3.89998 3.90001 0.833313 7.66668 0.833313C11.4333 0.833313 14.5 3.89998 14.5 7.66665C14.5 11.4333 11.4333 14.5 7.66668 14.5ZM7.66668 1.83331C4.44668 1.83331 1.83334 4.45331 1.83334 7.66665C1.83334 10.88 4.44668 13.5 7.66668 13.5C10.8867 13.5 13.5 10.88 13.5 7.66665C13.5 4.45331 10.8867 1.83331 7.66668 1.83331Z"
        fill="currentColor"
      />
      <path
        d="M14.6667 15.1667C14.54 15.1667 14.4133 15.12 14.3133 15.02L12.98 13.6867C12.7867 13.4934 12.7867 13.1734 12.98 12.98C13.1733 12.7867 13.4933 12.7867 13.6867 12.98L15.02 14.3134C15.2133 14.5067 15.2133 14.8267 15.02 15.02C14.92 15.12 14.7933 15.1667 14.6667 15.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}
