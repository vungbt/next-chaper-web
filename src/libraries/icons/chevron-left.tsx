import clsx from 'clsx';
import { IconProps } from '.';

export default function ChevronLeft({ className, transform, ...reset }: Readonly<IconProps>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-6 w-6', className)}
      transform={transform}
      {...reset}
    >
      <path
        d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
        stroke="currentColor"
        strokeWidth={reset.strokeWidth ?? 1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
