import { RouterPath } from '@/constants/router-path';
import PortalInit from '@/libraries/portal-init';
import { redirect } from '@/utils/navigation';
import { getSessionSS } from '@/utils/session';
import React, { ReactNode } from 'react';

export default async function AdminPrivateLayout({ children }: { children: ReactNode }) {
  const session = await getSessionSS();
  if (!session || !session?.token) return redirect(RouterPath.Login);
  return (
    <>
      <div className="text-center py-4 font-bold">Header Private Admin</div>
      <PortalInit />
      {children}
      <div className="text-center py-4 font-bold">Footer Private Admin</div>
    </>
  );
}
