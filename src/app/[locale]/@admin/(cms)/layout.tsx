import { RouterPath } from '@/constants/router-path';
import { SidebarMenu } from '@/libraries/layouts';
import { PortalAdminLayout } from '@/libraries/layouts/portal-admin.layout';
import PortalInit from '@/libraries/portal-init';
import { redirect } from '@/utils/navigation';
import { getSessionSS } from '@/utils/session';
import React, { ReactNode } from 'react';

export default async function AdminPrivateLayout({ children }: { children: ReactNode }) {
  const session = await getSessionSS();
  if (!session || !session?.token) return redirect(RouterPath.Login);

  const defaultMenus: SidebarMenu[] = [
    {
      label: 'Dashboards',
      items: [{ label: 'Overview', href: '/', icon: 'graph' }]
    },
    {
      label: 'Pages',
      items: [
        {
          label: 'Category',
          href: '/categories',
          icon: 'box-add'
        },
        {
          label: 'Setting',
          href: '/setting',
          icon: 'setting',
          child: [
            {
              label: 'Theme',
              href: '/setting/theme'
            }
          ]
        }
      ]
    }
  ];
  return (
    <PortalAdminLayout menus={defaultMenus}>
      <PortalInit />
      {children}
    </PortalAdminLayout>
  );
}
