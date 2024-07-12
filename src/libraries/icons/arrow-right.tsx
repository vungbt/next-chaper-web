import clsx from 'clsx';
import { IconProps } from '.';

export default function ArrowRight({ className, transform, ...reset }: Readonly<IconProps>) {
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
        d="M9.62001 12.5467C9.49334 12.5467 9.36667 12.5 9.26667 12.4C9.07334 12.2067 9.07334 11.8867 9.26667 11.6934L12.96 8.00002L9.26667 4.30668C9.07334 4.11335 9.07334 3.79335 9.26667 3.60002C9.46001 3.40668 9.78001 3.40668 9.97334 3.60002L14.02 7.64668C14.2133 7.84002 14.2133 8.16002 14.02 8.35335L9.97334 12.4C9.87334 12.5 9.74667 12.5467 9.62001 12.5467Z"
        fill="currentColor"
      />
      <path
        d="M13.5533 8.5H2.33334C2.06001 8.5 1.83334 8.27333 1.83334 8C1.83334 7.72667 2.06001 7.5 2.33334 7.5H13.5533C13.8267 7.5 14.0533 7.72667 14.0533 8C14.0533 8.27333 13.8267 8.5 13.5533 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
