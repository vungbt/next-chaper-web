import { FallbackImage } from '@/constants/common';
import { RouterPath } from '@/constants/router-path';
import { ActionsTable, SortCell, TableColumn } from '@/libraries/common';
import { ESortOrder, ICategory } from '@/types';
import { formatDate } from '@/utils/helpers/formatter';
import { Link, useRouter } from '@/utils/navigation';
import { useTranslations } from 'next-intl';

export const AdminCategoryColumns = ({
  onDelete,
  onSort,
  sortActives
}: {
  sortActives: Record<string, ESortOrder>[];
  onDelete: (item: ICategory) => void;
  onSort?: (values: Record<string, ESortOrder>[]) => void;
}): TableColumn<ICategory>[] => {
  const t = useTranslations();
  const router = useRouter();

  const onGoToDetail = (row: ICategory) => {
    router.push(`${RouterPath.CategoriesAdd}?id=${row.id}`);
  };

  return [
    {
      title: t('no'),
      render: (_: unknown, index: number) => {
        return <span>{index + 1}</span>;
      },
      width: '20%'
    },
    {
      title: (
        <SortCell
          sortType="name"
          actives={sortActives}
          title={t('common.name')}
          onSortHandler={(values) => onSort && onSort(values)}
        />
      ),
      render: (row: ICategory) => (
        <Link href={`${RouterPath.CategoriesAdd}?id=${row.id}`}>{row.name}</Link>
      )
    },
    {
      title: t('common.slug'),
      render: 'slug'
    },
    {
      title: (
        <SortCell
          sortType="createdAt"
          actives={sortActives}
          title={t('createdAt')}
          onSortHandler={(values) => onSort && onSort(values)}
        />
      ),
      render: (item: ICategory) => <>{formatDate(item.createdAt)}</>
    },
    {
      title: (
        <SortCell
          sortType="updatedAt"
          actives={sortActives}
          title={t('updatedAt')}
          onSortHandler={(values) => onSort && onSort(values)}
        />
      ),
      render: (item: ICategory) => <>{formatDate(item.updatedAt)}</>
    },
    {
      title: t('actions'),
      render: (row) => (
        <ActionsTable onDelete={() => onDelete(row)} onGoToDetail={() => onGoToDetail(row)} />
      )
    }
  ];
};
