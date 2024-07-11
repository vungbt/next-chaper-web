import React, { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>Header Admin</div>
      {children}
      <div>Footer Admin</div>
    </>
  );
}
