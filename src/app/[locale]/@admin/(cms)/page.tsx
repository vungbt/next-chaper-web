'use client';
import { RouterPath } from '@/constants/router-path';
import useProfile from '@/hooks/profile/useProfile';
import { Button } from '@/libraries/common';
import { useRouter } from '@/utils/navigation';
import { signOut } from 'next-auth/react';

export default function AdminPage() {
  const { profile } = useProfile();
  const router = useRouter();
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <div>AdminPage Login</div>
      <div className="flex flex-col">
        <div>
          username: <span className="font-bold">{profile?.username}</span>
        </div>
        <div>
          role: <span className="font-bold"> {profile?.role}</span>
        </div>
      </div>
      <Button label="Sign out" onClick={() => signOut()} />
      <Button
        label="Create category"
        styleType="orange"
        onClick={() => router.push(RouterPath.Categories)}
      />
      <Button
        label="Author manage"
        styleType="orange"
        onClick={() => router.push(RouterPath.Author)}
      />
    </div>
  );
}
