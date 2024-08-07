import { FallbackImage } from '@/constants/common';
import { RouterPath } from '@/constants/router-path';
import { ActionsTable, SortCell, TableColumn } from '@/libraries/common';
import { ESortOrder } from '@/types';
import { IAuthor } from '@/types/author';
import { formatDate } from '@/utils/helpers/formatter';
import { Link, useRouter } from '@/utils/navigation';
import { useTranslations } from 'next-intl';

export const AdminAuthorColumns = ({
  onDelete,
  onSort,
  sortActives
}: {
  sortActives: Record<string, ESortOrder>[];
  onDelete: (item: IAuthor) => void;
  onSort?: (values: Record<string, ESortOrder>[]) => void;
}): TableColumn<IAuthor>[] => {
  const t = useTranslations();
  const router = useRouter();

  const onGoToDetail = (row: IAuthor) => {
    router.push(`${RouterPath.AuthorAdd}?id=${row.id}`);
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
          sortType="fullName"
          actives={sortActives}
          title={t('common.fullName')}
          onSortHandler={(values) => onSort && onSort(values)}
        />
      ),
      render: (row: IAuthor) => (
        <Link href={`${RouterPath.AuthorAdd}?id=${row.id}`}>{row.fullName}</Link>
      )
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
      render: (item: IAuthor) => <>{formatDate(item.createdAt)}</>
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
      render: (item: IAuthor) => <>{formatDate(item.updatedAt)}</>
    },
    {
      title: t('actions'),
      render: (row) => (
        <ActionsTable onDelete={() => onDelete(row)} onGoToDetail={() => onGoToDetail(row)} />
      )
    }
  ];
};
