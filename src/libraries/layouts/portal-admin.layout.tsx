'use client';
import { FallbackImage } from '@/constants/common';
import useProfile from '@/hooks/profile/useProfile';
import { Button, InputForm } from '@/libraries/common';
import ThemeSwitcher from '@/libraries/theme-switcher';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import { SideBar, SidebarMenu } from './sidebar';

export function PortalAdminLayout(props: { children: ReactNode; menus?: SidebarMenu[] }) {
  const { profile } = useProfile();
  const inputSidebar = useRef<HTMLInputElement>(null);
  const [collapsedActive, setCollapsedActive] = useState<{
    sidebar: boolean;
    notification: boolean;
  }>({ sidebar: false, notification: false });

  const onHandleCollapsed = (type: 'sidebar' | 'notification') => {
    const newCollapsedActive = { ...collapsedActive };
    newCollapsedActive[type] = !newCollapsedActive[type];
    setCollapsedActive(newCollapsedActive);
  };

  const onShowSidebar = () => {
    if (inputSidebar && inputSidebar.current) {
      inputSidebar.current.checked = true;
    }
  };

  return (
    <div className="flex items-start h-screen bg-bg-600">
      {/* input trigger sidebar */}
      <input hidden ref={inputSidebar} type="checkbox" id="admin-sidebar" />

      {/* sidebar */}
      <label
        htmlFor="admin-sidebar"
        className={clsx(
          'admin-sidebar min-w-[212px] w-[212px] p-4 border-r border-solid border-slate-500 border-opacity-15 h-full max-h-screen overflow-y-auto'
        )}>
        {/* avatar */}
        <div className="flex items-center gap-2 p-2">
          <Image
            src={profile?.avatar?.url ?? FallbackImage.avatarUrl}
            alt="avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm line-clamp-1">{profile?.username}</span>
        </div>

        {/* sidebar */}
        <SideBar menus={props.menus ?? []} />
      </label>

      {/* content */}
      <div className="admin-content flex-1 h-full">
        {/* header */}
        <div className="flex items-center justify-between bg-white px-7 py-5 border-b border-solid border-slate-500 border-opacity-15">
          <div className="flex items-center gap-2">
            <Button
              onClick={onShowSidebar}
              shape="square"
              icon="sidebar-right"
              className="relative lg:hidden"
              size="small"
            />

            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-black opacity-45">Dashboards</span>
              <span className="text-black opacity-45">/</span>
              <span>Default</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <InputForm
              classNameWrap="bg-slate-500 max-w-[160px]"
              placeholder="Search"
              iconLeft="search"
              size="middle"
            />
            <ThemeSwitcher />
            <Button size="small" shape="square" iconLeft="notification" />
            <Button
              size="small"
              shape="square"
              iconLeft="sidebar-left"
              onClick={() => onHandleCollapsed('notification')}
            />
          </div>
        </div>
        <div className="p-7 portal-content-layout">{props.children}</div>
      </div>

      {/* overlay */}
      <label htmlFor="admin-sidebar" className="admin-sidebar-overlay"></label>
    </div>
  );
}
