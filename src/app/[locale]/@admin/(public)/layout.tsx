import { RouterPath } from '@/constants/router-path';
import PortalInit from '@/libraries/portal-init';
import { redirect } from '@/utils/navigation';
import { getSessionSS } from '@/utils/session';
import React, { ReactNode } from 'react';

export default async function AdminPublicLayout({ children }: { children: ReactNode }) {
  const session = await getSessionSS();
  if (session && session?.token) return redirect(RouterPath.Home);
  return (
    <>
      <div className="text-center py-4 font-bold">Header Public Admin</div>
      {children}
      <div className="text-center py-4 font-bold">Footer Public Admin</div>
    </>
  );
}
