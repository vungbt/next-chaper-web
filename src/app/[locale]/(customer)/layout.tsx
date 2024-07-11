import React, { ReactNode } from 'react';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>Header Customer</div>
      {children}
      <div>Footer Customer</div>
    </>
  );
}
