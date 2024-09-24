import { toastError } from '@/configs/toast';
import { format, formatDistance, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export enum EDateFormat {
  MM_dd_yyyy = 'MM/dd/yyyy',
  MMMM_yyyy = 'MMMM yyyy'
}

export const formatDate = (date?: Date | string | number, fm?: EDateFormat) => {
  const dateNeedFormat = date ? new Date(date) : new Date();
  return format(dateNeedFormat, fm ?? EDateFormat.MM_dd_yyyy);
};

export const getTimeLeft = (date?: Date | string | number) => {
  const currentDate = date ? new Date(date) : new Date();
  return formatDistance(currentDate, new Date(), { addSuffix: true });
};

export const getErrorMss = (error: any, defaultMess?: string) => {
  const errResponse = error?.response;
  if (!errResponse || Object.keys(errResponse).length <= 0) return;
  const errors = errResponse?.errors ?? [];
  if (!errors || errors.length <= 0) return;
  const message = errors[0]?.message ?? '';

  const newMessError = message ?? defaultMess;
  if (!newMessError || newMessError.length <= 0) return;

  toastError(newMessError);
};

export const formatTimeAgo = (createdAt: Date, t: any): string => {
  const now = new Date();

  if (isToday(createdAt)) {
    return `TODAY ${format(createdAt, 'hh:mm a')}`;
  }

  if (isYesterday(createdAt)) {
    return `YESTERDAY ${format(createdAt, 'hh:mm a')}`;
  }

  const diffInMinutes = Math.abs((now.getTime() - createdAt.getTime()) / 60000);

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes ago`;
  }

  if (diffInMinutes < 1440) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hours ago`;
  }

  return formatDistanceToNow(createdAt, { addSuffix: true });
};
