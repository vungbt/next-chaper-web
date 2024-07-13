import { RenderIcon } from '@/libraries/icons';
import { ESortOrder } from '@/types';
import clsx from 'clsx';
import React, { useMemo } from 'react';

type SortCellProps = {
  title: string;
  sortType: string; // field to query
  actives?: Record<string, ESortOrder>[];
  onSort?: (value: ESortOrder, metadata?: { current?: ESortOrder; sortType: string }) => void;
  onSortHandler?: (
    currentActives: Record<string, ESortOrder>[],
    metadata?: { current?: ESortOrder; sortType: string }
  ) => void; // use in case when get current list sort to match with prisma filter
};

export function SortCell({ title, actives = [], sortType, onSort, onSortHandler }: SortCellProps) {
  // get active sort
  const active = useMemo(
    () => actives && actives.find((item) => item[`${sortType}`])?.[`${sortType}`],
    [sortType, actives]
  );

  const sortValue = useMemo(
    () =>
      active ? (active === ESortOrder.Asc ? ESortOrder.Desc : ESortOrder.Asc) : ESortOrder.Desc,
    [active]
  );

  const onHandler = () => {
    if (onSort) {
      onSort && onSort(sortValue, { current: sortValue, sortType });
    }
    if (onSortHandler) {
      const currentSortActives = sortHandler(actives, sortValue, sortType);
      onSortHandler(currentSortActives, { current: sortValue, sortType });
    }
  };
  return (
    <div className="flex items-center justify-between">
      {title}
      <div className="flex items-center justify-center flex-col cursor-pointer" onClick={onHandler}>
        <RenderIcon
          style={{ marginBottom: '-2px' }}
          name="caret-up-solid"
          className={clsx('!w-3 !h-3', {
            'text-info': active === ESortOrder.Asc
          })}
        />
        <RenderIcon
          style={{ marginTop: '-2px' }}
          name="caret-down-solid"
          className={clsx('!w-3 !h-3', {
            'text-info': active === ESortOrder.Desc
          })}
        />
      </div>
    </div>
  );
}

export const sortHandler = (
  sortActions: Record<string, ESortOrder>[],
  value: ESortOrder,
  key: string
) => {
  const newSortActive = [...sortActions];
  const sortItemIndex = newSortActive.findIndex((item) => item[`${key}`]);
  if (sortItemIndex === -1) {
    newSortActive.push({ [key]: value });
  } else {
    const newItem = { ...newSortActive[sortItemIndex], [key]: value };

    if (value === ESortOrder.Desc) {
      newSortActive.splice(sortItemIndex, 1);
    } else {
      newSortActive.splice(sortItemIndex, 1, newItem);
    }
  }
  return newSortActive;
};
