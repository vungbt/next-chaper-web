'use client';
import useInitPortal from '@/hooks/useInitBaseAuth';
import React from 'react';

const PortalInit = () => {
  useInitPortal();
  return <></>;
};

function PortalWrap() {
  return <PortalInit />;
}

export default React.memo(PortalWrap);
