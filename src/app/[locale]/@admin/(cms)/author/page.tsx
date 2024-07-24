'use client';
import { AdminAuthorColumns } from '@/@handles/author/admin-author-columns';
import { AdminAuthorUtils } from '@/@handles/author/admin-author.utils';
import { RouterPath } from '@/constants/router-path';
import { Button, FunctionBar, Table } from '@/libraries/common';
import { Link } from '@/utils/navigation';

export default function AuthorPage() {
  const {
    items,
    loading,
    onDelete,
    pagination,
    setPagination,
    loadingDelete,
    metadata,
    onSort,
    sortActives,
    setSearchValue
  } = AdminAuthorUtils();

  return (
    <div>
      <FunctionBar
        addUrl={RouterPath.AuthorAdd}
        onSearch={setSearchValue}
        // pagination top
        pagination={{
          total: metadata?.count ?? 0,
          limit: pagination.limit as number,
          currentPage: pagination.page
        }}
        onChangePage={(page) => setPagination({ ...pagination, page })}
      />
      <Table
        tableId="testTable"
        columns={AdminAuthorColumns({ onDelete, onSort, sortActives })}
        rows={items}
        loading={loading || loadingDelete}
        total={metadata?.count ?? 0}
        limit={pagination.limit as number}
        page={pagination.page}
        onChangePage={(page) => setPagination({ ...pagination, page })}
      />
    </div>
  );
}
