'use client';
import { RouterPath } from '@/constants/router-path';
import { Button } from '@/libraries/common';
import { useRouter } from '@/utils/navigation';
import React from 'react';

export default function ContentsPage() {
  const router = useRouter();
  return (
    <div>
      <Button label="Create content" onClick={() => router.push(RouterPath.ContentsAdd)} />
      ContentPage
    </div>
  );
}
