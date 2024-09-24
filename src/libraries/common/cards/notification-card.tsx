import { IconName } from '@/libraries/icons';
import { formatTimeAgo } from '@/utils/helpers/formatter';
import { useTranslations } from 'next-intl';
import React from 'react';

type NotificationCardProps = {
  iconName?: IconName;
  message: string;
  time: string | Date | string;
};

export function NotificationCard(props: NotificationCardProps) {
  const createdAt = new Date('2024-08-01T10:20:00Z');
  const t = useTranslations();
  console.log(formatTimeAgo(createdAt, t));
  return <div>NotificationCard</div>;
}
