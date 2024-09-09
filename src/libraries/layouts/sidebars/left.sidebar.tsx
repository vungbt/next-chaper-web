import { FallbackImage } from '@/constants/common';
import { NotificationCard } from '@/libraries/common';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

export default function LeftSidebar() {
  return (
    <label
      htmlFor="admin-sidebar"
      className={clsx(
        'admin-sidebar min-w-[212px] w-[212px] p-4 border-l border-solid border-slate-500 border-opacity-15 h-full max-h-screen overflow-y-auto'
      )}
    >
      <NotificationCard message="123123" time={new Date()} />
    </label>
  );
}
